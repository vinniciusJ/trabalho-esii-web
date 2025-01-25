import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Stack, TextField } from '@mui/material'
import { useEventTypeMutations } from '@/hooks/use-event-type-mutations'
import { EventTypeForm as EventTypeFormType, eventTypeFormSchema } from '@/schemas/event-type'

type Props = {
    onClose: () => void
}

const EventTypeForm: FC<Props> = ({ onClose }) => {
    const { createEventType } = useEventTypeMutations();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EventTypeFormType>({
        resolver: zodResolver(eventTypeFormSchema),
    })

    const onSubmit = (data: EventTypeFormType) => {
        createEventType(data)
        onClose()
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
                {...register('name')}
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
    )
}

export default EventTypeForm