import { type HonoClientFunction } from "@my-wishlist/api"
import { type QueryOptions, useQuery } from "@my-wishlist/react"

import { useSession } from "@/components/contexts/SessionContext"

export const useProtectedQuery = <T extends HonoClientFunction>(
  request: T,
  { queryKey, ...options }: QueryOptions<T>,
) => {
  const { isLoading, session } = useSession()

  return useQuery(request, {
    ...options,
    queryKey: [session, ...queryKey],
    enabled: !isLoading,
  })
}
