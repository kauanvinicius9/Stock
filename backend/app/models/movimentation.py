from sqlalchemy import Column,Integer,String,DateTime,ForeignKey
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Movimentation(Base):
    __tablename__ = "movimentations"

    id=Column(Integer,primary_key=True)
    product_id=Column(Integer,ForeignKey("products.id"))
    user_id=Column(Integer,ForeignKey("users.id"))
    type=Column(String(20))
    quantity=Column(Integer)
    movimentation_data=Column(DateTime)