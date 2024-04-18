import type { ApiResponse } from "@my-wishlist/types/Api"
import type { Wish } from "@my-wishlist/types/Wish"

import client from "../"

export const getWishes = client.createRequest<ApiResponse<Wish[]>>()({
  method: "GET",
  endpoint: "/wish",
  auth: true,
})

export const createWish = client.createRequest<ApiResponse<Wish>, FormData>()({
  method: "POST",
  endpoint: "/wish",
  auth: true,
})

export const updateWish = client.createRequest<ApiResponse<Wish>, FormData>()({
  method: "PATCH",
  endpoint: "/wish/:wishId",
  auth: true,
})

export const deleteWish = client.createRequest<ApiResponse<Wish>>()({
  method: "DELETE",
  endpoint: "/wish/:wishId",
  auth: true,
})
