import { NextResponse, NextRequest } from 'next/server';
import { db } from '../../../../lib/db';

export async function DELETE(
  _request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any // Permite 'any' aqui apesar das regras
): Promise<NextResponse> {
  const id = context?.params?.id;

  if (!id) {
     return NextResponse.json({ success: false, message: 'Missing ID parameter' }, { status: 400 });
  }

  try {
    // ... resto do código ...
    const result = await db.query('DELETE FROM subjects WHERE id = $1', [id]);
    if (result.rowCount === 0) {
        return NextResponse.json({ success: false, message: 'Subject not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database Error deleting subject:", error);
    return NextResponse.json({ success: false, message: 'Failed to delete subject due to server error' }, { status: 500 });
  }
}