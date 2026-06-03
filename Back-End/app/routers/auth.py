from fastapi import APIRouter
from fastapi import HTTPException

from passlib.context import CryptContext

from app.models.database import SessionLocal
from app.models.usuario import Usuario
from app.schemas.schemas import LoginSchema

router = APIRouter()

pwd_context=CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

@router.post("/login")
def login(data: LoginSchema):
    
    db=SessionLocal()
    user=db.query(Usuario).filter(
        Usuario.email==data.email
    ).first()

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Usuário não encontrado"
        )
    
    if not pwd_context.verify(
        data.password,
        user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Senha inválida"
        )
    
    return {
        "id": user.id,
        "username": user.username,
        "is_superuser": user.is_superuser
    }