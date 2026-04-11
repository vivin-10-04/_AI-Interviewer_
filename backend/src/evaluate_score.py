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
 
def get_name():
    count = 0
    while os.path.exists(f"anseval{count}.txt"):
        count += 1
    return f"anseval{count}.txt"


def evalandscore(question , answer):
    prevq = "question"
    response = "answer"
    evalcriteria = "AI INTERVIEW\Doc\prompts\evaluation_criteria"

    llm = ChatGroq(
        groq_api_key=GROQ_API_KEY, 
        model_name="llama-3.3-70b-versatile", # Use a valid Groq model
        temperature=0.7
    )

    prompt = ChatPromptTemplate.from_messages([
        ("system","Evaluate the answer on the question {ques} given by the interviewee that is {answer}. Score this answer numerically in decimals out of 10 on the basis of the metric defined as {metrics}")
    ])

    chain = prompt | llm | JsonOutputParser()

    result = chain.invoke({"ques": prevq , "answer": response, "metrics": evalcriteria})
    
    result = result.strip()
    if result.startswith("```"):
        result = re.sub(r"```(?:json)?", "", result).strip().strip("```").strip()
    try:
        result1 = json.loads(result)
    except json.JSONDecodeError:
        print("Could not parse JSON, saving raw output.")
        result1 = result
    
    output_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'Doc\Evaluation')
    os.makedirs(output_dir, exist_ok=True)
    filepath = os.path.join(output_dir,get_name())

    with open(filepath, "w") as f:
        if isinstance(result1, str):
            f.write(result1)
        else:
            f.write(json.dumps(result1, indent=2))

    print(f"Saved to {filepath}")
    print(json.dumps(result1, indent=2) if not isinstance(result, str) else result)
    

