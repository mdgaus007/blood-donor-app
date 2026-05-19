# 🩸 Blood Donor Platform

A full-stack MERN web application that connects blood donors with patients in need. Users can register as donors, search for donors by blood group and city, and post emergency blood requests with auto-expiry.

---

## 🚀 Live Demo

> Coming Soon

---

## ✨ Features

- 🔐 **Secure Authentication** — JWT stored in HTTP-only cookies with bcrypt password hashing
- 👤 **Donor Profile Management** — Register with blood group, city, age, and availability status
- 🔍 **Search Donors** — Filter donors by blood group and city using regex-based search
- 🚨 **Emergency Blood Requests** — Post urgent requests with automatic 48-hour expiry
- 🛡️ **Security Hardening** — Helmet.js, CORS, and express-rate-limit protection
- 🔒 **Role-Based Access Control** — User and admin roles
- 📱 **Fully Responsive UI** — Built with Tailwind CSS and Framer Motion animations

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js (Vite) | UI Framework |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| React Router DOM | Client-side Routing |
| Axios | HTTP Requests |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | Web Framework |
| MongoDB Atlas | Database |
| Mongoose | ODM / Schema Design |
| JSON Web Token | Authentication |
| bcrypt | Password Hashing |
| Helmet.js | Security Headers |
| express-rate-limit | Rate Limiting |
| Socket.io | Real-time Communication |
| Morgan | HTTP Request Logger |

---

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or above
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- [Git](https://git-scm.com/)

### 1. Clone the Repository

git clone https://github.com/mdgaus007/bloodDonor.git
cd bloodDonor

### 2. Setup Backend

cd backend
npm install

Create a `.env` file inside the `backend` folder:

NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_strong_secret_key

Start the backend:

npm run dev

Runs on http://localhost:5000

### 3. Setup Frontend

cd frontend
npm install
npm run dev

Runs on http://localhost:5173

---

## 🔗 API Endpoints

### Auth — `/api/auth`
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/register` | Register a new user | Public |
| POST | `/login` | Login and receive JWT cookie | Public |
| POST | `/logout` | Clear JWT cookie | Public |
| GET | `/profile` | Get logged-in user profile | Private |

### Donors — `/api/donors`
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/profile` | Create or update donor profile | Private |
| GET | `/profile` | Get own donor profile | Private |
| GET | `/` | Search donors by blood group & city | Public |

### Requests — `/api/requests`
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/` | Create emergency blood request | Private |
| GET | `/` | Get all active pending requests | Public |

---

## 🔒 Environment Variables

| Variable | Description |
|----------|-------------|
| `NODE_ENV` | Environment (development / production) |
| `PORT` | Backend server port (default: 5000) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |

> ⚠️ Never push your `.env` file to GitHub. It is already in `.gitignore`.

---

## 👨‍💻 Author

**MD Gulam Gaus**
- GitHub: [@mdgaus007](https://github.com/mdgaus007)
- LinkedIn: [linkedin.com/in/md-gaus-58b1a9274](https://www.linkedin.com/in/md-gaus-58b1a9274)
- Email: mdgauscse07@gmail.com

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
