import { useForm, Controller, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { trainingSchema } from '../../schemas/form.schemas'
import { useFormStore } from '../../store/formStore'
import { FormField } from '../ui/FormField'
import { RadioGroup } from '../ui/RadioGroup'
import { PageNavButtons } from '../ui/PageNavButtons'

type FormValues = z.infer<typeof trainingSchema>

interface Props {
  onSave: (data: FormValues, goToReview: boolean) => void
  onBack: () => void
  cameFromReview: boolean
}

const COURSE_OPTIONS = [
  { value: 'VLSI Front End',               label: 'VLSI Front End' },
  { value: 'VLSI Backend/Physical Design', label: 'VLSI Backend / Physical Design' },
  { value: 'None',                         label: 'None' },
  { value: 'Other',                        label: 'Other' },
]

export function Page6Training({ onSave, onBack, cameFromReview }: Props) {
  const { formData } = useFormStore()

  const { register, handleSubmit, control, formState: { errors } } =
    useForm<FormValues>({
      resolver: zodResolver(trainingSchema),
      defaultValues: {
        courseDone:        (formData.training.courseDone || undefined) as FormValues['courseDone'],
        courseDoneOther:   formData.training.courseDoneOther,
        courseInstitution: formData.training.courseInstitution,
        internshipDone:    (formData.training.internshipDone || undefined) as FormValues['internshipDone'],
        internshipDoneOther: formData.training.internshipDoneOther,
        internshipCompany: formData.training.internshipCompany,
      },
      mode: 'onBlur',
    })

  const courseDone     = useWatch({ control, name: 'courseDone' })
  const internshipDone = useWatch({ control, name: 'internshipDone' })

  return (
    <form onSubmit={handleSubmit((data) => onSave(data, false))} noValidate>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Training &amp; Internships</h2>
        <p className="text-sm text-gray-500 mt-1">
          Share any relevant training or internship experience you have.
        </p>
      </div>

      <div className="flex flex-col gap-6">

        {/* ── Course ── */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Any Course Done?</h3>

          <FormField label="Select relevant course" required error={errors.courseDone?.message}>
            <Controller name="courseDone" control={control}
              render={({ field }) => (
                <RadioGroup name="courseDone" options={COURSE_OPTIONS}
                  value={field.value ?? ''}
                  onChange={(v) => field.onChange(v)}
                  columns={2} />
              )} />
          </FormField>

          {courseDone === 'Other' && (
            <div className="mt-4">
              <FormField label="Please specify" required error={errors.courseDoneOther?.message}>
                <input {...register('courseDoneOther')}
                  className={`form-input ${errors.courseDoneOther ? 'form-input-error' : ''}`}
                  placeholder="Describe the course you completed" />
              </FormField>
            </div>
          )}

          {/* Institution — visible for any selection except None */}
          {courseDone && courseDone !== 'None' && (
            <div className="mt-4">
              <FormField label="Institution / Training Provider">
                <input {...register('courseInstitution')}
                  className="form-input"
                  placeholder="e.g. Maven Silicon, VLSI Expert, Udemy…" />
              </FormField>
            </div>
          )}
        </div>

        {/* ── Internship ── */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Any Internships?</h3>

          <FormField label="Select relevant internship" required error={errors.internshipDone?.message}>
            <Controller name="internshipDone" control={control}
              render={({ field }) => (
                <RadioGroup name="internshipDone" options={COURSE_OPTIONS}
                  value={field.value ?? ''}
                  onChange={(v) => field.onChange(v)}
                  columns={2} />
              )} />
          </FormField>

          {internshipDone === 'Other' && (
            <div className="mt-4">
              <FormField label="Please specify" required error={errors.internshipDoneOther?.message}>
                <input {...register('internshipDoneOther')}
                  className={`form-input ${errors.internshipDoneOther ? 'form-input-error' : ''}`}
                  placeholder="Describe the internship you completed" />
              </FormField>
            </div>
          )}

          {/* Company — visible for any selection except None */}
          {internshipDone && internshipDone !== 'None' && (
            <div className="mt-4">
              <FormField label="Company / Organisation">
                <input {...register('internshipCompany')}
                  className="form-input"
                  placeholder="e.g. Intel, Qualcomm, Texas Instruments…" />
              </FormField>
            </div>
          )}
        </div>

      </div>

      <PageNavButtons
        onBack={onBack}
        cameFromReview={cameFromReview}
        onSaveToReview={handleSubmit((data) => onSave(data, true))}
      />
    </form>
  )
}