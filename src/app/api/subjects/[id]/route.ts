import { NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

export async function DELETE(
  request: Request,
  { params, searchParams }: { params: { id: string }; searchParams: { [key: string]: string | string[] | undefined } }
) {
  await db.query('DELETE FROM subjects WHERE id = $1', [params.id])
  return NextResponse.json({ success: true })
}