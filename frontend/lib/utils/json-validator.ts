export interface ValidationResult {
  valid: boolean
  error?: string
  errorLine?: number
  errorColumn?: number
}

export function validateJson(jsonString: string): ValidationResult {
  if (!jsonString || jsonString.trim() === '') {
    return {
      valid: false,
      error: 'JSON input is empty',
    }
  }

  try {
    JSON.parse(jsonString)
    return { valid: true }
  } catch (error) {
    if (error instanceof SyntaxError) {
      // Try to extract line and column from error message
      const match = error.message.match(/position (\d+)/)
      if (match) {
        const position = parseInt(match[1], 10)
        const lines = jsonString.substring(0, position).split('\n')
        const errorLine = lines.length
        const errorColumn = lines[lines.length - 1].length + 1

        return {
          valid: false,
          error: error.message,
          errorLine,
          errorColumn,
        }
      }

      return {
        valid: false,
        error: error.message,
      }
    }

    return {
      valid: false,
      error: 'Unknown error occurred while parsing JSON',
    }
  }
}

export function formatJson(jsonString: string, spaces: number = 2): string {
  try {
    const parsed = JSON.parse(jsonString)
    return JSON.stringify(parsed, null, spaces)
  } catch (error) {
    throw new Error('Cannot format invalid JSON')
  }
}

export function minifyJson(jsonString: string): string {
  try {
    const parsed = JSON.parse(jsonString)
    return JSON.stringify(parsed)
  } catch (error) {
    throw new Error('Cannot minify invalid JSON')
  }
}
