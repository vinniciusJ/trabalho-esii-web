import { z } from "zod"
import { eventTypeSchema } from "./event-type"
import { userSchema } from "./user"

export const eventSubscriptionForm = z.object({
    participantId: z.number(),
})

export type EventSubscriptionForm = z.infer<typeof eventSubscriptionForm>

export const eventSchema = z.object({
    id: z.number(),
    title: z.string(),
    startDateTime: z.date(),
    endDateTime: z.date(),
    registrationPrice: z.number(),
    mainEventTypeDetailsDTO: eventTypeSchema,
    eventManagerDetailsDTO: userSchema,
    address: z.string(),
    eventParticipants: z.array(userSchema)
})

export type Event = z.infer<typeof eventSchema>

export const eventFormSchema = z.object({
    title: z.string().nonempty("O título do evento é obrigatório."),
    startDateTime: z.string().nonempty("A data e hora de início são obrigatórias."),
    endDateTime: z.string().nonempty("A data e hora de término são obrigatórias."),
    registrationPrice: z
        .number()
        .nonnegative("O preço deve ser maior ou igual a 0.")
        .default(0),
    address: z.string().nonempty("O endereço é obrigatório."),
    eventManagerCpfNumber: z.string(),
    mainEventTypeId: z.number().positive("O tipo de evento é obrigatório."),
})

export type EventForm = z.infer<typeof eventFormSchema>
