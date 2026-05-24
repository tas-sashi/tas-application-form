export function SuccessScreen() {
    return (
        <div className="flex flex-col items-center text-center py-6 sm:py-12 px-4">
  
        {/* Checkmark */}
        <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
            stroke="#1e7d6c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
  
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Application Submitted!</h2>
        <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
          Thank you for applying to the T.A.S VLSI Training Program. We have received
          your application and our team will review it shortly.
        </p>
  
        <div className="bg-gray-50 rounded-xl border border-gray-100 p-5 w-full sm:max-w-sm text-left">
          <h3 className="font-semibold text-gray-800 mb-3 text-sm">What happens next?</h3>
          <ol className="flex flex-col gap-2.5">
            {[
              'Our team reviews your application against eligibility criteria',
              'Shortlisted candidates are categorised by priority',
              'An admin will call you to discuss your application',
              'Selected candidates are invited for a written test & interview',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 font-bold
                  text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
  
      </div>
    )
  }