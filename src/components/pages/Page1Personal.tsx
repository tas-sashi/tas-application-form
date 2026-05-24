import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { personalSchema } from '../../schemas/form.schemas'
import { useFormStore } from '../../store/formStore'
import { FormField } from '../ui/FormField'
import { PageNavButtons } from '../ui/PageNavButtons'
import { SearchableSelect } from '../ui/SearchableSelect'
import { INDIAN_STATES } from '../../data/states'

type FormValues = z.infer<typeof personalSchema>

interface Props {
  onSave: (data: FormValues, goToReview: boolean) => void
  onBack: () => void
  cameFromReview: boolean
  showBack?: boolean
}

export function Page1Personal({ onSave, onBack, cameFromReview, showBack = true }: Props) {
  const { formData } = useFormStore()

  const { register, handleSubmit, control, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(personalSchema),
    defaultValues: formData.personal,
    mode: 'onBlur',
  })

  return (
    <form onSubmit={handleSubmit((data) => onSave(data, false))} noValidate>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Personal Details</h2>
        <p className="text-sm text-gray-500 mt-1">All fields marked with * are required.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Full Name" required error={errors.name?.message}>
          <input {...register('name')}
            className={`form-input ${errors.name ? 'form-input-error' : ''}`}
            placeholder="e.g. Arjun Mehra" />
        </FormField>

        <FormField label="Email Address" required error={errors.email?.message}>
          <input {...register('email')} type="email"
            className={`form-input ${errors.email ? 'form-input-error' : ''}`}
            placeholder="you@example.com" />
        </FormField>

        <FormField label="Date of Birth" required error={errors.dateOfBirth?.message}>
          <input {...register('dateOfBirth')} type="date"
            className={`form-input ${errors.dateOfBirth ? 'form-input-error' : ''}`} />
        </FormField>

        <FormField label="Phone Number" required error={errors.phone?.message}
          hint="10-digit mobile number, digits only">
          <input {...register('phone')} type="tel"
            className={`form-input ${errors.phone ? 'form-input-error' : ''}`}
            placeholder="9876543210" maxLength={12} />
        </FormField>

        <FormField label="State" required error={errors.state?.message}>
            <Controller
                name="state"
                control={control}
                render={({ field }) => (
                <SearchableSelect
                    options={INDIAN_STATES}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select your state or UT"
                    error={!!errors.state}
                />
                )}
            />
        </FormField>

        <FormField label="Correspondence Address" required
          error={errors.correspondenceAddress?.message}>
          <textarea {...register('correspondenceAddress')} rows={3}
            className={`form-textarea ${errors.correspondenceAddress ? 'form-input-error' : ''}`}
            placeholder="House No., Street, City, PIN" />
        </FormField>
      </div>

      <PageNavButtons
        onBack={onBack}
        showBack={showBack}
        cameFromReview={cameFromReview}
        onSaveToReview={handleSubmit((data) => onSave(data, true))}
      />
    </form>
  )
}
