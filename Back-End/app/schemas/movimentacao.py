from pydantic import BaseModel
from datetime import datetime

class MovimentacaoBase(BaseModel):
    produto_id: int
    usuario_id: int
    tipo: str
    quantidade: int
    data_movimentacao: datetime

class MovimentacaoCreate(MovimentacaoBase):
    pass

class MovimentacaoResponse(MovimentacaoBase):
    id: int

    class Config:
        from_attributes=True