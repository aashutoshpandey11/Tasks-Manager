from sqlalchemy import Column, Interger, String, Boolean
from app.core.database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Interger, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    completed = Column(Boolean, default=False)