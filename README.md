# STOCK

###

**<h3>Routes Front-End</h3>**

###

```powershell
 http://127.0.0.1:8000/login
```

```powershell
 http://127.0.0.1:8000/main
```

```powershell
 http://127.0.0.1:8000/registration
```

```powershell
 http://127.0.0.1:8000/management
```

---

**<h3>Routes Back-End</h3>**

###

> DOCS

```powershell
http://127.0.0.1:8000/docs
```

> POST: Autentication (Login)

```powershell
http://127.0.0.1:8000/auth/login
```

> POST: Stock (Input, Output, Register Movimentation)

```powershell
http://127.0.0.1:8000/stock/input
```

```powershell
http://127.0.0.1:8000/stock/output
```

```powershell
http://127.0.0.1:8000/stock/movimentation
```

**GET**: Stock (List Movimentations)

```powershell
http://127.0.0.1:8000/stock/movimentation
```

**GET**, **POST**, **PUT**, **DELETE**: Products (List Products, Create Products, Get Products, Delete Products, Edit Products)

GET Products

```powershell
http://127.0.0.1:8000/products/ 
```

```powershell
http://127.0.0.1:8000/products/{products_id}
```

POST Products

```powershell
http://127.0.0.1:8000/products/
```

DELETE Products

```powershell
http://127.0.0.1:8000/products/{products_id}
```

PUT Products

```powershell
http://127.0.0.1:8000/products/{products_id}
```
