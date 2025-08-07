import { supabase } from "../lib/supabaseClient";

export const uploadFile = async (file, path) => {
  const { data, error } = await supabase.storage
    .from("documents") 
    .upload(path, file, { upsert: true });

  if (error) throw error;
  return data.path;
};

export const applyToJob = async ({
  userId,
  jobId,
  cvPath,
  coverLetterPath,
}) => {
  const { error } = await supabase.from("applications").insert([
    {
      user_id: userId,
      job_id: jobId,
      cv_url: cvPath,
      cover_letter_url: coverLetterPath,
    },
  ]);
  if (error) throw error;
};

export const getApplicantsForJob = async (jobId) => {
  const { data, error } = await supabase
    .from("job_applicants_view")
    .select("*")
    .eq("job_id", jobId);

  if (error) {
    console.error("Error fetching applicants:", error.message);
    return [];
  }

  return data;
};

