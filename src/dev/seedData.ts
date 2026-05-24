import type { FormData } from '../types/form.types'

export const seedFormData: FormData = {
  personal: {
    name: 'Arjun Mehra',
    email: 'arjun.mehra@gmail.com',
    dateOfBirth: '2001-06-15',
    phone: '9876543210',
    correspondenceAddress: '12-3-456, Tarnaka, Hyderabad, 500017',
    state: 'Telangana',
  },
  family: {
    familyMembers: 4,
    earningMembers: 1,
    familyIncome: '10k-20k',
  },
  tenth: {
    schoolName: "St. Joseph's High School",
    dateOfCompletion: '2017-04-30',
    cgpaOrPercentage: 8.7,
  },
  twelfth: {
    collegeName: 'Sri Chaitanya Junior College',
    branch: 'MPC',
    dateOfCommencement: '2017-06-01',
    dateOfCompletion: '2019-04-30',
    cgpaOrPercentage: 91.5,
  },
  btech: {
    collegeName: 'NIT Warangal',
    branch: 'ECE',
    dateOfCommencement: '2019-08-01',
    yearOfCompletion: '2024',
    yearOfCompletionOther: '',
    cgpaOrPercentage: 8.4,
    unclearedSubjects: '0',
  },
  mtech: {
    collegeName: 'IIIT Hyderabad',
    branch: 'VLSI',
    dateOfCommencement: '2020-06-01',
    yearOfCompletion: '2026',
    cgpaOrPercentage: undefined,
  },
  training: {
    courseDone: 'VLSI Front End',
    courseDoneOther: '',
    courseInstitution: 'Maven Silicon',            // ← new
    internshipDone: 'None',
    internshipDoneOther: '',
    internshipCompany: '',                         // ← new
  },
  whyYou: {
    fitStatement:
      'I come from a financially challenged background and have always been passionate ' +
      'about chip design. During my B.Tech at NIT Warangal I developed a strong foundation ' +
      'in digital electronics and VLSI concepts. This program is the perfect opportunity ' +
      'for me to bridge the gap between academic knowledge and industry expectations. ' +
      'I am fully committed to giving my best to this training and building a career in ' +
      'the semiconductor industry.',
  },
}