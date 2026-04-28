from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
import json
from dotenv import load_dotenv
from speakai import text_to_speech
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from script.get_data import resume_content
from script.insert_response import insert_question
from config.DB_config import get_connection , get_engine

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def load_answer():
    filepath = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'Doc', 'answer.txt')
    
    if not os.path.exists(filepath):
        print("No topic file found. Run audiotranscribe.py first.")
        return None
    
    with open(filepath, "r") as f:
        content = f.read()
    
    try:
        text = json.loads(content)
    except json.JSONDecodeError:
        text = content   
    
    return text

def load_topics():
    filepath = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'Doc', 'resume topic.txt')
    
    if not os.path.exists(filepath):
        print("No topic file found. Run resumetopicextractions.py first.")
        return None
    
    with open(filepath, "r") as f:
        content = f.read()
    
    try:
        topics = json.loads(content)
    except json.JSONDecodeError:
        topics = content   
    
    return topics

def get_name():
    count = 0
    while os.path.exists(f"prevq{count}.txt"):
        count += 1
    return f"prevq{count}.txt"




def get_previous_questions(candidate_id):
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

    return [
        {"question": row[0], "topic": row[1], "question_type": row[2]}
        for row in rows
    ]
from fastapi import FastAPI
app = FastAPI()
@app.get("/get-question")
async def generate_question(candidate_id, session_id, inputtext, topic):
    prevques = get_previous_questions(candidate_id)

    llm = ChatGroq(
        groq_api_key=GROQ_API_KEY,
        model_name="llama-3.3-70b-versatile",
        temperature=0.7
    )

    prompt = ChatPromptTemplate.from_messages([
    ("system", """Curate a new question different taking the {prevques} into consideration and evaluate understanding of various {topic}. 
If you have already asked about one topic according to prev questions then shift to another one. 
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

