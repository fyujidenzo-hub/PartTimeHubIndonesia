import type { Job, JobFilters } from '../types/job'

export function filterJobs(jobs: Job[], filters: JobFilters) {
  const query = filters.query.trim().toLocaleLowerCase('id-ID')
  return jobs
    .filter((job) => {
      const searchable = `${job.title} ${job.company_name} ${job.location}`.toLocaleLowerCase('id-ID')
      return (!query || searchable.includes(query))
        && (!filters.location || job.location === filters.location)
        && (!filters.category || job.category === filters.category)
        && (!filters.workType || job.work_type === filters.workType)
    })
    .sort((a, b) => filters.latestOnly
      ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      : Number(b.is_featured) - Number(a.is_featured) || new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}
