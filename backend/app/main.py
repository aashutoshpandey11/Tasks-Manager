from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# Data model
class User(BaseModel):
    username: str
    email: str
    password: str

# Fake database (for now)
users = []

@app.post("/register")
def register(user: User):
    users.append(user)
    return {"message": "User registered successfully"}