interface PageNavButtonsProps {
    onBack: () => void
    showBack?: boolean
    cameFromReview: boolean
    onSaveToReview: () => void
    onSubmit?: () => void      // ← new, used when page has no wrapping form tag
    nextLabel?: string
  }
  
  export function PageNavButtons({
    onBack,
    showBack = true,
    cameFromReview,
    onSaveToReview,
    onSubmit,
    nextLabel = 'Next',
  }: PageNavButtonsProps) {
    return (
      <div className="flex justify-between items-center mt-8">
        {showBack ? (
          <button type="button" onClick={onBack} className="btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Back
          </button>
        ) : (
          <div />
        )}
  
        <div className="flex items-center gap-3">
          {cameFromReview && (
            <button
              type="button"
              onClick={onSaveToReview}
              className="btn-secondary border-teal-500 text-teal-700
                hover:bg-teal-50 flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
              </svg>
              Save &amp; Return to Review
            </button>
          )}
  
          {/* Use type="button" + onSubmit when page manages its own submit,
              otherwise type="submit" for standard form pages */}
          {onSubmit ? (
            <button type="button" onClick={onSubmit} className="btn-primary">
              {nextLabel}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          ) : (
            <button type="submit" className="btn-primary">
              {nextLabel}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    )
  }