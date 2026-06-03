# SAEP

###

**<h3>Rotas Front-End</h3>**

###

```powershell
 http://127.0.0.1:8000/login
```

```powershell
 http://127.0.0.1:8000/principal
```

```powershell
 http://127.0.0.1:8000/cadastro
```

```powershell
 http://127.0.0.1:8000/gestao
```

---

**<h3>Rotas Back-End</h3>**

###

> DOCS

```powershell
http://127.0.0.1:8000/docs
```

> POST: Autenticação (Login)

```powershell
http://127.0.0.1:8000/auth/login
```

> POST: Estoque (Entrada, Saída, Registrar Movimentação)

```powershell
http://127.0.0.1:8000/estoque/entrada
```

```powershell
http://127.0.0.1:8000/estoque/saida
```

```powershell
http://127.0.0.1:8000/estoque/movimentacao
```

**GET**: Estoque (Listar Movimentações)

```powershell
http://127.0.0.1:8000/estoque/movimentacao
```

**GET**, **POST**, **PUT**, **DELETE**: Produtos (Listar Produtos, Criar Produtos, Buscar Produto, Excluir Produto, Editar Produto)

GET Produtos

```powershell
http://127.0.0.1:8000/produtos/ 
```

```powershell
http://127.0.0.1:8000/produtos/{produtos_id}
```

POST Produtos

```powershell
http://127.0.0.1:8000/produtos/
```

DELETE Produtos

```powershell
http://127.0.0.1:8000/produtos/{produtos_id}
```

PUT Produtos

```powershell
http://127.0.0.1:8000/produtos/{produtos_id}
```
