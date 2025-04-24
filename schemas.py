import datetime
from pydantic import BaseModel, Field
from typing import Optional

class UserSchema(BaseModel):
    id: Optional[int] = Field(None, description="The ID of the user")
    username: str = Field(min_length=3, max_length=32, description="The username of the user")
    email: str = Field(..., description="The email of the user")
    disabled: Optional[bool] = Field(False, description="Whether the user is disabled")
    created_at: Optional[str] = Field(None, description="The date and time when the user was created")
    updated_at: Optional[str] = Field(None, description="The date and time when the user was last updated")

    def __init__(self, **data):
        super().__init__(**data)
        if self.created_at is None:
            self.created_at = datetime.now().isoformat() # Set to current time
        if self.updated_at is None:
            self.updated_at = datetime.now().isoformat() # Set to current time

    class Config:
        from_attributes = True