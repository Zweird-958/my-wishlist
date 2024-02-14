import type { ApiResponse } from "@my-wishlist/types/Api"
import type { SignInData } from "@my-wishlist/types/User"

import client from "../"

export const signIn = client.createRequest<ApiResponse<string>, SignInData>()({
  method: "POST",
  endpoint: "/sign-in",
})
