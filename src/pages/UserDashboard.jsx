import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';

const UserDashboard = () => {
  const { profile, user } = useAuth();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const { data } = await supabase
        .from('applications')
        .select('*, jobs(title, description)')
        .eq('user_id', profile.id);
      setApplications(data || []);
    };

    if (profile) fetchApplications();
  }, [profile]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
        Welcome to Your Dashboard
      </h1>

      {/* Profile Section */}
      <section className="bg-white border rounded-lg shadow-sm p-6 mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile Information</h2>
        <div className="space-y-2 text-gray-700">
          <p><span className="font-medium">Name:</span> {profile?.name || '-'}</p>
          <p><span className="font-medium">Email:</span> {user?.email || '-'}</p>
        </div>
      </section>

      {/* Applications Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Jobs You've Applied To
        </h2>

        {applications.length === 0 ? (
          <p className="text-gray-600">You haven't applied to any jobs yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {applications.map(app => (
              <div
                key={app.id}
                className="bg-white border rounded-lg p-5 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-blue-700">
                  {app.jobs?.title}
                </h3>
                <p className="text-sm text-gray-700 mt-2 mb-3 line-clamp-3">
                  {app.jobs?.description}
                </p>
                <div className="flex gap-4 text-sm mt-3">
                  <a
                    href={`https://ahfsijluzcthcqkgwkno.supabase.co/storage/v1/object/public/documents/${app.cv_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    📄 View CV
                  </a>
                  <a
                    href={`https://ahfsijluzcthcqkgwkno.supabase.co/storage/v1/object/public/documents/${app.cover_letter_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    ✉️ View Cover Letter
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default UserDashboard;
