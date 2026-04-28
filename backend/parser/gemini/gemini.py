import json
import os
import re
from google import genai
from google.genai import types
from dotenv import load_dotenv

def __init__(self, api_key: str = None):
    load_dotenv()
    self.api_key = api_key or os.getenv("GEMINI_API_KEY")

def gemini_process(self, content: str) -> dict:
    try:
        result = []
        client = genai.Client(api_key=self.api_key)

        model = "gemini-2.5-flash-preview-04-17"
        contents = [
            types.Content(
                role="user",
                parts=[types.Part.from_text(text=content)],
            ),
        ]
        generate_content_config = types.GenerateContentConfig(
            thinking_config=types.ThinkingConfig(thinking_level="HIGH"),
            response_mime_type="application/json",
            system_instruction=[
                types.Part.from_text(read_text("backend/parser/gemini/geminiprompt.txt")),
            ],
        )

        for chunk in client.models.generate_content_stream(
            model=model,
            contents=contents,
            config=generate_content_config,
        ):
            if chunk.text:
                result.append(chunk.text)

        full_text = "".join(result)  # join list into a single string
        extracted = self._extract_json(full_text)
        return json.loads(extracted)  # return the parsed dict

    except Exception as error:
        raise RuntimeError(
            f"Failed to parse Resume data into JSON using Gemini AI. {error}"
        )

def _extract_json(self, text: str) -> str:
    match = re.search(r"```(?:json)?\s*([\s\S]*?)```", text)
    if match:
        return match.group(1).strip()
    return text.strip()


def read_text(path: str) -> str:
    with open(path, "r", encoding="utf-8") as f:
        return f.read()