from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth
from app.routers import products
from app.routers import stock

from app.models.user import User
from app.models.database import Base
from app.models.database import engine

Base.metadata.create_all(bind=engine)

app=FastAPI(
    title="ESTOQUE API",
    description="API de gerenciamento de estoque e autenticação",
    version="1.0.0"
)

origins=[
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    auth.router,
    prefix="/auth",
    tags=["Autentication"]
)

app.include_router(
    products.router,
    prefix="/products",
    tags=["Products"]

)

app.include_router(
    stock.router,
    prefix="/stock",
    tags=["Stock"]
)