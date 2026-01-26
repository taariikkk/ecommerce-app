# 🛒 E-Shop - Full Stack E-commerce Application

> **Project Status:** 🚧 **In Development** (Beta Phase)
>
> *Current Focus: Implementing advanced filtering and user profile management.*

A modern, robust e-commerce platform built to simulate a real-world shopping experience. This project demonstrates a full-stack implementation using the **PERN stack** (PostgreSQL, Express, React, Node.js), featuring secure authentication, product management, and real-time payment processing via Stripe.

---

## 🚀 Key Features

### 🛍️ Customer Experience
- **Product Catalog:** Browse products with dynamic filtering by categories.
- **Shopping Cart:** Persistent cart state using LocalStorage & Context API (cart survives page refresh).
- **Secure Checkout:** Integrated **Stripe Payment Gateway** for secure credit card processing.
- **Order History:** Authenticated users can view their past orders and payment status.
- **User Authentication:** JWT-based secure login and registration flow.

### 🛡️ Admin Dashboard (Protected)
- **Role-Based Access Control:** Dedicated admin routes protected by custom middleware and HOCs.
- **Product Management (CRUD):** Add, edit, and delete products with image URLs and inventory status.
- **Category Management:** Create and manage product categories dynamically.
- **Order Overview:** (Coming soon) View and manage customer orders.

---

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework:** React.js (Vite)
- **State Management:** React Context API & Custom Hooks (`useCart`, `useAuth`)
- **Styling:** CSS Modules (Custom Design System, no UI frameworks dependencies)
- **HTTP Client:** Axios with Interceptors for auto-token injection
- **Payments:** Stripe Elements (`@stripe/react-stripe-js`)

### Backend (Server)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize (Managing relationships: One-to-Many, Many-to-Many)
- **Security:**
    - `bcrypt` for password hashing
    - `jsonwebtoken` (JWT) for stateless authentication
    - CORS & Environment Variable protection

---

## 🏗️ Architecture & Database

This project follows the **MVC (Model-View-Controller)** architectural pattern.

### Database Relationships
*   **User** `1:N` **Order** (One user can have multiple orders)
*   **Order** `N:M` **Product** (Through `OrderItem` join table)
*   **Category** `1:N` **Product** (Products belong to specific categories)

---

## 🔧 Installation & Setup

Follow these steps to run the project locally.

### Prerequisites
*   Node.js (v16+)
*   PostgreSQL installed and running

### 1. Clone the repository
```bash
git clone https://github.com/your-username/ecommerce-app.git
```

### 2. Backend Setup
```bash
cd server
npm install
```
**Create a .env file in /server root and add these variables:**
```bash
PORT=5000
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
JWT_SECRET=your_super_secret_key
STRIPE_SECRET_KEY=sk_test_...
```
### Run the server
```bash
npm start
```

### 3. Frontend Setup
```bash
cd client
npm install
```
**Create a .env file in /client root and add this variable:**
```bash
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```
### Run the client
```bash
npm run dev
```

---

## 🤝 Contact
Created by Tarik Ohran - Junior Full Stack Developer.
Feel free to reach out for collaboration or questions!

[LinkedIn](https://www.linkedin.com/in/tarik-ohran-53348721a/) | [GitHub](https://github.com/taariikkk)
