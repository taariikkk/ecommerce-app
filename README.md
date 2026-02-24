# 🛒 E-Shop - Full Stack E-commerce Application

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://ecommerce-app-five-swart.vercel.app/)
[![Status](https://img.shields.io/badge/status-development-blue.svg)]()

> 🌐 **Try the Live Demo:** 👉 [**Click Here to Open App**](https://ecommerce-app-five-swart.vercel.app/)

### 🔑 Demo Credentials (Try it yourself!)

To experience the full functionality including the **Protected Admin Dashboard** and **Stripe Payment**, use these credentials:

| Role | Email | Password | Features to Test |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@shop.ba` | `admin123` | Product Management (CRUD), Category Management |
| **User** | *(Register new)* | *(Any)* | Shopping Cart, Profile, Stripe Checkout |

> 💳 **Test Credit Card:** Use `4242 4242 4242 4242` for Stripe payments (Expiry: any future date, CVC: any 3 digits).

---

A modern, robust e-commerce platform built to simulate a real-world shopping experience...

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
git clone https://github.com/taariikkk/ecommerce-app.git
cd ecommerce-app
```

### 2. Database Setup
Before running the server, create a PostgreSQL database (Run this in your Postgres termilan (psql) or PGAdmin):
```bash
CREATE DATABASE ecommerce_db;
```

### 3. Backend Setup
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

### 4. Frontend Setup
Open a new terminal in your VSC or other IDE:
```bash
cd client
npm install
```
**Create a .env file in /client root and add this variable (Get this from Stripe dashboard):**
```bash
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```
### Run the client
```bash
npm run dev
```

---

## Admin role
If you want to use the Admin role, Log in with the following information:
```bash
admin@shop.ba
```
```bash
admin123
```
---

## 🤝 Contact
Created by Tarik Ohran - Junior Full Stack Developer.
Feel free to reach out for collaboration or questions!

[LinkedIn](https://www.linkedin.com/in/tarik-ohran-53348721a/) | [GitHub](https://github.com/taariikkk)
