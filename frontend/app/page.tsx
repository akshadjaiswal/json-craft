import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { HowItWorks } from '@/components/landing/how-it-works'
import { ExamplesPreview } from '@/components/landing/examples-preview'
import { Footer } from '@/components/landing/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <ExamplesPreview />
      <Footer />
    </main>
  )
}
