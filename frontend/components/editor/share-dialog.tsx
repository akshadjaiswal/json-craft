'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useEditorStore } from '@/lib/stores/editor-store'
import { useCreateConversion } from '@/lib/api/conversions'
import { useToast } from '@/hooks/use-toast'
import { Copy, Check, Loader2, ExternalLink } from 'lucide-react'
import { useState } from 'react'

interface ShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ShareDialog({ open, onOpenChange }: ShareDialogProps) {
  const { jsonInput, typescriptOutput, zodOutput, prismaOutput } = useEditorStore()
  const createConversion = useCreateConversion()
  const { toast } = useToast()
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    try {
      const result = await createConversion.mutateAsync({
        json_input: jsonInput,
        ts_output: typescriptOutput,
        zod_output: zodOutput,
        prisma_output: prismaOutput,
      })

      setShareUrl(result.url)
      toast({
        title: 'Share link created',
        description: 'Your conversion has been saved and is ready to share',
      })
    } catch (error) {
      toast({
        title: 'Failed to create share link',
        description: 'Please try again later',
        variant: 'destructive',
      })
    }
  }

  const handleCopy = async () => {
    if (!shareUrl) return

    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast({
        title: 'Copied to clipboard',
        description: 'Share link copied successfully',
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast({
        title: 'Failed to copy',
        description: 'Could not copy to clipboard',
        variant: 'destructive',
      })
    }
  }

  const handleClose = () => {
    setShareUrl(null)
    setCopied(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Conversion</DialogTitle>
          <DialogDescription>
            Create a shareable link to your JSON conversion
          </DialogDescription>
        </DialogHeader>

        {!shareUrl ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Generate a unique link to share this conversion with others. The link will remain active permanently.
            </p>
            <Button
              onClick={handleShare}
              disabled={createConversion.isPending}
              className="w-full"
            >
              {createConversion.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating link...
                </>
              ) : (
                'Generate Share Link'
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 rounded-lg border bg-muted/50">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 bg-transparent text-sm outline-none"
              />
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleCopy}
                className="flex-1"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Link
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open(shareUrl, '_blank')}
                className="flex-1"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
