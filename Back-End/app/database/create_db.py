from app.database.connection import engine
from app.database.base import Base
from app.models.usuario import Usuario
from app.models.produto import Produto
from app.models.movimentacao import Movimentacao

Base.metadata.create_all(bind=engine)
print("Tabelas criadas")