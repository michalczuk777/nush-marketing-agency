"""initial meta publisher schema"""
from alembic import op
import sqlalchemy as sa
revision='0001_initial'; down_revision=None; branch_labels=None; depends_on=None
def upgrade():
    # Runtime metadata creation keeps the first local start simple; Alembic remains available for subsequent changes.
    pass
def downgrade(): pass
