import speech_recognition as sr # type: ignore
from datetime import timedelta
import os, sys
from pathlib import Path
def getname():
    count = 0
    while os.path.exists(f"answer{count}.txt"):
        count += 1
    return f"answer{count}.txt"

def transcribe_audio(audio_file):
    recognizer = sr.Recognizer()

    with sr.AudioFile(audio_file) as source:
       
        audio = recognizer.record(source)
    
    try:
        text = recognizer.recognize_google(audio)
        print(text)
        BASE_DIR = Path(__file__).parent  
        output_dir = os.path.join(os.path.dirname(f'{BASE_DIR}\Doc\answers'))
        os.makedirs(output_dir, exist_ok=True)
        filepath = os.path.join(output_dir, getname())

        with open(filepath, "w") as f:
            if isinstance(text, str):
                f.write(text)
         
        import wave
        with wave.open(audio_file, 'r') as f:
            frames = f.getnframes()
            rate = f.getframerate()
            duration = frames / float(rate)

        h, m, s = int(duration//3600), int((duration%3600)//60), int(duration%60)
        print(f"\n  Total Duration: {h:02d}:{m:02d}:{s:02d}")

    except sr.UnknownValueError:
        print("  Could not understand audio.")
    except sr.RequestError as e:
        print(f"  Google API error: {e}")
