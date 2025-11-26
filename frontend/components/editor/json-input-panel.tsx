'use client'

import { CodeEditor } from './code-editor'
import { Button } from '@/components/ui/button'
import { useEditorStore } from '@/lib/stores/editor-store'
import { FileJson, Trash2, Wand2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function JsonInputPanel() {
  const { jsonInput, setJsonInput, formatInput, clear, loadExample, error } = useEditorStore()

  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-card">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/50">
        <div className="flex items-center gap-2">
          <FileJson className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">JSON Input</span>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Wand2 className="h-4 w-4 mr-2" />
                Examples
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Load Example JSON</DialogTitle>
                <DialogDescription>
                  Choose an example to get started quickly
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    loadExample('user')
                  }}
                >
                  <FileJson className="h-4 w-4 mr-2" />
                  User Profile
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    loadExample('product')
                  }}
                >
                  <FileJson className="h-4 w-4 mr-2" />
                  Product Data
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    loadExample('api')
                  }}
                >
                  <FileJson className="h-4 w-4 mr-2" />
                  API Response
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button
            variant="ghost"
            size="sm"
            onClick={formatInput}
            disabled={!jsonInput}
          >
            Format
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={clear}
            disabled={!jsonInput}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 min-h-0">
        <CodeEditor
          language="json"
          value={jsonInput}
          onChange={(value) => setJsonInput(value || '')}
          height="100%"
        />
      </div>

      {/* Error Display */}
      {error && (
        <div className="px-4 py-2 border-t bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}
    </div>
  )
}
