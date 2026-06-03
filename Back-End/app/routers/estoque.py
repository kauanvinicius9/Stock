from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.models.database import get_db
from app.models.movimentacao import Movimentacao

from app.schemas.movimentacao import MovimentacaoCreate

router = APIRouter()

@router.post("/entrada")
def entrada():
    return {
        "mensagem": "Entrada registrada"
    }

@router.post("/saida")
def saida():
    return {
        "mensagem": "Saída registrada"
    }

@router.post("/movimentacao")
def registrar_movimentacao(
    movimentacao: MovimentacaoCreate
):
    return {
        "mensagem": "Movimentação Registrada",
        "dados": movimentacao
    }

@router.get("/movimentacao")
def listar_movimentacoes(db: Session=Depends(get_db)):
    return db.query(Movimentacao).all()