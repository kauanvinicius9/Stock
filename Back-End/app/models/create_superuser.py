from database import SessionLocal
from usuario import Usuario
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"])

db = SessionLocal()

admin = Usuario(
    name="admin",
    email="admin@saep.com",
    password=pwd_context.hash("12345")
)

db.add(admin)
db.commit()

print("Admin criado")