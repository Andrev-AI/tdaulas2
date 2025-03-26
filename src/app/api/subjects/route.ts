// src/app/api/subjects/route.ts
import { NextResponse } from 'next/server'
import { db } from '../../../lib/db'

export async function GET() {
  const result = await db.query('SELECT * FROM subjects')
  return NextResponse.json(result.rows)
}

export async function POST(request: Request) {
  const { name } = await request.json()
  const result = await db.query('INSERT INTO subjects (name) VALUES ($1) RETURNING *', [name])
  return NextResponse.json(result.rows[0], { status: 201 })
}
