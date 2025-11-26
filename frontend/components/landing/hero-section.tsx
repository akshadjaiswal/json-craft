import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Github } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-background/50 backdrop-blur-sm w-fit">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium text-muted-foreground">
                Open Source & Free Forever
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Convert JSON to{' '}
              <span className="text-brand-primary">TypeScript</span>,{' '}
              <span className="text-brand-primary">Zod</span> &{' '}
              <span className="text-brand-primary">Prisma</span> — Instantly.
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Fast, open-source schema generation for developers.
              <br />
              Paste JSON → generate schemas → share with a link.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/editor">
                <Button size="lg" className="w-full sm:w-auto text-base gap-2">
                  Launch App
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <a
                href="https://github.com/yourusername/json-craft"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base gap-2">
                  <Github className="h-5 w-5" />
                  View on GitHub
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t">
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">Output Formats</div>
              </div>
              <div>
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-muted-foreground">Login Required</div>
              </div>
              <div>
                <div className="text-2xl font-bold">&lt;100ms</div>
                <div className="text-sm text-muted-foreground">Conversion Time</div>
              </div>
            </div>
          </div>

          {/* Right: Code Preview Mockup */}
          <div className="relative">
            <div className="rounded-lg border bg-card shadow-2xl p-4 font-mono text-sm">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="ml-4 text-xs text-muted-foreground">schema.ts</span>
              </div>
              <pre className="text-xs leading-relaxed">
                <code className="language-typescript">
{`interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  address: Address;
}

interface Address {
  city: string;
  zipCode: string;
}`}
                </code>
              </pre>
            </div>
            {/* Accent decoration */}
            <div className="absolute -z-10 top-10 right-10 w-72 h-72 bg-brand-primary/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
