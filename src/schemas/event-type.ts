import { z } from "zod";

export const eventTypeSchema = z.object({
    id: z.number(),
    name: z.string(),
})

export type EventType = z.infer<typeof eventTypeSchema >