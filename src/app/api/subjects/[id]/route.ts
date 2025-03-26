import { NextResponse, NextRequest } from 'next/server'
import { db } from '../../../../lib/db'

export async function DELETE(
  _request: NextRequest, // Ou _request se não for usar
  context: { params: { id: string } } // <<< MUDANÇA AQUI
): Promise<NextResponse> {
  const { id } = context.params; // <<< E AQUI
  try {
    // É uma boa prática envolver chamadas de DB em try...catch
    await db.query('DELETE FROM subjects WHERE id = $1', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database Error deleting subject:", error);
    // Retornar um erro 500
    return NextResponse.json({ success: false, message: 'Failed to delete subject' }, { status: 500 });
  }
}