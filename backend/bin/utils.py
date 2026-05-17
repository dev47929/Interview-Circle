import re , json , fitz

from pathlib import Path
from fastapi import UploadFile
import shutil


def save_cv_pdf(pdf: UploadFile, user_id: int, label: str):
    
    # create directory
    folder = Path(f"data/{user_id}")
    folder.mkdir(parents=True, exist_ok=True)

    # sanitize label
    safe_label = label.strip().replace(" ", "_").lower()

    # final path
    file_path = folder / f"cv_{safe_label}.pdf"

    # save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(pdf.file, buffer)

    return str(file_path)


def read_pdf(file_path):
    doc = fitz.open(file_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text


def to_dict(obj):
    return {
        column.name: getattr(obj, column.name)
        for column in obj.__table__.columns
    }

def to_dict_list(obj_list):
    return [to_dict(obj) for obj in obj_list]


def read_file(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            content = file.read()
        return content
    except Exception as e:
        return f"Error reading file: {e}"


def extract_json_regex(text):
    try:
        match = re.search(r'\{.*\}', text, re.DOTALL)
        if match:
            return match.group(0)
        return None
    except Exception as e:
        return f"Error: {e}"


def extract_json(text):
    try:
        # Find first { and last }
        start = text.find("{")
        end = text.rfind("}") + 1

        if start == -1 or end == -1:
            return None  # No JSON found

        json_str = text[start:end]
        return json_str

    except Exception as e:
        return f"Error: {e}"


def get_valid_json(text):
    json_str = extract_json(text)
    try:
        return json.loads(json_str)
    except:
        return None


def parse_gemini_response(response):
    try:
        # Step 1: extract text
        text = response.candidates[0].content.parts[0].text

        # Step 2: clean markdown if present
        text = text.strip()
        if text.startswith("```"):
            text = text.replace("```json", "").replace("```", "").strip()

        # Step 3: convert to dict
        data = json.loads(text)

        return data

    except Exception as e:
        print("❌ Parse error:", e)
        return None