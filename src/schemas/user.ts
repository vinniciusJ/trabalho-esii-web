import { z } from "zod";

export const ROLE_USER = z.enum([
  "ROLE_ADMIN",
  "ROLE_EVENT_PARTICIPANT",
  "ROLE_EVENT_MANAGER"
]);

export type Role = z.infer<typeof ROLE_USER>;

export const userSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(1, "O nome é obrigatório")
    .max(100, "O nome deve ter no máximo 100 caracteres"),
  cpfNumber: z
    .string()
    .min(11, "CPF deve ter no mínimo 11 caracteres")
    .max(14, "CPF deve ter no máximo 14 caracteres"),
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
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .max(50, "A senha deve ter no máximo 50 caracteres"),
  isEmailVerified: z.boolean(),
  personRole: ROLE_USER
});

export const userFormSchema = userSchema.omit({ id: true });

export type User = z.infer<typeof userSchema>;

export type UserForm = z.infer<typeof userFormSchema>;

export const eventParticipantFormSchema = userFormSchema.omit({ isEmailVerified: true, personRole: true })

export type EventParticipantForm = z.infer<typeof eventParticipantFormSchema>;
