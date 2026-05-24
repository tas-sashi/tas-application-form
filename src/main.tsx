/* import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
) */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// ── Dev only: pre-fill form store so you skip manual data entry ───────────────
if (import.meta.env.DEV) {
  const { seedFormData } = await import('./dev/seedData')
  const { useFormStore } = await import('./store/formStore')

  const store = useFormStore.getState()
  Object.keys(seedFormData).forEach((page) => {
    const key = page as keyof typeof seedFormData
    store.updatePage(key, seedFormData[key])
    store.markStepVisited(
      ['personal','family','tenth','twelfth','btech','training','whyYou'].indexOf(key)
    )
  })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)