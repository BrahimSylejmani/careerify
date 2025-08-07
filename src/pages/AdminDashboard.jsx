import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  fetchJobs,
  createJob,
  deleteJob,
  updateJob,
  fetchApplicantsByJob,
} from "../services/JobService";
import EditJobModal from "../components/EditJobModal";

const AdminDashboard = () => {
  const { profile, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("create");
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    job_type: "",
    open_until: "",
  });
  const [editingJob, setEditingJob] = useState(null);
  const [applicantsMap, setApplicantsMap] = useState({});
  const [showApplicantsFor, setShowApplicantsFor] = useState(null);

  useEffect(() => {
    if (!loading) {
      if (!profile || profile.role !== "admin") {
        navigate("/");
      } else {
        loadJobs();
      }
    }
  }, [profile, loading]);

  const loadJobs = async () => {
    const allJobs = await fetchJobs();
    setJobs(allJobs);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    await createJob({ ...form, created_by: profile.id });
    setForm({
      title: "",
      description: "",
      location: "",
      job_type: "",
      open_until: "",
    });
    loadJobs();
    setActiveTab("view");
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this job?")) {
      await deleteApplicationsByJobId(id);
      await deleteJob(id);
      loadJobs();
    }
  };

  const handleEdit = (job) => setEditingJob(job);

  const handleUpdate = async (id, updatedData) => {
    await updateJob(id, updatedData); 
    setEditingJob(null);
    loadJobs(); 
  };

  const handleViewApplicants = async (jobId) => {
    if (showApplicantsFor === jobId) {
      setShowApplicantsFor(null);
      return;
    }
    const applicants = await fetchApplicantsByJob(jobId);
    setApplicantsMap((prev) => ({ ...prev, [jobId]: applicants }));
    setShowApplicantsFor(jobId);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

      {/* Toggle Tabs */}
      <div className="flex justify-center gap-6 mb-8">
        <button
          onClick={() => setActiveTab("create")}
          className={`px-6 py-2 rounded-full font-medium transition ${
            activeTab === "create"
              ? "bg-blue-600 text-white shadow"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          Create Job Post
        </button>
        <button
          onClick={() => setActiveTab("view")}
          className={`px-6 py-2 rounded-full font-medium transition ${
            activeTab === "view"
              ? "bg-blue-600 text-white shadow"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          View Jobs
        </button>
      </div>

      {/* Create Job Form */}
      {activeTab === "create" && (
        <form
          onSubmit={handleCreate}
          className="bg-white rounded-lg shadow-lg p-6 space-y-5"
        >
          {/* [Form mapping unchanged] */}
          {[
            {
              label: "Title",
              name: "title",
              type: "text",
              placeholder: "Job Title",
              required: true,
            },
            {
              label: "Description",
              name: "description",
              type: "textarea",
              placeholder: "Job description and responsibilities",
            },
            {
              label: "Location",
              name: "location",
              type: "text",
              placeholder: "Location (e.g., New York)",
            },
            {
              label: "Job Type",
              name: "job_type",
              type: "text",
              placeholder: "e.g., Full-time, Part-time",
            },
            {
              label: "Open Until",
              name: "open_until",
              type: "date",
              placeholder: "dd.mm.yyyy",
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  rows={4}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              ) : (
                <input
                  name={field.name}
                  type={field.type}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  required={field.required}
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
          >
            Post Job
          </button>
        </form>
      )}

      {/* Jobs List */}
      {activeTab === "view" && (
        <div className="space-y-6 mt-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg shadow-md p-5 border"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-blue-800">
                    {job.title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-700">
                    {job.description}
                  </p>
                  <div className="text-sm text-gray-600 mt-2 space-y-1">
                    <p>📍 Location: {job.location || "-"}</p>
                    <p>🕒 Type: {job.job_type || "-"}</p>
                    <p>📅 Open Until: {job.open_until?.split("T")[0] || "-"}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-6 mt-1">
                  <button
                    onClick={() => handleEdit(job)}
                    className="border border-blue-600 text-blue-600 px-4 py-1 rounded hover:bg-blue-50"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="border border-red-600 text-red-600 px-4 py-1 rounded hover:bg-red-50"
                  >
                    🗑 Delete
                  </button>
                  <button
                    onClick={() => handleViewApplicants(job.id)}
                    className="border border-green-600 text-green-600 px-4 py-1 rounded hover:bg-green-50"
                  >
                    {showApplicantsFor === job.id
                      ? "Hide Applicants"
                      : "View Applicants"}
                  </button>
                </div>
              </div>

              {showApplicantsFor === job.id &&
                applicantsMap[job.id] &&
                applicantsMap[job.id].length > 0 && (
                  <div className="mt-5 bg-gray-50 border-t pt-4 px-4 rounded">
                    <h3 className="font-semibold mb-3 text-gray-800 text-lg">
                      Applicants
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {applicantsMap[job.id].map((applicant) => (
                        <div
                          key={applicant.id}
                          className="border rounded-lg p-4 bg-white shadow-sm"
                        >
                          <p className="text-sm text-gray-700 mb-1">
                            <strong>Name:</strong> {applicant.name || "-"}
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Email:</strong> {applicant.email || "-"}
                          </p>
                          <div className="flex gap-3 text-sm">
                            <a
                              href={`https://ahfsijluzcthcqkgwkno.supabase.co/storage/v1/object/public/documents/${applicant.cv_url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              📄 CV
                            </a>
                            <a
                              href={`https://ahfsijluzcthcqkgwkno.supabase.co/storage/v1/object/public/documents/${applicant.cover_letter_url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              ✉️ Cover Letter
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingJob && (
        <EditJobModal
          job={editingJob}
          onClose={() => setEditingJob(null)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
