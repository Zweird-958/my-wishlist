import type { ApiResponse } from "@my-wishlist/types/Api"
import type { Product } from "@my-wishlist/types/Product"

import client from "../"

export const getProducts = client.createRequest<ApiResponse<Product[]>>()({
  method: "GET",
  endpoint: "/products",
})
