# 🏗️ Public Issue Reporting System

A comprehensive digital platform that enables citizens to report public infrastructure issues and allows government authorities to efficiently manage, track, and resolve them.

---

## 🌐 Live Demo
**Live Site:** https://city-fix-bappy.netlify.app/

---

## 👥 Test Credentials

### 🔑 Admin Access
- **Email:** admin@mail.com  
- **Password:** 123456aA@

### 🧑‍💼 Staff Access
- **Email:** staff@mail.com  
- **Password:** 123456aA@

### 🧑 Citizen Access
- **Email:** fari1@mail.com 
- **Password:** 123456aA@

---

## 🚀 Key Features

### 👤 For user
- **Issue Reporting:** Submit detailed reports including photos, descriptions, and location data  
- **Issue Tracking:** Track issue progress using a real-time timeline view  
- **Priority Boost:** Pay 100 Taka to prioritize urgent issues  
- **Upvote System:** One-time upvote to support important issues  
- **Premium Subscription:** Unlimited issue submissions for 1000 Taka  

### 🧑‍💼 For  Staff
- **Issue Management:** View and update assigned issues  
- **Progress Tracking:** Add updates and mark issues as resolved  
- **Dashboard Analytics:** View assigned issue counts and performance stats  

### 🛡️ For Administrators
- **Full System Control:** Manage users, staff, and all reported issues  
- **Staff Management:** Create, update, and delete staff accounts  
- **User Management:** Block/unblock citizens and view subscription status  
- **Payment Monitoring:** Track boost and subscription payments  
- **Assignment System:** Assign issues to staff members  
- **Advanced Analytics:** Interactive charts and system insights  

---

## ⚙️ Platform Features
- **Real-time Updates:** Instant UI updates using TanStack Query  
- **Secure Authentication:** JWT-based authentication with role-based access  
- **Responsive Design:** Mobile, tablet, and desktop-friendly UI  
- **PDF Generation:** Downloadable invoices and payment receipts  
- **Advanced Filtering:** Server-side search and filtering  
- **Pagination:** Efficient data loading for better performance  

---

## 🛠️ Technology Stack

### Frontend
- React (Hooks)
- TanStack Query
- Tailwind CSS
- React Router
- Axios
- jsPDF

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- JWT Authentication
- Firebase Authentication
- Stripe Payment Gateway

### Deployment
- **Client:** Firebase Hosting  
- **Server:** Vercel / Render  
- **Database:** MongoDB Atlas  

---

## 📱 How It Works

### 🧑 Citizen Flow
1. Citizen submits an issue with details and images  
2. Admin reviews and validates the issue  
3. Admin assigns the issue to a staff member  
4. Staff works on the issue  
5. Citizen tracks progress through timeline  
6. Issue is resolved and closed  

### 🧑‍💼 Staff Flow
1. Receive assigned issues  
2. Update issue progress  
3. Mark issue as resolved  
4. System logs all actions  

### 🛡️ Admin Flow
1. Monitor all system activities  
2. Manage users and staff  
3. Assign issues to staff  
4. View analytics and performance reports  

---

## 🔒 Security Features
- Role-Based Access Control (Citizen, Staff, Admin)  
- JWT-protected private routes  
- Secure environment variables  
- Server-side input validation  
- Encrypted Stripe payment processing  

---

## 🗄️ System Architecture

### Database Collections
- Users (Citizens, Staff, Admins)  
- Issues (with timeline tracking)  
- Payments (Boost & Premium)  
- Staff Assignments  
- Activity Logs  

### API Endpoints
- Authentication APIs  
- Issue CRUD operations  
- Payment processing  
- User management  
- Analytics and reporting  

---

## 🎯 Unique Selling Points
- **Transparency:** Full visibility of issue resolution  
- **Efficiency:** Faster government response through automation  
- **Accountability:** Timeline-based activity tracking  
- **Accessibility:** Mobile-first design  
- **Scalability:** Suitable for city-wide infrastructure management  

---

## 📈 Business Impact
- **Citizens:** Faster resolution of everyday infrastructure problems  
- **Government:** Efficient resource allocation and staff monitoring  
- **City Management:** Data-driven planning and decision-making  

---

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)  
- MongoDB Atlas account  
- Firebase project  
- Stripe account  

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/your-repo-name.git

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install

Environment Variables

Create .env files in both client and server folders.

Server .env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GOOGLE_APPLICATION_CREDENTIALS
STRIPE_SECRET_KEY=your_stripe_secret_key

Client .env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key

🚀 Deployment
Client Deployment (Firebase)
npm run build
firebase deploy

Server Deployment (Vercel)

Connect GitHub repository

Add environment variables

Enable automatic CI/CD

📝 License

This project was developed as part of a web development challenge.
All rights reserved by the developers.

👥 Contributors

Kawser Bappy

Add other contributors here

🙏 Acknowledgments

Challenge organizers

Open-source community

Test users for valuable feedback


---

If you want, I can also:
- ⭐ Optimize this README for **portfolio / job applications**
- 🖼️ Add **screenshots & GIF sections**
- ✍️ Rewrite in **simple English (IELTS-friendly)**

Just tell me what you want next 🚀
