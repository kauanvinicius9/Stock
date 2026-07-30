from sqlalchemy import Column,Integer,String,Float
from sqlalchemy.orm import declarative_base
from app.models.database import Base

class Product(Base):
    __tablename__ = "products"

    id=Column(Integer,primary_key=True, index=True)
    name=Column(String(100))
    description=Column(String(255))
    stock_today=Column(Integer)
    stock_min=Column(Integer)
    load=Column(Float)