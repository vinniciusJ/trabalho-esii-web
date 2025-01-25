import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/ui/table";
import { useGetPageable } from "@/hooks/get";
import { ENDPOINTS } from "@/constants/endpoints";
import { useCallback } from "react";
import { User } from "@/schemas/user";

interface Props {
  requestParams?: Record<string, unknown>;
}

export const ParticipantsTable = ({ requestParams }: Props) => {
  const {
    data: participants,
    totalElements,
    isLoading
  } = useGetPageable<User>({
    endpoint: ENDPOINTS.EVENT_PARTICIPANT,
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

  const getRowLink = useCallback((participant: User) => `${participant.id}`, []);

  return (
    <Table
      columns={columns}
      data={participants}
      dataLength={totalElements}
      isLoading={isLoading}
      getRowLink={getRowLink}
    />
  );
};
