import { NextResponse, NextRequest } from 'next/server';
import { db } from '../../../../lib/db'; // Confirme se o caminho para 'db' está correto

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } } // <<< Assinatura padrão, sem o comentário @ts-expect-error
): Promise<NextResponse> {
  const { id } = params;

  // Verificação se o ID foi fornecido
  if (!id) {
     return NextResponse.json({ success: false, message: 'Missing ID parameter' }, { status: 400 });
  }

  try {
    // Executa a query para deletar o registro
    const result = await db.query('DELETE FROM subjects WHERE id = $1', [id]);

    // Verifica se alguma linha foi realmente deletada
    if (result.rowCount === 0) {
        // Se nenhuma linha foi afetada, o ID provavelmente não existia
        return NextResponse.json({ success: false, message: 'Subject not found' }, { status: 404 });
    }

    // Se chegou aqui, a deleção foi bem-sucedida (pelo menos 1 linha afetada)
    return NextResponse.json({ success: true });

  } catch (error) {
    // Log do erro no servidor para diagnóstico
    console.error("Database Error deleting subject:", error);

    // Resposta de erro genérica para o cliente
    return NextResponse.json({ success: false, message: 'Failed to delete subject due to server error' }, { status: 500 });
  }
}