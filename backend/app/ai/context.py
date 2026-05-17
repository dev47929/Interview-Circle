

from bin.utils import to_dict
from app.database.inter import get_interview
from app.ai.prompt import SYSTEM_PROMPT_02

def context_prompt_02(interview_id: int = 1):
    interview = to_dict(get_interview(interview_id))

    context = f"""
Interview Details:
- Difficulty: {interview.get("difficulty")}
- Position: {interview.get("position")}
- Type: {interview.get("type")}
- Company: {interview.get("company")}
"""
    return SYSTEM_PROMPT_02 + "\n\n" + context , interview.get("cv")
