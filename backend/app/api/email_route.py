from fastapi import APIRouter, Form , HTTPException
from app.ai.llm.core import groq_call
from app.schemas.set_ai_02 import EmailRequest

from app.control.mail import send_email

router = APIRouter(prefix="/email", tags=["Email"])


@router.post("/send")
def send_email_route(data: EmailRequest):
    try:
        subject = "Weekly Mock Interview Report"

        body = f"""
Hello,

Please find attached your weekly mock interview report.

This report includes:
- Interview sessions conducted this week
- Candidate performance analysis
- Strengths and improvement areas
- AI feedback summaries
- Overall interview insights and progress tracking

Use this report to monitor performance and improve interview readiness.

Regards,
Team Codesena
"""

        success = send_email(
            subject=subject,
            body=body,
            to_email=data.to
        )

        if not success:
            raise Exception("Failed to send email")

        return {
            "success": True,
            "message": f"Weekly report sent successfully to {data.to}"
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Email sending failed: {str(e)}"
        )