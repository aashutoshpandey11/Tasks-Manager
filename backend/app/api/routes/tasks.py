from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.schemas.task import TaskCreate, TaskResponse
from app.crud import task as task_crud

router = APIRouter()

# DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CREATE
@router.post("/", response_model=TaskResponse)
def create(task: TaskCreate, db: Session = Depends(get_db)):
    return task_crud.create_task(db, task)

# GET ALL
@router.get("/", response_model=list[TaskResponse])
def get_all(db: Session = Depends(get_db)):
    return task_crud.get_tasks(db)

# DELETE
@router.delete("/{task_id}", response_model=TaskResponse)
def delete(task_id: int, db: Session = Depends(get_db)):
    return task_crud.delete_task(db, task_id)

# UPDATE
@router.put("/{task_id}", response_model=TaskResponse)
def update(task_id: int, task: TaskCreate, db: Session = Depends(get_db)):
    return task_crud.update_task(db, task_id, task)