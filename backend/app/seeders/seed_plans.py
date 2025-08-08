from sqlmodel import Session, select
from app.db.session import engine
from app.db.models.plans import Plans, PlanTitle, PlanPeriod, AIResponseType


def get_plan_seed_data():
    """Default plan data for seeding."""
    return [
        Plans(
            plan_title=PlanTitle.STANDARD,
            plan_period=PlanPeriod.MONTHLY,
            plan_amount=9.99,
            free_trial_days=7,
            pdf_upload_limit=5,
            question_limit=50,
            ai_response_type=AIResponseType.BASIC,
            chat_history=False,
            priority_support=False
        ),
        Plans(
            plan_title=PlanTitle.STANDARD,
            plan_period=PlanPeriod.YEARLY,
            plan_amount=99.99,
            free_trial_days=7,
            pdf_upload_limit=5,
            question_limit=50,
            ai_response_type=AIResponseType.BASIC,
            chat_history=False,
            priority_support=False
        ),
        Plans(
            plan_title=PlanTitle.PRO,
            plan_period=PlanPeriod.MONTHLY,
            plan_amount=19.99,
            free_trial_days=7,
            pdf_upload_limit=None,
            question_limit=None,
            ai_response_type=AIResponseType.ADVANCED,
            chat_history=True,
            priority_support=True
        ),
        Plans(
            plan_title=PlanTitle.PRO,
            plan_period=PlanPeriod.YEARLY,
            plan_amount=199.99,
            free_trial_days=7,
            pdf_upload_limit=None,
            question_limit=None,
            ai_response_type=AIResponseType.ADVANCED,
            chat_history=True,
            priority_support=True
        ),
    ]


def seed_plans():
    """Insert default plans into the database if missing."""
    seed_data = get_plan_seed_data()

    with Session(engine) as session:
        for plan in seed_data:
            exists = session.exec(
                select(Plans).where(
                    Plans.plan_title == plan.plan_title,
                    Plans.plan_period == plan.plan_period
                )
            ).first()

            if not exists:
                session.add(plan)

        session.commit()

    print("✅ Plans seeded successfully.")


if __name__ == "__main__":
    seed_plans()
