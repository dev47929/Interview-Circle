# api/ai_route.py

import asyncio
from app.auth.deps import get_current_user
from fastapi import APIRouter, Depends
from app.schemas.models import AIRequest
from app.schemas.set_ai_02 import AIRequest
from app.ai.memory_store import get_history, add_message
from app.ai.prompt import SYSTEM_PROMPT_02
from app.ai.cv import build_cv_summary
from app.ai.llm.core import groq_call



router = APIRouter(prefix="/ai", tags=["AI"])
@router.post("/interview")
def ai_execute(req: AIRequest, user: str = Depends(get_current_user)):
    uid = user["id"]

    history = get_history(uid)
    msg  = [
        {"role": "system", "content": SYSTEM_PROMPT_02},
        {"role": "user", "content": build_cv_summary(uid)},
        *history,
        {"role": "user", "content": req.message}
    ]
    reply = asyncio.run(groq_call(msg))
    print("CV Analysis : ", reply)
    add_message(uid, "user", req.message)
    add_message(uid, "assistant", reply)

    return reply 

