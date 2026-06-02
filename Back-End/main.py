from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth
from app.routers import produtos
from app.routers import estoque
from app.models.usuario import Usuario

from database import Base
from database import engine

from auth import router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

app.include_router(
    auth.router,
    prefix="/auth"
)

app.include_router(
    produtos.router,
    prefix="/produtos"
)

app.include_router(
    estoque.router,
    prefix="/estoque"
)