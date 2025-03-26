import { NextResponse, NextRequest } from 'next/server';
import { db } from '../../../../lib/db'; // Confirme o caminho

// Definir explicitamente a estrutura esperada para o segundo parâmetro
type RouteContext = {
  params: {
    id: string;
  };
}
// Ou usando interface:
// interface RouteContext {
//   params: {
//     id: string;
//   };
// }

export async function DELETE(
  request: NextRequest,
  context: RouteContext // <<< Use o tipo/interface definido aqui
): Promise<NextResponse> {
  // Acessar via context.params como antes
  const { id } = context.params;

  if (!id) {
     return NextResponse.json({ success: false, message: 'Missing ID parameter' }, { status: 400 });
  }

  try {
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