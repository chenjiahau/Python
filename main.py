from typing import Annotated
from fastapi import FastAPI, Path, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from starlette import status
from sqlalchemy.orm import Session

from database import SessionLocal
import schemas
import controllers

# Base.metadata.create_all(bind=engine)
app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="unauth/token")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)) -> schemas.UserOut:
    try:
        payload = controllers.verify_access_token(token)
        if not payload:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token",
                headers={"WWW-Authenticate": "Bearer"},
            )
        user = db.query(controllers.User).filter(controllers.User.username == payload["sub"]).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return user
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

current_user_dependency = Annotated[schemas.UserOut, Depends(get_current_user)]

@app.post("/unauth/signin", response_model=schemas.UserOut)
def create_user(
    user: schemas.UserCreate,
    db: Session = Depends(get_db)):
    try:
        return controllers.create_user(db, user)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@app.post("/unauth/token", response_model=schemas.TokenOut)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)):
    try:
        user = controllers.authenticate_user(db, form_data.username, form_data.password)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        access_token = controllers.create_access_token(data={"sub": user.username})
        return {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "disabled": user.disabled,
            "access_token": access_token,
            "token_type": "bearer"
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@app.get("/auth/user", response_model=schemas.UserOut)
def get_user(
    current_user: current_user_dependency,
    db: Session = Depends(get_db)):
    user_id = current_user.id
    try:
        user = controllers.get_user_by_id(db, user_id)
        return user
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )

@app.put("/auth/user", response_model=schemas.UserOut)
def update_user(
    current_user: current_user_dependency,
    user: schemas.UserUpdate,
    db: Session = Depends(get_db)):
    user_id = current_user.id
    try:
        return controllers.update_user(db, user_id, user)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@app.delete("/auth/user", response_model=schemas.UserDelete)
def delete_user(
    current_user: current_user_dependency,
    db: Session = Depends(get_db)):
    user_id = current_user.id
    try:
        return controllers.delete_user(db, user_id)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )

@app.get("/auth/tasks", response_model=list[schemas.TaskOut])
def get_tasks_by_user(
    current_user: current_user_dependency,
    db: Session = Depends(get_db)):
    user_id = current_user.id
    try:
        tasks = controllers.get_all_tasks_by_user(db, user_id)
        return tasks
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )

@app.get("/auth/tasks/{task_id}", response_model=schemas.TaskOut)
def get_task_by_user_and_id(
    current_user: current_user_dependency,
    task_id: int = Path(..., title="The ID of the task to get"),
    db: Session = Depends(get_db)):
    user_id = current_user.id
    try:
        task = controllers.get_task_by_user_and_id(db, user_id, task_id)
        return task
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )

@app.post("/auth/tasks", response_model=schemas.TaskOut)
def create_task(
    current_user: current_user_dependency,
    task: schemas.TaskCreate,
    db: Session = Depends(get_db)):
    user_id = current_user.id
    try:
        return controllers.create_task(db, user_id, task)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@app.put("/auth/tasks/{task_id}", response_model=schemas.TaskOut)
def update_task(
    current_user: current_user_dependency,
    task: schemas.TaskUpdate,
    task_id: int = Path(..., title="The ID of the task to update"),
    db: Session = Depends(get_db)):
    user_id = current_user.id
    try:
        return controllers.update_task(db, user_id, task_id, task)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@app.delete("/auth/tasks/{task_id}", response_model=schemas.TaskOut)
def delete_task(
    current_user: current_user_dependency,
    task_id: int = Path(..., title="The ID of the task to delete"),
    db: Session = Depends(get_db)):
    user_id = current_user.id
    try:
        return controllers.delete_task(db, user_id, task_id)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )