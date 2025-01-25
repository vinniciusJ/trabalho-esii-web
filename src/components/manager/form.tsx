import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  TextField,
  Stack
} from "@mui/material";
import { ENDPOINTS } from "@/constants/endpoints";
import { useAuth } from "@/hooks/use-auth";
import { useMutate } from "@/hooks/mutate";
import { User, UserForm, userFormSchema } from "@/schemas/user";

type Props = {
  onClose: () => void;
};

const ManagerForm: FC<Props> = ({ onClose }) => {
  const { create } = useMutate<User, UserForm>({
    endpoint: ENDPOINTS.MANAGER
  });
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<UserForm>({
    resolver: zodResolver(userFormSchema)
  });

  useEffect(() => {
    if (user?.cpfNumber) {
      setValue("isEmailVerified", false);
      setValue("personRole", "ROLE_EVENT_MANAGER");
    }
  }, [user?.cpfNumber, setValue]);

  const onSubmit = (data: UserForm) => {
    create({ body: data, successMessage: "Gerente criado com sucesso!" });
    onClose();
  };

  console.log(errors)

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register("name")}
        label="Nome"
        variant="filled"
        fullWidth
        margin="normal"
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        {...register("cpfNumber")}
        label="CPF"
        variant="filled"
        fullWidth
        margin="normal"
        error={!!errors.cpfNumber}
        helperText={errors.cpfNumber?.message}
      />
      <TextField
        {...register("phone")}
        label="Telefone"
        variant="filled"
        fullWidth
        margin="normal"
        error={!!errors.phone}
        helperText={errors.phone?.message}
      />
      <TextField
        {...register("email")}
        label="Email"
        variant="filled"
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        {...register("password")}
        label="Senha"
        variant="filled"
        fullWidth
        margin="normal"
        error={!!errors.password}
        type="password"
        helperText={errors.password?.message}
      />
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
  );
};

export default ManagerForm;
