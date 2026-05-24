import { create } from 'zustand'
import type { FormData } from '../types/form.types'

const initialFormData: FormData = {
  personal: {
    name: '', email: '', dateOfBirth: '', phone: '',
    correspondenceAddress: '', state: '',
  },
  family: {
    familyMembers: undefined,
    earningMembers: undefined,
    familyIncome: '',
  },
  tenth: {
    schoolName: '', dateOfCompletion: '', cgpaOrPercentage: undefined,
  },
  twelfth: {
    collegeName: '', dateOfCommencement: '', dateOfCompletion: '',
    cgpaOrPercentage: undefined, branch: '',
  },
  btech: {
    collegeName: '', dateOfCommencement: '', yearOfCompletion: '',
    yearOfCompletionOther: '', cgpaOrPercentage: undefined,
    branch: '', unclearedSubjects: '',
  },
  mtech: {
    collegeName: undefined,
    branch: undefined,
    dateOfCommencement: undefined,
    yearOfCompletion: undefined,
    cgpaOrPercentage: undefined,
  },
  training: {
    courseDone: '',
    courseDoneOther: '',
    internshipDone: '',
    internshipDoneOther: '',
  },
  whyYou: { fitStatement: '' },
}

interface FormStore {
  formData: FormData
  currentStep: number
  totalSteps: number
  visitedSteps: Set<number>   // steps the user has completed at least once
  cameFromReview: boolean     // true when navigated via Edit button on summary

  isSubmitting: boolean
  isSubmitted: boolean
  isFailure: boolean
  submitError: string | null
  applicationId: string | null

  updatePage: <K extends keyof FormData>(page: K, data: FormData[K]) => void
  goToStep: (step: number) => void
  goToStepFromReview: (step: number) => void  // called by Edit buttons
  nextStep: () => void
  prevStep: () => void
  markStepVisited: (step: number) => void
  setCameFromReview: (value: boolean) => void

  setSubmitting: (value: boolean) => void
  setSubmitted: (applicationId: string) => void
  setFailure: (error: string) => void
  setSubmitError: (error: string) => void
  reset: () => void
}

export const useFormStore = create<FormStore>((set) => ({
  formData: initialFormData,
  currentStep: 0,
  totalSteps: 8,          // 8 form pages (0–7); step 8 = summary
  visitedSteps: new Set<number>(),
  cameFromReview: false,

  isSubmitting: false,
  isSubmitted: false,
  isFailure: false,
  submitError: null,
  applicationId: null,

  updatePage: (page, data) =>
    set((state) => ({ formData: { ...state.formData, [page]: data } })),

  goToStep: (step) => set({ currentStep: step, cameFromReview: false }),

  // Called by Edit buttons on summary — sets the flag so pages show
  // "Save & Return to Review" instead of "Next"
  goToStepFromReview: (step) =>
    set({ currentStep: step, cameFromReview: true }),

  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, state.totalSteps),
      cameFromReview: false,
    })),

  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
      cameFromReview: false,
    })),

  markStepVisited: (step) =>
    set((state) => ({
      visitedSteps: new Set([...state.visitedSteps, step]),
    })),

  setCameFromReview: (value) => set({ cameFromReview: value }),

  setSubmitting: (value) => set({ isSubmitting: value, submitError: null, isFailure: false }),

  setSubmitted: (applicationId) =>
    set({ isSubmitting: false, isSubmitted: true, applicationId }),

  setFailure: (error: string) => set({ isSubmitting: false, isFailure: true, submitError: error }),setSubmitError: (error) =>
    set({ isSubmitting: false, submitError: error }),

  reset: () =>
    set({
      formData: initialFormData,
      currentStep: 0,
      visitedSteps: new Set<number>(),
      cameFromReview: false,
      isSubmitting: false,
      isSubmitted: false,
      isFailure: false,
      submitError: null,
      applicationId: null,
    }),
}))
