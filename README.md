<div align="center">

# 🛠️ Nova Admin Panel

### Administration Dashboard for the Nova E-Learning Platform

*A modern admin dashboard designed to manage courses, users, blogs, schedules, mentors, and platform content with a clean and scalable interface.*

<br>

<img src="./docs/banner.png" alt="Nova Admin Banner"/>

</div>

---

## 📖 About
> 🔗 This is the admin dashboard for the [Nova E-Learning Platform](https://github.com/react-summer-1404/Nova).
Nova Admin Panel is the management dashboard for the Nova e-learning platform. It gives administrators and mentors full control over courses, users, academic structure, and content — all from a single, responsive interface.

<br/>

## 🗂️ Modules Overview

| Module | Description |
|---------|-------------|
| 📊 Dashboard | Platform statistics, reports, and analytics overview |
| 👥 Users | Manage users, view details, assign roles |
| 📚 Courses | Create, edit, and organize courses via a multi-step wizard |
| 📰 Blogs & News | Manage educational articles and news content |
| 💬 Comments | Moderate user comments |
| 👨‍🏫 Mentors | Manage mentor profiles |
| 📅 Schedules | Manage class schedules |
| 🏢 Departments | Manage academic departments |
| 🎓 Terms & Levels | Manage academic terms and course levels |
| 🎯 Technologies | Manage technology/skill categories |

<br/>

## ✨ Key Features

- **JWT authentication** with protected, role-based routes
- **Multi-step course creation wizard**
- **AI-powered text correction** for content editing
- **Interactive maps** (Leaflet) for location-based data
- **Rich text editing** via Editor.js
- **Fully responsive** dashboard layout

<br/>

## 🛠 Tech Stack

### ⚛️ Frontend
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

### 🎨 UI & Styling
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![Reactstrap](https://img.shields.io/badge/Reactstrap-512BD4?style=for-the-badge)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Vuexy](https://img.shields.io/badge/Vuexy_Admin_Template-7367F0?style=for-the-badge)

### 📝 Forms & Editors
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![Yup](https://img.shields.io/badge/Yup-111827?style=for-the-badge)
![Editor.js](https://img.shields.io/badge/Editor.js-000000?style=for-the-badge&logo=editor.js&logoColor=white)

### 🔧 Tools & Services
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)
![React Toastify](https://img.shields.io/badge/React_Toastify-FFDD00?style=for-the-badge)

<br/>

## 📷 Screenshots

### Dashboard
<img src="./docs/dashboard.png" width="100%"/>

### User Management
<img src="./docs/users.png" width="100%"/>

### Course Management
<img src="./docs/courses.png" width="100%"/>

### Blog Management
<img src="./docs/blogs.png" width="100%"/>

<br/>

## 📂 Project Structure

```text
src
├── @core            # Core components, layouts and utilities
├── assets           # Static assets
├── configs          # Application configuration
├── core             # API services, hooks and storage
├── layouts          # Dashboard layouts
├── navigation       # Sidebar and navigation configuration
├── pages            # Authentication and general pages
├── redux            # Global state management
├── router           # Application routing
├── utility          # Helper functions
├── views            # Main application modules
└── index.js
```
<br/>

## 🚀 Getting Started

### Prerequisites

- **Node.js** v20 or later
- **npm** (or another compatible package manager such as pnpm)

### 1. Clone the Repository

```bash
git clone https://github.com/react-summer-1404/Nova-admin-panel
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=https://sepehracademy.liara.run
```

| Variable | Description | Required |
|-----------|-------------|----------|
| `VITE_API_URL` | Base URL of the backend API | ✅ |



### 4. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### 5. Build for Production

```bash
npm run build
```

### 6. Preview the Production Build

```bash
npm run preview
```
<br/>

## 👥 Team

Nova was collaboratively developed by a team of developers as an educational software project, covering frontend architecture, UI implementation, and API integration for a modern programming e-learning platform.

---

<div align="center">

Made with ❤️ by **Nova Team**

⭐ If you like this project, consider giving it a star on GitHub.

</div>
