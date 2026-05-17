# api/ai_route.py

import asyncio
from app.auth.deps import get_current_user
from fastapi import APIRouter, Depends , HTTPException ,File , UploadFile , Form
from app.schemas.set_ai_02 import AIRequest ,InterviewCreate 
from app.ai.memory_store import get_history, add_message
from app.ai.cv import build_cv_summary
from app.ai.llm.core import groq_call
from app.ai.context import context_prompt_02
from app.database.inter import create_interview
from app.ai.cv import analysis_cv
from bin.utils import save_cv_pdf
from app.auth.deps import get_current_user
from app.ai.prompt import SYSTEM_PROMPT_04
from app.ai.llm.core import groq_call



router = APIRouter(prefix="/ai", tags=["AI"])
@router.post("/interview")
def ai_execute(req: AIRequest):
    uid = 1
    context , cv = context_prompt_02(1)
    
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

    return {"reply": reply }

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

@router.post("/cv-analysis")
async def cv_analysis_route(
    pdf: UploadFile = File(...),
    job_desc: str = Form(...),
    label: str = Form("v1"),
    user: dict = Depends(get_current_user)
):

    # validate pdf
    if pdf.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
        )

    # save uploaded cv
    save_cv_pdf(
        pdf=pdf,
        user_id=user["id"],
        label=label
    )

    # run ai analysis
    cv_analysis = await analysis_cv(
        user["id"],
        job_desc,
        label
    )

    return {
        "analysis": cv_analysis
    }

@router.post("/code-review")
async def code_review_route(
    question: str = Form(...),
    code: str = Form(...),
):

    messages = [
        {
            "role": "system",
            "content": SYSTEM_PROMPT_04
        },
        {
            "role": "user",
            "content": f"""
Question:
{question}

Candidate Code:
{code}
"""
        }
    ]

    review = await groq_call(
        messages=messages,
        model="qwen/qwen3-32b"
    )

    return {
        "review": review
    }

@router.post("/")
async def load_route(data : AIRequest):
    msg = [{"role": "user", "content": data.message}]
    review = await groq_call(
        messages=msg,
        model="llama-3.3-70b-versatile")
    return {"response": review }