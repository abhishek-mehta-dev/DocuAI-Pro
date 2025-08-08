# Import all models here so Alembic can detect them for migrations

from app.db.models.user import User  # Import your models here
from app.db.models.subscription import Subscription
from app.db.models.plans import Plans
