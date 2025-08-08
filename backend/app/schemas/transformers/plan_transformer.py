from ..plans import PlanRead
from typing import List, Union
from app.db.models.plans import Plans
def convert_plan_for_api(plan: Union[PlanRead, Plans]) -> dict:
    """Transform a single plan object into API-friendly format."""
    return {
        "id": plan.id,
        "title": plan.plan_title.value,
        "period": plan.plan_period.value,
        "amount": plan.plan_amount,
        "freeTrialDays": plan.free_trial_days,
        "limits": {
            "pdfUpload": plan.pdf_upload_limit,
            "questions": plan.question_limit,
        },
        "aiResponseType": plan.ai_response_type.value,
        "features": {
            "chatHistory": plan.chat_history,
            "prioritySupport": plan.priority_support,
        }
    }


def convert_plans_for_api(plans: List[Union[PlanRead, Plans]]) -> List[dict]:
    """Transform a list of plan objects into API-friendly format."""
    return [convert_plan_for_api(plan) for plan in plans]