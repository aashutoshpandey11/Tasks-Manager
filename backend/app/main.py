from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import engine, Base
from app.api.routes import tasks

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS (for React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(tasks.router, prefix="/tasks", tags=["Tasks"])

# Root
@app.get("/")
def root():
    return {"message": "API is running 🚀"}