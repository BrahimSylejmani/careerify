// src/services/JobService.js
import { supabase } from '../lib/supabaseClient'

export const fetchJobs = async () => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) console.error('Error fetching jobs:', error.message)
  return data || []
}

export const createJob = async (job) => {
  const { error } = await supabase.from('jobs').insert([job])
  if (error) console.error('Error creating job:', error.message)
  return !error
}

export const updateJob = async (id, updatedJob) => {
  const { error } = await supabase
    .from('jobs')
    .update(updatedJob)
    .eq('id', id)

  if (error) console.error('Error updating job:', error.message)
  return !error
}

export const deleteJob = async (id) => {
  const { error } = await supabase.from('jobs').delete().eq('id', id)
  if (error) console.error('Error deleting job:', error.message)
  return !error
}


export const fetchApplicantsByJob = async (jobId) => {
  const { data, error } = await supabase
    .from("job_applicants_view")
    .select("*")
    .eq("job_id", jobId);

  if (error) {
    console.error("Error fetching applicants:", error);
    return [];
  }

  return data;
};



