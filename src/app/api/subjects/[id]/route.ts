// src/app/api/subjects/[id]/route.ts
import { NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await db.query('DELETE FROM subjects WHERE id = $1', [params.id])
  return NextResponse.json({ success: true })
}
