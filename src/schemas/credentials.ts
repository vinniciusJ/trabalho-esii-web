import { z } from 'zod'

export const credentialsSchema = z.object({
	email: z
		.string()
		.nonempty('Username ou email é obrigatório'),
	password: z.string().nonempty('Senha é obrigatória'),
})

export type AuthCredentials = z.output<typeof credentialsSchema>