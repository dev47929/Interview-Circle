from app.database.models import User, Interview
from app.database.db import SessionLocal

db = SessionLocal()

def create_interview(
    user_id: int,
    difficulty: str,
    position: str,
    type: str,
    company: str,
    cv: str
):
    db = SessionLocal()

    try:
        interview = Interview(
            user_id=user_id,
            difficulty=difficulty,
            position=position,
            type=type,
            company=company,
            cv=cv
        )

        db.add(interview)
        db.commit()
        db.refresh(interview)

        return interview

    finally:
        db.close()
    
def get_interview(interview_id: int):
    db = SessionLocal()
    interview = db.query(Interview).filter(Interview.id == interview_id).first()
    return interview