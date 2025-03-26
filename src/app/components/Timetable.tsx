// src/app/components/Timetable.tsx
import React from 'react'

interface Lesson {
    day: string
    time: string
    subject: string
    teacher: string
}

interface TimetableProps {
    schedule: Lesson[]
    onSlotClick: (day: string, time: string) => void
}

const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']
const startTime = 8
const endTime = 17.5  // Até 17:30
const lessonDuration = 55 // minutos

// Gera os horários (simplificação: cada hora com início em :00)
const generateTimeSlots = () => {
  const slots: string[] = []
  for (let hour = startTime; hour < endTime; hour++) {
    const hourStr = hour.toString().padStart(2, '0')
    slots.push(`${hourStr}:00`)
  }
  return slots
}

const Timetable: React.FC<TimetableProps> = ({ schedule, onSlotClick }) => {
  const timeSlots = generateTimeSlots()

  const getLessonForSlot = (day: string, time: string) =>
    schedule.find((lesson) => lesson.day === day && lesson.time === time)

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border p-2">Horário</th>
            {days.map((day) => (
              <th key={day} className="border p-2">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time) => (
            <tr key={time}>
              <td className="border p-2">{time}</td>
              {days.map((day) => {
                const lesson = getLessonForSlot(day, time)
                return (
                  <td key={day} className="border p-2">
                    {lesson ? (
                      <div className="flex justify-between items-center">
                        <span>
                          {lesson.subject} - {lesson.teacher}
                        </span>
                        <button className="text-red-500 text-sm">Excluir</button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onSlotClick(day, time)}
                        className="text-blue-500 text-sm"
                      >
                        Vago
                      </button>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Timetable
