from fastapi import APIRouter, Depends, status
from sqlmodel import Session
from app.db.session import get_session
from app.schemas.payment import PaymentCreate
from app.services.payment_service import create_payment_intent, capture_payment
from app.utils.response_helpers import success_response
from app.dependencies.auth import get_current_user

router = APIRouter(prefix="/payment", tags=["Payments"])


@router.post("/create")
def create_payment(payload: PaymentCreate, db: Session = Depends(get_session),current_user=Depends(get_current_user)):
    order_id = create_payment_intent(
        db=db,
        user_id=payload.user_id,
        plan_id=payload.plan_id,
        subscription_id=payload.subscription_id,
        amount=payload.amount,
        currency=payload.currency
    )
    return success_response(
        data={"orderId": order_id},
        message="Payment intent created",
        status_code=status.HTTP_201_CREATED
    )


@router.post("/verify/{order_id}")
def verify_payment(order_id: str, db: Session = Depends(get_session),current_user=Depends(get_current_user)):
    payment = capture_payment(db, order_id)
    return success_response(
        data=payment,
        message="Payment captured successfully",
        status_code=status.HTTP_200_OK
    )
