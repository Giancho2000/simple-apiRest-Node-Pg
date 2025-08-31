# REST Server by CGR

# User CRUD REST API  

## 📖 Description  
This project is a small REST API that implements full CRUD functionality for user management.  
It is built with **Node.js** and **Express**, using **Express Validator** for custom request validations and **bcrypt** for secure password hashing.  
The application connects to a **PostgreSQL** database through **Sequelize** as the ORM, providing a clean and scalable structure for backend development.  

---

## 📦 Installation  

1. Clone this repository:  
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
2. Install dependencies:
    ```bash
    npm install
3. Configure your PostgreSQL connection by setting the DATABASE_URL in your environment variables.
    ```bash
    export DATABASE_URL=postgres://user:password@localhost:5432/dbname
4. Run database migrations (if configured):
    ```bash
    npm sequelize db:migrate

## 🚀 Usage
    ```bash
    npm run dev

## 📌 Postman endpoints
-- URL Base: http://localhost:3000/api/users
- POST /api/users → Create a new user
    ```bash
    /*Example Request (JSON)*/
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "securePassword123",
      "role": "admin"
    }
- GET /api/users → Retrieve all users
- GET /api/users/:id → Retrieve a user by ID
- PUT /api/users/:id → Update a user by ID
- DELETE /api/users/:id → Delete a user


## 🛠️ Technologies

- Node.js + Express.js
- PostgreSQL + Sequelize ORM
- Express Validator
- Bcrypt
