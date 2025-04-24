from fastapi import FastAPI, Path, HTTPException, Depends
from starlette import status
from sqlalchemy.orm import Session

from schemas import UserSchema
from models import User
from database import SessionLocal, engine, Base

Base.metadata.create_all(bind=engine)
app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()