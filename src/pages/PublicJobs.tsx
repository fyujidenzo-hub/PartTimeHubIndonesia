import { ArrowRight, BriefcaseBusiness, Building2, CheckCircle2, ChevronDown, CircleAlert, Filter, MapPin, Moon, Search, ShieldCheck, SlidersHorizontal, Sparkles, Sun, X } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FaInstagram, FaTelegram, FaThreads, FaWhatsapp } from 'react-icons/fa6'
import { JobCard } from '../components/jobs/JobCard'
import { JobDetailDrawer } from '../components/jobs/JobDetailDrawer'
import { JobSkeleton } from '../components/jobs/JobSkeleton'
import { Brand } from '../components/ui/Brand'
import { listPublicJobs } from '../services/jobs'
import { getSiteSettings } from '../services/siteSettings'
import type { Job, JobFilters } from '../types/job'
import { defaultSiteSettings } from '../types/siteSettings'
import { filterJobs } from '../utils/jobFilters'

const initialFilters: JobFilters = { query: '', location: '', category: '', workType: '', latestOnly: false }

export function PublicJobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState<JobFilters>(initialFilters)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [siteSettings, setSiteSettings] = useState(defaultSiteSettings)
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('parttimehub-theme') === 'dark' || (!localStorage.getItem('parttimehub-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches))

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('parttimehub-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const loadJobs = useCallback(async () => {
    setLoading(true); setError('')
    try { setJobs(await listPublicJobs()) }
    catch { setError('Lowongan belum dapat dimuat. Periksa koneksi lalu coba kembali.') }
    finally { setLoading(false) }
  }, [])
  useEffect(() => { void loadJobs() }, [loadJobs])
  useEffect(() => { void getSiteSettings().then(setSiteSettings).catch(() => setSiteSettings(defaultSiteSettings)) }, [])

  const visibleJobs = useMemo(() => filterJobs(jobs, filters), [jobs, filters])
  const locations = useMemo(() => [...new Set(jobs.map((job) => job.location))].sort(), [jobs])
  const categories = useMemo(() => [...new Set(jobs.map((job) => job.category))].sort(), [jobs])
  const companyCount = new Set(jobs.map((job) => job.company_name)).size
  const cityCount = new Set(jobs.map((job) => job.location)).size
  const activeFilterCount = [filters.location, filters.category, filters.workType, filters.latestOnly].filter(Boolean).length
  const updateFilter = <K extends keyof JobFilters>(key: K, value: JobFilters[K]) => setFilters((current) => ({ ...current, [key]: value }))

  return (
    <div id="top" className="min-h-screen bg-[#f7f9f8] transition-colors duration-300 dark:bg-[#0a1020] dark:text-slate-100">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-[#0a1020]/90">
        <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Brand inverse={darkMode} />
          <nav className="hidden items-center gap-7 md:flex" aria-label="Navigasi utama">
            <a href="#lowongan" className="focus-ring rounded text-sm font-bold text-slate-700 hover:text-brand-700 dark:text-slate-200 dark:hover:text-brand-300">Lowongan</a>
            <a href="#tentang" className="focus-ring rounded text-sm font-bold text-slate-500 hover:text-brand-700 dark:text-slate-400 dark:hover:text-brand-300">Tentang kami</a>
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setDarkMode((value) => !value)} className="focus-ring grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-brand-300 hover:text-brand-700 dark:border-white/10 dark:bg-white/5 dark:text-amber-300 dark:hover:bg-white/10" aria-label={darkMode ? 'Gunakan mode terang' : 'Gunakan mode malam'} title={darkMode ? 'Mode terang' : 'Mode malam'}>{darkMode ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}</button>
            <a href="#lowongan" className="focus-ring inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2.5 text-xs font-extrabold text-white transition hover:bg-brand-800 dark:bg-brand-500 dark:text-brand-950 dark:hover:bg-brand-400 sm:px-4"><span className="sm:hidden">Cari</span><span className="hidden sm:inline">Lihat Lowongan</span><ArrowRight className="size-3.5" /></a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-slate-200/70 bg-white transition-colors dark:border-white/10 dark:bg-[#0a1020]">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(178,237,219,.48),transparent_65%)]" />
          <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 sm:pb-14 sm:pt-16 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[.1em] text-brand-800"><Sparkles className="size-3.5" /> Peluang baru setiap minggu</div>
              <h1 className="mt-5 text-[38px] font-black leading-[1.08] tracking-[-.045em] text-slate-950 sm:text-5xl lg:text-[58px] dark:text-white">Cari kerja part-time<br className="hidden sm:block" /> jadi <span className="text-brand-700 dark:text-brand-300">lebih mudah.</span></h1>
              <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-slate-500 sm:text-base dark:text-slate-400">Temukan peluang kerja fleksibel dari berbagai perusahaan di Indonesia dan hubungi perusahaan secara langsung.</p>
            </div>

            <form className="mx-auto mt-8 flex max-w-4xl flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_22px_55px_rgba(15,23,42,.11)] sm:flex-row dark:border-white/10 dark:bg-[#121a2c] dark:shadow-black/30" onSubmit={(event) => { event.preventDefault(); document.querySelector('#lowongan')?.scrollIntoView() }}>
              <label className="flex min-w-0 flex-1 items-center gap-3 rounded-xl px-3.5 py-2.5 transition focus-within:bg-slate-50 dark:focus-within:bg-white/5">
                <Search className="size-5 shrink-0 text-brand-700" />
                <span className="sr-only">Cari posisi, perusahaan, atau kota</span>
                <input value={filters.query} onChange={(event) => updateFilter('query', event.target.value)} className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:font-medium placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500" placeholder="Posisi, perusahaan, atau kota" />
                {filters.query && <button type="button" onClick={() => updateFilter('query', '')} className="focus-ring rounded text-slate-400 hover:text-slate-700" aria-label="Hapus pencarian"><X className="size-4" /></button>}
              </label>
              <div className="hidden w-px bg-slate-200 dark:bg-white/10 sm:block" />
              <label className="relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition focus-within:bg-slate-50 dark:focus-within:bg-white/5 sm:w-[220px]">
                <MapPin className="size-5 shrink-0 text-brand-700" /><span className="sr-only">Pilih lokasi</span>
                <select value={filters.location} onChange={(event) => updateFilter('location', event.target.value)} className="w-full appearance-none bg-transparent pr-5 text-sm font-semibold text-slate-700 outline-none dark:text-slate-200"><option value="">Semua lokasi</option>{locations.map((location) => <option key={location}>{location}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3.5 size-4 text-slate-400" />
              </label>
              <button className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-brand-800">Cari Lowongan <ArrowRight className="size-4" /></button>
            </form>

            <div className="mx-auto mt-8 grid max-w-2xl grid-cols-3 divide-x divide-slate-200 dark:divide-white/10">
              <Stat value={jobs.length} label="Lowongan aktif" />
              <Stat value={companyCount} label="Perusahaan" />
              <Stat value={cityCount} label="Kota & area" />
            </div>
          </div>
        </section>

        <section id="lowongan" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div><p className="text-xs font-extrabold uppercase tracking-[.13em] text-brand-700 dark:text-brand-300">Lowongan terbaru</p><h2 className="mt-2 text-2xl font-black tracking-[-.035em] text-slate-900 sm:text-3xl dark:text-white">Pilih peluang yang cocok untukmu</h2></div>
            <button onClick={() => setMobileFiltersOpen(true)} className="focus-ring relative inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-extrabold text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-200 lg:hidden"><Filter className="size-4" /> Filter {activeFilterCount > 0 && <span className="grid size-5 place-items-center rounded-full bg-brand-700 text-[10px] text-white">{activeFilterCount}</span>}</button>
          </div>

          <div className="mt-7 grid gap-7 lg:grid-cols-[230px_1fr]">
            <aside className="hidden self-start rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#121a2c] lg:sticky lg:top-24 lg:block">
              <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900 dark:text-white"><SlidersHorizontal className="size-4 text-brand-700 dark:text-brand-300" /> Filter lowongan</div>
              <FilterFields filters={filters} locations={locations} categories={categories} onUpdate={updateFilter} />
              {activeFilterCount > 0 && <button onClick={() => setFilters((current) => ({ ...initialFilters, query: current.query }))} className="focus-ring mt-5 w-full rounded-xl border border-slate-200 py-2.5 text-xs font-extrabold text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5">Reset filter</button>}
            </aside>
            <div>
              <div className="mb-4 flex items-center justify-between"><p className="text-sm text-slate-500 dark:text-slate-400"><strong className="font-extrabold text-slate-800 dark:text-white">{visibleJobs.length}</strong> lowongan ditemukan</p><span className="hidden items-center gap-1.5 text-xs font-semibold text-slate-400 sm:flex"><ShieldCheck className="size-4 text-brand-600 dark:text-brand-300" /> Hubungi perusahaan langsung</span></div>
              {loading ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <JobSkeleton key={index} />)}</div>
                : error ? <StateCard icon={<CircleAlert />} title="Terjadi kendala" description={error} action={<button onClick={() => void loadJobs()} className="rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-extrabold text-white">Coba lagi</button>} />
                : visibleJobs.length === 0 ? <StateCard icon={<Search />} title="Tidak ada lowongan yang ditemukan" description="Coba ubah kata kunci atau filter pencarian Anda." action={<button onClick={() => setFilters(initialFilters)} className="rounded-xl bg-brand-700 px-4 py-2.5 text-xs font-extrabold text-white">Hapus semua filter</button>} />
                : <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visibleJobs.map((job, index) => <JobCard key={job.id} job={job} index={index} onOpen={setSelectedJob} />)}</div>}
            </div>
          </div>
        </section>

        <section id="tentang" className="border-y border-slate-200 bg-white transition-colors dark:border-white/10 dark:bg-[#0d1526]">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-[1fr_1.2fr] md:items-center lg:px-8">
            <div><p className="text-xs font-extrabold uppercase tracking-[.13em] text-brand-700 dark:text-brand-300">Kenapa Parttimehub?</p><h2 className="mt-3 text-3xl font-black tracking-[-.04em] text-slate-900 dark:text-white">Mulai lebih cepat.<br />Pilih dengan percaya diri.</h2></div>
            <div className="grid gap-3 sm:grid-cols-3"><Benefit icon={<CheckCircle2 />} title="Terpilih" text="Lowongan yang jelas dan relevan." /><Benefit icon={<Building2 />} title="Langsung" text="Hubungi perusahaan tanpa perantara." /><Benefit icon={<BriefcaseBusiness />} title="Fleksibel" text="Beragam tipe kerja sesuai jadwalmu." /></div>
          </div>
        </section>
      </main>

      <footer className="bg-[#080f2a] text-slate-300">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="h-1 w-full bg-amber-400" />
          <div className="grid gap-11 py-10 text-center md:grid-cols-[1.3fr_.8fr_1fr] md:text-left">
            <div>
              <h2 className="text-2xl font-bold tracking-[-.02em] text-white">Parttimehub Indonesia</h2>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-slate-400 md:mx-0">Kerja fleksibel, rekrutmen cepat, peluang lokal terverifikasi.</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[.22em] text-amber-400">Navigasi</p>
              <nav className="mt-5 flex flex-col items-center gap-3 text-xs font-semibold uppercase tracking-[.16em] text-slate-300 md:items-start" aria-label="Navigasi footer"><a href="#top" className="transition hover:text-amber-300">Home</a><a href="#lowongan" className="transition hover:text-amber-300">Vacancies</a><a href={siteSettings.post_job_url} target="_blank" rel="noreferrer" className="transition hover:text-amber-300">Post a Job</a><a href="#tentang" className="transition hover:text-amber-300">About</a></nav>
            </div>
            <div>
              <p className="text-xs font-bold tracking-[.18em] text-amber-400">Hubungi Kami</p>
              <a href="mailto:official@parttimehubindonesia.com" className="mt-5 block text-sm text-white transition hover:text-amber-300">official@parttimehubindonesia.com</a>
              <p className="mt-3 text-sm text-slate-300">Jakarta & Seluruh Indonesia</p>
              <div className="mt-6 flex justify-center gap-2.5 md:justify-start"><SocialLink href={siteSettings.instagram_url} label="Buka Instagram"><FaInstagram /></SocialLink><SocialLink href={siteSettings.threads_url} label="Buka Threads"><FaThreads /></SocialLink><SocialLink href={siteSettings.telegram_url} label="Buka Telegram"><FaTelegram /></SocialLink><SocialLink href={siteSettings.whatsapp_url} label="Buka WhatsApp"><FaWhatsapp /></SocialLink></div>
            </div>
          </div>
          <div className="border-t border-white/25 pt-7"><div className="flex flex-col gap-5 text-center md:flex-row md:items-end md:justify-between md:text-left"><p className="max-w-xl text-xs leading-6 text-slate-400">© {new Date().getFullYear()} Parttimehub Indonesia — Menghubungkan mahasiswa dan pekerja lepas Indonesia dengan lowongan lokal terpercaya.</p><p className="text-[10px] font-bold uppercase tracking-[.24em] text-amber-400">Kerja fleksibel & rekrutmen cepat</p></div></div>
        </div>
      </footer>
      <JobDetailDrawer job={selectedJob} onClose={() => setSelectedJob(null)} />

      {mobileFiltersOpen && <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filter lowongan"><button className="absolute inset-0 bg-slate-950/40" onClick={() => setMobileFiltersOpen(false)} aria-label="Tutup filter" /><div className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-white p-5 shadow-2xl dark:bg-[#121a2c]"><div className="mx-auto mb-4 h-1 w-10 rounded-full bg-slate-200 dark:bg-white/15" /><div className="flex items-center justify-between"><h2 className="text-lg font-black text-slate-900 dark:text-white">Filter lowongan</h2><button onClick={() => setMobileFiltersOpen(false)} className="grid size-9 place-items-center rounded-xl border border-slate-200 dark:border-white/10"><X className="size-4" /></button></div><FilterFields filters={filters} locations={locations} categories={categories} onUpdate={updateFilter} /><div className="mt-6 flex gap-2"><button onClick={() => setFilters((current) => ({ ...initialFilters, query: current.query }))} className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-extrabold text-slate-600 dark:border-white/10 dark:text-slate-300">Reset</button><button onClick={() => setMobileFiltersOpen(false)} className="flex-[1.5] rounded-xl bg-brand-700 py-3 text-sm font-extrabold text-white">Lihat {visibleJobs.length} Lowongan</button></div></div></div>}
    </div>
  )
}

function Stat({ value, label }: { value: number; label: string }) { return <div className="px-2 text-center"><p className="text-xl font-black tracking-tight text-slate-900 dark:text-white sm:text-2xl">{value}+</p><p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:text-xs">{label}</p></div> }
function FilterFields({ filters, locations, categories, onUpdate }: { filters: JobFilters; locations: string[]; categories: string[]; onUpdate: <K extends keyof JobFilters>(key: K, value: JobFilters[K]) => void }) {
  return <div className="mt-5 space-y-4"><FilterSelect label="Kota / Area" value={filters.location} options={locations} onChange={(value) => onUpdate('location', value)} /><FilterSelect label="Kategori" value={filters.category} options={categories} onChange={(value) => onUpdate('category', value)} /><FilterSelect label="Tipe kerja" value={filters.workType} options={['Part-Time', 'Freelance', 'Temporary', 'Internship']} onChange={(value) => onUpdate('workType', value)} /><label className="flex cursor-pointer items-center justify-between rounded-xl bg-slate-50 p-3 text-xs font-bold text-slate-700 dark:bg-white/5 dark:text-slate-300"><span>Tampilkan terbaru</span><input type="checkbox" checked={filters.latestOnly} onChange={(event) => onUpdate('latestOnly', event.target.checked)} className="size-4 accent-brand-700" /></label></div>
}
function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) { return <label className="block"><span className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-wider text-slate-400">{label}</span><span className="relative block"><select value={value} onChange={(event) => onChange(event.target.value)} className="focus-ring w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-8 text-xs font-bold text-slate-700 outline-none dark:border-white/10 dark:bg-[#182136] dark:text-slate-200"><option value="">Semua</option>{options.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" /></span></label> }
function StateCard({ icon, title, description, action }: { icon: React.ReactNode; title: string; description: string; action: React.ReactNode }) { return <div className="grid min-h-[390px] place-items-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-white/15 dark:bg-[#121a2c]"><div><div className="mx-auto grid size-12 place-items-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400 [&>svg]:size-5">{icon}</div><h3 className="mt-4 font-black text-slate-900 dark:text-white">{title}</h3><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p><div className="mt-5">{action}</div></div></div> }
function Benefit({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <div className="rounded-2xl bg-slate-50 p-4 dark:bg-white/5"><div className="size-5 text-brand-700 dark:text-brand-300 [&>svg]:size-5">{icon}</div><p className="mt-3 text-sm font-extrabold text-slate-900 dark:text-white">{title}</p><p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{text}</p></div> }
function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) { return <a href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} className="focus-ring grid size-10 place-items-center rounded-full border border-white/20 bg-white/5 text-lg text-white transition hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-400 hover:text-[#080f2a]">{children}</a> }
