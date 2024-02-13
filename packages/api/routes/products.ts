import type { ApiResponse } from "@monorepo/types/Api"
import type { Product } from "@monorepo/types/Product"

import client from "../"

export const getProducts = client.createRequest<ApiResponse<Product[]>>()({
  method: "GET",
  endpoint: "/products",
})
