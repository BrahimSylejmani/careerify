import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/NavBar'

function LayoutWrapper() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Don’t show Navbar on landing if you want it minimal */}
      {!isHome && <Navbar />}

      {/* Fullscreen: remove padding for Home only */}
      <main className={isHome ? '' : 'max-w-6xl mx-auto px-4 py-6'}>
        <AppRoutes />
      </main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  )
}

export default App
