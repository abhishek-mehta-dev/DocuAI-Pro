from typing import Union, List
from app.db.models.payment import Payment
from datetime import datetime

def convert_payment_for_api(payment: Union[Payment, dict]) -> dict:
    """Transform a single payment object into API-friendly format."""
    if payment is None:
        return None

    # If payment is already a dict (e.g., from raw query), access keys directly
    get_attr = lambda attr: getattr(payment, attr) if not isinstance(payment, dict) else payment.get(attr)

    return {
        "id": get_attr("id"),
        "providerPaymentId": get_attr("provider_payment_id"),
        "status": get_attr("status"),
        "providerPayerId": get_attr("provider_payer_id"),
        "amount": get_attr("amount"),
        "rawResponse": get_attr("raw_response"),
        "createdAt": get_attr("created_at").isoformat() if get_attr("created_at") else None,
        "updatedAt": get_attr("updated_at").isoformat() if get_attr("updated_at") else None,
    }


def convert_payments_for_api(payments: List[Union[Payment, dict]]) -> List[dict]:
    """Transform a list of payment objects into API-friendly format."""
    return [convert_payment_for_api(payment) for payment in payments]
