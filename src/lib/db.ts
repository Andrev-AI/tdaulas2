// src/lib/db.ts
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL // string de conexão do Neon Postgres
})

export const db = {
  query: (text: string, params?: any[]) => pool.query(text, params),
}
