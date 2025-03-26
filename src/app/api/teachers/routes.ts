// src/app/api/teachers/route.ts
import { NextResponse } from 'next/server'
import { db } from '../../../lib/db'

export async function GET() {
  const result = await db.query('SELECT * FROM teachers')
  return NextResponse.json(result.rows)
}

export async function POST(request: Request) {
  const { name } = await request.json()
  // Inicialmente, subjects pode ser um array vazio
  const result = await db.query('INSERT INTO teachers (name, subjects) VALUES ($1, $2) RETURNING *', [name, []])
  return NextResponse.json(result.rows[0], { status: 201 })
}
