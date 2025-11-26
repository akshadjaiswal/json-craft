type JsonValue = string | number | boolean | null | JsonObject | JsonArray
type JsonObject = { [key: string]: JsonValue }
type JsonArray = JsonValue[]

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function toCamelCase(str: string): string {
  return str.replace(/[_-](\w)/g, (_, c) => c.toUpperCase())
}

function inferZodType(value: JsonValue, key: string = 'value'): string {
  if (value === null) {
    return 'z.null()'
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return 'z.array(z.any())'
    }

    const firstItem = value[0]
    if (typeof firstItem === 'object' && firstItem !== null && !Array.isArray(firstItem)) {
      const schemaName = toCamelCase(capitalize(key.replace(/s$/, '')) || 'item') + 'Schema'
      return `z.array(${schemaName})`
    }

    const itemType = inferZodType(firstItem, key)
    return `z.array(${itemType})`
  }

  if (typeof value === 'object') {
    const schemaName = toCamelCase(capitalize(key)) + 'Schema'
    return schemaName
  }

  switch (typeof value) {
    case 'string':
      return 'z.string()'
    case 'number':
      return Number.isInteger(value) ? 'z.number().int()' : 'z.number()'
    case 'boolean':
      return 'z.boolean()'
    default:
      return 'z.unknown()'
  }
}

function generateZodSchema(
  obj: JsonObject,
  schemaName: string,
  schemas: Set<string>,
  indent: number = 0
): string {
  const nestedSchemas: string[] = []
  const indentStr = '  '.repeat(indent)
  let result = `const ${schemaName} = z.object({\n`

  for (const [key, value] of Object.entries(obj)) {
    const zodType = inferZodType(value, key)
    const isOptional = value === null

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const nestedSchemaName = toCamelCase(capitalize(key)) + 'Schema'
      if (!schemas.has(nestedSchemaName)) {
        schemas.add(nestedSchemaName)
        nestedSchemas.push(
          generateZodSchema(value as JsonObject, nestedSchemaName, schemas, indent)
        )
      }
      result += `  ${key}: ${isOptional ? `${nestedSchemaName}.nullable()` : nestedSchemaName},\n`
    } else if (Array.isArray(value) && value.length > 0) {
      const firstItem = value[0]
      if (typeof firstItem === 'object' && firstItem !== null && !Array.isArray(firstItem)) {
        const arraySchemaName = toCamelCase(capitalize(key.replace(/s$/, '')) || 'item') + 'Schema'
        if (!schemas.has(arraySchemaName)) {
          schemas.add(arraySchemaName)
          nestedSchemas.push(
            generateZodSchema(firstItem as JsonObject, arraySchemaName, schemas, indent)
          )
        }
        result += `  ${key}: z.array(${arraySchemaName}),\n`
      } else {
        result += `  ${key}: ${zodType},\n`
      }
    } else {
      result += `  ${key}: ${zodType},\n`
    }
  }

  result += '})'

  const fullSchema = nestedSchemas.length > 0
    ? nestedSchemas.join('\n\n') + '\n\n' + result
    : result

  return fullSchema
}

export function convertJsonToZod(jsonString: string, schemaName: string = 'rootSchema'): string {
  try {
    const parsed: JsonValue = JSON.parse(jsonString)

    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'object') {
        const schemas = new Set<string>(['itemSchema'])
        const itemSchema = generateZodSchema(parsed[0] as JsonObject, 'itemSchema', schemas)
        return `import { z } from 'zod'\n\n${itemSchema}\n\nconst ${schemaName} = z.array(itemSchema)`
      }
      throw new Error('Root value must be an object')
    }

    const schemas = new Set<string>([schemaName])
    const schema = generateZodSchema(parsed as JsonObject, schemaName, schemas)

    return `import { z } from 'zod'\n\n${schema}\n\ntype ${capitalize(schemaName.replace(/Schema$/, ''))} = z.infer<typeof ${schemaName}>`
  } catch (error) {
    throw new Error(`Failed to convert JSON to Zod: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
