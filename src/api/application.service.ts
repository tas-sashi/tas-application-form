import type { FormData, ApiResponse } from '../types/form.types'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

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
