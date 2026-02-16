import type { Metadata } from 'next'
import './globals.css'
import { QueryProvider } from '@/lib/query-provider'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/providers/theme-provider'

export const metadata: Metadata = {
  title: 'JSONCraft - Convert JSON to TypeScript, Zod & Prisma',
  description: 'Fast, open-source schema generation for developers. Paste JSON → generate schemas → share with a link.',
  keywords: ['JSON', 'TypeScript', 'Zod', 'Prisma', 'Schema Generator', 'Developer Tools'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            {children}
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
