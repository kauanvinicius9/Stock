from fastapi import APIRouter
from app.schemas.movimentacao import MovimentacaoBase

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