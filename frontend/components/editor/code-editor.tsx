'use client'

import { Editor, EditorProps } from '@monaco-editor/react'
import { useTheme } from 'next-themes'

interface CodeEditorProps extends Omit<EditorProps, 'theme'> {
  language?: string
  value?: string
  onChange?: (value: string | undefined) => void
  readOnly?: boolean
  height?: string
}

export function CodeEditor({
  language = 'json',
  value = '',
  onChange,
  readOnly = false,
  height = '600px',
  ...props
}: CodeEditorProps) {
  const { theme } = useTheme()

  return (
    <Editor
      height={height}
      language={language}
      value={value}
      onChange={onChange}
      theme={theme === 'dark' ? 'vs-dark' : 'light'}
      options={{
        readOnly,
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        wordWrap: 'on',
        formatOnPaste: true,
        formatOnType: true,
        folding: true,
        bracketPairColorization: {
          enabled: true,
        },
        smoothScrolling: true,
        cursorBlinking: 'smooth',
        renderWhitespace: 'selection',
        renderLineHighlight: 'all',
        padding: {
          top: 16,
          bottom: 16,
        },
        quickSuggestions: readOnly ? false : undefined,
        ...props.options,
      }}
      {...props}
    />
  )
}
