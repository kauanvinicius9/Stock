from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.models.database import get_db
from app.models.movimentation import Movimentation

from app.schemas.movimentation import MovimentationCreate

router = APIRouter()

@router.post("/input")
def input():
    return {
        "mensagem": "Entrada registrada"
    }

@router.post("/output")
def output():
    return {
        "mensagem": "Saída registrada"
    }

@router.post("/movimentation")
def registration_movimentation(
    movimentation: MovimentationCreate,
    db: Session=Depends(get_db)
):
    new_movimentation=Movimentation(
        product_id=movimentation.product_id,
        user_id=movimentation.user_id,
        tipe=movimentation.type,
        quantity=movimentation.quantity,
        movimentation_data=movimentation.movimentation_data
    )

    db.add(new_movimentation)
    db.commit()
    db.refresh(new_movimentation)

    return {
        "mensagem": "Movimentação registrada",
        "dados": movimentation
    }

@router.get("/movimentation")
def list_movimentation(db: Session=Depends(get_db)):
    return db.query(Movimentation).all()