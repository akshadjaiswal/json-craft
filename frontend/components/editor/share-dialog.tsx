'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface ShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ShareDialog({ open, onOpenChange }: ShareDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Conversion</DialogTitle>
          <DialogDescription>
            Share your JSON conversion with a unique link
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Share functionality will be implemented in Phase 4
        </p>
      </DialogContent>
    </Dialog>
  )
}
