from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional

class TokenOut(BaseModel):
    id: int = Field(..., description="The unique identifier of the user")
    username: str = Field(..., description="The username of the user")
    email: str = Field(..., description="The email of the user")
    disabled: Optional[bool] = Field(False, description="Whether the user is disabled")
    access_token: str = Field(..., description="The access token")
    token_type: str = Field(..., description="The type of the token")

class UserSchema(BaseModel):
    username: str = Field(min_length=3, max_length=32, description="The username of the user")
    email: str = Field(..., description="The email of the user")
    disabled: Optional[bool] = Field(False, description="Whether the user is disabled")

    class Config:
        from_attributes = True

class UserOut(UserSchema):
    id: int = Field(..., description="The unique identifier of the user")
    created_at: datetime = Field(..., description="The creation date of the user")
    updated_at: datetime = Field(..., description="The last update date of the user")

    class Config:
        from_attributes = True
        orm_mode = True

class UserCreate(UserSchema):
    username: str = Field(min_length=3, max_length=32, description="The username of the user")
    email: str = Field(..., description="The email of the user")
    password: str = Field(..., min_length=8, max_length=32, description="The password of the user")
    disabled: Optional[bool] = Field(False, description="Whether the user is disabled")

    class Config:
        from_attributes = True

class UserUpdate(UserSchema):
    username: str = Field(min_length=3, max_length=32, description="The username of the user")
    email: str = Field(..., description="The email of the user")
    password: Optional[str] = Field(None, min_length=8, max_length=32, description="The password of the user")
    disabled: Optional[bool] = Field(False, description="Whether the user is disabled")

    class Config:
        from_attributes = True

class UserDelete(BaseModel):
    id: int = Field(..., description="The unique identifier of the user")

    def __init__(self, **data):
        super().__init__(**data)

    class Config:
        from_attributes = True

class TaskSchema(BaseModel):
    title: str = Field(min_length=3, max_length=32, description="The title of the task")
    description: Optional[str] = Field(None, description="The description of the task")
    completed: Optional[bool] = Field(False, description="Whether the task is completed")

    class Config:
        from_attributes = True

class TaskOut(TaskSchema):
    id: int = Field(..., description="The unique identifier of the task")
    user_id: int = Field(..., description="The unique identifier of the user")
    user : UserOut = Field(..., description="The user who created the task")
    created_at: datetime = Field(..., description="The creation date of the task")
    updated_at: datetime = Field(..., description="The last update date of the task")

    class Config:
        from_attributes = True
        orm_mode = True

class TaskCreate(TaskSchema):
    title: str = Field(min_length=3, max_length=32, description="The title of the task")
    description: Optional[str] = Field(None, description="The description of the task")
    completed: Optional[bool] = Field(False, description="Whether the task is completed")

    class Config:
        from_attributes = True

class TaskUpdate(TaskSchema):
    title: str = Field(min_length=3, max_length=32, description="The title of the task")
    description: Optional[str] = Field(None, description="The description of the task")
    completed: Optional[bool] = Field(False, description="Whether the task is completed")

    class Config:
        from_attributes = True

class TaskDelete(BaseModel):
    id: int = Field(..., description="The unique identifier of the task")
    user_id: int = Field(..., description="The unique identifier of the user")

    def __init__(self, **data):
        super().__init__(**data)

    class Config:
        from_attributes = True