// src/app/components/ScheduleModal.tsx
'use client'
import React, { useState, useEffect } from 'react'
import Select from './Select'
import DatePicker from './DatePicker'

interface Lesson {
    turma: string
    day: string
    time: string
    subject: string
    teacher: string
    date: string
}

interface Subject {
    id: string
    name: string
}

interface Teacher {
    id: string
    name: string
    subjects?: string[]
}
  
  interface ScheduleModalProps {
    turma: string
    day: string
    time: string
    onClose: () => void
    onLessonAdded: (lesson: Lesson) => void
  }


const ScheduleModal: React.FC<ScheduleModalProps> = ({ turma, day, time, onClose, onLessonAdded }) => {
  const [subject, setSubject] = useState<string>('')
  const [teacher, setTeacher] = useState<string>('')
  const [date, setDate] = useState<string>('')

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    // Busca as matérias
    fetch('/api/subjects')
      .then((res) => res.json())
      .then((data) => setSubjects(data))
    // Busca os professores
    fetch('/api/teachers')
      .then((res) => res.json())
      .then((data) => setTeachers(data))
  }, [])

  // Filtra os professores que lecionam a matéria selecionada
  const filteredTeachers = teachers.filter((t) => t.subjects?.includes(subject))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Envia os dados para a API (com validação no backend)
    const res = await fetch('/api/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ turma, day, time, subject, teacher, date })
    })
    if (res.ok) {
      const newLesson = await res.json()
      onLessonAdded(newLesson)
      onClose()
    } else {
      alert('Erro ao adicionar aula. Verifique conflito de horário.')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-96">
        <h2 className="text-lg font-bold mb-4">Agendar Aula</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Matéria:</label>
            <Select
              value={subject}
              onChange={setSubject}
              options={subjects.map((s) => ({ value: s.id, label: s.name }))}
            />
          </div>
          <div className="mb-4">
            <label>Professor:</label>
            <Select
              value={teacher}
              onChange={setTeacher}
              options={filteredTeachers.map((t) => ({ value: t.id, label: t.name }))}
            />
          </div>
          <div className="mb-4">
            <label>Data:</label>
            <DatePicker value={date} onChange={setDate} />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ScheduleModal
