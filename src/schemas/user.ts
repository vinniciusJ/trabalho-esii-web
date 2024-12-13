import { z } from "zod"

export const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    cpf: z.string(),
    email: z.string(),
    phone: z.string()
})

export type User = z.infer<typeof userSchema>