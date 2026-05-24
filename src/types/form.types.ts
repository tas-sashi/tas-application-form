// ─── Page 1: Personal Details ────────────────────────────────────────────────
export interface PersonalDetails {
  name: string
  email: string
  dateOfBirth: string
  phone: string
  correspondenceAddress: string
  state: string
}

// ─── Page 2: Family Details ───────────────────────────────────────────────────
export type IncomeRange = '<10k' | '10k-20k' | '20k-30k' | '30k-40k' | '40k-50k' | '>50k'

export interface FamilyDetails {
  familyMembers: number | undefined
  earningMembers: number | undefined
  familyIncome: IncomeRange | ''
}

// ─── Page 3: 10th Standard ───────────────────────────────────────────────────
export interface TenthDetails {
  schoolName: string
  dateOfCompletion: string
  cgpaOrPercentage: number | undefined
}

// ─── Page 4: 10+2 / Diploma ──────────────────────────────────────────────────
export interface TwelfthDetails {
  collegeName: string
  dateOfCommencement: string
  dateOfCompletion: string
  cgpaOrPercentage: number | undefined
  branch: string
}

// ─── Page 5: B.Tech / B.E / M.Tech ────────────────────────────────────────────────────
export type GraduationYear = '2026' | '2025' | '2024' | 'Other'
export type BacklogCount = '0' | '1' | '2' | '>2'

export interface BTechDetails {
  collegeName: string
  dateOfCommencement: string
  yearOfCompletion: GraduationYear | ''
  yearOfCompletionOther: string
  cgpaOrPercentage: number | undefined
  branch: string
  unclearedSubjects: BacklogCount | ''
}

export interface MTechDetails {
    collegeName?: string
    branch?: string
    dateOfCommencement?: string
    yearOfCompletion?: string
    cgpaOrPercentage?: string
  }

// ─── Page 6: Training & Internships ─────────────────────────────────────────
export type CourseOption =
  | 'VLSI Front End'
  | 'VLSI Backend/Physical Design'
  | 'None'
  | 'Other'

  export interface TrainingDetails {
    courseDone: CourseOption | ''
    courseDoneOther: string
    courseInstitution?: string        // ← Optional
    internshipDone: CourseOption | ''
    internshipDoneOther: string
    internshipCompany?: string        // ← Optional
  }

// ─── Page 7: Why You? ────────────────────────────────────────────────────────
export interface WhyYouDetails {
  fitStatement: string
}

// ─── Full Form State ─────────────────────────────────────────────────────────
export interface FormData {
  personal: PersonalDetails
  family: FamilyDetails
  tenth: TenthDetails
  twelfth: TwelfthDetails
  btech: BTechDetails
  mtech: MTechDetails
  training: TrainingDetails
  whyYou: WhyYouDetails
}

// ─── API ─────────────────────────────────────────────────────────────────────
export interface ApiResponse {
  success: boolean
  message: string
  applicationId?: string
}

// ─── Step Meta ───────────────────────────────────────────────────────────────
export interface StepMeta {
  id: number
  title: string
  subtitle: string
}
