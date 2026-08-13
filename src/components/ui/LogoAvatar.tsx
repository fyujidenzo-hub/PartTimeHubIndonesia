import { initials } from '../../lib/utils'

const palettes = [
  'bg-amber-50 text-amber-700 border-amber-200', 'bg-sky-50 text-sky-700 border-sky-200',
  'bg-violet-50 text-violet-700 border-violet-200', 'bg-rose-50 text-rose-700 border-rose-200',
  'bg-emerald-50 text-emerald-700 border-emerald-200',
]

export function LogoAvatar({ name, url, size = 'md' }: { name: string; url?: string | null; size?: 'sm' | 'md' | 'lg' }) {
  const palette = palettes[name.charCodeAt(0) % palettes.length]
  const sizes = size === 'lg' ? 'size-16 rounded-2xl text-lg' : size === 'sm' ? 'size-9 rounded-lg text-xs' : 'size-12 rounded-xl text-sm'
  if (url) return <img src={url} alt={`Logo ${name}`} className={`${sizes} border border-slate-200 bg-white object-cover`} />
  return <div className={`${sizes} ${palette} grid shrink-0 place-items-center border font-extrabold tracking-tight`} aria-label={`Logo ${name}`}>{initials(name)}</div>
}
