from pydantic import BaseModel, Emailstr

class UsuarioBase(BaseModel):
    nome: str
    email: Emailstr

class UsuarioCreate(UsuarioBase):
    senha: str

class UsuarioLogin(BaseModel):
    email: Emailstr
    senha: str

class UsuarioResponse(UsuarioResponse):
    id: int

    class Config:
        from_attributes=True