import { useFormStore } from '../../store/formStore'

export function FailureScreen() {
  const submitError   = useFormStore((s) => s.submitError)
  const setSubmitError = useFormStore((s) => s.setSubmitError)
  const goToStep      = useFormStore((s) => s.goToStep)

  const handleRetry = () => {
    setSubmitError('')
    goToStep(7) // back to summary
  }

  return (
    <div className="flex flex-col items-center text-center py-12 px-4">

      {/* Error icon */}
      <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
          stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-3">Submission Failed</h2>
      <p className="text-gray-500 max-w-md mb-4 leading-relaxed">
        We were unable to submit your application. Your answers have been preserved —
        please try again.
      </p>

      {/* Error detail */}
      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-3 mb-8 max-w-sm">
          <p className="text-sm text-red-700">{submitError}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        {/* Retry */}
        <button onClick={handleRetry} className="btn-primary">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="23 4 23 10 17 10"/>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
          </svg>
          Try Again
        </button>

        {/* Contact support */}
        <a href="mailto:info@tas.org.in" className="btn-secondary">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1
              0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          Contact Support
        </a>
      </div>

    </div>
  )
}
