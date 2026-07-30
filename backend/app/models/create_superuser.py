from app.models.database import SessionLocal
from app.models.user import User
from passlib.context import CryptContext

pwd_context=CryptContext(schemes=["bcrypt"])
db=SessionLocal()
admin=User(
    name="admin",
    email="admin@saep.com",
    password=pwd_context.hash("12345")
)

db.add(admin)
db.commit()

print("Admin criado")