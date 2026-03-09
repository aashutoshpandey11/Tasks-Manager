from fastapi import FastAPI
from app.api.routes import tasks
from app.core.database import Base, engine

app = FastAPI()

#Create tables
Base.metadata.create_all(bind=engine)

app.include_router(tasks.router, prefix="/tasks", tags=["Tasks"])
