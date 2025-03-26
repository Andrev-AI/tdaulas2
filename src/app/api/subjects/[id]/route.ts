import { NextResponse, NextRequest } from 'next/server'
import { db } from '../../../../lib/db'

export async function DELETE(
  request: NextRequest, // Use 'request' if you might need it later, or keep '_' if unused
  context: { params: { id: string } } // Explicitly type the 'context' object
): Promise<NextResponse> {
  const { id } = context.params // Access id via context.params
  try { // Add try...catch for database operations
    await db.query('DELETE FROM subjects WHERE id = $1', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete subject:", error);
    // Return an error response
    return NextResponse.json({ success: false, message: "Failed to delete subject" }, { status: 500 });
  }
}