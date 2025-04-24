from fastapi import FastAPI, Path, HTTPException, Depends
from starlette import status
from sqlalchemy.orm import Session

from database import SessionLocal, engine, Base
import schemas
import controllers

Base.metadata.create_all(bind=engine)
app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/users/", response_model=list[schemas.UserOut])
def get_users(db: Session = Depends(get_db)):
    try:
        users = controllers.get_all_users(db)
        return users
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@app.get("/users/{user_id}", response_model=schemas.UserOut)
def get_user(user_id: int = Path(..., title="The ID of the user to get"), db: Session = Depends(get_db)):
    try:
        user = controllers.get_user_by_id(db, user_id)
        return user
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )

@app.post("/users/", response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    try:
        return controllers.create_user(db, user)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@app.put("/users/{user_id}", response_model=schemas.UserOut)
def update_user(user_id: int, user: schemas.UserUpdate, db: Session = Depends(get_db)):
    try:
        return controllers.update_user(db, user_id, user)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@app.delete("/users/{user_id}", response_model=schemas.UserDelete)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    try:
        return controllers.delete_user(db, user_id)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )