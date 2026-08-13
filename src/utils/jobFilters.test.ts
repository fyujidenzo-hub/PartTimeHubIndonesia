import { describe, expect, it } from 'vitest'
import { sampleJobs } from '../data/sampleJobs'
import { filterJobs } from './jobFilters'

const filters = { query: '', location: '', category: '', workType: '', latestOnly: false }

describe('filterJobs', () => {
  it('searches job titles, company names, and locations case-insensitively', () => {
    expect(filterJobs(sampleJobs, { ...filters, query: 'KOPI' }).map((job) => job.id)).toContain('demo-barista')
    expect(filterJobs(sampleJobs, { ...filters, query: 'surabaya' }).map((job) => job.id)).toContain('demo-cashier')
  })

  it('combines location, category, and work type filters', () => {
    const result = filterJobs(sampleJobs, { ...filters, location: 'Bandung', category: 'Retail', workType: 'Part-Time' })
    expect(result).toHaveLength(1)
    expect(result[0].company_name).toBe('Daily Mart')
  })

  it('prioritizes featured jobs in the default ordering', () => {
    const result = filterJobs(sampleJobs, filters)
    expect(result[0].is_featured).toBe(true)
  })
})
