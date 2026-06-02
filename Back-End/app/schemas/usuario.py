from pydantic import BaseModel, Emailstr

class UsuarioBase(BaseModel):
    username: str
    password: str
    email: Emailstr

class UsuarioCreate(UsuarioBase):
    password: str

class UsuarioLogin(BaseModel):
    username: str
    password: str
    email: Emailstr

class UsuarioResponse(UsuarioResponse):
    id: int

    class Config:
        from_attributes=True