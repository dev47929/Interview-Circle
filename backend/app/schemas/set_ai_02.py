from pydantic import BaseModel
from typing import List, Dict


class AIRequest(BaseModel):
    message: str
    interview_id: int


class InterviewCreate(BaseModel):
    difficulty: str
    position: str
    type: str
    company: str
    cv: str