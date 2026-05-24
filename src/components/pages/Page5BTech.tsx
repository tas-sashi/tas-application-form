import { useForm, Controller, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { btechSchema, type BTechFormValues } from '../../schemas/form.schemas'
import { useFormStore } from '../../store/formStore'
import { FormField } from '../ui/FormField'
import { RadioGroup } from '../ui/RadioGroup'
import { PageNavButtons } from '../ui/PageNavButtons'

interface Props {
  onSave: (data: BTechFormValues, goToReview: boolean) => void
  onBack: () => void
  cameFromReview: boolean
}

const YEAR_OPTIONS = [
  { value: '2026', label: '2026' },
  { value: '2025', label: '2025' },
  { value: '2024', label: '2024' },
  { value: 'Other', label: 'Other' },
]

const BACKLOG_OPTIONS = [
  { value: '0',  label: '0' },
  { value: '1',  label: '1' },
  { value: '2',  label: '2' },
  { value: '>2', label: 'More than 2' },
]

export function Page5BTech({ onSave, onBack, cameFromReview }: Props) {
  const { formData } = useFormStore()

  const { register, handleSubmit, control, formState: { errors } } =
    useForm<BTechFormValues>({
      resolver: zodResolver(btechSchema),
      defaultValues: {
        collegeName: formData.btech.collegeName,
        dateOfCommencement: formData.btech.dateOfCommencement,
        yearOfCompletion: (formData.btech.yearOfCompletion || undefined) as BTechFormValues['yearOfCompletion'],
        yearOfCompletionOther: formData.btech.yearOfCompletionOther,
        cgpaOrPercentage: Number.isFinite(formData.btech.cgpaOrPercentage)
          ? formData.btech.cgpaOrPercentage : undefined,
        branch: formData.btech.branch,
        unclearedSubjects: (formData.btech.unclearedSubjects || undefined) as BTechFormValues['unclearedSubjects'],
      },
      mode: 'onBlur',
    })

  const yearOfCompletion = useWatch({ control, name: 'yearOfCompletion' })

  return (
    <form onSubmit={handleSubmit((data) => onSave(data, false))} noValidate>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">B.Tech / B.E</h2>
        <p className="text-sm text-gray-500 mt-1">
          Undergraduate engineering degree details.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="College Name" required error={errors.collegeName?.message}>
          <input {...register('collegeName')}
            className={`form-input ${errors.collegeName ? 'form-input-error' : ''}`}
            placeholder="e.g. NIT Warangal" />
        </FormField>

        <FormField label="Branch" required error={errors.branch?.message}>
          <input {...register('branch')}
            className={`form-input ${errors.branch ? 'form-input-error' : ''}`}
            placeholder="e.g. ECE / EEE / CSE" />
        </FormField>

        <FormField label="Date of Commencement" required
          error={errors.dateOfCommencement?.message}>
          <input {...register('dateOfCommencement')} type="date"
            className={`form-input ${errors.dateOfCommencement ? 'form-input-error' : ''}`} />
        </FormField>

        <FormField label="CGPA / Percentage" required
          error={errors.cgpaOrPercentage?.message}>
          <input {...register('cgpaOrPercentage', { valueAsNumber: true })}
            type="number" step="0.01" min={0} max={100}
            className={`form-input ${errors.cgpaOrPercentage ? 'form-input-error' : ''}`}
            placeholder="e.g. 8.5 or 85" />
        </FormField>
      </div>

      <div className="flex flex-col gap-5 mt-5">
        <FormField label="Year of Completion" required
          error={errors.yearOfCompletion?.message}>
          <Controller name="yearOfCompletion" control={control}
            render={({ field }) => (
              <RadioGroup name="yearOfCompletion" options={YEAR_OPTIONS}
                value={field.value ?? ''}
                onChange={(v) => field.onChange(v)}
                columns={4} />
            )} />
        </FormField>

        {yearOfCompletion === 'Other' && (
          <FormField label="Specify Year" required
            error={errors.yearOfCompletionOther?.message}>
            <input {...register('yearOfCompletionOther')}
              className={`form-input max-w-xs ${errors.yearOfCompletionOther ? 'form-input-error' : ''}`}
              placeholder="e.g. 2027" />
          </FormField>
        )}

        <FormField label="Number of Uncleared Subjects" required
          error={errors.unclearedSubjects?.message}>
          <Controller name="unclearedSubjects" control={control}
            render={({ field }) => (
              <RadioGroup name="unclearedSubjects" options={BACKLOG_OPTIONS}
                value={field.value ?? ''}
                onChange={(v) => field.onChange(v)}
                columns={4} />
            )} />
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