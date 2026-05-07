# api/ai_route.py

import asyncio
from app.auth.deps import get_current_user
from fastapi import APIRouter, Depends , HTTPException
from app.schemas.set_ai_02 import AIRequest ,InterviewCreate
from app.ai.memory_store import get_history, add_message
from app.ai.prompt import SYSTEM_PROMPT_02
from app.ai.cv import build_cv_summary
from app.ai.llm.core import groq_call
from app.ai.context import context_prompt_01
from app.database.inter import create_interview



router = APIRouter(prefix="/ai", tags=["AI"])
@router.post("/interview")
def ai_execute(req: AIRequest, user: str = Depends(get_current_user)):
    uid = user["id"]
    context , cv = context_prompt_01(req.interview_id)
    
    history = get_history(uid)
    msg  = [
        {"role": "system", "content": context},
        {"role": "user", "content": build_cv_summary(uid)},
        *history,
        {"role": "user", "content": req.message}
    ]
    reply = asyncio.run(groq_call(msg))
    print("CV Analysis : ", reply)
    add_message(uid, "user", req.message)
    add_message(uid, "assistant", reply)

    return reply 

@router.post("/create")
def create_interview_route(
    data: InterviewCreate,
    user: dict = Depends(get_current_user)
):
    try:
        interview = create_interview(
            user_id=user["id"],
            difficulty=data.difficulty,
            position=data.position,
            type=data.type,
            company=data.company,
            cv=data.cv
        )

        return {
            "message": "Interview created successfully",
            "interview_id": interview.id
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))