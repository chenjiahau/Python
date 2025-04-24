from sqlalchemy import Column, Integer, String
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False)
    email = Column(String, unique=True, index=True)
    disabled = Column(String, default=False)
    created_at = Column(String, nullable=False)
    updated_at = Column(String, nullable=False)