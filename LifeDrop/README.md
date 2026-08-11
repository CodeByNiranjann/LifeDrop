# 🩸 LifeDrop — Blood Donation Management System

A full-stack **MERN** (MongoDB, Express.js, React.js, Node.js) web application that connects blood donors with patients and hospitals in need. LifeDrop makes it simple to register as a donor, search for available donors by blood group and city, and post or respond to urgent blood requests.

> ⚠️ **Status:** This project is currently in local development and has not been deployed to a live/production environment yet.

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [User Roles](#user-roles)
- [Screenshots](#screenshots)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

---

## 📖 About the Project

LifeDrop is a blood donation management platform designed to bridge the gap between blood donors and people in urgent need of blood. The platform supports two types of registered users — **Donors**, who make their blood availability visible for search, and **Seekers**, who simply want to browse donors or post blood requests without registering their own donor profile.

Every core feature — authentication, donor search, blood requests — is powered by a real REST API backed by MongoDB, with JWT-based authentication securing all protected routes.

---

## ✨ Features

- 🔐 **Secure Authentication** — JWT-based login/register with hashed passwords (bcrypt)
- 🩸 **Two Account Types** — Register as a **Donor** (full donor profile) or a **Seeker** (search/request only)
- 🔍 **Donor Search** — Filter donors by city and blood group in real time
- 📢 **Blood Requests** — Post urgent blood requests with patient, hospital, and urgency details
- ✅ **Request Lifecycle** — Mark your own requests as *Fulfilled* or cancel them once resolved
- 👤 **Profile Management** — View and edit your account details, including donor availability toggle
- 📱 **Fully Responsive UI** — Optimized for desktop, tablet, and mobile
- 📧 **Contact Form** — Integrated with FormSubmit for direct email delivery, no backend required
- 🎨 **Custom Design System** — Hand-built UI with a single organized stylesheet (no CSS frameworks)

---

## 🛠️ Tech Stack

**Frontend**
- React.js (Vite)
- React Router DOM
- Axios
- Context API for global auth state
- Plain CSS (single `App.css`, no Tailwind/Bootstrap/MUI)

**Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- bcryptjs for password hashing
- MVC architecture

---

## 📁 Project Structure

```
blood-donation-app/
│
├── client/                     # React frontend (Vite)
│   └── src/
│       ├── components/         # Reusable UI components
│       ├── pages/               # Route-level pages
│       ├── context/             # AuthContext (global auth state)
│       ├── services/            # Axios API service layer
│       ├── data/                # Static reference data (FAQ, blood group info)
│       └── App.jsx / App.css
│
└── server/                     # Express backend
    ├── config/                  # Database connection
    ├── models/                  # Mongoose schemas (User, BloodRequest)
    ├── controllers/             # Route logic
    ├── middleware/               # Auth & error handling
    ├── routes/                  # Express routers
    ├── utils/                   # JWT token generator
    └── server.js
```

---

## 🗄️ Database Schema

**User**

| Field | Type | Notes |
|---|---|---|
| name, email, password, phone, city | String | Required for every user |
| role | String | `Donor` or `Seeker` |
| bloodGroup, age, gender | — | Required only if `role === 'Donor'` |
| available | Boolean | Donor availability status |
| lastDonated | Date | Optional |

**BloodRequest**

| Field | Type | Notes |
|---|---|---|
| patientName, hospital, city, contactNumber, description | String | Required |
| bloodGroup | String | Enum: A+, A-, B+, B-, AB+, AB-, O+, O- |
| urgency | String | Enum: Critical, High, Medium, Low |
| status | String | `Pending` or `Fulfilled` |
| requestedBy | ObjectId | Reference to the creating User |

---

## 🔌 API Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a new Donor or Seeker |
| POST | `/api/auth/login` | Public | Authenticate and receive a JWT |
| GET | `/api/auth/profile` | Private | Get logged-in user's profile |
| PUT | `/api/auth/profile` | Private | Update logged-in user's profile |
| GET | `/api/donors` | Private | Get all registered donors |
| GET | `/api/donors/search` | Private | Search donors by city / blood group |
| PUT | `/api/donors/availability` | Private | Toggle donor availability |
| POST | `/api/requests` | Private | Create a new blood request |
| GET | `/api/requests` | Private | Get all blood requests (filterable by status) |
| PUT | `/api/requests/:id/status` | Private (owner only) | Mark a request as Fulfilled |
| DELETE | `/api/requests/:id` | Private (owner only) | Cancel/delete a request |

All private routes require a valid JWT sent as `Authorization: Bearer <token>`.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) — a local instance or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- npm (comes with Node.js)

### Installation

Clone the repository and install dependencies for both the client and server:

```bash
git clone https://github.com/your-username/lifedrop-blood-donation.git
cd lifedrop-blood-donation

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Environment Variables

Inside the `server/` folder, create a `.env` file based on `.env.example`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=30d
PORT=5000
NODE_ENV=development
```

> 🔒 **Note:** If your MongoDB password contains special characters (e.g. `@`, `#`, `%`), they must be URL-encoded in the connection string (e.g. `@` → `%40`).

### Running the App

Open two terminals — one for the backend, one for the frontend.

**Terminal 1 — Backend**
```bash
cd server
npm run dev
```
Runs on `http://localhost:5000`

**Terminal 2 — Frontend**
```bash
cd client
npm run dev
```
Runs on `http://localhost:5173`

Once both are running, open `http://localhost:5173` in your browser.

---

## 👥 User Roles

LifeDrop supports two account types, chosen at registration:

| | **Donor** | **Seeker** |
|---|---|---|
| Registration fields | Full (incl. blood group, age, gender) | Basic (name, email, phone, city) |
| Appears in donor search | ✅ Yes | ❌ No |
| Can search for donors | ✅ Yes | ✅ Yes |
| Can post / view blood requests | ✅ Yes | ✅ Yes |
| Availability toggle | ✅ Yes | ❌ Not applicable |

Both account types require registration and login — the platform has no public/anonymous access, ensuring all activity is tied to a verified account.

---

## 📸 Screenshots

> _Add screenshots of the Home, Search, Dashboard, and Blood Request pages here once available._

```
![Home Page](./screenshots/home.png)
![Dashboard](./screenshots/dashboard.png)
![Search Donors](./screenshots/search-donors.png)
```

---

## 🔮 Future Improvements

- [ ] Matching donors directly from a blood request (one-click "Find Donors like this")
- [ ] Email/SMS notifications for matching blood requests
- [ ] Admin dashboard for moderating requests and donor data
- [ ] "My Requests" history page for viewing fulfilled/cancelled requests
- [ ] Geolocation-based donor search (distance sorting)
- [ ] Deployment to a live environment (Render / Vercel / Railway + MongoDB Atlas)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to fork the repository and submit a pull request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — feel free to use, modify, and distribute it.

---

<p align="center">Made with ❤️ to help save lives, one connection at a time.</p>
