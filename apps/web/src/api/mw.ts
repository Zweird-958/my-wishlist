import { NextRequest, NextResponse } from "next/server"

import type { Method } from "@my-wishlist/types/Api"

import { HTTP_ERRORS } from "@/api/constants"
import { createContext, send } from "@/api/utils/createContext"
import { HttpPublicError, PublicError } from "@/api/utils/errors"

type ApiContext = ReturnType<typeof createContext>
type ApiMiddleware = (
  ctx: ApiContext,
) => Promise<void | ReturnType<typeof send>> | void | ReturnType<typeof send>
type MethodHandler = Partial<Record<Method, ApiMiddleware[]>>

const handleError = (error: unknown) => {
  if (!(error instanceof PublicError)) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: HTTP_ERRORS.INTERNAL_SERVER_ERROR },
    )
  }

  return NextResponse.json(
    { error: error.message },
    {
      status:
        error instanceof HttpPublicError
          ? error.statusCode
          : HTTP_ERRORS.INTERNAL_SERVER_ERROR,
    },
  )
}
const mw = (methodHandlers: MethodHandler) => async (req: NextRequest) => {
  const method = req.method.toUpperCase() as Method
  const middlewares = methodHandlers[method]

  if (!middlewares) {
    return NextResponse.json(
      { error: "Method not allowed" },
      { status: HTTP_ERRORS.METHOD_NOT_ALLOWED },
    )
  }

  const ctx = createContext(req)

  try {
    const middlewaresPromises = middlewares.map((middleware) => middleware(ctx))
    const results = await Promise.all(middlewaresPromises)

    for (const res of results) {
      if (res) {
        return res
      }
    }

    throw new Error("No response")
  } catch (err) {
    return handleError(err)
  } finally {
    await ctx.db.$disconnect()
  }
}

export default mw
