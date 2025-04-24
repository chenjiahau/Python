from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional

class UserSchema(BaseModel):
    username: str = Field(min_length=3, max_length=32, description="The username of the user")
    email: str = Field(..., description="The email of the user")
    disabled: Optional[bool] = Field(False, description="Whether the user is disabled")

    class Config:
        from_attributes = True

class UserOut(UserSchema):
    id: int = Field(..., description="The unique identifier of the user")
    created_at: str = Field(..., description="The creation date of the user")
    updated_at: str = Field(..., description="The last update date of the user")

    class Config:
        from_attributes = True
        orm_mode = True

class UserCreate(UserSchema):
    username: str = Field(min_length=3, max_length=32, description="The username of the user")
    email: str = Field(..., description="The email of the user")
    disabled: Optional[bool] = Field(False, description="Whether the user is disabled")
    created_at: str = Field(default_factory=lambda: datetime.now().isoformat(), description="The creation date of the user")
    updated_at: str = Field(default_factory=lambda: datetime.now().isoformat(), description="The last update date of the user")

    def __init__(self, **data):
        super().__init__(**data)
        self.created_at = datetime.now().isoformat()
        self.updated_at = datetime.now().isoformat()

    class Config:
        from_attributes = True

class UserUpdate(UserSchema):
    username: str = Field(min_length=3, max_length=32, description="The username of the user")
    email: str = Field(..., description="The email of the user")
    disabled: Optional[bool] = Field(False, description="Whether the user is disabled")
    updated_at: str = Field(default_factory=lambda: datetime.now().isoformat(), description="The last update date of the user")

    def __init__(self, **data):
        super().__init__(**data)
        self.updated_at = datetime.now().isoformat()

    class Config:
        from_attributes = True

class UserDelete(BaseModel):
    id: int = Field(..., description="The unique identifier of the user")

    def __init__(self, **data):
        super().__init__(**data)

    class Config:
        from_attributes = True