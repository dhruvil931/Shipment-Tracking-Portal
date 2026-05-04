# 🚚 Freightelligent — Shipment Tracking Portal

[![Live Demo](https://img.shields.io/badge/Live%20Demo-shipment--tracking--portal.vercel.app-brightgreen?style=for-the-badge&logo=vercel)](https://shipment-tracking-portal.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-dhruvil931-181717?style=for-the-badge&logo=github)](https://github.com/dhruvil931/Shipment-Tracking-Portal)

> **Freightelligent** is a modern shipment tracking portal that allows users to monitor the real-time status and journey of their freight and logistics shipments — all from a clean, intuitive dashboard.

---

## 🌐 Live Demo

🔗 **[shipment-tracking-portal.vercel.app](https://shipment-tracking-portal.vercel.app)**

---

## ✨ Features

- 📦 **Real-time Shipment Tracking** — Track shipments by ID or reference number
- 📊 **Dashboard** — Overview of all active, delivered, and pending shipments
- 🔐 **User Authentication** — Secure login and registration flow
- 📋 **Shipment Details** — View full shipment history, status updates, and estimated delivery
- 🔔 **Status Milestones** — Clear progress indicators (Order Placed → In Transit → Delivered)
- 📱 **Responsive Design** — Works seamlessly on desktop, tablet, and mobile
- 🌙 **Clean UI** — Modern interface built for logistics professionals and customers alike

---

## 🛠️ Tech Stack

| Layer          | Technology                          |
|----------------|-------------------------------------|
| **Frontend**   | React.js                            |
| **Styling**    | Tailwind CSS / CSS Modules          |
| **State Mgmt** | React Context                       |
| **Backend**    | Spring Boot / Spring Security       |
| **Database**   | PostgreSQL / SQL                    |
| **Auth**       | JWT                                 |
| **Deployment** | Vercel                              |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- npm or yarn
- Git

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/dhruvil931/Shipment-Tracking-Portal.git

# 2. Navigate into the project directory
cd Shipment-Tracking-Portal

# 3. Install dependencies
npm install
# or
yarn install
```

### Environment Variables

Create a `.env.local` file in the root directory and add the required variables:

```env
# Example — update with your actual keys
NEXT_PUBLIC_API_URL=your_api_url
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

### Running Locally

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
Shipment-Tracking-Portal/
├── components/          # Reusable UI components
├── pages/               # Next.js pages / routes
│   ├── index.js         # Landing / home page
│   ├── dashboard.js     # Main dashboard
│   ├── track/[id].js    # Shipment tracking page
│   └── api/             # API routes
├── styles/              # Global & module styles
├── utils/               # Helper functions
├── public/              # Static assets
├── .env.local           # Environment variables (not committed)
└── README.md
```

> _Adjust the structure based on your actual project layout._

---

## 🔑 Demo Credentials

If you'd like reviewers or recruiters to explore the app, provide test credentials here:

```
Email:    dhruvil@gmail.com
Password: demo1234
```

---

## 👨‍💻 Author

**Dhruvil Kapadiya**

- 🌐 Portfolio: [dhruvilkapadiya.me](https://dhruvilkapadiya.me)
- 💼 GitHub: [@dhruvil931](https://github.com/dhruvil931)

---

<p align="center">Built by <a href="https://dhruvilkapadiya.me">Dhruvil Kapadiya</a></p>
