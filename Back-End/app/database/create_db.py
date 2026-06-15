from app.database.connection import engine
from app.database.base import Base
from app.models.user import User
from app.models.product import Product
from app.models.movimentation import Movimentation

Base.metadata.create_all(bind=engine)
print("Tabelas criadas")