import { ArrowUpRight, Banknote, Clock3, MapPin } from 'lucide-react'
import { formatRelativeDate } from '../../lib/utils'
import type { Job } from '../../types/job'
import { LogoAvatar } from '../ui/LogoAvatar'

export function JobCard({ job, onOpen, index = 0 }: { job: Job; onOpen: (job: Job) => void; index?: number }) {
  return (
    <article className="animate-fade-up group relative flex flex-col rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,.03)] transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_16px_35px_rgba(15,23,42,.08)] dark:border-white/10 dark:bg-[#121a2c] dark:shadow-black/10 dark:hover:border-brand-500/50 dark:hover:shadow-black/30" style={{ animationDelay: `${Math.min(index * 45, 220)}ms` }}>
      <button className="focus-ring absolute inset-0 rounded-2xl" aria-label={`Lihat detail ${job.title} di ${job.company_name}`} onClick={() => onOpen(job)} />
      <div className="relative pointer-events-none flex items-start justify-between gap-3">
        <LogoAvatar name={job.company_name} url={job.company_logo_url} />
        <div className="flex flex-wrap justify-end gap-1.5">
          {job.is_urgent && <span className="rounded-md bg-rose-50 px-2 py-1 text-[10px] font-extrabold uppercase tracking-[.06em] text-rose-700">Segera</span>}
          {job.is_featured && <span className="rounded-md bg-amber-50 px-2 py-1 text-[10px] font-extrabold uppercase tracking-[.06em] text-amber-700">Pilihan</span>}
        </div>
      </div>
      <div className="relative pointer-events-none mt-4">
        <p className="text-xs font-bold text-brand-700">{job.company_name}</p>
        <h3 className="mt-1 text-lg font-extrabold tracking-[-.02em] text-slate-900 transition-colors group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-300">{job.title}</h3>
        <p className="mt-2.5 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500 dark:text-slate-400">{job.short_description}</p>
      </div>
      <div className="relative pointer-events-none mt-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-600 dark:bg-white/5 dark:text-slate-300"><MapPin className="size-3.5 text-slate-400" />{job.location}</span>
        <span className="rounded-lg bg-brand-50 px-2.5 py-1.5 text-xs font-bold text-brand-700">{job.work_type}</span>
        <span className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-600 dark:bg-white/5 dark:text-slate-300">{job.work_mode}</span>
      </div>
      <div className="relative pointer-events-none mt-5 flex items-end justify-between gap-3 border-t border-slate-100 pt-4 dark:border-white/10">
        <div>
          <p className="flex items-center gap-1.5 text-xs text-slate-400"><Clock3 className="size-3.5" />{formatRelativeDate(job.created_at)}</p>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm font-extrabold text-slate-800 dark:text-slate-100"><Banknote className="size-4 text-brand-600 dark:text-brand-300" />{job.salary_display || 'Gaji kompetitif'}</p>
        </div>
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-slate-900 text-white transition group-hover:bg-brand-700"><ArrowUpRight className="size-4" /></span>
      </div>
    </article>
  )
}
