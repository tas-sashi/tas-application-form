interface RadioOption {
  value: string
  label: string
}

interface RadioGroupProps {
    name: string
    options: RadioOption[]
    value: string
    onChange: (value: string) => void
    error?: string
    columns?: 2 | 3 | 4
}
  
export function RadioGroup({
    name,
    options,
    value,
    onChange,
    error,
    columns = 2,
}: RadioGroupProps) {
    // On mobile always use 2 columns max, respect columns prop on sm+
    const colClass = {
      2: 'grid-cols-2',
      3: 'grid-cols-2 sm:grid-cols-3',
      4: 'grid-cols-2 sm:grid-cols-4',
    }[columns]
  
    return (
      <div className="flex flex-col gap-1.5">
        <div className={`grid ${colClass} gap-2`}>
          {options.map((opt) => (
            <label
              key={opt.value}
              className={`radio-card ${value === opt.value ? 'radio-card-selected' : ''}`}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={value === opt.value}
                onChange={() => onChange(opt.value)}
                className="accent-teal-600 w-4 h-4 flex-shrink-0"
              />
              <span className="text-sm font-medium text-gray-700 leading-tight">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
        {error && (
          <p className="form-error">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </p>
        )}
      </div>
    )
}
