from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Boolean
from app.models.database import Base

class User(Base):
    __tablename__ = "users"

    id=Column(Integer,primary_key=True)
    username=Column(String,unique=True)
    email=Column(String,unique=True)
    password=Column(String)

    is_superuser=Column(
        Boolean,
        default=False
    )

    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}', email='{self.email}')>"