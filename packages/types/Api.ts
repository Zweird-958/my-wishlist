export type ApiResponse<T, Meta = object> = {
  result: T
  meta: Meta
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
