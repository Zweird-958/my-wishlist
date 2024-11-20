import type { StatusCode } from "hono/utils/http-status"

export const ERROR_RESPONSES = {
  500: { message: "Something went wrong.", code: 500 },
  403: { message: "Forbidden.", code: 403 },
  401: { message: "Unauthorized.", code: 401 },
  invalidCredentials: { message: "Invalid credentials.", code: 401 },
  usernameExists: { message: "Username already exists.", code: 409 },
  wishNotFound: { message: "Wish not found.", code: 404 },
  addHimSelf: { message: "You can't add yourself.", code: 400 },
  userNotFound: { message: "User not found.", code: 404 },
  alreadyShared: { message: "Already shared.", code: 400 },
  imageRequired: { message: "Image is required.", code: 400 },
} satisfies Record<string, { message: string; code: StatusCode }>

export const BASES_PATHS = {
  api: "/api",
  wish: "/wish",
  share: "/share",
  currency: "/currency",
  image: "/image",
  sign: "",
}
