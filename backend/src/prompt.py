from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
import json
from dotenv import load_dotenv
from speakai import text_to_speech
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from script.get_data import resume_content , laod_answer , load_topics
from script.insert_response import insert_question
from config.DB_config import get_connection , get_engine

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def get_available_topics(candidate_id):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT question, topic, question_type
        FROM previous_questions
        WHERE candidate_id = %s
        ORDER BY asked_at ASC
    """, (candidate_id,)) 

    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    all_topics = load_topics(candidate_id)
    
    # Get set of previously asked topics
    asked_topics = {row[1] for row in rows}
    
    # Filter out asked topics
    available_topics = [
        topic for topic in all_topics 
        if topic[0] not in asked_topics  # topic[0] is the topic name
    ]
    
    # Format previous questions
    previous_questions = [
        {"question": row[0], "topic": row[1], "question_type": row[2]}
        for row in rows
    ]
    
    return {
        "previous_questions": previous_questions,
        "available_topics": available_topics
    }

from fastapi import FastAPI
app = FastAPI()
@app.get("/get-question")
async def generate_question(candidate_id, session_id, inputtext, topic):
    new_topics = get_available_topics(candidate_id)

    llm = ChatGroq(
        groq_api_key=GROQ_API_KEY,
        model_name="llama-3.3-70b-versatile",
        temperature=0.7
    )

    prompt = ChatPromptTemplate.from_messages([
    ("system", """Curate a new question different taking the {new_topics} into consideration and evaluate understanding of these various topics. 
     Create questions in a higher level difficulty and not general basic questions focus more on niche subtopics. 
Respond ONLY in this exact JSON format with no explanation:
{{
  "question": "string",
  "topic": "string",
  "question_type": "conceptual|practical|coding"
}}"""),
    ("human", "{inputtext}")
])
    chain = prompt | llm | JsonOutputParser()
    result = chain.invoke({"inputtext": inputtext, "prevques": prevques, "topic": topic})

    try:
        insert_question(
            candidate_id=candidate_id,
            session_id=session_id,
            question=result["question"],       
            topic=result["topic"],              
            question_type=result["question_type"]   
        )
        text_to_speech(result["question"])
    except KeyError as e:
        print(f"LLM response missing field: {e}")
        print(f"Raw result: {result}")

    return result

