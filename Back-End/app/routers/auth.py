from fastapi import APIRouter
from app.schemas.usuario import UsuarioLogin

router = APIRouter()

@router.post("/login")
def login(usuario:UsuarioLogin):
    if usuario.email != "admin@email.com":
        return {"erro": "Usuário não encontrado"}
    
    return {
        "mensagem": "Login realizado"
    }