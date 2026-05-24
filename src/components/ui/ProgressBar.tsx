import type { StepMeta } from '../../types/form.types'

interface ProgressBarProps {
  steps: StepMeta[]
  currentStep: number
  onStepClick: (step: number) => void
  completedSteps: Set<number>
  reviewUnlocked: boolean
  summaryStep: number
}

export function ProgressBar({
  steps,
  currentStep,
  onStepClick,
  completedSteps,
  reviewUnlocked,
  summaryStep,
}: ProgressBarProps) {
  const isAccessible = (idx: number) => {
    if (idx === summaryStep) return reviewUnlocked
    return completedSteps.has(idx) || idx <= currentStep
  }

  return (
    <div className="w-full">
      {/* Mobile */}
      <div className="flex sm:hidden items-center justify-between mb-1">
        <span className="text-xs font-semibold text-teal-700">
          Step {currentStep + 1} of {steps.length}
        </span>
        <span className="text-xs text-gray-500">{steps[currentStep]?.title}</span>
      </div>
      <div className="sm:hidden w-full bg-gray-200 rounded-full h-1.5 mb-4">
        <div
          className="bg-teal-600 h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Desktop */}
      <div className="hidden sm:flex items-center w-full mb-8">
        {steps.map((step, idx) => {
          const isCompleted = completedSteps.has(idx)
          const isActive    = idx === currentStep
          const accessible  = isAccessible(idx)
          const isReview    = idx === summaryStep
          const locked      = isReview && !reviewUnlocked

          return (
            <div key={step.id} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => accessible && onStepClick(idx)}
                disabled={!accessible}
                title={locked ? 'Complete all pages to unlock' : undefined}
                className="flex flex-col items-center gap-1 disabled:cursor-not-allowed"
              >
                <div className={`
                  w-9 h-9 rounded-full flex items-center justify-center
                  font-bold text-sm transition-all duration-200 border-2
                  ${locked
                    ? 'bg-gray-50 border-gray-200 text-gray-300'
                    : isCompleted
                    ? 'bg-teal-600 border-teal-600 text-white'
                    : isActive
                    ? 'bg-white border-teal-600 text-teal-700 shadow-md'
                    : 'bg-white border-gray-300 text-gray-400'}
                `}>
                  {locked ? (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  ) : isCompleted ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  ) : (
                    idx + 1
                  )}
                </div>
                <span className={`
                  text-xs font-medium whitespace-nowrap
                  ${locked
                    ? 'text-gray-300'
                    : isActive
                    ? 'text-teal-700'
                    : isCompleted
                    ? 'text-teal-600'
                    : 'text-gray-400'}
                `}>
                  {step.title}
                </span>
              </button>

              {idx < steps.length - 1 && (
                <div className="flex-1 mx-2 -mt-5">
                  <div className={`h-0.5 transition-all duration-500 ${
                    isCompleted ? 'bg-teal-500' : 'bg-gray-200'
                  }`} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
