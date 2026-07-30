from pydantic import BaseModel
from datetime import datetime

class MovimentationBase(BaseModel):
    product_id: int
    user_id: int
    type: str
    quantity: int
    movimentation_data: datetime

class MovimentationCreate(MovimentationBase):
    pass

class MovimentationResponse(MovimentationBase):
    id: int

    class Config:
        from_attributes=True