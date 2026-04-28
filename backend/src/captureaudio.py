import sounddevice as sd # type: ignore
import soundfile as sf # type: ignore
import numpy as np # type: ignore
import keyboard # type: ignore
import os
import threading
from .speakai import greet
import cv2

# Global state
recording = False
audio_data = []
stream = None
stop_cam = threading.Event()

def get_next_filename():
    count = 1
    while os.path.exists(f"answer{count}.wav"):
        count += 1
    return f"answer{count}.wav"

def audio_callback(indata, frames, time, status):
    global audio_data, recording  # added
    if recording:
        audio_data.append(indata.copy())

def start_recording(SAMPLE_RATE, CHANNELS):
    global recording, audio_data, stream
    audio_data = []
    recording = True
    stream = sd.InputStream(samplerate=SAMPLE_RATE, channels=CHANNELS, callback=audio_callback)
    stream.start()
    print("Recording started... Press 'S' to stop.")

def stop_recording(SAMPLE_RATE):
    global recording, stream, audio_data
    recording = False
    if stream:
        stream.stop()
        stream.close()
        stream = None  # added: reset stream after closing
    if audio_data:
        output_file = get_next_filename()
        audio_array = np.concatenate(audio_data, axis=0)
        sf.write(output_file, audio_array, SAMPLE_RATE)
        print(f"Recording saved to '{output_file}'")
    else:
        print("No audio recorded.")

# def cam():
#     vid = cv2.VideoCapture(0)
#     if not vid.isOpened():
#         print("Error: Could not open camera")
#         return

#     while not stop_cam.is_set():
#         ret, frame = vid.read()
#         if not ret:
#             print("Error: Failed to capture frame")
#             break
#         cv2.imshow('Camera', frame)
#         cv2.waitKey(1)

#     vid.release()
#     cv2.destroyAllWindows()
from fastapi import FastAPI
app = FastAPI()
@app.post("/audio-capture")
async def capture_audio():
    global recording  # added
    SAMPLE_RATE = 44100
    CHANNELS = 1
    os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'audioans'))

    cam_thread = threading.Thread(target=cam, daemon=True)
    cam_thread.start()

    while True:
        print("Press 'R' to start recording, 'S' to stop, 'q' to quit.")
        if keyboard.is_pressed('r') and not recording:
            start_recording(SAMPLE_RATE, CHANNELS)
            while keyboard.is_pressed('r'):
                pass

        elif keyboard.is_pressed('s') and recording:
            stop_recording(SAMPLE_RATE)
            while keyboard.is_pressed('s'):
                pass

        elif keyboard.is_pressed('q'):
            stop_cam.set()
            cam_thread.join()
            print("Exiting.")
            break