import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { familySchema } from '../../schemas/form.schemas'
import { useFormStore } from '../../store/formStore'
import { FormField } from '../ui/FormField'
import { RadioGroup } from '../ui/RadioGroup'
import { PageNavButtons } from '../ui/PageNavButtons'

type FormValues = z.infer<typeof familySchema>

interface Props {
  onSave: (data: FormValues, goToReview: boolean) => void
  onBack: () => void
  cameFromReview: boolean
}

const INCOME_OPTIONS = [
  { value: '<10k',    label: 'Less than ₹10,000' },
  { value: '10k-20k', label: '₹10,000 – ₹20,000' },
  { value: '20k-30k', label: '₹20,000 – ₹30,000' },
  { value: '30k-40k', label: '₹30,000 – ₹40,000' },
  { value: '40k-50k', label: '₹40,000 – ₹50,000' },
  { value: '>50k',    label: 'More than ₹50,000' },
]

export function Page2Family({ onSave, onBack, cameFromReview }: Props) {
  const { formData } = useFormStore()

  const { register, handleSubmit, control, formState: { errors } } =
    useForm<FormValues>({
      resolver: zodResolver(familySchema),
      defaultValues: {
        familyMembers:  formData.family.familyMembers  ?? undefined,
        earningMembers: formData.family.earningMembers ?? undefined,
        familyIncome:   (formData.family.familyIncome || undefined) as FormValues['familyIncome'],
      },
      mode: 'onBlur',
    })

  return (
    <form onSubmit={handleSubmit((data) => onSave(data, false))} noValidate>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Family Details</h2>
        <p className="text-sm text-gray-500 mt-1">
          This information helps us understand your background and financial situation.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField label="Number of Family Members" required error={errors.familyMembers?.message}>
            <input {...register('familyMembers', { valueAsNumber: true })}
              type="number" min={1}
              className={`form-input ${errors.familyMembers ? 'form-input-error' : ''}`}
              placeholder="e.g. 4" />
          </FormField>

          <FormField label="Number of Earning Members" required error={errors.earningMembers?.message}>
            <input {...register('earningMembers', { valueAsNumber: true })}
              type="number" min={0}
              className={`form-input ${errors.earningMembers ? 'form-input-error' : ''}`}
              placeholder="e.g. 2" />
          </FormField>
        </div>

        <FormField label="Family Total Income / Month" required error={errors.familyIncome?.message}>
          <Controller name="familyIncome" control={control}
            render={({ field }) => (
              <RadioGroup name="familyIncome" options={INCOME_OPTIONS}
                value={field.value ?? ''}
                onChange={(v) => field.onChange(v)}
                columns={3} />
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
