from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.schemas.produto import ProdutoCreate
from app.models.produto import Produto
from app.models.database import get_db

router = APIRouter()

@router.post("/")
def criar_produto(produto: ProdutoCreate, db: Session = Depends(get_db)):
    novo = Produto(**produto.dict())

    db.add(novo)
    db.commit()
    db.refresh(novo)

    return novo

@router.get("/")
def listar_produtos(db: Session = Depends(get_db)):
    return db.query(Produto).all()

@router.get("/{produto_id}")
def buscar_produto(produto_id: int, db: Session = Depends(get_db)):
    produto = db.query(Produto).filter(Produto.id == produto_id).first()

    if not produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")

    return produto

@router.delete("/{produto_id}")
def excluir_produto(produto_id: int, db: Session = Depends(get_db)):
    produto = db.query(Produto).filter(Produto.id == produto_id).first()

    if not produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")

    db.delete(produto)
    db.commit()

    return {"mensagem": "Produto excluído"}

@router.put("/{produto_id}")
def editar_produto(produto_id: int, produto_editado: ProdutoCreate, db: Session = Depends(get_db)):
    produto = db.query(Produto).filter(Produto.id == produto_id).first()

    if not produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")

    produto.nome = produto_editado.nome
    produto.descricao = produto_editado.descricao
    produto.estoque_atual = produto_editado.estoque_atual
    produto.estoque_minimo = produto_editado.estoque_minimo
    produto.peso = produto_editado.peso

    db.commit()
    db.refresh(produto)

    return produto