import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { convertJsonToTypeScript } from '@/lib/converters/json-to-typescript'
import { convertJsonToZod } from '@/lib/converters/json-to-zod'
import { convertJsonToPrisma } from '@/lib/converters/json-to-prisma'
import { validateJson, formatJson } from '@/lib/utils/json-validator'

export type OutputType = 'typescript' | 'zod' | 'prisma'

interface EditorState {
  // Input
  jsonInput: string

  // Outputs
  typescriptOutput: string
  zodOutput: string
  prismaOutput: string

  // UI State
  activeTab: OutputType
  isConverting: boolean
  error: string | null

  // Actions
  setJsonInput: (input: string) => void
  setActiveTab: (tab: OutputType) => void
  convert: () => void
  clear: () => void
  formatInput: () => void
  loadExample: (example: string) => void
  setOutputs: (ts: string, zod: string, prisma: string) => void
}

const EXAMPLE_JSON = {
  user: `{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "isActive": true,
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zipCode": "10001"
  },
  "tags": ["developer", "designer"]
}`,
  product: `{
  "productId": "abc123",
  "name": "Laptop",
  "price": 999.99,
  "inStock": true,
  "specs": {
    "cpu": "Intel i7",
    "ram": "16GB",
    "storage": "512GB SSD"
  },
  "reviews": [
    {
      "userId": 1,
      "rating": 5,
      "comment": "Excellent product!"
    }
  ]
}`,
  api: `{
  "status": 200,
  "message": "Success",
  "data": {
    "users": [
      {
        "id": 1,
        "username": "alice",
        "role": "admin"
      },
      {
        "id": 2,
        "username": "bob",
        "role": "user"
      }
    ],
    "pagination": {
      "page": 1,
      "totalPages": 10,
      "hasMore": true
    }
  }
}`
}

export const useEditorStore = create<EditorState>()(
  persist(
    (set, get) => ({
      // Initial state
      jsonInput: '',
      typescriptOutput: '',
      zodOutput: '',
      prismaOutput: '',
      activeTab: 'typescript',
      isConverting: false,
      error: null,

      // Actions
      setJsonInput: (input) => set({ jsonInput: input, error: null }),

      setActiveTab: (tab) => set({ activeTab: tab }),

      convert: () => {
        const { jsonInput } = get()

        // Validate JSON
        const validation = validateJson(jsonInput)
        if (!validation.valid) {
          set({
            error: validation.error || 'Invalid JSON',
            typescriptOutput: '',
            zodOutput: '',
            prismaOutput: ''
          })
          return
        }

        set({ isConverting: true, error: null })

        try {
          // Convert to all formats
          const typescript = convertJsonToTypeScript(jsonInput, 'Root')
          const zod = convertJsonToZod(jsonInput, 'rootSchema')
          const prisma = convertJsonToPrisma(jsonInput, 'User')

          set({
            typescriptOutput: typescript,
            zodOutput: zod,
            prismaOutput: prisma,
            isConverting: false,
            error: null,
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Conversion failed',
            typescriptOutput: '',
            zodOutput: '',
            prismaOutput: '',
            isConverting: false,
          })
        }
      },

      clear: () =>
        set({
          jsonInput: '',
          typescriptOutput: '',
          zodOutput: '',
          prismaOutput: '',
          error: null,
        }),

      formatInput: () => {
        const { jsonInput } = get()
        try {
          const formatted = formatJson(jsonInput)
          set({ jsonInput: formatted, error: null })
        } catch (error) {
          set({ error: 'Cannot format invalid JSON' })
        }
      },

      loadExample: (exampleKey: string) => {
        const example = EXAMPLE_JSON[exampleKey as keyof typeof EXAMPLE_JSON]
        if (example) {
          set({ jsonInput: example, error: null })
        }
      },

      setOutputs: (ts, zod, prisma) =>
        set({
          typescriptOutput: ts,
          zodOutput: zod,
          prismaOutput: prisma,
        }),
    }),
    {
      name: 'json-craft-editor',
      partialize: (state) => ({
        jsonInput: state.jsonInput,
        activeTab: state.activeTab,
      }),
    }
  )
)
