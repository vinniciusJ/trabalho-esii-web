import { z } from "zod";

export const eventTypeSchema = z.object({
    id: z.number(),
    name: z.string(),
})

export type EventType = z.infer<typeof eventTypeSchema >

export const eventTypeFormSchema = z.object({
  name: z
    .string()
    .nonempty("O nome do tipo de evento é obrigatório.")
    .min(3, "O nome deve ter pelo menos 3 caracteres.")
    .max(50, "O nome deve ter no máximo 50 caracteres."),
});

export type EventTypeForm = z.infer<typeof eventTypeFormSchema>;