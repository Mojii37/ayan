import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

export const TaxBreakdown = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Income Range</TableCell>
            <TableCell>Rate</TableCell>
            <TableCell>Tax Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{/* Dynamic tax breakdown rows */}</TableBody>
      </Table>
    </Paper>
  );
};
