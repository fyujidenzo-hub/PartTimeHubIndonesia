import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastProvider } from './components/ui/ToastProvider'
import { PublicJobs } from './pages/PublicJobs'

const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then((module) => ({ default: module.AdminDashboard })))

export default function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<PublicJobs />} />
        <Route path="/admin" element={<Suspense fallback={<div className="grid min-h-screen place-items-center bg-[#f7f9f8]"><div className="size-9 animate-spin rounded-full border-2 border-slate-200 border-t-brand-700" /></div>}><AdminDashboard /></Suspense>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ToastProvider>
  )
}
