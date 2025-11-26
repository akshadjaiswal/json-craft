import { useEffect } from 'react'

export interface KeyboardShortcut {
  key: string
  ctrlKey?: boolean
  metaKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
  callback: () => void
  preventDefault?: boolean
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const ctrlOrMeta = shortcut.ctrlKey
          ? event.ctrlKey || event.metaKey
          : !event.ctrlKey && !event.metaKey

        const matchesKey = event.key.toLowerCase() === shortcut.key.toLowerCase()
        const matchesCtrl = shortcut.ctrlKey ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey
        const matchesShift = shortcut.shiftKey ? event.shiftKey : !event.shiftKey
        const matchesAlt = shortcut.altKey ? event.altKey : !event.altKey

        if (matchesKey && matchesCtrl && matchesShift && matchesAlt) {
          if (shortcut.preventDefault !== false) {
            event.preventDefault()
          }
          shortcut.callback()
          break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts])
}

export const getShortcutText = (shortcut: Omit<KeyboardShortcut, 'callback'>) => {
  const parts: string[] = []
  const isMac = typeof navigator !== 'undefined' && navigator.platform.toLowerCase().includes('mac')

  if (shortcut.ctrlKey) {
    parts.push(isMac ? '⌘' : 'Ctrl')
  }
  if (shortcut.shiftKey) {
    parts.push(isMac ? '⇧' : 'Shift')
  }
  if (shortcut.altKey) {
    parts.push(isMac ? '⌥' : 'Alt')
  }
  parts.push(shortcut.key.toUpperCase())

  return parts.join('+')
}
