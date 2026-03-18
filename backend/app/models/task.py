from sqlalchemy import Column, Integer, String, Date
from app.core.database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    status = Column(String)
    priority = Column(String)
    dueDate = Column(Date, nullable=True)