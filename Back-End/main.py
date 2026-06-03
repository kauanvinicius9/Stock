from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth
from app.routers import produtos
from app.routers import estoque

from app.models.usuario import Usuario
from app.models.database import Base
from app.models.database import engine

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SAEP API",
    description="Avaliação final: API de gerenciamento de estoque e autenticação SAEP",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    auth.router,
    prefix="/auth",
    tags=["Autenticação"]
)

app.include_router(
    produtos.router,
    prefix="/produtos",
    tags=["Produtos"]

)

app.include_router(
    estoque.router,
    prefix="/estoque",
    tags=["Estoque"]
)