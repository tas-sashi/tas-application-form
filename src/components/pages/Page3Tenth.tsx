import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { tenthSchema } from '../../schemas/form.schemas'
import { useFormStore } from '../../store/formStore'
import { FormField } from '../ui/FormField'
import { PageNavButtons } from '../ui/PageNavButtons'

type FormValues = z.infer<typeof tenthSchema>

interface Props {
  onSave: (data: FormValues, goToReview: boolean) => void
  onBack: () => void
  cameFromReview: boolean
}

export function Page3Tenth({ onSave, onBack, cameFromReview }: Props) {
  const { formData } = useFormStore()

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(tenthSchema),
    defaultValues: {
      schoolName: formData.tenth.schoolName,
      dateOfCompletion: formData.tenth.dateOfCompletion,
      cgpaOrPercentage: Number.isFinite(formData.tenth.cgpaOrPercentage)
        ? formData.tenth.cgpaOrPercentage : undefined,
    },
    mode: 'onBlur',
  })

  return (
    <form onSubmit={handleSubmit((data) => onSave(data, false))} noValidate>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">10th Standard</h2>
        <p className="text-sm text-gray-500 mt-1">Secondary school education details.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="School Name" required error={errors.schoolName?.message}>
          <input {...register('schoolName')}
            className={`form-input ${errors.schoolName ? 'form-input-error' : ''}`}
            placeholder="e.g. St. Joseph's High School" />
        </FormField>

        <FormField label="Date of Completion" required error={errors.dateOfCompletion?.message}>
          <input {...register('dateOfCompletion')} type="date"
            className={`form-input ${errors.dateOfCompletion ? 'form-input-error' : ''}`} />
        </FormField>

        <FormField label="CGPA / Percentage" required error={errors.cgpaOrPercentage?.message}
          hint="Enter on a 10-point scale or as a percentage (max 100)">
          <input {...register('cgpaOrPercentage', { valueAsNumber: true })}
            type="number" step="0.01" min={0} max={100}
            className={`form-input ${errors.cgpaOrPercentage ? 'form-input-error' : ''}`}
            placeholder="e.g. 8.7 or 87" />
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