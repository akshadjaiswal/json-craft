'use client'

import { CodeEditor } from './code-editor'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEditorStore } from '@/lib/stores/editor-store'
import { Copy, Download, Check } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

interface OutputTabsProps {
  onShare?: () => void
}

export function OutputTabs({ onShare }: OutputTabsProps) {
  const {
    typescriptOutput,
    zodOutput,
    prismaOutput,
    activeTab,
    setActiveTab,
  } = useEditorStore()

  const { toast } = useToast()
  const [copiedTab, setCopiedTab] = useState<string | null>(null)

  const outputs = {
    typescript: {
      label: 'TypeScript',
      content: typescriptOutput,
      language: 'typescript',
      fileName: 'types.ts',
    },
    zod: {
      label: 'Zod',
      content: zodOutput,
      language: 'typescript',
      fileName: 'schema.ts',
    },
    prisma: {
      label: 'Prisma',
      content: prismaOutput,
      language: 'prisma',
      fileName: 'schema.prisma',
    },
  }

  const handleCopy = async (content: string, tab: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedTab(tab)
      toast({
        title: 'Copied to clipboard',
        description: `${outputs[tab as keyof typeof outputs].label} schema copied successfully`,
      })
      setTimeout(() => setCopiedTab(null), 2000)
    } catch (error) {
      toast({
        title: 'Failed to copy',
        description: 'Could not copy to clipboard',
        variant: 'destructive',
      })
    }
  }

  const handleDownload = (content: string, fileName: string) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: 'Download started',
      description: `Downloading ${fileName}`,
    })
  }

  const currentOutput = outputs[activeTab]
  const hasContent = currentOutput.content.trim().length > 0

  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-card">
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as typeof activeTab)}
        className="flex flex-col h-full"
      >
        {/* Header with Tabs */}
        <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
          <TabsList>
            <TabsTrigger value="typescript">TypeScript</TabsTrigger>
            <TabsTrigger value="zod">Zod</TabsTrigger>
            <TabsTrigger value="prisma">Prisma</TabsTrigger>
          </TabsList>

          {hasContent && (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(currentOutput.content, activeTab)}
              >
                {copiedTab === activeTab ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDownload(currentOutput.content, currentOutput.fileName)}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          )}
        </div>

        {/* Tab Content */}
        <div className="flex-1 min-h-0">
          <TabsContent value="typescript" className="h-full m-0 data-[state=active]:flex">
            {hasContent ? (
              <CodeEditor
                language="typescript"
                value={typescriptOutput}
                readOnly
                height="100%"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p className="text-sm">Convert JSON to see TypeScript output</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="zod" className="h-full m-0 data-[state=active]:flex">
            {hasContent ? (
              <CodeEditor
                language="typescript"
                value={zodOutput}
                readOnly
                height="100%"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p className="text-sm">Convert JSON to see Zod output</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="prisma" className="h-full m-0 data-[state=active]:flex">
            {hasContent ? (
              <CodeEditor
                language="prisma"
                value={prismaOutput}
                readOnly
                height="100%"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p className="text-sm">Convert JSON to see Prisma output</p>
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
