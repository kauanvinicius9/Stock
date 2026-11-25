from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.schemas.product import ProductCreate
from app.models.product import Product
from app.models.database import get_db

router = APIRouter()

@router.post("/")
def create_product(product: ProductCreate,db: Session=Depends(get_db)):
    new=Product(**product.dict())

    db.add(new)
    db.commit()
    db.refresh(new)

    return new

@router.get("/")
def list_products(db: Session=Depends(get_db)):
    return db.query(Product).all()

@router.get("/{product_id}")
def get_product(product_id: int, db: Session=Depends(get_db)):
    product=db.query(Product).filter(Product.id==product_id).first()

    if not product:
        raise HTTPException(status_code=404,detail="Produto não encontrado")

    return product

@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session=Depends(get_db)):
    product=db.query(Product).filter(Product.id==product_id).first()

    if not product:
        raise HTTPException(status_code=404,detail="Produto não encontrado")

    db.delete(product)
    db.commit()

    return {"mensagem": "Produto excluído"}

@router.put("/{product_id}")
def edit_product(product_id: int, product_edited: ProductCreate,db: Session=Depends(get_db)):
    product=db.query(Product).filter(Product.id==product_id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Produto não encontrado")

    product.name=product_edited.name
    product.description=product_edited.description
    product.stock_todayl=product_edited.stock_today
    product.stock_min=product_edited.stock_min
    product.edited=product_edited.load

    db.commit()
    db.refresh(product)

    return product