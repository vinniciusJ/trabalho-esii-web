import { z } from "zod";
import { userSchema } from "./user";

export const eventActionSchema = z.object({
    id: z.number(),
    title: z.string(),
    startDateTime: z.date(),
    endDateTime: z.date(),
    registrationPrice: z.number(),
    address: z.string(),
    eventManagerDetailsDTO: userSchema,
    quantityVacancies: z.number()
})

export type EventAction = z.infer<typeof eventActionSchema >

export const eventActionFormSchema = z.object({
    title: z.string().nonempty("O título do evento é obrigatório."),
    startDateTime: z.string().nonempty("A data e hora de início são obrigatórias."),
    endDateTime: z.string().nonempty("A data e hora de término são obrigatórias."),
    registrationPrice: z
        .number()
        .nonnegative("O preço deve ser maior ou igual a 0.")
        .default(0),
    address: z.string().nonempty("O endereço é obrigatório."),
    eventManagerCpfNumber: z.string(),
    quantityVacancies: z.number()
        .nonnegative("A quantidade de vagas deve ser maior ou igual a 0.")
        .default(0),
});

export type EventActionForm = z.infer<typeof eventActionFormSchema>;