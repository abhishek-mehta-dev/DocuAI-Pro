from fastapi import APIRouter,Depends,status
from sqlmodel import Session
from app.db.session import get_session
from app.dependencies.auth import get_current_user
from app.utils.response_helpers import success_response
from app.services.plan_service import get_all_plans
from app.schemas.transformers.plan_transformer import convert_plans_for_api
router = APIRouter(prefix="/plan", tags=["Plans"])

@router.get("/", response_model=list)
def get_plans(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_session)
):
    plans_data = get_all_plans(db)
    return success_response(
        data=convert_plans_for_api(plans_data),
        message="All Plans Fetched Successfully!",
        status_code=status.HTTP_200_OK
    )