import { z } from "zod"
import { eventTypeSchema } from "./event-type"
import { userSchema } from "./user"

export const eventSchema = z.object({
    id: z.number(),
    title: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    registrationFee: z.number(),
    availablePositions: z.number(),
    eventType: eventTypeSchema,
    responsible: userSchema
})

export type Event = z.infer<typeof eventSchema>