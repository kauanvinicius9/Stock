from sqlalchemy import Column,Integer,String,DateTime,ForeignKey
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Movimentacao(Base):
    __tablename__ = "movimentacoes"

    id=Column(Integer,primary_key=True)
    produto_id=Column(Integer,ForeignKey("produtos.id"))
    usuario_id=Column(Integer,ForeignKey("usuarios.id"))
    tipo=Column(String(20))
    quantidade=(Column(Integer))
    data_movimentacao=Column(DateTime)