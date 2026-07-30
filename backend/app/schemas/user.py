from pydantic import BaseModel, Emailstr

class UserBase(BaseModel):
    username: str
    password: str
    email: Emailstr

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    username: str
    password: str
    email: Emailstr

class UserResponse(UserResponse):
    id: int

    class Config:
        from_attributes=True