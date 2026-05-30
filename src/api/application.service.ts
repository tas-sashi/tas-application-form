import type { FormData, ApiResponse } from '../types/form.types'

// ─── Config ───────────────────────────────────────────────────────────────────
// In production, replace with: import.meta.env.VITE_API_BASE_URL
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

// ─── Simulated network delay ─────────────────────────────────────────────────
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export async function submitApplication(data: FormData): Promise<ApiResponse> {
  const response = await fetch(`${BASE_URL}/api/v1/applications/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  const result = await response.json()

  if (!response.ok) {
    return { success: false, message: result.detail ?? 'Submission failed.' }
  }

  return result
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