import { EventTypeForm } from '@/schemas/event-type';
import EventTypeService from '@/service/requests/event-type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify'

const eventTypeService = new EventTypeService();

export const useEventTypeMutations = () => {
  const queryClient = useQueryClient();

  const createEventTypeMutation = useMutation({
    mutationFn: async (payload: EventTypeForm) => {
      await eventTypeService.createEventType(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event-types'] });
      toast.success('Tipo de evento criado com sucesso!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Erro desconhecido';
      toast.error(`Erro ao criar tipo de evento: ${message}`);
      throw error;
    },
  });

  return {
    createEventType: createEventTypeMutation.mutate,
  };
};
