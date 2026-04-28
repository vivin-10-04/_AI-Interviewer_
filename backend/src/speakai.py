import pyttsx3
import speech_recognition as sr
import datetime
import pywhatkit as kit
import wikipedia as wiki
import webbrowser as wb
import cv2
import os
import base64
import tempfile
from dotenv import load_dotenv
from sarvamai import SarvamAI
from audiotranscribe import transcribe_audio as tsa

load_dotenv()
SARVAM_API_KEY = os.getenv("SARVAM_API_KEY")

r = sr.Recognizer()

def speech_to_text():
    with sr.Microphone() as source:
        print("Listening...")
        r.pause_threshold = 1
        audio = r.listen(source)

    try:
        print("Recognizing...")
        query = r.recognize_google(audio, language='en-in')
    except Exception as e:
        print(e)
        print("I couldn't get that")
        return "None"

    return query
from fastapi import FastAPI
app = FastAPI()
@app.post("/speak")
async def text_to_speech(text , filename ="test"):
    client = SarvamAI(api_subscription_key=SARVAM_API_KEY)

    response = client.text_to_speech.convert(
        text=text,
        target_language_code="en-IN",
        speaker="amit",
        pace=1.1,
        speech_sample_rate=22050,
        enable_preprocessing=True,
        model="bulbul:v3"
    )
    audio_chunks = response.audios  # list of base64 strings

    # Decode and combine all chunks
    audio_bytes = b"".join(base64.b64decode(chunk) for chunk in audio_chunks)

    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    output_path = os.path.join(base_dir, "responses", filename)

    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    with open(output_path, "wb") as f:
            f.write(audio_bytes)

        # Play directly from saved file — no temp file needed
    # pygame.mixer.init(frequency=22050)
    # pygame.mixer.music.load(output_path)
    # pygame.mixer.music.play()

    # while pygame.mixer.music.get_busy():
    #         pygame.time.Clock().tick(10)

    # pygame.mixer.quit()

@app.get("/greetings")
async def greet():
    now = datetime.datetime.now()
    hour = now.hour

    if hour < 12:
        greeting = "good morning"
    elif 12 <= hour < 17:
        greeting = "good afternoon"
    else:
        greeting = "good evening"

    text_to_speech(
        f"{greeting}, I am Vivin your Interviewer for today. "
        "Try to relax and answer my questions calmly and at your own pace. "
        "Before we deep dive into your interview I will explain you the flow. "
        "We will start with your resume, then move forward to CS fundamentals, "
        "and lastly solve a coding question. "
        "So lets start with a short and brief introduction about yourself."
    )


greet()