// src/app/api/schedule/route.ts
import { NextResponse } from 'next/server'
import { db } from '../../../lib/db'

// POST para agendar aula (troca de aula)
export async function POST(request: Request) {
  const { turma, day, time, subject, teacher, date } = await request.json()

  // Validação: verifica se já existe aula para o mesmo dia, horário e turma com professor diferente
  const conflict = await db.query(
    `SELECT * FROM lessons WHERE turma = $1 AND day = $2 AND time = $3 AND date = $4`,
    [turma, day, time, date]
  )
  if (conflict.rowCount !== null && conflict.rowCount > 0) {
    const existing = conflict.rows[0]
    if (existing.teacher !== teacher) {
      return NextResponse.json({ error: 'Conflito de horário' }, { status: 400 })
    }
  }

  // Insere a nova aula
  const result = await db.query(
    `INSERT INTO lessons (turma, day, time, subject, teacher, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [turma, day, time, subject, teacher, date]
  )
  return NextResponse.json(result.rows[0], { status: 201 })
}

// GET para buscar agenda de uma turma
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const turma = searchParams.get('turma')
  const result = await db.query(`SELECT * FROM lessons WHERE turma = $1`, [turma])
  return NextResponse.json(result.rows)
}
