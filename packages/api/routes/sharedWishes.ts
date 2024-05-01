import type { ApiResponse } from "@my-wishlist/types/Api"
import type { UserShared } from "@my-wishlist/types/User"
import type { Wish } from "@my-wishlist/types/Wish"

import client from "../"

export const getWishlistShared = client.createRequest<
  ApiResponse<UserShared[]>
>()({
  method: "GET",
  endpoint: "/share/wish",
  auth: true,
})

export const getWishlistSharedUser = client.createRequest<
  ApiResponse<Wish[]>
>()({
  method: "GET",
  endpoint: "/share/wish/:userId",
  auth: true,
})
