// File: src/pages/JobList.jsx

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const JobList = () => {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching jobs:', error.message)
      } else {
        setJobs(data)
      }
    }

    fetchJobs()
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Available Job Positions</h1>

      {jobs.length === 0 ? (
        <p className="text-gray-500 text-center">No job postings available at the moment.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-blue-800">{job.title}</h2>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">{job.description}</p>

                <div className="flex flex-wrap gap-2 mt-4 text-xs text-gray-600">
                  {job.location && (
                    <span className="bg-gray-100 px-2 py-1 rounded-full border text-gray-700">
                      📍 {job.location}
                    </span>
                  )}
                  {job.job_type && (
                    <span className="bg-gray-100 px-2 py-1 rounded-full border text-gray-700">
                      🕒 {job.job_type}
                    </span>
                  )}
                  {job.open_until && (
                    <span className="bg-gray-100 px-2 py-1 rounded-full border text-gray-700">
                      📅 Open until: {job.open_until.split("T")[0]}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <p className="text-xs text-gray-400">
                  Posted {dayjs(job.created_at).fromNow()}
                </p>
                <Link
                  to={`/apply/${job.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded shadow"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default JobList
