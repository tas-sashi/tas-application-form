import { useFormStore } from '../../store/formStore'
import { submitApplication } from '../../api/application.service'

interface Props {
  onEdit: (step: number) => void
}

function SectionCard({
  title, step, onEdit, children,
}: {
  title: string; step: number; onEdit: (s: number) => void; children: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-gray-50">
        <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
        <button
          onClick={() => onEdit(step)}
          className="text-xs font-semibold text-teal-600 hover:text-teal-800
            transition-colors flex items-center gap-1"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          Edit
        </button>
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string | number | undefined }) {
    return (
      <div className="flex flex-col sm:flex-row sm:gap-4 py-2 border-b border-gray-50 last:border-0">
        <span className="text-xs text-gray-400 font-medium sm:w-44 sm:flex-shrink-0 mb-0.5 sm:mb-0">
          {label}
        </span>
        <span className="text-sm text-gray-800 font-medium break-all sm:break-normal">
          {value ?? '—'}
        </span>
      </div>
    )
}

export function SummaryPage({ onEdit }: Props) {
  const formData      = useFormStore((s) => s.formData)
  const isSubmitting  = useFormStore((s) => s.isSubmitting)
  const setSubmitting = useFormStore((s) => s.setSubmitting)
  const setSubmitted  = useFormStore((s) => s.setSubmitted)
  const setFailure    = useFormStore((s) => s.setFailure)
  const prevStep      = useFormStore((s) => s.prevStep)

  const { personal, family, tenth, twelfth, btech, mtech, training, whyYou } = formData

  const handleSubmit = async () => {
    setSubmitting(true)
    const result = await submitApplication(formData)
    if (result.success) {
      setSubmitted(result.applicationId ?? '')
    } else {
      setFailure(result.message)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Review Your Application</h2>
        <p className="text-sm text-gray-500 mt-1">
          Please review all your details before submitting. Click <strong>Edit</strong> on
          any section to make changes.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <SectionCard title="Personal Details" step={0} onEdit={onEdit}>
          <Row label="Name"          value={personal.name} />
          <Row label="Email"         value={personal.email} />
          <Row label="Date of Birth" value={personal.dateOfBirth} />
          <Row label="Phone"         value={personal.phone} />
          <Row label="State"         value={personal.state} />
          <Row label="Address"       value={personal.correspondenceAddress} />
        </SectionCard>

        <SectionCard title="Family Details" step={1} onEdit={onEdit}>
          <Row label="Family Members"  value={family.familyMembers} />
          <Row label="Earning Members" value={family.earningMembers} />
          <Row label="Monthly Income"  value={family.familyIncome} />
        </SectionCard>

        <SectionCard title="10th Standard" step={2} onEdit={onEdit}>
          <Row label="School"            value={tenth.schoolName} />
          <Row label="Date of Completion" value={tenth.dateOfCompletion} />
          <Row label="CGPA / Percentage" value={tenth.cgpaOrPercentage} />
        </SectionCard>

        <SectionCard title="10+2 / Diploma" step={3} onEdit={onEdit}>
          <Row label="College"           value={twelfth.collegeName} />
          <Row label="Branch"            value={twelfth.branch} />
          <Row label="Commencement"      value={twelfth.dateOfCommencement} />
          <Row label="Completion"        value={twelfth.dateOfCompletion} />
          <Row label="CGPA / Percentage" value={twelfth.cgpaOrPercentage} />
        </SectionCard>

        <SectionCard title="B.Tech / B.E" step={4} onEdit={onEdit}>
          <Row label="College" value={btech.collegeName} />
          <Row label="Branch"  value={btech.branch} />
          <Row label="Commencement" value={btech.dateOfCommencement} />
          <Row label="Year of Completion" value={
            btech.yearOfCompletion === 'Other'
              ? `Other — ${btech.yearOfCompletionOther}`
              : btech.yearOfCompletion
          } />
          <Row label="CGPA / Percentage"  value={btech.cgpaOrPercentage} />
          <Row label="Uncleared Subjects" value={btech.unclearedSubjects} />
        </SectionCard>
        
        <SectionCard title="M.Tech / M.E" step={5} onEdit={onEdit}>
            <Row label="College" value={mtech.collegeName} />
            <Row label="Branch" value={mtech.branch} />
            <Row label="Commencement" value={mtech.dateOfCommencement} />
            <Row label="Year of Completion" value={mtech.yearOfCompletion} />
            <Row label="CGPA / Percentage" value={mtech.cgpaOrPercentage} />
        </SectionCard>

        <SectionCard title="Training & Internships" step={5} onEdit={onEdit}>
            <Row label="Course Done" value={
                training.courseDone === 'Other'
                ? `Other — ${training.courseDoneOther}`
                : training.courseDone
            } />
            <Row label="Institution" value={training.courseInstitution} />
            <Row label="Internship" value={
                training.internshipDone === 'Other'
                ? `Other — ${training.internshipDoneOther}`
                : training.internshipDone
            } />
            <Row label="Company" value={training.internshipCompany} />
        </SectionCard>

        <SectionCard title="Why You?" step={6} onEdit={onEdit}>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {whyYou.fitStatement}
          </p>
        </SectionCard>
      </div>

      <div className="flex justify-between mt-8">
        <button type="button" onClick={prevStep} className="btn-secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="btn-primary min-w-[160px]"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
              Submitting…
            </>
          ) : (
            <>
              Submit Application
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
