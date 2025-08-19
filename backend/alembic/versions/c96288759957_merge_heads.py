"""merge heads

Revision ID: c96288759957
Revises: f1271305f9b9, e1f841d90772
Create Date: 2025-08-19 12:00:45.235348

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c96288759957'
down_revision: Union[str, Sequence[str], None] = ('f1271305f9b9', 'e1f841d90772')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
