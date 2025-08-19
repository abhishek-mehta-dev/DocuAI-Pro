import os
import requests
from datetime import datetime
from app.core.config import settings
from sqlmodel import Session
from app.db.models.payment import Payment
import json


PAYPAL_CLIENT_ID = settings.PAYPAL_CLIENT_ID
PAYPAL_SECRET = settings.PAYPAL_SECRET
PAYPAL_BASE_URL = "https://api-m.sandbox.paypal.com"



def get_paypal_access_token() -> str:
    url = f"{PAYPAL_BASE_URL}/v1/oauth2/token"
    res = requests.post(
        url,
        auth=(PAYPAL_CLIENT_ID, PAYPAL_SECRET),
        headers={"Accept": "application/json", "Accept-Language": "en_US"},
        data={"grant_type": "client_credentials"},
    )
    res.raise_for_status()
    return res.json()["access_token"]


def create_payment_intent(db: Session, user_id: int, plan_id: int, subscription_id: int, amount: float, currency: str) -> str:
    access_token = get_paypal_access_token()
    url = f"{PAYPAL_BASE_URL}/v2/checkout/orders"

    payload = {
        "intent": "CAPTURE",
        "purchase_units": [{"amount": {"currency_code": currency, "value": f"{amount:.2f}"}}]
    }
    headers = {"Content-Type": "application/json", "Authorization": f"Bearer {access_token}"}
    res = requests.post(url, headers=headers, json=payload)
    res.raise_for_status()
    order = res.json()

    payment = Payment(
        user_id=user_id,
        plan_id=plan_id,
        subscription_id=subscription_id,
        provider="paypal",
        provider_payment_id=order["id"],
        amount=amount,
        currency=currency,
        status="PENDING",
        raw_response=json.dumps(order),  # <-- Change here
    )
    db.add(payment)
    db.commit()
    db.refresh(payment)
    return order["id"]


def capture_payment(db: Session, order_id: str):
    access_token = get_paypal_access_token()
    url = f"{PAYPAL_BASE_URL}/v2/checkout/orders/{order_id}/capture"

    headers = {"Content-Type": "application/json", "Authorization": f"Bearer {access_token}"}
    res = requests.post(url, headers=headers)
    res.raise_for_status()
    capture_data = res.json()

    payment = db.query(Payment).filter(Payment.provider_payment_id == order_id).first()
    if not payment:
        return None

    payment.status = capture_data.get("status", payment.status)
    payment.provider_payer_id = capture_data.get("payer", {}).get("payer_id")
    payment.raw_response = json.dumps(capture_data)  # <-- Change here
    payment.updated_at = datetime.utcnow()

    db.add(payment)
    db.commit()
    db.refresh(payment)
    return payment