import type { ApiResponse } from "@my-wishlist/types/Api"
import type { SignInData, SignUpData } from "@my-wishlist/types/User"

import client from "../"

export const signIn = client.createRequest<ApiResponse<string>, SignInData>()({
  method: "POST",
  endpoint: "/sign-in",
})
export const signUp = client.createRequest<ApiResponse<string>, SignUpData>()({
  method: "POST",
  endpoint: "/sign-up",
})
