import { BriefcaseBusiness } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

export function Brand({ compact = false, inverse = false, country = true }: { compact?: boolean; inverse?: boolean; country?: boolean }) {
  return (
    <Link to="/" className={cn('focus-ring inline-flex items-center gap-2.5 rounded-lg font-extrabold tracking-[-.03em]', inverse ? 'text-white' : 'text-slate-900')} aria-label="Parttimehub Indonesia — Beranda">
      <span className={cn('grid size-9 place-items-center rounded-xl shadow-sm', inverse ? 'bg-white text-brand-700' : 'bg-brand-700 text-white')}><BriefcaseBusiness className="size-[19px]" strokeWidth={2.4} /></span>
      {!compact && <span className="text-[19px]">Parttime<span className={inverse ? 'text-brand-200' : 'text-brand-700'}>hub</span>{country && <span className="ml-1 hidden text-[11px] font-bold uppercase tracking-[.12em] text-slate-400 sm:inline">Indonesia</span>}</span>}
    </Link>
  )
}
