from fastapi import APIRouter, Depends, status, Response,Request,Body
from sqlmodel import Session
from app.schemas.user import UserCreate, User_Login,User
from app.db.session import get_session
from app.services.user_service import register as register_user, login,logout
from app.schemas.user_transformer import convert_user_for_api
from app.utils.response_helpers import success_response
from app.dependencies.auth import get_current_user
from app.core.config import settings
from app.core.security import get_cookie_settings
from fastapi.responses import JSONResponse
from app.services.google_auth_service import handle_google_login
from app.core.security import create_access_token


router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_session)):
    new_user = register_user(user, db)
    return success_response(
        data=convert_user_for_api(new_user),
        message="User registered successfully",
        status_code=status.HTTP_201_CREATED
    )

@router.post("/login")
def login_route(user: User_Login, db: Session = Depends(get_session)):
    result = login(user, db)

    cookie_settings = get_cookie_settings(is_production=False)

    # Build response directly
    json_response = JSONResponse(
        status_code=200,
        content={
            "data": convert_user_for_api(result["user"], result["token"]),
            "message": "User logged in successfully",
            "status_code": 200,
        }
    )

    json_response.set_cookie(
        key="access_token",
        value=result["token"],
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        **cookie_settings
    )

    return json_response


@router.post("/google-login")
def google_login_route(
    request: Request,
    response: Response,
    token_data: dict = Body(...),
    db: Session = Depends(get_session)
):
    login_result = handle_google_login(token_data, db)

    token = login_result["access_token"]
    user = login_result["user"]

    # Set the access token as HTTP-only cookie
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=True,  # Set to False in local development if not using HTTPS
        samesite="Lax",  # "Strict" or "None" depending on cross-origin behavior
        max_age=60 * 60 * 24 * 7,  # 7 days
        path="/"
    )

    # Optional: Return user info to frontend
    return {
        "message": "Google login successful",
        "user": {
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name
        }
    }

@router.get("/profile")
def get_me(current_user=Depends(get_current_user)):
    print(current_user,"[user]")
    return success_response(
        data=convert_user_for_api(current_user),
        message="Fetched current user",
        status_code=status.HTTP_200_OK
    )


@router.post("/logout")
def logout_route(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_session)
):
    logout(user, db)

    cookie_settings = get_cookie_settings(is_production=False)

    response = JSONResponse(
        content={
            "data": None,
            "message": "User logged out successfully",
            "status_code": status.HTTP_200_OK
        },
        status_code=status.HTTP_200_OK
    )

    # Delete the cookie properly
    response.delete_cookie(
        key="access_token",
        **cookie_settings
    )

    return response
