import { Zap, Lock, Share2, Code2, Sparkles, Github } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const features = [
  {
    icon: Zap,
    title: 'Instant Conversion',
    description: 'Convert JSON to TypeScript, Zod, and Prisma schemas in milliseconds with zero configuration.',
  },
  {
    icon: Lock,
    title: 'No Login Required',
    description: 'Start converting immediately. No sign-up, no authentication, no friction—just paste and convert.',
  },
  {
    icon: Share2,
    title: 'Shareable URLs',
    description: 'Generate unique links to share your conversions with teammates, students, or the community.',
  },
  {
    icon: Code2,
    title: 'Clean & Minimal UI',
    description: 'Beautiful, distraction-free interface with Monaco editor support and syntax highlighting.',
  },
  {
    icon: Sparkles,
    title: 'Smart Type Inference',
    description: 'Automatically detects types including nested objects, arrays, and nullable fields.',
  },
  {
    icon: Github,
    title: 'Open Source',
    description: 'Fully open-source and free forever. Contribute, fork, or deploy your own instance.',
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-32 border-b">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Everything you need to work with JSON schemas
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features to streamline your development workflow
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="border-2 hover:border-brand-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4">
                  <div className="h-12 w-12 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
