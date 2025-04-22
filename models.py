from pydantic import BaseModel, Field
from typing import Optional

class TodoItem(BaseModel):
    task: str = Field(min_length=1, max_length=32)
    description: Optional[str] = Field(max_length=128, default=None)
    level: Optional[int] = Field(ge=1, le=5, default=1)
    due_date: Optional[str] = Field(default=None)
    priority: Optional[int] = Field(ge=1, le=5, default=3)
    completed: Optional[bool] = Field(default=False)

    def __init__(self, **data):
        super().__init__(**data)