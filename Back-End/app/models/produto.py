from sqlalchemy import Column,Integer,String,Float
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Produto(Base):
    __tablename__ = "produtos"

    id=Column(Integer,primary_key=True)
    nome=Column(String(100))
    descricao=Column(String(255))
    estoque_atual=Column(Integer)
    estoque_minimo=Column(Integer)
    peso=Column(Float)