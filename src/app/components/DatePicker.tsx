// src/app/components/DatePicker.tsx
import React from 'react'

interface DatePickerProps {
  value: string
  onChange: (value: string) => void
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 rounded w-full"
    />
  )
}

export default DatePicker
