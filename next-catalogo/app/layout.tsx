import './globals.css';
import Link from "next/link";
import type {ReactNode} from "react";

export const metadata = {
    title: 'Next Catalogo',
    description: 'Catalogo de productos con Next.js',
}

export default function RootLayout({children}: {children: ReactNode}) {
  return <html lang="es">
    <body>
    <header>
      <strong>Lideratec Academy . Catalogo Next.js</strong>
      <nav>
        <Link href="/">Inicio</Link>
        <Link href="/ssg">SSG</Link>
        <Link href="/ssr">SSR</Link>
        <Link href="/isr">ISR</Link>
      </nav>
    </header>
        {children}
    </body>
  </html>
}