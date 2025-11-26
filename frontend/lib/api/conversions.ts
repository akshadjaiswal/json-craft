import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { Conversion, CreateConversionRequest, CreateConversionResponse } from '@/types/conversion'

// Create conversion
export function useCreateConversion() {
  return useMutation<CreateConversionResponse, Error, CreateConversionRequest>({
    mutationFn: async (data) => {
      const response = await axios.post<CreateConversionResponse>('/api/save', data)
      return response.data
    },
  })
}

// Get conversion by slug
export function useGetConversion(slug: string) {
  return useQuery<Conversion, Error>({
    queryKey: ['conversion', slug],
    queryFn: async () => {
      const response = await axios.get<Conversion>(`/api/shared/${slug}`)
      return response.data
    },
    enabled: !!slug,
    staleTime: Infinity, // Conversions don't change once created
  })
}
