from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
import json
import os
from dotenv import load_dotenv
import os
from .speakai import text_to_speech

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


def next_ques(inputtext, prevques):
    topic = load_topics

    llm = ChatGroq(
        groq_api_key=GROQ_API_KEY, 
        model_name="llama-3.3-70b-versatile",  
        temperature=0.7
    )
    
   
    prompt = ChatPromptTemplate.from_messages([
        ("system", "Curate a new question different taking the {prevques} in to consideration and evaluate understanding of various {topic}. If you have already asked about one topic according to prev questions then shift to another one .Respond ONLY in JSON format."),
        ("human", "{inputtext}")
    ])

    chain = prompt | llm | JsonOutputParser()

   
    result = chain.invoke({"inputtext": inputtext, "prevques": prevques, "topic": topic})
    output_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'Doc\prevQues')
    os.makedirs(output_dir, exist_ok=True)
    filepath = os.path.join(output_dir,get_name())

    with open(filepath, "w") as f:
        if isinstance(result, str):
            f.write(result)
        else:
            f.write(json.dumps(result, indent=2))
    text_to_speech(json.dumps(result, indent=2))


