import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Auth from '../pages/Auth'
import NotFound from '../pages/NotFound'
import UserDashboard from '../pages/UserDashboard'
import AdminDashboard from '../pages/AdminDashboard'
import JobList from '../pages/JobList'
import Apply from '../pages/Apply'
import JobApplicants from '../pages/JobApplicants'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/auth" element={<Auth />} />
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/user" element={<UserDashboard />} />
    <Route path="/jobs" element={<JobList />} />
    <Route path="/apply/:jobId" element={<Apply />} />
    <Route path="/admin/job/:id/applicants" element={<JobApplicants />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
)

export default AppRoutes
