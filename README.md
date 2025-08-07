# 🧑‍💼 Job Portal Web App

A full-stack job posting platform built with **React 19**, **Tailwind CSS**, and **Supabase**.

This platform allows:
- **Admins** to post jobs, view applicants, and manage listings.
- **Users** to register, apply for jobs, and manage their profile.

---

## 🚀 Features

### 👥 Authentication
- Sign up and login via Supabase Auth
- Role-based access (admin/user)
- Auth state persistence and protected routes

### 🧑‍💼 Admin Dashboard
- Create, update, delete job posts
- View list of applicants per job
- Edit jobs in a modal
- View uploaded CVs and cover letters

### 🙋‍♂️ User Dashboard
- View profile info
- See jobs you've applied to
- Access submitted CVs and cover letters

### 📃 Job Listings
- Public job listing grid with description and "Apply Now" button
- Clean layout with relative time display

---

## 🛠 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **Backend**: Supabase (Database + Auth + Storage)
- **Storage**: Supabase File Storage (for CVs and Cover Letters)
- **Routing**: React Router DOM

---

## 📂 Project Structure

## 🧪 Running the Project Locally

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/job-portal.git
cd job-portal

# Install dependencies
npm install

# Create a .env file and add your Supabase credentials
touch .env

VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Start the app
npm run dev