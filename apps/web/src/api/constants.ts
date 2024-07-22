import { StatusCode } from "hono/utils/http-status"

export const HTTP_ERRORS = {
  METHOD_NOT_ALLOWED: 405,
  INTERNAL_SERVER_ERROR: 500,
}

export const ERROR_RESPONSES = {
  500: { message: "Something went wrong.", code: 500 },
  403: { message: "Forbidden.", code: 403 },
  invalidCredentials: { message: "Invalid credentials.", code: 401 },
} satisfies Record<string, { message: string; code: StatusCode }>
