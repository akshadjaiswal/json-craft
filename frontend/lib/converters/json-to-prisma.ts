type JsonValue = string | number | boolean | null | JsonObject | JsonArray
type JsonObject = { [key: string]: JsonValue }
type JsonArray = JsonValue[]

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function toPascalCase(str: string): string {
  return str
    .replace(/[_-](\w)/g, (_, c) => c.toUpperCase())
    .replace(/^\w/, (c) => c.toUpperCase())
}

function inferPrismaType(value: JsonValue): string {
  if (value === null) {
    return 'String?' // Nullable string as default
  }

  if (Array.isArray(value)) {
    return 'Json' // Arrays stored as Json in Prisma
  }

  if (typeof value === 'object') {
    return 'Json' // Objects stored as Json in Prisma
  }

  switch (typeof value) {
    case 'string':
      // Check if it looks like a date
      if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
        return 'DateTime'
      }
      return 'String'
    case 'number':
      return Number.isInteger(value) ? 'Int' : 'Float'
    case 'boolean':
      return 'Boolean'
    default:
      return 'String'
  }
}

function generatePrismaModel(
  obj: JsonObject,
  modelName: string,
  models: Set<string>
): string {
  const nestedModels: string[] = []
  let result = `model ${modelName} {\n`
  result += `  id String @id @default(cuid())\n`

  for (const [key, value] of Object.entries(obj)) {
    const isOptional = value === null

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // For nested objects, we use Json type in Prisma
      result += `  ${key} Json${isOptional ? '?' : ''}\n`
    } else if (Array.isArray(value)) {
      // Arrays are stored as Json type
      result += `  ${key} Json${isOptional ? '?' : ''}\n`
    } else {
      const prismaType = inferPrismaType(value)
      result += `  ${key} ${prismaType}${isOptional && !prismaType.includes('?') ? '?' : ''}\n`
    }
  }

  result += `  createdAt DateTime @default(now())\n`
  result += `  updatedAt DateTime @updatedAt\n`
  result += '}'

  return nestedModels.length > 0
    ? nestedModels.join('\n\n') + '\n\n' + result
    : result
}

export function convertJsonToPrisma(jsonString: string, modelName: string = 'User'): string {
  try {
    const parsed: JsonValue = JSON.parse(jsonString)

    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'object') {
        const models = new Set<string>([modelName])
        const model = generatePrismaModel(parsed[0] as JsonObject, modelName, models)
        return `// Prisma Schema\n// This is your Prisma schema file\n\ngenerator client {\n  provider = "prisma-client-js"\n}\n\ndatasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n\n${model}`
      }
      throw new Error('Root value must be an object')
    }

    const models = new Set<string>([modelName])
    const model = generatePrismaModel(parsed as JsonObject, modelName, models)

    return `// Prisma Schema\n// This is your Prisma schema file\n\ngenerator client {\n  provider = "prisma-client-js"\n}\n\ndatasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n\n${model}`
  } catch (error) {
    throw new Error(`Failed to convert JSON to Prisma: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
