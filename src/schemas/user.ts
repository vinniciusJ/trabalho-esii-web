import { z } from "zod"

export const ROLE_USER = z.enum(["ROLE_ADMIN", "ROLE_EVENT_PARTICIPANT", "ROLE_EVENT_MANAGER"])

export const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    cpfNumber: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
    isEmailVerified: z.boolean(),
    personRole: ROLE_USER
})

export type User = z.infer<typeof userSchema>

export const eventParticipantFormSchema = z.object({
  cpfNumber: z
    .string()
    .min(11, "CPF deve ter no mínimo 11 caracteres")
    .max(14, "CPF deve ter no máximo 14 caracteres"),
  name: z
    .string()
    .min(1, "O nome é obrigatório")
    .max(100, "O nome deve ter no máximo 100 caracteres"),
  phone: z
    .string()
    .min(10, "O telefone deve ter no mínimo 10 caracteres")
    .max(15, "O telefone deve ter no máximo 15 caracteres"),
  email: z
    .string()
    .email("O e-mail deve ser válido")
    .max(100, "O e-mail deve ter no máximo 100 caracteres"),
  password: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .max(50, "A senha deve ter no máximo 50 caracteres"),
})

export type EventParticipantForm = z.infer<typeof eventParticipantFormSchema>;
