export type ApiResponse<T> = {
  result: T
  meta: object
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
