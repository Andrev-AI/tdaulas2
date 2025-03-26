// src/app/fixed-classes/page.tsx
'use client'
import React, { useState } from 'react'
import Select from '../components/Select'

const daysOfWeek = [
  { value: 'Segunda', label: 'Segunda' },
  { value: 'Terça', label: 'Terça' },
  { value: 'Quarta', label: 'Quarta' },
  { value: 'Quinta', label: 'Quinta' },
  { value: 'Sexta', label: 'Sexta' },
]

export default function FixedClasses() {
  const [day, setDay] = useState<string>('')
  const [time, setTime] = useState<string>('')
  const [turma, setTurma] = useState<string>('')
  const [subject, setSubject] = useState<string>('')
  const [teacher, setTeacher] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/fixed-classes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ day, time, turma, subject, teacher })
    })
    if (res.ok) {
      alert('Aula fixa criada com sucesso!')
      // Atualize a interface conforme necessário
    } else {
      alert('Erro ao criar aula fixa.')
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Criar Aulas Fixas</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Dia da Semana:</label>
          <Select value={day} onChange={setDay} options={daysOfWeek} />
        </div>
        <div>
          <label>Horário (ex: 08:00):</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <div>
          <label>Turma:</label>
          <input
            type="text"
            value={turma}
            onChange={(e) => setTurma(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <div>
          <label>Matéria:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <div>
          <label>Professor:</label>
          <input
            type="text"
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Criar Aula Fixa
        </button>
      </form>
    </div>
  )
}
