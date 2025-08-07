import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Home() {
  const navigate = useNavigate()
  const { profile } = useAuth()

  const handleBrowseJobs = () => {
    if (profile) {
      navigate('/jobs')
    } else {
      navigate('/auth')
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-700 via-sky-500 to-cyan-400 text-white text-center px-6">
      <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
        Welcome to the Careerify
      </h1>
      <p className="text-xl md:text-2xl mb-12 max-w-2xl">
        Explore exciting job opportunities and apply with ease.
      </p>

      <button
        onClick={handleBrowseJobs}
        className="bg-white text-blue-700 text-lg md:text-xl font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300"
      >
        Browse Jobs
      </button>
    </div>
  )
}

export default Home
