// src/app/api/fixed-classes/route.ts
import { NextResponse } from 'next/server'
import { db } from '../../../lib/db'

export async function POST(request: Request) {
  const { day, time, turma, subject, teacher } = await request.json()
  const result = await db.query(
    'INSERT INTO fixed_lessons (day, time, turma, subject, teacher) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [day, time, turma, subject, teacher]
  )
  return NextResponse.json(result.rows[0], { status: 201 })
}
