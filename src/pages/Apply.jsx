// File: src/pages/Apply.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import { uploadFile, applyToJob } from "../services/applicationService";

const Apply = () => {
  const { profile } = useAuth();
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [cv, setCv] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [message, setMessage] = useState("");
  const [fullName, setFullName] = useState(profile?.name || "");
  const [dob, setDob] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", jobId)
        .single();
      if (!error) setJob(data);
    };
    fetchJob();
  }, [jobId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Submitting...");
    try {
      const cvPath = await uploadFile(
        cv,
        `cv/${profile.id}-${jobId}-${cv.name}`
      );
      const coverLetterPath = await uploadFile(
        coverLetter,
        `cover_letters/${profile.id}-${jobId}-${coverLetter.name}`
      );

      await applyToJob({
        userId: profile.id,
        jobId,
        name: fullName,
        dob,
        cvPath,
        coverLetterPath,
      });

      setMessage("✅ Application submitted successfully!");
    } catch (err) {
      console.error(err);
      setMessage("❌ There was an error. Please try again.");
    }
  };

  if (!job) return <p className="text-center mt-10 text-gray-600">Loading job...</p>;

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">{job.title}</h1>
      <p className="mb-8 text-gray-700">{job.description}</p>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-lg shadow-md border">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload CV</label>
          <input
            type="file"
            required
            onChange={(e) => setCv(e.target.files[0])}
            className="block text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Cover Letter</label>
          <input
            type="file"
            required
            onChange={(e) => setCoverLetter(e.target.files[0])}
            className="block text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition"
        >
          Submit Application
        </button>
      </form>

      {message && (
        <p className="mt-6 text-center text-sm text-gray-700">{message}</p>
      )}
    </div>
  );
};

export default Apply;
