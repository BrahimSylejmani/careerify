// File: src/components/Navbar.jsx

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';

const Navbar = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-700">
          Careerify
        </Link>

        <div className="flex items-center gap-4 text-sm">
          {profile?.role === 'admin' && (
            <Link
              to="/admin"
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
            >
             Dashboard
            </Link>
          )}

          {profile?.role === 'user' && (
            <Link
              to="/user"
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
            >
             Dashboard
            </Link>
          )}

          {profile && (
            <>
              <span className="text-gray-700 font-medium">{profile.name}</span>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 border border-red-500 text-red-600 rounded hover:bg-red-600 hover:text-white transition"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
