from sqlalchemy import Column,Integer,String,Float
from sqlalchemy.orm import declarative_base
from app.models.database import Base

class Produto(Base):
    __tablename__ = "produtos"

    id=Column(Integer,primary_key=True, index=True)
    nome=Column(String(100))
    descricao=Column(String(255))
    estoque_atual=Column(Integer)
    estoque_minimo=Column(Integer)
    peso=Column(Float)