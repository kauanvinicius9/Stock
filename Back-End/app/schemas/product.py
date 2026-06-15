from pydantic import BaseModel

class ProductCreate(BaseModel):
    name: str
    description: str
    stock_today: int
    stock_min: int
    load: float