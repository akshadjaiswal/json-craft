'use client'

import { Button } from '@/components/ui/button'
import { useEditorStore } from '@/lib/stores/editor-store'
import { Play, Share2, Loader2 } from 'lucide-react'
import { useKeyboardShortcuts } from '@/lib/utils/keyboard-shortcuts'

interface EditorToolbarProps {
  onShare: () => void
}

export function EditorToolbar({ onShare }: EditorToolbarProps) {
  const { jsonInput, convert, isConverting, typescriptOutput } = useEditorStore()

  const hasOutput = typescriptOutput.trim().length > 0
  const canConvert = jsonInput.trim().length > 0 && !isConverting

  // Setup keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: 'Enter',
      ctrlKey: true,
      callback: () => {
        if (canConvert) {
          convert()
        }
      },
    },
  ])

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b bg-background">
      <div className="flex items-center gap-3">
        <Button
          onClick={convert}
          disabled={!canConvert}
          size="lg"
          className="gap-2"
        >
          {isConverting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Converting...
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              Convert
            </>
          )}
        </Button>
        <span className="text-xs text-muted-foreground">
          Ctrl+Enter
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={onShare}
          disabled={!hasOutput}
          className="gap-2"
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  )
}
