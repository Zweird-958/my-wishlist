import { z } from "zod"

export const emailValidator = z
  .string()
  .min(1, { message: "required" })
  .email({ message: "invalid" })
export const passwordValidator = z
  .string()
  .min(1, { message: "required" })
  .min(8, { message: "length" })
export const usernameValidator = z
  .string()
  .min(1, { message: "required" })
  .min(3, { message: "length" })
