from database import Base, engine
from usuario import Usuario

Base.metadata.create_all(bind=engine)

print("Tabelas criadas")