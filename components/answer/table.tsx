import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export interface AnswerTableProps {
  columns: string[];
  rows: string[][];
}

export default function AnswerTable({ columns, rows }: AnswerTableProps) {
  return (
    <Table className="select-none">
      <TableHeader>
        <TableRow>
          {columns.map((column) => <TableHead key={column}>{column}</TableHead>)}
        </TableRow>
      </TableHeader>

      <TableBody>
        {rows.length > 0
          ? rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>
                  <code>{cell}</code>
                </TableCell>
              ))}
            </TableRow>
          ))
          : (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <p className="text-muted-foreground">查詢沒有回傳任何資料列</p>
              </TableCell>
            </TableRow>
          )}
      </TableBody>
    </Table>
  );
}
