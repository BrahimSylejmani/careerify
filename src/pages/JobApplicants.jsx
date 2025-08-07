import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getApplicantsForJob } from "../services/applicationService";
import { useAuth } from "../context/AuthContext";

const JobApplicants = () => {
  const { profile, loading } = useAuth();
  const { id: jobId } = useParams();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    if (!loading) {
      if (!profile || profile.role !== "admin") {
        navigate("/");
      } else {
        loadApplicants();
      }
    }
  }, [loading]);

  const loadApplicants = async () => {
    const data = await getApplicantsForJob(jobId);
    setApplicants(data);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Applicants</h1>
      <Link
        to="/admin"
        className="text-blue-600 hover:underline text-sm mb-4 block"
      >
        ← Back to Dashboard
      </Link>

      <div className="space-y-4">
        {applicants.map((applicant) => (
          <div key={applicant.id} className="border rounded p-4 bg-white">
            <p className="font-medium text-lg">{applicant.full_name}</p>
            <p className="text-sm text-gray-600 mb-2">{applicant.email}</p>

            <div className="space-x-4 mt-2">
              <a
                href={`https://YOUR_PROJECT_ID.supabase.co/storage/v1/object/public/documents/${applicant.cv_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View CV
              </a>
              <a
                href={`https://YOUR_PROJECT_ID.supabase.co/storage/v1/object/public/documents/${applicant.cover_letter_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Cover Letter
              </a>
            </div>
          </div>
        ))}

        {applicants.length === 0 && (
          <p className="text-gray-500 text-sm">No applicants yet.</p>
        )}
      </div>
    </div>
  );
};

export default JobApplicants;
