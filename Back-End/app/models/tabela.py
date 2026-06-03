from app.models.database import Base, engine
from app.models.usuario import Usuario

Base.metadata.create_all(bind=engine)

print("Tabelas criadas")