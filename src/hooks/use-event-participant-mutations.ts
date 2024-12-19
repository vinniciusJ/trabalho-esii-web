import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { EventParticipantForm } from '@/schemas/user'
import EventParticipantService from '@/service/requests/participants'

const eventParticipantService = new EventParticipantService()

export const useEventParticipantsMutations = () => {
  const queryClient = useQueryClient()

  const registerParticipantMutation = useMutation({
    mutationFn: async (payload: EventParticipantForm) => {
      await eventParticipantService.registerParticipant(payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event-participants'] })
      toast.success('Participante registrado com sucesso!')
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Erro desconhecido'
      toast.error(`Erro ao registrar participante: ${message}`)
      throw error
    },
  })

  return {
    registerParticipant: registerParticipantMutation.mutate,
  }
}
