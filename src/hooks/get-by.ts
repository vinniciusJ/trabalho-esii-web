import { useQuery } from '@tanstack/react-query'

import { Service } from '@/service'
import { eventosAPI } from '@/service/eventos'

interface ParamsGetBy {
	endpoint: string
	id: number | string
	enabled?: boolean
}

export const useGetBy = <T extends object>({ endpoint, id, enabled }: ParamsGetBy) => {
	const service = new Service<T>(eventosAPI, endpoint)

	const { data, isLoading } = useQuery({
		queryKey: [endpoint, Number(id)],
		queryFn: async () => await service.getBy(id),
		enabled: id ? enabled : false,
	})

	return { data, isLoading }
}
