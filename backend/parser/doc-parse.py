import io
from docx import Document
from fastapi import FastAPI
from gemini.gemini import gemini_process
from script.insert_candidate import insert_candidate
app = FastAPI()

@app.post("/parse-resume")
async def parse_doc(self, file: bytes) -> str:
    try:
        doc = Document(io.BytesIO(file))
        data = "\n".join(
            paragraph.text for paragraph in doc.paragraphs
        )
        json_dict = gemini_process(content=data)
        return insert_candidate(json_dict)
    except Exception as error:
        raise RuntimeError(f"Error parsing Doc: {error}")