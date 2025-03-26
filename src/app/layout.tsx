// src/app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Troca de Aulas SaaS',
  description: 'Sistema para troca de aulas',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-xl font-bold">Troca de Aulas</h1>
        </header>
        <main className="p-4">{children}</main>
      </body>
    </html>
  )
}
