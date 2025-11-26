'use client'

import { use } from 'react'
import { useGetConversion } from '@/lib/api/conversions'
import { JsonInputPanel } from '@/components/editor/json-input-panel'
import { OutputTabs } from '@/components/editor/output-tabs'
import { useEditorStore } from '@/lib/stores/editor-store'
import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SharedConversionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { data: conversion, isLoading, error } = useGetConversion(slug)
  const { setJsonInput, setOutputs } = useEditorStore()

  useEffect(() => {
    if (conversion) {
      setJsonInput(conversion.json_input)
      setOutputs(conversion.ts_output, conversion.zod_output, conversion.prisma_output)
    }
  }, [conversion, setJsonInput, setOutputs])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error || !conversion) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold">Conversion Not Found</h1>
        <p className="text-muted-foreground">
          This shared conversion doesn't exist or has been removed.
        </p>
        <Link href="/">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Home
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-mono text-lg font-semibold">
              <span className="text-brand-primary">JSON</span>Craft
            </span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="hidden sm:inline">Shared Conversion</span>
            <span className="font-mono text-xs px-2 py-1 rounded bg-muted">{slug}</span>
          </div>
        </div>
      </header>

      {/* Info Banner */}
      <div className="border-b bg-muted/50 px-4 py-2">
        <div className="container mx-auto flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Viewing read-only shared conversion
          </p>
          <Link href="/editor">
            <Button variant="outline" size="sm">
              Try JSONCraft
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 min-h-0">
        <div className="container mx-auto h-full px-4 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
            {/* Left: JSON Input (Read-only but scrollable) */}
            <div className="min-h-[500px] lg:min-h-0 [&_button]:pointer-events-none [&_button]:opacity-50">
              <JsonInputPanel />
            </div>

            {/* Right: Output Tabs */}
            <div className="min-h-[500px] lg:min-h-0">
              <OutputTabs />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
