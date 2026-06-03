from sqlalchemy import Column, Integer, String
from app.models.database import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    id=Column(Integer,primary_key=True)
    name=Column(String(100))
    email=Column(String(100))
    password=Column(String(255))