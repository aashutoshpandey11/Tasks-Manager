from sqlalchemy import Column, Integer, String, Boolean
from app.core.database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    status = Column(String, default="Pending")
    priority = Column(String, default="Medium")
    dueDate = Column(String, nullable=True)