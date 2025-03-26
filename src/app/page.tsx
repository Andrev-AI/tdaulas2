// src/app/page.tsx
'use client'
import React, { useState, useEffect } from 'react'
import Timetable from './components/Timetable'
import ScheduleModal from './components/ScheduleModal'

interface Lesson {
  id: string
  turma: string
  day: string
  time: string
  subject: string
  teacher: string
  date: string
}

export default function Home() {
  const [turma, setTurma] = useState<string>('Turma A')
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string } | null>(null)
  const [schedule, setSchedule] = useState<Lesson[]>([])

  // Busca o agendamento da turma selecionada
  useEffect(() => {
    const fetchSchedule = async () => {
      const res = await fetch(`/api/schedule?turma=${turma}`)
      const data = await res.json()
      setSchedule(data)
    }
    fetchSchedule()
  }, [turma])

  const handleSlotClick = (day: string, time: string) => {
    setSelectedSlot({ day, time })
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setSelectedSlot(null)
  }

  const handleLessonAdded = (newLesson: any) => {
    // Atualiza o state com a nova aula agendada
    setSchedule([...schedule, newLesson])
  }

  return (
    <div>
      <div className="mb-4">
        <label className="mr-2">Selecione a Turma:</label>
        <select value={turma} onChange={(e) => setTurma(e.target.value)} className="border p-2 rounded">
          <option value="Turma A">Turma A</option>
          <option value="Turma B">Turma B</option>
        </select>
      </div>
      <Timetable schedule={schedule} onSlotClick={handleSlotClick} />
      {modalOpen && selectedSlot && (
        <ScheduleModal
          turma={turma}
          day={selectedSlot.day}
          time={selectedSlot.time}
          onClose={handleModalClose}
          onLessonAdded={handleLessonAdded}
        />
      )}
    </div>
  )
}
