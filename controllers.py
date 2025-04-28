from datetime import datetime
from sqlalchemy.orm import Session, joinedload
from models import User, Task
from schemas import UserCreate, UserUpdate, TaskCreate, TaskUpdate
import auth
import utils

def authenticate_user(db: Session, username: str, password: str):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise Exception("User not found")
    if not utils.verify_password(password, user.password):
        raise Exception("Incorrect password")
    return user

def create_access_token(data: dict):
    access_token = auth.create_access_token(data=data)
    return access_token

def verify_access_token(token: str):
    payload = auth.verify_access_token(token)
    if not payload:
        raise Exception("Invalid token")
    return payload

def get_all_users(db: Session):
    users = db.query(User).order_by(User.id.desc()).all()
    return users

def get_user_by_id(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise Exception("User not found")
    return user

def create_user(db: Session, user: UserCreate):
    db_user = User(**user.model_dump())

    db_user.password = utils.get_password_hash(user.password)
    db_user.created_at = datetime.now().isoformat()
    db_user.updated_at = datetime.now().isoformat()
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user_id: int, user: UserUpdate):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise Exception("User not found")
    for key, value in user.model_dump().items():
        setattr(db_user, key, value)
    if user.password:
        db_user.password = utils.get_password_hash(user.password)
    db_user.updated_at = datetime.now().isoformat()
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise Exception("User not found")
    db.delete(db_user)
    db.commit()
    return db_user

def get_all_tasks_by_user(db: Session, user_id: int):
    tasks = db.query(Task).filter(Task.user_id == user_id).order_by(Task.id.desc()).all()
    return tasks

def get_task_by_user_and_id(db: Session, user_id: int, task_id: int):
    task = db.query(Task).filter(Task.user_id == user_id, Task.id == task_id).first()
    if not task:
        raise Exception("Task not found")
    return task

def create_task(db: Session, user_id: int, task: TaskCreate):
    db_task = Task(**task.model_dump())
    db_task.user_id = user_id
    db_task.created_at = datetime.now().isoformat()
    db_task.updated_at = datetime.now().isoformat()
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def update_task(db: Session, user_id: int, task_id: int, task: TaskUpdate):
    db_task = db.query(Task).filter(Task.user_id == user_id, Task.id == task_id).first()
    if not db_task:
        raise Exception("Task not found")
    for key, value in task.model_dump().items():
        setattr(db_task, key, value)
    db_task.user_id = user_id
    db_task.updated_at = datetime.now().isoformat()
    db.commit()
    db.refresh(db_task)
    return db_task

def delete_task(db: Session, user_id: int, task_id: int):
    # options = [joinedload(Task.user)]
    # it is for eager loading the user relationship
    db_task = db.query(Task) \
        .options(joinedload(Task.user)) \
        .filter(Task.user_id == user_id, Task.id == task_id).first()
    if not db_task:
        raise Exception("Task not found")
    db.delete(db_task)
    db.commit()
    return db_task