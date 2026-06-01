from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def listar_produtos():
    return [
        {
            "id": 1,
            "nome": "Martelo"
        }
    ]