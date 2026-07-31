from sqlalchemy import Column,Integer,String,DateTime,ForeignKey
from app.models.database import Base

class Movimentation(Base):
    __tablename__ = "movimentations"

    id=Column(Integer,primary_key=True)
    product_id=Column(Integer,ForeignKey("products.id"))
    user_id=Column(Integer,ForeignKey("users.id"))
    type=Column(String(20))
    quantity=Column(Integer)
    movimentation_data=Column(DateTime)

    def __repr__(self):
        return (
            f"<Movimentation(id={self.id}, type='{self.type}', "
            f"qty={self.quantity}, product_id={self.product_id})>"
        )