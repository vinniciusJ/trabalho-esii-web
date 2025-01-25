import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Box,
    Button,
    TextField,
    MenuItem,
    CircularProgress,
    Stack,
} from '@mui/material'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetAll } from '@/hooks/get';
import { Event, EventForm as EventFormType, eventFormSchema } from '@/schemas/event'
import { EventType } from '@/schemas/event-type'
import { useAuth } from '@/hooks/use-auth'
import { useMutate } from '@/hooks/mutate';

type Props = {
    onClose: () => void
}

const EventForm: FC<Props> = ({ onClose }) => {
      const { create } = useMutate<Event>({
        endpoint: ENDPOINTS.EVENT
      });
    const { user } = useAuth()
    const { data: eventTypes, isLoading } = useGetAll<EventType>({
        endpoint: ENDPOINTS.EVENT_TYPE,
    })

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<EventFormType>({
        resolver: zodResolver(eventFormSchema),
    })

    useEffect(() => {
        if (user?.cpfNumber) {
            setValue('eventManagerCpfNumber', user.cpfNumber)
        }
    }, [user?.cpfNumber, setValue])

    const onSubmit = (data: EventFormType) => {
        create({body: data, successMessage: 'Evento criado com sucesso!'})
        onClose()
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
                {...register('title')}
                label="Título do Evento"
                variant="filled"
                fullWidth
                margin="normal"
                error={!!errors.title}
                helperText={errors.title?.message}
            />
            <TextField
                {...register('startDateTime')}
                label="Data e Hora de Início"
                type="datetime-local"
                fullWidth
                margin="normal"
                error={!!errors.startDateTime}
                helperText={errors.startDateTime?.message}
                slotProps={{
                    inputLabel: {
                        shrink: true,
                    },
                }}
            />
            <TextField
                {...register('endDateTime')}
                label="Data e Hora de Término"
                type="datetime-local"
                fullWidth
                margin="normal"
                error={!!errors.endDateTime}
                helperText={errors.endDateTime?.message}
                slotProps={{
                    inputLabel: {
                        shrink: true,
                    },
                }}
            />
            <TextField
                {...register('registrationPrice', { valueAsNumber: true })}
                label="Preço de Inscrição"
                type="number"
                fullWidth
                margin="normal"
                error={!!errors.registrationPrice}
                helperText={errors.registrationPrice?.message}
            />
            <TextField
                {...register('address')}
                label="Endereço"
                variant="filled"
                fullWidth
                margin="normal"
                error={!!errors.address}
                helperText={errors.address?.message}
            />
            <TextField
                {...register('mainEventTypeId', { valueAsNumber: true })}
                label="Tipo de Evento"
                select
                variant="filled"
                fullWidth
                margin="normal"
                error={!!errors.mainEventTypeId}
                helperText={errors.mainEventTypeId?.message}
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

            <Stack direction="row" justifyContent={'flex-end'} spacing={2} sx={{ mt: 2 }}>
                <Button type="button" variant="outlined" color="secondary" onClick={onClose}>
                    Cancelar
                </Button>
                <Button type="submit" variant="contained" color="primary">
                    Concluir
                </Button>
            </Stack>
        </Box>
    )
}

export default EventForm
