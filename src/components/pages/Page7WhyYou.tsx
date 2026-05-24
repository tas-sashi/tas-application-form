import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { whyYouSchema } from '../../schemas/form.schemas'
import { useFormStore } from '../../store/formStore'
import { FormField } from '../ui/FormField'
import { PageNavButtons } from '../ui/PageNavButtons'

type FormValues = z.infer<typeof whyYouSchema>

interface Props {
  onSave: (data: FormValues, goToReview: boolean) => void
  onBack: () => void
  cameFromReview: boolean
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

export function Page7WhyYou({ onSave, onBack, cameFromReview }: Props) {
  const { formData } = useFormStore()

  const { register, handleSubmit, control, formState: { errors } } =
    useForm<FormValues>({
      resolver: zodResolver(whyYouSchema),
      defaultValues: { fitStatement: formData.whyYou.fitStatement },
      mode: 'onBlur',
    })

  const fitStatement = useWatch({ control, name: 'fitStatement' }) ?? ''
  const words = wordCount(fitStatement)
  const meetsMinimum = words >= 20

  return (
    <form onSubmit={handleSubmit((data) => onSave(data, false))} noValidate>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Why You?</h2>
        <p className="text-sm text-gray-500 mt-1">
          Tell us why you're a great fit for this program.
        </p>
      </div>

      <div className="bg-teal-50 border border-teal-200 rounded-xl p-5 mb-6">
        <h3 className="font-semibold text-teal-800 mb-2 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          About the T.A.S Program
        </h3>
        <p className="text-sm text-teal-700 leading-relaxed">
        Trust for Advanced Skills (T.A.S) is a charitable trust that provides a platform 
        for underprivileged graduates to learn cutting-edge technologies like VLSI, Programming, and AI.
        This non-profit organization, located in Hyderabad, trains selected graduates with high-quality 
        technology programs and real-time projects to help them secure jobs in top technology firms 
        in India and abroad, kick starting their careers.
        </p>
      </div>

      <FormField
        label="How well do you think you fit for this program?"
        required
        error={errors.fitStatement?.message}
        hint="Minimum 20 words."
      >
        <textarea {...register('fitStatement')} rows={7}
          className={`form-textarea ${errors.fitStatement ? 'form-input-error' : ''}`}
          placeholder="Describe why you are a strong candidate..." />
        <div className="flex justify-end mt-1.5">
          <span className={`text-xs font-medium ${meetsMinimum ? 'text-teal-600' : 'text-gray-400'}`}>
            {words} / 20 words minimum
            {meetsMinimum && (
              <svg className="inline ml-1 mb-0.5" width="12" height="12"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="3" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            )}
          </span>
        </div>
      </FormField>

      <PageNavButtons
        onBack={onBack}
        cameFromReview={cameFromReview}
        onSaveToReview={handleSubmit((data) => onSave(data, true))}
        nextLabel="Review & Submit"
      />
    </form>
  )
}
