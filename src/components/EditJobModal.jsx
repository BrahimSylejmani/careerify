import { useState, useEffect } from "react";

const EditJobModal = ({ job, onClose, onSave }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    job_type: "",
    open_until: "",
  });

  useEffect(() => {
    if (job) {
      setForm({
        title: job.title || "",
        description: job.description || "",
        location: job.location || "",
        job_type: job.job_type || "",
        open_until: job.open_until?.split("T")[0] || "",
      });
    }
  }, [job]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(job.id, form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-xl relative">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Edit Job Posting
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Job title"
            className="w-full border px-4 py-2 rounded"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows={3}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border px-4 py-2 rounded"
          />
          <input
            name="job_type"
            value={form.job_type}
            onChange={handleChange}
            placeholder="Job Type (e.g., Full-time)"
            className="w-full border px-4 py-2 rounded"
          />
          <div className="relative">
            <input
              name="open_until"
              value={form.open_until}
              onChange={handleChange}
              type="date"
              className="w-full border px-4 py-2 rounded pr-20"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none">
              
            </span>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
        {/* Optional close button in corner */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-gray-800 text-xl"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default EditJobModal;
