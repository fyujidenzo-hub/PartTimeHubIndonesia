import { sampleJobs } from '../data/sampleJobs'
import { demoModeEnabled, supabase } from '../lib/supabase'
import type { Job, JobFormValues } from '../types/job'

let localJobs = [...sampleJobs]

export async function listPublicJobs(): Promise<Job[]> {
  if (!supabase) return localJobs.filter((job) => job.is_active)
  const { data, error } = await supabase.from('jobs').select('*').eq('is_active', true).order('is_featured', { ascending: false }).order('created_at', { ascending: false })
  if (error) throw error
  if (!data.length && demoModeEnabled) return localJobs.filter((job) => job.is_active)
  return data as Job[]
}

export async function listAdminJobs(): Promise<Job[]> {
  if (!supabase) return localJobs
  const { data, error } = await supabase.from('jobs').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data as Job[]
}

export async function createJob(values: JobFormValues): Promise<Job> {
  if (!supabase) {
    const now = new Date().toISOString()
    const job: Job = { ...values, id: crypto.randomUUID(), created_at: now, updated_at: now }
    localJobs = [job, ...localJobs]
    return job
  }
  const { data, error } = await supabase.from('jobs').insert(values).select().single()
  if (error) throw error
  return data as Job
}

export async function updateJob(id: string, values: Partial<JobFormValues>): Promise<Job> {
  if (!supabase) {
    const existing = localJobs.find((job) => job.id === id)
    if (!existing) throw new Error('Lowongan tidak ditemukan')
    const updated = { ...existing, ...values, updated_at: new Date().toISOString() }
    localJobs = localJobs.map((job) => job.id === id ? updated : job)
    return updated
  }
  const { data, error } = await supabase.from('jobs').update(values).eq('id', id).select().single()
  if (error) throw error
  return data as Job
}

export async function deleteJob(id: string) {
  if (!supabase) { localJobs = localJobs.filter((job) => job.id !== id); return }
  const { error } = await supabase.from('jobs').delete().eq('id', id)
  if (error) throw error
}

export async function uploadCompanyLogo(file: File) {
  if (!supabase) throw new Error('Hubungkan Supabase untuk mengunggah logo.')
  const extension = file.name.split('.').pop()?.toLowerCase() || 'png'
  const path = `${crypto.randomUUID()}.${extension}`
  const { error } = await supabase.storage.from('company-logos').upload(path, file, { upsert: false })
  if (error) throw error
  return supabase.storage.from('company-logos').getPublicUrl(path).data.publicUrl
}
