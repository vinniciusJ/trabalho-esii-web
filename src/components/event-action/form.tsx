import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Stack,
  Typography
} from "@mui/material";
import { ENDPOINTS } from "@/constants/endpoints";
import { useGetAll } from "@/hooks/get";
import { EventAction, EventActionForm as EventActionFormType, eventActionFormSchema } from "@/schemas/event-action";
import { EventType } from "@/schemas/event-type";
import { useAuth } from "@/hooks/use-auth";
import { useMutate } from "@/hooks/mutate";

type Props = {
  onClose: () => void;
  eventId: number
};

const EventActionForm: FC<Props> = ({ onClose, eventId }) => {
  const { create } = useMutate<EventAction>({
    endpoint: ENDPOINTS.EVENT_ACTION
  });
  const { user } = useAuth();
  const { data: eventTypes, isLoading } = useGetAll<EventType>({
    endpoint: ENDPOINTS.EVENT_TYPE
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<EventActionFormType>({
    resolver: zodResolver(eventActionFormSchema)
  });

  useEffect(() => {
    if (user) {
      setValue("eventManagerId", Number(user.id));
      setValue("mainEventId", eventId);
    }
  }, [user?.cpfNumber, setValue]);

  const onSubmit = (data: EventActionFormType) => {
    create({ body: data, successMessage: 'Ação cadastrada com sucesso!' });
    onClose();
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "white",
        borderRadius: 2,
        maxWidth: 600,
        width: "100%"
      }}
    >
      <Typography>Criar Ação</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("title")}
          label="Título da ação"
          variant="filled"
          fullWidth
          margin="normal"
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          {...register("startDateTime")}
          label="Data e Hora de Início"
          type="datetime-local"
          fullWidth
          margin="normal"
          error={!!errors.startDateTime}
          helperText={errors.startDateTime?.message}
          slotProps={{
            inputLabel: {
              shrink: true
            }
          }}
        />
        <TextField
          {...register("endDateTime")}
          label="Data e Hora de Término"
          type="datetime-local"
          fullWidth
          margin="normal"
          error={!!errors.endDateTime}
          helperText={errors.endDateTime?.message}
          slotProps={{
            inputLabel: {
              shrink: true
            }
          }}
        />
        <TextField
          {...register("registrationPrice", { valueAsNumber: true })}
          label="Preço de Inscrição"
          type="number"
          fullWidth
          margin="normal"
          error={!!errors.registrationPrice}
          helperText={errors.registrationPrice?.message}
        />
        <TextField
          {...register("address")}
          label="Endereço"
          variant="filled"
          fullWidth
          margin="normal"
          error={!!errors.address}
          helperText={errors.address?.message}
        />
        <TextField
          {...register("quantityVacancies", { valueAsNumber: true })}
          label="Quantidade de vagas disponíveis"
          type="number"
          variant="filled"
          fullWidth
          margin="normal"
          error={!!errors.quantityVacancies}
          helperText={errors.quantityVacancies?.message}
        >
          {isLoading ? (
            <MenuItem value="">
              <CircularProgress size={20} />
            </MenuItem>
          ) : (
            eventTypes?.map((type: EventType) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))
          )}
        </TextField>

        <Stack
          direction="row"
          justifyContent={"flex-end"}
          spacing={2}
          sx={{ mt: 2 }}
        >
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Concluir
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default EventActionForm;
