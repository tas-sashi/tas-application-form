import { useRef } from 'react'
import { FormWizard } from './components/FormWizard'

export default function App() {
  const formCardRef = useRef<HTMLDivElement>(null)

  const scrollToForm = () => {
    formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-teal-50 flex flex-col">

      {/* ── NAVBAR ── */}
      <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 relative flex items-center justify-between">

          {/* Logo — left */}
          <div className="flex items-center gap-2 z-10 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-bold text-gray-900 text-sm tracking-tight hidden sm:block">
              T.A.S
            </span>
          </div>

          {/* Centered heading */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-20">
            <h1 className="text-sm sm:text-lg font-bold text-teal-700 tracking-tight text-center leading-tight">
              Apply for VLSI Front End Training
            </h1>
          </div>

          {/* Back link — right */}
          
            <a href="https://www.advanceskilltrust.in"
            className="flex items-center gap-1.5 text-sm font-medium text-teal-700
              hover:text-teal-900 transition-colors group z-10 flex-shrink-0"
          >
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
              className="transition-transform group-hover:-translate-x-0.5"
            >
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            <span className="hidden sm:inline">Back to T.A.S Website</span>
            <span className="sm:hidden text-xs">Back</span>
          </a>

        </div>
      </nav>

      {/* ── COMPACT BANNER ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse flex-shrink-0" />
          <p className="text-sm text-gray-500">
            Complete the application below to be considered for our free, full-time
            6-month VLSI training program.{' '}
            <span className="font-semibold text-teal-700">20 seats per batch.</span>
          </p>
        </div>
      </div>

      {/* ── FORM ── */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full">
        <div ref={formCardRef} className="scroll-mt-16">
          <FormWizard scrollToForm={scrollToForm} />
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="mt-auto border-t border-gray-100 bg-white py-5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row
          items-center justify-between gap-2 text-xs text-gray-400">
          <span>© {new Date().getFullYear()} Trust for Advanced Skills. All rights reserved.</span>
          <div className="flex items-center gap-2">
            <a href="mailto:contact@advanceskilltrust.in" className="text-teal-600 hover:underline">
              contact@advanceskilltrust.in
            </a>
            <span>|</span>
            <a href="tel:+918341108696" className="text-teal-600 hover:underline">
              +91 83411 08696
            </a>
          </div>
        </div>
      </footer>

    </div>
  )
}