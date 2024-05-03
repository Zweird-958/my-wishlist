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
  ApiResponse<Wish[], { username: string }>
>()({
  method: "GET",
  endpoint: "/share/wish/:userId",
  auth: true,
})

export const getUsersShared = client.createRequest<ApiResponse<UserShared[]>>()(
  {
    method: "GET",
    endpoint: "/share/users",
    auth: true,
  },
)

export const unshareWishlist = client.createRequest<
  ApiResponse<{
    message: string
    user: UserShared
  }>
>()({
  method: "DELETE",
  endpoint: "/share/wish/:userId",
  auth: true,
})

type ShareWishlistResponse = {
  message: string
  user: UserShared
}

export const shareWishlist = client.createRequest<
  ApiResponse<ShareWishlistResponse>,
  Pick<UserShared, "username">
>()({
  method: "POST",
  endpoint: "/share/wish",
  auth: true,
})
