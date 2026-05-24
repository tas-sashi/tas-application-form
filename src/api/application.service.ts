import type { FormData, ApiResponse } from '../types/form.types'

// ─── Config ───────────────────────────────────────────────────────────────────
// In production, replace with: import.meta.env.VITE_API_BASE_URL
const BASE_URL = '/api/v1'

// ─── Simulated network delay ─────────────────────────────────────────────────
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

// ─── Mock submit — replace body with real axios/fetch call when backend ready ─
export async function submitApplication(data: FormData): Promise<ApiResponse> {
  // Log full payload so developers can inspect the shape during development
  console.group('📋 TAS Application Submission')
  console.log('Endpoint:', `POST ${BASE_URL}/applications`)
  console.log('Payload:', JSON.stringify(data, null, 2))
  console.groupEnd()

  // Simulate network latency
  await delay(1500)

  // Simulate 90% success / 10% error for testing both paths
  const shouldSucceed = Math.random() > 0.1

  if (shouldSucceed) {
    const applicationId = `TAS-${Date.now()}`
    console.log('✅ Mock API: Application submitted successfully', applicationId)
    return {
      success: true,
      message: 'Your application has been submitted successfully.',
      applicationId,
    }
  } else {
    console.error('❌ Mock API: Simulated server error')
    return {
      success: false,
      message: 'Something went wrong. Please try again.',
    }
  }
}

/*
 * ─── TO CONNECT TO REAL DJANGO API ──────────────────────────────────────────
 * Replace the mock above with:
 *
 * import axios from 'axios'
 *
 * export async function submitApplication(data: FormData): Promise<ApiResponse> {
 *   const response = await axios.post(`${BASE_URL}/applications/`, data)
 *   return response.data
 * }
 */