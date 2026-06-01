from fastapi import FastAPI

from app.routers import auth
from app.routers import produtos
from app.routers import estoque

app = FastAPI()

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