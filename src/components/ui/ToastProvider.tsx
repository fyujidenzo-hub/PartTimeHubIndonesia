import { CheckCircle2, CircleAlert, X } from 'lucide-react'
import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { ToastContext, type ToastTone } from './toast'

interface Toast { id: number; message: string; tone: ToastTone }

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const toast = useCallback((message: string, tone: ToastTone = 'success') => {
    const id = Date.now()
    setToasts((current) => [...current, { id, message, tone }])
    window.setTimeout(() => setToasts((current) => current.filter((item) => item.id !== id)), 3600)
  }, [])
  const value = useMemo(() => ({ toast }), [toast])
  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2" aria-live="polite">
        {toasts.map((item) => (
          <div key={item.id} className="animate-toast-in flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3.5 text-sm font-semibold text-slate-700 shadow-xl shadow-slate-900/10">
            {item.tone === 'success' ? <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-600" /> : <CircleAlert className="mt-0.5 size-5 shrink-0 text-red-600" />}
            <span className="flex-1 leading-5">{item.message}</span>
            <button className="focus-ring rounded p-0.5 text-slate-400 hover:text-slate-700" onClick={() => setToasts((current) => current.filter((toast) => toast.id !== item.id))} aria-label="Tutup notifikasi"><X className="size-4" /></button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
