from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.schemas.task import TaskCreate, TaskResponse
from app.crud import task as task_crud

router = APIRouter()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=TaskResponse)
def create(task: TaskCreate, db: Session = Depends(get_db)):
    return task_crud.create_task(db, task)

@router.get("/")
def get_all(db: Session = Depends(get_db)):
    return task_crud.get_tasks(db)