import { NextResponse, NextRequest } from 'next/server';
import { db } from '../../../../lib/db';

export async function DELETE(
  request: NextRequest,
  // @ts-ignore // Ou @ts-expect-error <-- Ignora o erro na linha seguinte (assinatura do parâmetro)
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const { id } = params;
  // ... (resto do código com try/catch)
  try {
    await db.query('DELETE FROM subjects WHERE id = $1', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database Error deleting subject:", error);
    return NextResponse.json({ success: false, message: 'Failed to delete subject' }, { status: 500 });
  }
}