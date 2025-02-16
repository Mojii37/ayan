// src/components/admin/transactions/TransactionsList.tsx
import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  TextField,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { MoreVert, Search } from '@mui/icons-material';
import { Transaction, TransactionStatus } from '../../../types/transaction';

interface TransactionsListProps {
  transactions: Transaction[];
  onStatusChange: (id: string, status: TransactionStatus) => void;
  onRefund: (id: string, reason: string) => void;
}

const statusColors = {
  pending: 'warning',
  successful: 'success',
  failed: 'error',
  refunded: 'info',
} as const;

export const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
  onStatusChange,
  onRefund,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const [refundReason, setRefundReason] = useState('');

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    transaction: Transaction
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedTransaction(transaction);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTransaction(null);
  };

  const handleRefundSubmit = () => {
    if (selectedTransaction && refundReason) {
      onRefund(selectedTransaction.id, refundReason);
      setRefundDialogOpen(false);
      setRefundReason('');
      handleMenuClose();
    }
  };

  const filteredTransactions = transactions.filter(
    transaction =>
      transaction.trackingCode.includes(searchTerm) ||
      transaction.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          لیست تراکنش‌ها
        </Typography>
        <TextField
          size="small"
          placeholder="جستجو بر اساس کد پیگیری یا نام کاربر..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search />,
          }}
          sx={{ width: 300 }}
        />
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>کد پیگیری</TableCell>
              <TableCell>کاربر</TableCell>
              <TableCell>نوع</TableCell>
              <TableCell>مبلغ</TableCell>
              <TableCell>وضعیت</TableCell>
              <TableCell>تاریخ</TableCell>
              <TableCell>عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map(transaction => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.trackingCode}</TableCell>
                <TableCell>{transaction.userName}</TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {transaction.type === 'consultation'
                      ? 'مشاوره'
                      : transaction.type === 'subscription'
                        ? 'اشتراک'
                        : 'دوره'}
                  </Typography>
                </TableCell>
                <TableCell>
                  {new Intl.NumberFormat('fa-IR', {
                    style: 'currency',
                    currency: 'IRR',
                  }).format(transaction.amount)}
                </TableCell>
                <TableCell>
                  <Chip
                    label={transaction.status}
                    color={statusColors[transaction.status]}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(transaction.createdAt).toLocaleDateString('fa-IR')}
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={e => handleMenuOpen(e, transaction)}
                  >
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {selectedTransaction?.status === 'successful' && (
          <MenuItem
            onClick={() => {
              setRefundDialogOpen(true);
              handleMenuClose();
            }}
          >
            بازگشت وجه
          </MenuItem>
        )}
        {selectedTransaction?.status === 'pending' && (
          <MenuItem
            onClick={() => {
              if (selectedTransaction) {
                onStatusChange(selectedTransaction.id, 'successful');
              }
              handleMenuClose();
            }}
          >
            تایید پرداخت
          </MenuItem>
        )}
      </Menu>

      <Dialog
        open={refundDialogOpen}
        onClose={() => setRefundDialogOpen(false)}
      >
        <DialogTitle>بازگشت وجه</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="دلیل بازگشت وجه"
            value={refundReason}
            onChange={e => setRefundReason(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRefundDialogOpen(false)}>انصراف</Button>
          <Button
            onClick={handleRefundSubmit}
            variant="contained"
            disabled={!refundReason}
          >
            تایید بازگشت وجه
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
