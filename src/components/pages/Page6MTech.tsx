import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { mtechSchema, type MTechFormValues } from '../../schemas/form.schemas'
import { useFormStore } from '../../store/formStore'
import { FormField } from '../ui/FormField'
import { PageNavButtons } from '../ui/PageNavButtons'

interface Props {
  onSave: (data: MTechFormValues, goToReview: boolean) => void
  onBack: () => void
  cameFromReview: boolean
}

export function Page6MTech({ onSave, onBack, cameFromReview }: Props) {
  const { formData } = useFormStore()

  const { register, handleSubmit, formState: { errors } } =
    useForm<MTechFormValues>({
      resolver: zodResolver(mtechSchema),
      defaultValues: {
        collegeName:        formData.mtech.collegeName,
        branch:             formData.mtech.branch,
        dateOfCommencement: formData.mtech.dateOfCommencement,
        yearOfCompletion:   formData.mtech.yearOfCompletion,
        cgpaOrPercentage:   Number.isFinite(formData.mtech.cgpaOrPercentage)
          ? formData.mtech.cgpaOrPercentage : undefined,
      },
      mode: 'onBlur',
    })

  return (
    <form onSubmit={handleSubmit((data) => onSave(data, false))} noValidate>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">M.Tech / M.E</h2>
        <p className="text-sm text-gray-500 mt-1">
          Post-graduate degree details. All fields are optional — skip if not applicable.
        </p>
      </div>

      {/* Optional notice */}
      <div className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 mb-6
        flex items-center gap-3">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="#1e7d6c" strokeWidth="2" strokeLinecap="round" className="flex-shrink-0">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <p className="text-sm text-teal-700">
          This section is <strong>optional</strong>. If you have not completed or are not
          pursuing M.Tech / M.E, click <strong>Next</strong> to continue.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="College Name" error={errors.collegeName?.message}>
          <input {...register('collegeName')}
            className="form-input"
            placeholder="e.g. IIT Hyderabad" />
        </FormField>

        <FormField label="Branch" error={errors.branch?.message}>
          <input {...register('branch')}
            className="form-input"
            placeholder="e.g. VLSI Design, Embedded Systems" />
        </FormField>

        <FormField label="Date of Commencement" error={errors.dateOfCommencement?.message}>
          <input {...register('dateOfCommencement')} type="date"
            className="form-input" />
        </FormField>

        <FormField label="Year of Completion" error={errors.yearOfCompletion?.message}>
          <input {...register('yearOfCompletion')}
            className="form-input"
            placeholder="e.g. 2025" />
        </FormField>

        <FormField label="CGPA / Percentage" error={errors.cgpaOrPercentage?.message}
          hint="Max 100">
          <input {...register('cgpaOrPercentage')}
            type="number" step="0.01" min={0} max={100}
            className="form-input"
            placeholder="e.g. 8.0 or 80" />
        </FormField>
      </div>

      <PageNavButtons
        onBack={onBack}
        cameFromReview={cameFromReview}
        onSaveToReview={handleSubmit((data) => onSave(data, true))}
      />
    </form>
  )
}