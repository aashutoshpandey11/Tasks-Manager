from pydantic import BaseModel, validator
from typing import Optional
from datetime import date

class TaskBase(BaseModel):
    title: str
    status: str
    priority: str
    dueDate: Optional[date] = None  # allow null

    # 🔥 Validator to convert empty string to None
    @validator('dueDate', pre=True)
    def empty_string_to_none(cls, v):
        if v == "":
            return None
        return v

class TaskCreate(TaskBase):
    pass

class TaskResponse(TaskBase):
    id: int

    class Config:
        orm_mode = True