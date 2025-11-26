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

function inferType(value: JsonValue, key: string = 'value'): string {
  if (value === null) {
    return 'null'
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return 'any[]'
    }

    const firstItem = value[0]
    if (typeof firstItem === 'object' && firstItem !== null && !Array.isArray(firstItem)) {
      const typeName = capitalize(key.replace(/s$/, '')) || 'Item'
      return `${typeName}[]`
    }

    const itemType = inferType(firstItem, key)
    return `${itemType}[]`
  }

  if (typeof value === 'object') {
    const typeName = capitalize(key) || 'Object'
    return typeName
  }

  return typeof value
}

function generateInterface(obj: JsonObject, interfaceName: string, interfaces: Set<string>): string {
  let result = `interface ${interfaceName} {\n`
  const nestedInterfaces: string[] = []

  for (const [key, value] of Object.entries(obj)) {
    const type = inferType(value, key)
    const isOptional = value === null || value === undefined

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const nestedInterfaceName = capitalize(key)
      if (!interfaces.has(nestedInterfaceName)) {
        interfaces.add(nestedInterfaceName)
        nestedInterfaces.push(generateInterface(value as JsonObject, nestedInterfaceName, interfaces))
      }
      result += `  ${key}${isOptional ? '?' : ''}: ${nestedInterfaceName};\n`
    } else if (Array.isArray(value) && value.length > 0) {
      const firstItem = value[0]
      if (typeof firstItem === 'object' && firstItem !== null && !Array.isArray(firstItem)) {
        const arrayInterfaceName = capitalize(key.replace(/s$/, '')) || 'Item'
        if (!interfaces.has(arrayInterfaceName)) {
          interfaces.add(arrayInterfaceName)
          nestedInterfaces.push(generateInterface(firstItem as JsonObject, arrayInterfaceName, interfaces))
        }
        result += `  ${key}${isOptional ? '?' : ''}: ${arrayInterfaceName}[];\n`
      } else {
        result += `  ${key}${isOptional ? '?' : ''}: ${type};\n`
      }
    } else {
      result += `  ${key}${isOptional ? '?' : ''}: ${type};\n`
    }
  }

  result += '}'

  return nestedInterfaces.length > 0
    ? nestedInterfaces.join('\n\n') + '\n\n' + result
    : result
}

export function convertJsonToTypeScript(jsonString: string, rootInterfaceName: string = 'Root'): string {
  try {
    const parsed: JsonValue = JSON.parse(jsonString)

    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'object') {
        const interfaces = new Set<string>([rootInterfaceName])
        const itemInterface = generateInterface(parsed[0] as JsonObject, rootInterfaceName, interfaces)
        return `${itemInterface}\n\ntype ${rootInterfaceName}Array = ${rootInterfaceName}[]`
      }
      throw new Error('Root value must be an object')
    }

    const interfaces = new Set<string>([rootInterfaceName])
    return generateInterface(parsed as JsonObject, rootInterfaceName, interfaces)
  } catch (error) {
    throw new Error(`Failed to convert JSON to TypeScript: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
