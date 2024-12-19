import { EventForm } from '@/schemas/event';
import EventService from '@/service/requests/event'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify';

const eventService = new EventService()

export const useEventMutations = () => {
    const queryClient = useQueryClient();

    const createEventMutation = useMutation({
        mutationFn: async (payload: EventForm) => {
            await eventService.createEvent(payload)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] })
            toast.success('Evento criado com sucesso!')
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Erro desconhecido'
            toast.error(`Erro ao criar evento: ${message}`)
            throw error
        }
    })

    return {
        createEvent: createEventMutation.mutate,
    }
}
