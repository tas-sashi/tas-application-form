import { z } from 'zod'

// ─── Reusable validators ──────────────────────────────────────────────────────
const requiredString = (label: string) =>
  z.string().min(1, `${label} is required`)

const percentageField = z
  .number({ error: 'This field is required' })
  .min(0, 'Must be at least 0')
  .max(100, 'Must be 100 or less')

const dateField = (label: string) =>
  requiredString(label).refine((v) => !isNaN(Date.parse(v)), {
    message: `${label} must be a valid date`,
  })

// ─── Page 1: Personal Details ────────────────────────────────────────────────
export const personalSchema = z.object({
  name: requiredString('Name'),
  email: requiredString('Email').email('Enter a valid email address'),
  dateOfBirth: dateField('Date of Birth'),
  phone: requiredString('Phone number')
    .regex(/^\d{10,}$/, 'Phone number must be at least 10 digits'),
  correspondenceAddress: requiredString('Correspondence address'),
  state: requiredString('State'),
})

// ─── Page 2: Family Details ───────────────────────────────────────────────────
const INCOME_VALUES = ['<10k', '10k-20k', '20k-30k', '30k-40k', '40k-50k', '>50k'] as const

export const familySchema = z.object({
  familyMembers: z
    .number({ error: 'Number of family members is required' })
    .int('Must be a whole number')
    .min(1, 'Must be at least 1'),
  earningMembers: z
    .number({ error: 'Number of earning members is required' })
    .int('Must be a whole number')
    .min(0, 'Cannot be negative'),
  familyIncome: z.enum(INCOME_VALUES, {
    error: 'Please select an income range',
  }),
})

// ─── Page 3: 10th Standard ───────────────────────────────────────────────────
export const tenthSchema = z.object({
  schoolName: requiredString('School name'),
  dateOfCompletion: dateField('Date of completion'),
  cgpaOrPercentage: percentageField,
})

// ─── Page 4: 10+2 / Diploma ──────────────────────────────────────────────────
export const twelfthSchema = z
  .object({
    collegeName: requiredString('College name'),
    dateOfCommencement: dateField('Date of commencement'),
    dateOfCompletion: dateField('Date of completion'),
    cgpaOrPercentage: percentageField,
    branch: requiredString('Branch'),
  })
  .refine(
    (d) => new Date(d.dateOfCompletion) > new Date(d.dateOfCommencement),
    {
      message: 'Completion date must be after commencement date',
      path: ['dateOfCompletion'],
    }
  )

// ─── Page 5: B.Tech / B.E / M.Tech────────────────────────────────────────────────────
const GRADUATION_YEARS = ['2026', '2025', '2024', 'Other'] as const
const BACKLOG_VALUES = ['0', '1', '2', '>2'] as const

export const btechSchema = z
  .object({
    collegeName: requiredString('College name'),
    dateOfCommencement: dateField('Date of commencement'),
    yearOfCompletion: z.enum(GRADUATION_YEARS, {
      error: 'Please select a year of completion',
    }),
    yearOfCompletionOther: z.string(),
    cgpaOrPercentage: percentageField,
    branch: requiredString('Branch'),
    unclearedSubjects: z.enum(BACKLOG_VALUES, {
      error: 'Please select number of uncleared subjects',
    }),
  })
  .refine(
    (d) =>
      d.yearOfCompletion !== 'Other' ||
      (d.yearOfCompletionOther && d.yearOfCompletionOther.trim().length > 0),
    {
      message: 'Please specify the year',
      path: ['yearOfCompletionOther'],
    }
  )

export const mtechSchema = z.object({
    collegeName:        z.string().optional(),
    branch:             z.string().optional(),
    dateOfCommencement: z.string().optional(),
    yearOfCompletion:   z.string().optional(),
    cgpaOrPercentage:   z.string().optional(),
  }
)

// ─── Page 6: Training & Internships ─────────────────────────────────────────
const COURSE_VALUES = [
  'VLSI Front End',
  'VLSI Backend/Physical Design',
  'None',
  'Other',
] as const

const courseEnum = z.enum(COURSE_VALUES, {
  error: 'Please select an option',
})

export const trainingSchema = z
  .object({
    courseDone: courseEnum,
    courseDoneOther: z.string(),
    courseInstitution: z.string().optional(),    // ← new
    internshipDone: courseEnum,
    internshipDoneOther: z.string(),
    internshipCompany: z.string().optional(),    // ← new
  })
  .refine(
    (d) =>
      d.courseDone !== 'Other' ||
      (d.courseDoneOther && d.courseDoneOther.trim().length > 0),
    { message: 'Please specify the course', path: ['courseDoneOther'] }
  )
  .refine(
    (d) =>
      d.internshipDone !== 'Other' ||
      (d.internshipDoneOther && d.internshipDoneOther.trim().length > 0),
    { message: 'Please specify the internship', path: ['internshipDoneOther'] }
  )

// ─── Page 7: Why You? ────────────────────────────────────────────────────────
export const whyYouSchema = z.object({
  fitStatement: requiredString('This field').refine(
    (v) => v.trim().split(/\s+/).filter(Boolean).length >= 20,
    { message: 'Please write at least 20 words' }
  ),
})

// ─── Page schema map ──────────────────────────────────────────────────────────
export const pageSchemas = [
  personalSchema,
  familySchema,
  tenthSchema,
  twelfthSchema,
  btechSchema,
  trainingSchema,
  whyYouSchema,
] as const

export type BTechFormValues = z.infer<typeof btechSchema>
export type MTechFormValues = z.infer<typeof mtechSchema>