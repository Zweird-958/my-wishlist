import type { ApiResponse } from "@my-wishlist/types/Api"
import type { Wish } from "@my-wishlist/types/Wish"

import client from "../"

export const getWishes = client.createRequest<ApiResponse<Wish[]>>()({
  method: "GET",
  endpoint: "/wish",
  auth: true,
})
