import { NextResponse } from 'next/server'
import { db } from '../../../../lib/db'
// Removed invalid import for RouteHandlerContext
export async function DELETE(
  context: { params: { id: string } }
) {
  const { id } = context.params
  await db.query('DELETE FROM subjects WHERE id = $1', [id])
  return NextResponse.json({ success: true })
}