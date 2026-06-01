from pydantic import BaseModel

class ProdutoCreate(BaseModel):
    nome: str
    descricao: str
    estoque_atual: int
    estoque_minimo: int
    peso: float