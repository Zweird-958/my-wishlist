import type { ApiResponse } from "@my-wishlist/types/Api"
import type { Currency } from "@my-wishlist/types/Wish"

import client from ".."

export const getCurrencies = client.createRequest<ApiResponse<Currency[]>>()({
  method: "GET",
  endpoint: "/currency",
})
