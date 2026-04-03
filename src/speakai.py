import pyttsx3
import speech_recognition as sr
import datetime
import pywhatkit as kit
import wikipedia as wiki
import webbrowser as wb
import cv2 

from .audiotranscribe import transcribe_audio as tsa
r = sr.Recognizer()
def speech_to_text():
    with sr.Microphone() as source:
        print("Listening...")
        r.pause_threshold=1
        audio = r.listen(source)

    try:
        print("Recognizing..")
        query= r.recognize_google(audio, language = 'en-in')

    except Exception as e:
        print(e)
        print("I couldnt get that")
        return "None"

    return query

def text_to_speech(text):
    engine = pyttsx3.init()
    engine.setProperty('rate',200)
    voices= engine.getProperty('voices')
    engine.setProperty('voice',voices[0].id)
    engine.say(text)
    engine.runAndWait()
    print(text)

def greet():
    date = datetime.datetime.now()
    date1 = date.strftime("%d/%m/%Y")
    time = date.strftime(' %H:%M:%S')
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    def current_date():
        text_to_speech(f'{date.strftime("%d")} {months[int(date.strftime("%m"))]},{date.strftime("%Y")}')
    def current_time():
        text_to_speech( date.strftime(' %H:%M:%S'))
    if(int(time[0:2])< 12):
        greeting = "good morning"
    elif(12>=int(time[0:2])>4):
        greeting = "good afternoon"
    else:
        greeting = "good evening"
    
    text_to_speech(f'{greeting} I am Vivin your Interviewer for today. Try to relax and answer my questions calmly and at your own pace. Before we deep dive into your interview i will explain you the flow. we will start with your resume then move forward to CS fundamentals and lastly solve a coding question. So lets start with a short and brief introduction about you')

        