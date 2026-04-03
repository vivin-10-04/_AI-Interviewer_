from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain.agents import create_agent
import json
from groq import Groq
from dotenv import load_dotenv
import os
from pathlib import Path
from src.audiotranscribe import transcribe_audio as tsa
from src.captureaudio import capture_audio as capa
from src.evaluate_score import evalandscore as eval
from src.prompt import next_ques
from src.resumetopicextractions import topic
from src.speakai import greet , text_to_speech 

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def get_latest_file(directory: str) -> Path | None:
    files = [f for f in Path(directory).iterdir() if f.is_file()]
    
    if not files:
        return None
    
    return str(max(files, key=lambda f: f.stat().st_mtime)) 


BASE_DIR = Path(__file__).parent  # points to "AI interview/"

if __name__ == "__main__":
    # greet()
    # capa()
    # tsa(get_latest_file(BASE_DIR / "audioans"))    
    # eval(get_latest_file(BASE_DIR / "Doc" / "prevQues"), get_latest_file(BASE_DIR / "Doc" / "answers"))                      # root level
    next_ques(get_latest_file(BASE_DIR / "Doc" / "answers"), "")
    capa()
    tsa(get_latest_file(BASE_DIR / "audioans"))    
    eval(get_latest_file(BASE_DIR / "Doc" / "prevQues"), get_latest_file(BASE_DIR / "Doc" / "answers"))
    