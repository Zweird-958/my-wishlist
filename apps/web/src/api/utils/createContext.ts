import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export const send = (
  result: unknown,
  meta: Record<string, unknown> = {},
  init: Parameters<typeof NextResponse.json>[1] = {},
) =>
  NextResponse.json(
    {
      result: Array.isArray(result) ? result : [result],
      meta,
    },
    init,
  )
export const createContext = (req: NextRequest) => {
  const db = new PrismaClient()

  return {
    req,
    db,
    send,
  }
}
