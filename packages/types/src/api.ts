import type { UserShared } from "./user"
import type { Wish } from "./wish"

export type ApiResponse<T, Meta = object> = {
  result: T
  meta: Meta
}
export type ApiError = {
  error: string
}
export type Method = "GET" | "POST" | "PATCH" | "DELETE"

export type JwtPayload = {
  userId: number
}

export type RawJwt = {
  iat: number
  exp: number
  payload: JwtPayload
}

export type ShareWishlistResponse = {
  message: string
  user: UserShared
}
export type ShareWishlistInput = Pick<UserShared, "username">

export type DeleteWishResponse = Wish
export type DeleteWishInput = { wishId: number }

export type GetWishResponse = Wish[]
export type UnshareWishlistResponse = ShareWishlistResponse
