import { NextResponse, NextRequest } from 'next/server'
import { db } from '../../../../lib/db'

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const { id } = params
  await db.query('DELETE FROM subjects WHERE id = $1', [id])
  return NextResponse.json({ success: true })
}