from sqlalchemy.orm import Session
from app.models.task import Task
from app.schemas.task import TaskCreate

def create_task(db: Session, task: TaskCreate):
    db_task = Task(**task.dict())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def get_tasks(db: Session):
    return db.query(Task).all()

def delete_task(db: Session, task_id: int):
    task = db.query(Task).filter(Task.id == task_id).first()
    if task:
        db.delete(task)
        db.commit()
    return task

def update_task(db: Session, task_id: int, updated_task: TaskCreate):
    task = db.query(Task).filter(Task.id == task_id).first()
    if task:
        for key, value in updated_task.dict().items():
            setattr(task, key, value)
        db.commit()
        db.refresh(task)
    return task