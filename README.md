## Stock Project Documentation (Stock Management System)

## Overview

**Stock** is an inventory control and management system developed with a separate Backend and Frontend architecture. The application allows the management of products, users, stock movements (inputs and outputs) and access authentication.

## Technologies Used

###Backend

* **Framework:** Python with **FastAPI**.
* **Database:** SQLite (`db.sqlite3` / `stock.sql`) via SQLAlchemy / ORM.
* **Data Validation:** Pydantic (Schemas).
* **Authentication:** JWT (JSON Web Tokens) and Passlib for password hashing.

### Frontend

* **Framework:** **Next.js** (React) with App Router.
* **Language:** TypeScript.
* **Styling:** Tailwind CSS (`globals.css` / PostCSS).
* **Route Guard:** Client-side Route Guards (`authGuard.tsx`).

---

## How to Execute the Project

### Prerequisites

* **Python** (v3.10 or higher)
* **Node.js** (v18 or higher) and **npm** / **yarn**

---

### Backend Configuration (FastAPI)

1. Navigate to the backend folder:

   ```bash
   cd Stock-main/backend
   ```

2. Create and activate a virtual environment (optional, but recommended):

   ```bash
   python -m venv venv
 
   venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Run the migrations or create the database (if you do not use pre-existing SQLite):

   ```bash
   python app/database/create_db.py
   ```

5. Start the FastAPI server:

   ```bash
   uvicorn main:app --reload
   ```
   The API will be accessible at `http://localhost:8000` and the Swagger documentation at `http://localhost:8000/docs`.

---

### Frontend Configuration (Next.js)

1. Navigate to the frontend folder in another terminal:

   ```bash
   cd Stock-main/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Access the application in the browser at `http://localhost:3000`.
