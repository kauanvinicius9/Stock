from fastapi import APIRouter
from app.schemas.produto import ProdutoCreate

router = APIRouter()

produtos = []

@router.post("/")
def criar_produtos(produto: ProdutoCreate):
    novo_produto = {
        "id": len(produtos) + 1,
        "nome": produto.nome,
        "descricao": produto.descricao,
        "estoque_atual": produto.estoque_atual,
        "estoque_minimo": produto.estoque_minimo,
        "peso": produto.peso
    }

    produtos.append(novo_produto)
    return novo_produto

@router.get("/")
def listar_produtos():
    return produtos

@router.get("/{produtos_id}")
def buscar_produto(produtos_id: int):
    for produto in produtos:
        if produto["id"] == produtos_id:
            return produto
        
    raise HTTPException(status_code=404, detail="Produto não encontrado")

@router.delete("/{produtos_id}")
def excluir_produto(produtos_id: int):
    for i, produto in enumerate(produtos):
        if produto["id"] == produtos_id:
            produtos.pop(i)

            return {
                "mensagem": "Produto excluído"
            }
        
    raise HTTPException(status_code=404, detail="Produto não encontrado")

@router.put("/{produtos_id}")
def editar_produto(
    produtos_id: int,
    produto_editado: ProdutoCreate
):
    
    for i, produto in produtos:
        if produto["id"] == produtos_id:
            produtos["nome"]=produto_editado.nome
            produtos["descricao"]=produto_editado.descricao
            produtos["estoque_atual"]=produto_editado.estoque_atual
            produtos["estoque_minimo"]=produto_editado.estoque_minimo
            produtos["peso"]=produto_editado.peso

            return produto
        
    raise HTTPException(status_code=404, detail="Produto não encontrado")