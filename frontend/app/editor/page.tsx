'use client'

import { useState } from 'react'
import { JsonInputPanel } from '@/components/editor/json-input-panel'
import { OutputTabs } from '@/components/editor/output-tabs'
import { EditorToolbar } from '@/components/editor/editor-toolbar'
import { ShareDialog } from '@/components/editor/share-dialog'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function EditorPage() {
  const [shareDialogOpen, setShareDialogOpen] = useState(false)

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
          <ThemeToggle />
        </div>
      </header>

      {/* Toolbar */}
      <EditorToolbar onShare={() => setShareDialogOpen(true)} />

      {/* Main Editor */}
      <main className="flex-1 min-h-0">
        <div className="container mx-auto h-full px-4 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
            {/* Left: JSON Input */}
            <div className="min-h-[500px] lg:min-h-0">
              <JsonInputPanel />
            </div>

            {/* Right: Output Tabs */}
            <div className="min-h-[500px] lg:min-h-0">
              <OutputTabs onShare={() => setShareDialogOpen(true)} />
            </div>
          </div>
        </div>
      </main>

      {/* Share Dialog */}
      <ShareDialog open={shareDialogOpen} onOpenChange={setShareDialogOpen} />
    </div>
  )
}
