import { FileJson, Wand2, Copy } from 'lucide-react'

const steps = [
  {
    icon: FileJson,
    number: '01',
    title: 'Paste your JSON',
    description: 'Copy and paste any valid JSON into the editor. Use our examples to get started quickly.',
  },
  {
    icon: Wand2,
    number: '02',
    title: 'Click Convert',
    description: 'Hit convert (or Ctrl+Enter) to instantly generate TypeScript, Zod, and Prisma schemas.',
  },
  {
    icon: Copy,
    number: '03',
    title: 'Copy or share',
    description: 'Copy the schema to your clipboard or generate a shareable link for your team.',
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to convert JSON to production-ready schemas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-full h-0.5 bg-border z-0" />
              )}

              <div className="relative z-10 flex flex-col items-center text-center gap-4">
                <div className="h-24 w-24 rounded-full border-4 border-background bg-card shadow-lg flex items-center justify-center">
                  <step.icon className="h-10 w-10 text-brand-primary" />
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-mono text-muted-foreground">
                    Step {step.number}
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
