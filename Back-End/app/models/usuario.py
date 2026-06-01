from sqlalchemy import Column,Integer,String
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Usuario(Base):
    __tablename__ = "usuarios"

    id=Column(Integer, primary_key=True)
    nome=Column(String(100))
    email=Column(String(100))
    senha=Column(String(255))