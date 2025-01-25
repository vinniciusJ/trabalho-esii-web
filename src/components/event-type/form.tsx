import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, TextField } from "@mui/material";
import {
    EventType,
  EventTypeForm as EventTypeFormType,
  eventTypeFormSchema
} from "@/schemas/event-type";
import { useMutate } from "@/hooks/mutate";
import { ENDPOINTS } from "@/constants/endpoints";

type Props = {
  onClose: () => void;
};

const EventTypeForm: FC<Props> = ({ onClose }) => {
  const { create } = useMutate<EventType>({
    endpoint: ENDPOINTS.EVENT_TYPE
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EventTypeFormType>({
    resolver: zodResolver(eventTypeFormSchema)
  });

  const onSubmit = (data: EventTypeFormType) => {
    create({ body: data, successMessage: 'Tipo de evento cadastrado com sucesso!' });
    onClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register("name")}
        label="Nome do Tipo de Evento"
        variant="filled"
        fullWidth
        margin="normal"
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button
          type="button"
          variant="outlined"
          color="secondary"
          onClick={onClose}
          fullWidth
        >
          Cancelar
        </Button>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Criar Tipo de Evento
        </Button>
      </Stack>
    </Box>
  );
};

export default EventTypeForm;
