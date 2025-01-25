import {
  Table as MuiTable,
  Stack,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from "@mui/material";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { Link } from "react-router-dom";

import TableLoading from "./loading/rows";
import TableNoDataWarning from "./no-data-warning";
import TableHeader from "./table-header";
import { usePagination } from "@/hooks/pagination";
import { ReactNode } from "react";

export interface TableProps<T> {
  data: T[];
  dataLength: number;
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  getRowLink?: (data: T) => string;
  getAction?: (data: T) => ReactNode;
}

const Table = <T extends object>({
  data,
  columns,
  dataLength,
  isLoading,
  getRowLink,
  getAction
}: TableProps<T>) => {
  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  const { rowsPerPage, page, changePage, changeRowsPerPage } = usePagination();

  return (
    <Stack gap={2}>
      <TableContainer>
        <MuiTable>
          <TableHead>
            {getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeader key={header.id} header={header} />
                ))}
                {getAction && <TableCell></TableCell>}
              </TableRow>
            ))}
          </TableHead>

          <TableBody>
            {isLoading ? (
              <TableLoading columns={columns.length} rows={rowsPerPage} />
            ) : (
              getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  component={getRowLink ? Link : TableRow}
                  to={getRowLink && getRowLink(row.original)}
                  sx={{
                    textDecoration: "none",
                    cursor: getRowLink ? "pointer" : "default"
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      sx={{ width: cell.column.getSize() }}
                    >
                      {cell.getValue() == null
                        ? "-"
                        : flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                    </TableCell>
                  ))}
                  {getAction && <TableCell>{getAction(row.original)}</TableCell>}
                </TableRow>
              ))
            )}
          </TableBody>
        </MuiTable>

        {data.length > 0 ? (
          <TablePagination
            component="div"
            count={dataLength}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_e, pageIndex) => changePage(pageIndex)}
            onRowsPerPageChange={(e) =>
              changeRowsPerPage(Number(e.target.value))
            }
            labelRowsPerPage="Linhas por página"
            labelDisplayedRows={({ from, to, count }) => {
              return `${from} a ${to} de ${count}`;
            }}
            showLastButton
            showFirstButton
            rowsPerPageOptions={[5, 10, 20, 50, 100]}
          />
        ) : (
          !isLoading && <TableNoDataWarning />
        )}
      </TableContainer>
    </Stack>
  );
};

export default Table;
