
import asyncio
from app.ai.llm.core import groq_call
from app.ai.prompt import SYSTEM_PROMPT_01 , SYSTEM_PROMPT_03
from bin.utils import read_pdf


def build_cv_summary(id, label = "v1"):
    cv_path = f"data/{id}/cv_{label}_cv.pdf"
    text = read_pdf(file_path=cv_path)
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT_01},
        {"role": "user", "content": text},
        {"role": "user", "content": ""}
    ]

    response = asyncio.run(groq_call(messages))
    return response

def analysis_cv(id, label = "v1"):
    cv_path = f"data/{id}/cv_{label}_cv.pdf"
    text = read_pdf(file_path=cv_path)
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT_03},
        {"role": "user", "content": text}
    ]

    response = asyncio.run(groq_call(messages=messages, model="qwen/qwen3-32b"))
    print("CV Analysis : ", response)
    return response

analysis_cv(1)