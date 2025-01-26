import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/ui/table";
import { useGetPageable } from "@/hooks/get";
import { ENDPOINTS } from "@/constants/endpoints";
import { useCallback } from "react";
import { User } from "@/schemas/user";

interface Props {
  requestParams?: Record<string, unknown>;
}

export const ManagersTable = ({ requestParams }: Props) => {
  const {
    data: managers,
    totalElements,
    isLoading
  } = useGetPageable<User>({
    endpoint: ENDPOINTS.MANAGER,
    requestParams: {
      ...requestParams,
    }
  });

  const columnHelper = createColumnHelper<User>();

  const columns: ColumnDef<User>[] = [
    columnHelper.accessor("name", {
      id: "name",
      header: "Nome"
    }),
    columnHelper.accessor("cpfNumber", {
      id: "cpfNumber",
      header: "CPF"
    }),
    columnHelper.accessor("phone", {
      id: "phone",
      header: "Telefone"
    }),
    columnHelper.accessor("email", {
      id: "email",
      header: "Email"
    })
  ] as ColumnDef<User>[];

  return (
    <Table
      columns={columns}
      data={managers}
      dataLength={totalElements}
      isLoading={isLoading}
    />
  );
};
