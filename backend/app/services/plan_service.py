from sqlalchemy.orm import Session
from sqlalchemy import select
from app.db.models.plans import Plans


def get_all_plans(db: Session):
    """Fetch all plans from the database."""
    return db.execute(select(Plans)).scalars().all()
