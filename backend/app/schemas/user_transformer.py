from typing import List
from app.db.models.user import User
from app.enums.user_type import UserType
from sqlalchemy.orm.relationships import RelationshipProperty
from sqlmodel import SQLModel

def convert_user_for_api(user: User, token: str = None) -> dict:
    """
    Transform user model to API response format.
    Excludes sensitive information like passwords.
    """
    transformed = {
        "id": user.id,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "full_name": f"{user.first_name} {user.last_name}",
        "email": str(user.email),
        "username": user.username,
        "user_type": user.user_type,
        "auth_provider": user.auth_provider,
        # Removed sensitive fields: password, confirm_password
        "reset_password_expires": user.reset_password_expires,
        "paypal_customer_id": user.paypal_customer_id,
        "paypal_payment_method_id": user.paypal_payment_method_id,
        "google_id": user.google_id,
    }
    
    # Only include reset_password_code if it exists (and maybe only for specific contexts)
    if hasattr(user, 'reset_password_code') and user.reset_password_code:
        transformed["reset_password_code"] = str(user.reset_password_code)
    
    # Only add token if provided (for login responses)
    if token is not None:
        transformed["token"] = token
    
    # Only serialize subscriptions if it's an actual list (loaded from DB)
    if isinstance(getattr(user, "subscriptions", None), list):
        transformed["subscriptions"] = [
            {
                "id": sub.id,
                "user_id": sub.user_id,
                "status": sub.status,
                "plan_id": sub.plan_id,
                "plan_choice_id": sub.plan_choice_id,
                "next_payment_date": sub.next_payment_date,
                "used_free_trial": sub.used_free_trial,
                "expired_at": sub.expired_at,
                "is_renew_cancelled": sub.is_renew_cancelled,
            }
            for sub in user.subscriptions
        ]

    return transformed