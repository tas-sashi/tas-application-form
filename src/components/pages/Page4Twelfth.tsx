import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { twelfthSchema } from '../../schemas/form.schemas'
import { useFormStore } from '../../store/formStore'
import { FormField } from '../ui/FormField'
import { PageNavButtons } from '../ui/PageNavButtons'

type FormValues = z.infer<typeof twelfthSchema>

interface Props {
  onSave: (data: FormValues, goToReview: boolean) => void
  onBack: () => void
  cameFromReview: boolean
}

export function Page4Twelfth({ onSave, onBack, cameFromReview }: Props) {
  const { formData } = useFormStore()

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(twelfthSchema),
    defaultValues: {
      collegeName: formData.twelfth.collegeName,
      dateOfCommencement: formData.twelfth.dateOfCommencement,
      dateOfCompletion: formData.twelfth.dateOfCompletion,
      cgpaOrPercentage: Number.isFinite(formData.twelfth.cgpaOrPercentage)
        ? formData.twelfth.cgpaOrPercentage : undefined,
      branch: formData.twelfth.branch,
    },
    mode: 'onBlur',
  })

  return (
    <form onSubmit={handleSubmit((data) => onSave(data, false))} noValidate>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">10+2 / Diploma</h2>
        <p className="text-sm text-gray-500 mt-1">Higher secondary or diploma education details.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="College / School Name" required error={errors.collegeName?.message}>
          <input {...register('collegeName')}
            className={`form-input ${errors.collegeName ? 'form-input-error' : ''}`}
            placeholder="e.g. Sri Chaitanya Junior College" />
        </FormField>

        <FormField label="Branch" required error={errors.branch?.message}>
          <input {...register('branch')}
            className={`form-input ${errors.branch ? 'form-input-error' : ''}`}
            placeholder="e.g. MPC / BiPC / Diploma in ECE" />
        </FormField>

        <FormField label="Date of Commencement" required error={errors.dateOfCommencement?.message}>
          <input {...register('dateOfCommencement')} type="date"
            className={`form-input ${errors.dateOfCommencement ? 'form-input-error' : ''}`} />
        </FormField>

        <FormField label="Date of Completion" required error={errors.dateOfCompletion?.message}>
          <input {...register('dateOfCompletion')} type="date"
            className={`form-input ${errors.dateOfCompletion ? 'form-input-error' : ''}`} />
        </FormField>

        <FormField label="CGPA / Percentage" required error={errors.cgpaOrPercentage?.message}
          hint="Max 100">
          <input {...register('cgpaOrPercentage', { valueAsNumber: true })}
            type="number" step="0.01" min={0} max={100}
            className={`form-input ${errors.cgpaOrPercentage ? 'form-input-error' : ''}`}
            placeholder="e.g. 9.2 or 92" />
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