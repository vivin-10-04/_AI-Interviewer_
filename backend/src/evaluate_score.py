from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain.agents import create_agent
import json
from groq import Groq
from dotenv import load_dotenv
import os
import re
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
from script.get_data import get_previous_questions, get_question_id
from script.insert_response import insert_score, insert_answer
from fastapi import FastAPI
app = FastAPI()
@app.post("/eval-score")
async def evalandscore(candidate_id, session_id, question, answer, evalcriteria):
    
    llm = ChatGroq(
        groq_api_key=GROQ_API_KEY,
        model_name="llama-3.3-70b-versatile",
        temperature=0.7
    )

    prompt = ChatPromptTemplate.from_messages([
        ("system", """Evaluate the answer on the question {ques} given by the interviewee that is {answer}. 
Score this answer numerically in decimals out of 10 on the basis of the metric defined as {metrics}.
Respond ONLY in this exact JSON format with no explanation:
{{
  "score": 0.0,
  "feedback": "string"
}}""")
    ])

    chain = prompt | llm | JsonOutputParser()
    result = chain.invoke({"ques": question, "answer": answer, "metrics": evalcriteria})
 
    if isinstance(result, str):
        result = result.strip()
        if result.startswith("```"):
            result = re.sub(r"```(?:json)?", "", result).strip().strip("```").strip()
        try:
            result = json.loads(result)
        except json.JSONDecodeError:
            print("Could not parse JSON")
            return None
 
    question_id = get_question_id(candidate_id, question)
 
    insert_answer(
        candidate_id=candidate_id,
        question_id=question_id,
        session_id=session_id,
        answer_text=answer,
        score=result["score"],
        feedback=result["feedback"]
    )
 
    insert_score(
        candidate_id=candidate_id,
        session_id=session_id,
        question_id=question_id,
        score=result["score"]
    )

    print(f"Score: {result['score']} | Feedback: {result['feedback']}")
    return result
