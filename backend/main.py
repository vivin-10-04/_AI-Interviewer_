from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain.agents import create_agent
import json
from groq import Groq
from dotenv import load_dotenv
import os
from pathlib import Path
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import json
from src.audiotranscribe import transcribe_audio as tsa
from src.captureaudio import capture_audio as capa
from src.evaluate_score import evalandscore as eval
from src.prompt import next_ques
from src.resumetopicextractions import topic
from src.speakai import greet , text_to_speech 
import uuid


# Import your modules
from src.audiotranscribe import transcribe_audio
from src.db_handler import get_previous_questions, get_connection
from src.resumetopicextractions import load_topics
from src.prompt import generate_interview_question


load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev server
        "http://localhost:3000",  # Alternative
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/interview")
async def conduct_interview(
    audio: UploadFile = File(...),
    history: str = Form(...),
    resume: Optional[UploadFile] = File(None),
    candidate_id: Optional[str] = Form(None)
):
    """
    Main interview endpoint
    1. Transcribe audio
    2. Load topics and previous questions
    3. Generate next question
    4. Return response
    """
    try:
        if not candidate_id:
            candidate_id = str(uuid.uuid4())
        # Parse message history
        messages = json.loads(history)
        
        # 1. Transcribe the audio
        audio_bytes = await audio.read()
        transcript = transcribe_audio(audio_bytes)
        
        # 2. Get or create candidate_id
        if not candidate_id:
            # Extract from resume or create new
            candidate_id = "temp_candidate_123"  # TODO: Your logic
        
        # 3. Load topics
        all_topics = load_topics(candidate_id)
        
        # 4. Get previous questions
        previous_questions = get_previous_questions(candidate_id)
        
        # 5. Filter available topics (remove already asked)
        asked_topics = {q['topic'] for q in previous_questions}
        available_topics = [
            topic for topic in all_topics 
            if topic[0] not in asked_topics
        ]
        
        # 6. Generate next question
        ai_reply = generate_interview_question(
            transcript=transcript,
            history=messages,
            available_topics=available_topics,
            previous_questions=previous_questions
        )
        
        # 7. Store the Q&A in database
        store_interview_data(
            candidate_id=candidate_id,
            question=ai_reply,
            user_answer=transcript
        )
        
        # 8. Return response
        return {
            "transcript": transcript,
            "reply": ai_reply,
            "question_type": "technical",  # TODO: Determine from AI
            "topic": extract_topic_from_reply(ai_reply)  # TODO: Implement
        }
        
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid history format")
    except Exception as e:
        print(f"Error in interview endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


def store_interview_data(candidate_id: str, question: str, user_answer: str):
    """Store question and answer in database"""
    conn = get_connection()
    cursor = conn.cursor()
    
    try:
        cursor.execute("""
            INSERT INTO previous_questions 
            (candidate_id, question, user_answer, asked_at)
            VALUES (%s, %s, %s, NOW())
        """, (candidate_id, question, user_answer))
        
        conn.commit()
    finally:
        cursor.close()
        conn.close()



@app.get("/candidate/{candidate_id}/topics")
async def get_candidate_topics(candidate_id: str):
    """Get available topics for a candidate"""
    try:
        topics = load_topics(candidate_id)
        return {"topics": topics}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/candidate/{candidate_id}/questions")
async def get_candidate_questions(candidate_id: str):
    """Get previous questions for a candidate"""
    try:
        questions = get_previous_questions(candidate_id)
        return {"questions": questions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)