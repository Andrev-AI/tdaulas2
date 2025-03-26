// src/app/manage/page.tsx
'use client'
import React, { useState, useEffect } from 'react'

interface Subject {
    id: number
    name: string
  }
  
  interface Teacher {
    id: number
    name: string
    // Adicione outras propriedades se necessário, como a lista de matérias
  }
      

export default function Manage() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [teachers, setTeachers] = useState<Teacher[]>([])    
  const [newSubject, setNewSubject] = useState<string>('')
  const [newTeacher, setNewTeacher] = useState<string>('')

  const fetchData = async () => {
    const subjectsRes = await fetch('/api/subjects')
    const subjectsData = await subjectsRes.json()
    setSubjects(subjectsData)

    const teachersRes = await fetch('/api/teachers')
    const teachersData = await teachersRes.json()
    setTeachers(teachersData)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const addSubject = async () => {
    const res = await fetch('/api/subjects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newSubject })
    })
    if (res.ok) {
      setNewSubject('')
      fetchData()
    }
  }

  const deleteSubject = async (id: string) => {
    await fetch(`/api/subjects/${id}`, { method: 'DELETE' })
    fetchData()
  }

  const addTeacher = async () => {
    const res = await fetch('/api/teachers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newTeacher })
    })
    if (res.ok) {
      setNewTeacher('')
      fetchData()
    }
  }

  const deleteTeacher = async (id: string) => {
    await fetch(`/api/teachers/${id}`, { method: 'DELETE' })
    fetchData()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gerenciar Matérias e Professores</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold">Matérias</h3>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Nova Matéria"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            className="border p-2 rounded"
          />
          <button onClick={addSubject} className="px-4 py-2 bg-green-600 text-white rounded">
            Adicionar
          </button>
        </div>
        <ul>
          {subjects.map((subject) => (
            <li key={subject.id} className="flex justify-between items-center">
              {subject.name}
              <button onClick={() => deleteSubject(subject.id.toString())} className="text-red-500">
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold">Professores</h3>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Novo Professor"
            value={newTeacher}
            onChange={(e) => setNewTeacher(e.target.value)}
            className="border p-2 rounded"
          />
          <button onClick={addTeacher} className="px-4 py-2 bg-green-600 text-white rounded">
            Adicionar
          </button>
        </div>
        <ul>
          {teachers.map((teacher) => (
            <li key={teacher.id} className="flex justify-between items-center">
              {teacher.name}
              <button onClick={() => deleteTeacher(teacher.id.toString())} className="text-red-500">
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Adicione aqui componentes para atribuir/remover matérias dos professores */}
    </div>
  )
}
