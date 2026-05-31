import { useFormStore } from '../store/formStore'
import { ProgressBar } from './ui/ProgressBar'
import { Page1Personal } from './pages/Page1Personal'
import { Page2Family } from './pages/Page2Family'
import { Page3Tenth } from './pages/Page3Tenth'
import { Page4Twelfth } from './pages/Page4Twelfth'
import { Page5BTech } from './pages/Page5BTech'
import { Page6MTech } from './pages/Page6MTech'
import { Page6Training } from './pages/Page6Training'
import { Page7WhyYou } from './pages/Page7WhyYou'
import { SummaryPage } from './pages/SummaryPage'
import { SuccessScreen } from './pages/SuccessScreen'
import { FailureScreen } from './pages/FailureScreen'
import type { StepMeta, FormData } from '../types/form.types'

const STEPS: StepMeta[] = [
  { id: 1, title: 'Personal',      subtitle: 'Personal Details' },
  { id: 2, title: 'Family',        subtitle: 'Family Details' },
  { id: 3, title: '10th',          subtitle: '10th Standard' },
  { id: 4, title: '10+2',          subtitle: '10+2 / Diploma' },
  { id: 5, title: 'B.Tech',        subtitle: 'B.Tech / B.E' },
  { id: 6, title: 'M.Tech',        subtitle: 'M.Tech / M.E' },
  { id: 7, title: 'Training',      subtitle: 'Training & Internships' },
  { id: 8, title: 'Why You?',      subtitle: 'Why You?' },
  { id: 9, title: 'Review',        subtitle: 'Review & Submit' },
]

const SUMMARY_STEP = 8
const ALL_FORM_STEPS = new Set([0, 1, 2, 3, 4, 5, 6, 7])

interface Props {
  scrollToForm: () => void
}

export function FormWizard({ scrollToForm }: Props) {
  const currentStep        = useFormStore((s) => s.currentStep)
  const visitedSteps       = useFormStore((s) => s.visitedSteps)
  const cameFromReview     = useFormStore((s) => s.cameFromReview)
  const isSubmitted        = useFormStore((s) => s.isSubmitted)
  const isFailure          = useFormStore((s) => s.isFailure)
  const updatePage         = useFormStore((s) => s.updatePage)
  const markStepVisited    = useFormStore((s) => s.markStepVisited)
  const goToStep           = useFormStore((s) => s.goToStep)
  const goToStepFromReview = useFormStore((s) => s.goToStepFromReview)
  const nextStep           = useFormStore((s) => s.nextStep)
  const prevStep           = useFormStore((s) => s.prevStep)

  const reviewUnlocked =
    [...ALL_FORM_STEPS].every((s) => visitedSteps.has(s))

  const completedSteps = new Set([...visitedSteps])
  if (reviewUnlocked) completedSteps.add(SUMMARY_STEP)

  const scrollTop = () => scrollToForm()

  function saveAndProceed<K extends keyof FormData>(
    page: K,
    data: FormData[K],
    goToReview = false
  ) {
    updatePage(page, data)
    markStepVisited(currentStep)
    scrollTop()
    if (goToReview) goToStep(SUMMARY_STEP)
    else nextStep()
  }

  function handleBack() {
    prevStep()
    scrollTop()
  }

  function handleStepClick(step: number) {
    goToStep(step)
    scrollTop()
  }

  function handleEditFromSummary(step: number) {
    goToStepFromReview(step)
    scrollTop()
  }

  const pageProps = <K extends keyof FormData>(page: K) => ({
    onSave: (data: FormData[K], goToReview: boolean) =>
      saveAndProceed(page, data, goToReview),
    onBack: handleBack,
    cameFromReview,
  })

  if (isFailure) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10">
        <FailureScreen />
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10">
        <SuccessScreen />
      </div>
    )
  }

  const isSummary = currentStep === SUMMARY_STEP

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10">
      <ProgressBar
        steps={STEPS}
        currentStep={currentStep}
        onStepClick={handleStepClick}
        completedSteps={completedSteps}
        reviewUnlocked={reviewUnlocked}
        summaryStep={SUMMARY_STEP}
        cameFromReview={cameFromReview}
      />

      {isSummary && (
        <div className="flex items-center gap-2 mb-6 text-sm text-teal-700 font-semibold">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          Review &amp; Submit
        </div>
      )}

      <div className="min-h-[400px]">
        {currentStep === 0 && <Page1Personal {...pageProps('personal')} showBack={false} />}
        {currentStep === 1 && <Page2Family   {...pageProps('family')}   />}
        {currentStep === 2 && <Page3Tenth    {...pageProps('tenth')}    />}
        {currentStep === 3 && <Page4Twelfth  {...pageProps('twelfth')}  />}
        {currentStep === 4 && <Page5BTech    {...pageProps('btech')}    />}
        {currentStep === 5 && <Page6MTech    {...pageProps('mtech')}    />}
        {currentStep === 6 && <Page6Training {...pageProps('training')} />}
        {currentStep === 7 && <Page7WhyYou   {...pageProps('whyYou')}   />}
        {currentStep === 8 && <SummaryPage   onEdit={handleEditFromSummary} />}
      </div>
    </div>
  )
}