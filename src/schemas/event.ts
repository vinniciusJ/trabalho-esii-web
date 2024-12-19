import { z } from "zod"
import { eventTypeSchema } from "./event-type"
import { userSchema } from "./user"

export const eventSchema = z.object({
    id: z.number(),
    title: z.string(),
    startDateTime: z.date(),
    endDateTime: z.date(),
    registrationPrice: z.number(),
    mainEventTypeDetailsDTO: eventTypeSchema,
    eventManagerDetailsDTO: userSchema,
    address: z.string()
})

export type Event = z.infer<typeof eventSchema>