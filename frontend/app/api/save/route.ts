import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateSlug } from '@/lib/utils/slug-generator'
import type { CreateConversionRequest, CreateConversionResponse } from '@/types/conversion'

export async function POST(request: NextRequest) {
  try {
    const body: CreateConversionRequest = await request.json()

    // Validate required fields
    if (!body.json_input || !body.ts_output || !body.zod_output || !body.prisma_output) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate unique slug
    const slug = generateSlug(8)

    // Get Supabase client
    const supabase = await createClient()

    // Insert conversion
    const { data, error } = await supabase
      .from('conversions')
      .insert([
        {
          slug,
          json_input: body.json_input,
          ts_output: body.ts_output,
          zod_output: body.zod_output,
          prisma_output: body.prisma_output,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save conversion' },
        { status: 500 }
      )
    }

    // Get the base URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
                   request.headers.get('origin') ||
                   `http://localhost:${process.env.PORT || 3000}`

    const response: CreateConversionResponse = {
      slug,
      url: `${baseUrl}/s/${slug}`,
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
