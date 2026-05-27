<div align="center">

<img src="https://capsule-render.vercel.app/api?type=venom&color=0:0F0F0F,50:E50914,100:0F0F0F&height=240&section=header&text=CINEPRESTIGE&fontSize=70&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=A%20Premium%20Cinematic%20Ticketing%20Platform&descSize=22&descAlignY=62&descAlign=50"/>

<h3>🍿 A High-Performance, Full-Stack Movie Booking Architecture ⚡</h3>

<p><em>Powered by Angular 17 • Spring Boot • Spring Security • MySQL • Docker</em></p>

<p>
  <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white&labelColor=000000"/>
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white&labelColor=000000"/>
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white&labelColor=000000"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white&labelColor=000000"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white&labelColor=000000"/>
</p>

<p>
  <img src="https://img.shields.io/badge/Architecture-Microservices_Ready-E50914?style=for-the-badge&labelColor=000000"/>
  <img src="https://img.shields.io/badge/Security-JWT_Authentication-00C853?style=for-the-badge&labelColor=000000"/>
  <img src="https://img.shields.io/badge/Deployment-Render_Cloud-4285F4?style=for-the-badge&labelColor=000000"/>
</p>

</div>

---

## 🌟 Overview (For Recruiters & Engineering Managers)

**CinePrestige** is an enterprise-grade, full-stack Movie Booking Application engineered to deliver a seamless, high-end user experience reminiscent of premium streaming platforms. It demonstrates full-stack proficiency, combining a robust, secure **Java Spring Boot backend** with a highly dynamic, animated **Angular 17 frontend**.

### 💼 Technical Highlights for Recruiters:
- **Cloud-Native & Containerized**: Backend is fully containerized using **Docker** and deployed on Render Cloud, ensuring environment consistency from local development to production.
- **Advanced State & UI/UX**: Implemented complex front-end features including **Skeleton UI loading states**, dynamic 3D CSS carousels, and staggered cinematic entry animations to eliminate layout shift and provide a premium feel.
- **Secure Architecture**: Implemented **Spring Security** with **JWT (JSON Web Tokens)** for stateless authentication. Strict Role-Based Access Control (RBAC) securely separates `USER` and `ADMIN` privileges at both the API and routing levels.
- **Database Optimization**: Engineered relational mappings using Hibernate/JPA connected to a live **Aiven MySQL** database, handling complex associations between Theatres, Screens, Movies, and dynamic Seat Bookings.
- **Performance Engineering**: Utilized local caching strategies (stale-while-revalidate) and optimized asynchronous API calls via RxJS to drastically reduce Time-to-Interactive (TTI).

---

## ✨ Key Features

<table>
  <tr>
    <td width="50%">
      <h3>🔐 Role-Based Portals</h3>
      <p>Strictly separated User and Admin interfaces. Admins manage inventory (Theatres, Screens, Movies) while Users browse and book. Enforced via Route Guards and JWT validation.</p>
    </td>
    <td width="50%">
      <h3>🎟️ Dynamic Seat Matrix</h3>
      <p>Real-time visual seat selection engine. Dynamically calculates pricing across tiers (VIP, Premium, Standard) based on backend configurations.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🎬 Cinematic 3D Carousel</h3>
      <p>Custom-built, performant 3D stacked coverflow using CSS transforms and Angular state management for an immersive discovery experience.</p>
    </td>
    <td width="50%">
      <h3>⏳ Premium Skeleton UI</h3>
      <p>Zero-layout-shift loading architecture. Beautiful pulsing wireframes keep users engaged while backend data resolves, transitioning seamlessly into content.</p>
    </td>
  </tr>
</table>

---

## 📸 Application Showcase

### 🏠 1. Cinematic Home Page
*A highly immersive, dark-themed discovery feed featuring a 3D interactive carousel, category filters, and advanced skeleton loading.*
<div align="center">
  <img src="https://github.com/user-attachments/assets/7e293311-ae3d-468f-a534-3d3c775b5761" width="95%" alt="Home Page"/>
</div>

<br/>

### 🔍 2. Quick View Modal
*Instant metadata retrieval (resolving Theatre and City data synchronously) presented in a stunning pop-in glassmorphism modal.*
<div align="center">
  <img src="https://github.com/user-attachments/assets/37d1ecce-a64a-46bc-a352-c2de92f8e795" width="95%" alt="Quick View Modal"/>
</div>

<br/>

### 🎟️ 3. Dynamic Seat Booking Engine
*Interactive seat matrix featuring staggered cascade entry animations, real-time total calculation, and multi-tier pricing support.*
<div align="center">
  <img src="https://github.com/user-attachments/assets/bbc4aaef-c660-4d94-aee5-efa11b0a094c" width="95%" alt="Seat Booking Engine"/>
</div>

<br/>

### 📜 4. User Booking History
*A clean, tabular interface for users to track and manage their historical ticketing transactions.*
<div align="center">
  <img src="https://github.com/user-attachments/assets/d259bd56-807f-400a-b6be-91516f12a2fa" width="95%" alt="User Bookings"/>
</div>

<br/>

### ⚙️ 5. Secure Admin Dashboard
*A protected management portal for Administrators and Theatre Owners to configure screens, onboard movies, and monitor bookings.*
<div align="center">
  <img src="https://github.com/user-attachments/assets/82b8b522-791b-4686-8dee-be28aad5ca43" width="95%" alt="Admin Portal"/>
</div>

---

## 🏗️ Technical Architecture

```text
                ┌─────────────────────────────┐
                │     👤 USER / ADMIN         │
                └──────────────┬──────────────┘
                               │ HTTP/HTTPS
                               ▼
        ╔══════════════════════════════════════════════╗
        ║          🎨 ANGULAR 17 FRONTEND              ║
        ║  (TailwindCSS, RxJS, Route Guards, Caching)  ║
        ╚══════════════════════════════════════════════╝
                               │
                               │ REST API (JSON) + JWT
                               ▼
        ╔══════════════════════════════════════════════╗
        ║         ⚙️ SPRING BOOT REST BACKEND          ║
        ║ (Spring Security, Hibernate JPA, Controller) ║
        ╚══════════════════════════════════════════════╝
                               │
                               │ TCP/IP (JDBC)
                               ▼
                ┌─────────────────────────────┐
                │     🗄️ AIVEN MYSQL DB        │
                │  (Relational Data Storage)  │
                └─────────────────────────────┘
```

---

## 🛠️ Tech Stack & Tools

| Layer | Technology | Purpose |
|:---|:---|:---|
| ⚛️ **Frontend** | `Angular 17`, `TypeScript` | Component-based SPA framework |
| 🎨 **Styling** | `TailwindCSS` | Utility-first responsive design & animations |
| ⚙️ **Backend** | `Java 17`, `Spring Boot 3` | Robust REST API architecture |
| 🔐 **Security** | `Spring Security`, `JWT` | Stateless authentication & authorization |
| 🗄️ **Database** | `MySQL` (Aiven Cloud) | Persistent relational data storage |
| 🐳 **DevOps** | `Docker`, `Render Cloud` | Containerized build and deployment |

---

## 👨‍💻 Author

<div align="center">

### **Mohammed Ameer Khan**
*Full Stack Software Engineer • Ex-Google Apprentice • AI Builder*

<p>
  <a href="https://www.linkedin.com/in/mohammed-ameerkhan-22368626a/">
    <img src="https://img.shields.io/badge/LinkedIn-CONNECT-0077B5?style=for-the-badge&logo=linkedin&logoColor=white&labelColor=000000"/>
  </a>
  <a href="mailto:ameerkhan20241a0497@gmail.com">
    <img src="https://img.shields.io/badge/Email-REACH%20OUT-D14836?style=for-the-badge&logo=gmail&logoColor=white&labelColor=000000"/>
  </a>
  <a href="https://github.com/ameer2402">
    <img src="https://img.shields.io/badge/GitHub-FOLLOW-181717?style=for-the-badge&logo=github&logoColor=white&labelColor=000000"/>
  </a>
  <a href="https://portfolio-frontend-rho-blond.vercel.app/">
    <img src="https://img.shields.io/badge/Portfolio-EXPLORE-FF5722?style=for-the-badge&logo=googlechrome&logoColor=white&labelColor=000000"/>
  </a>
</p>

</div>

<div align="center">

### ⭐ If this project demonstrates the engineering quality you're looking for, feel free to **reach out!** 🚀

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:E50914,50:0F0F0F,100:E50914&height=140&section=footer&text=Built%20with%20%E2%9A%A1%20by%20Ameer%20Khan&fontSize=22&fontColor=ffffff&animation=twinkling&fontAlignY=70"/>

</div>
