import { z } from "zod"

export const emailSchema = z
  .string()
  .min(1, { message: "required" })
  .email({ message: "invalid" })
export const passwordSchema = z
  .string()
  .min(1, { message: "required" })
  .min(8, { message: "length" })
export const usernameSchema = z
  .string()
  .min(1, { message: "required" })
  .min(3, { message: "length" })

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})
export const signUpSchema = signInSchema.extend({
  username: usernameSchema,
})

export const shareSchema = z.object({
  username: z.string().min(1, { message: "required" }),
})
