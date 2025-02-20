import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

interface UseConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel
}) => (
  <Dialog open={open} onClose={onCancel}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Typography>{message}</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} color="inherit">
        {cancelText}
      </Button>
      <Button onClick={onConfirm} color="error" variant="contained" autoFocus>
        {confirmText}
      </Button>
    </DialogActions>
  </Dialog>
);

export const useConfirm = () => {
  const [dialog, setDialog] = React.useState<{
    isOpen: boolean;
    resolve?: (value: boolean) => void;
    options: UseConfirmOptions;
  }>({
    isOpen: false,
    options: { message: '' }
  });

  const confirm = React.useCallback(
    (options: UseConfirmOptions): Promise<boolean> => {
      return new Promise((resolve) => {
        setDialog({
          isOpen: true,
          resolve,
          options
        });
      });
    },
    []
  );

  const handleClose = React.useCallback(() => {
    setDialog((prev) => ({
      ...prev,
      isOpen: false
    }));
  }, []);

  const handleConfirm = React.useCallback(() => {
    dialog.resolve?.(true);
    handleClose();
  }, [dialog.resolve, handleClose]);

  const handleCancel = React.useCallback(() => {
    dialog.resolve?.(false);
    handleClose();
  }, [dialog.resolve, handleClose]);

  return {
    confirm,
    ConfirmDialog: dialog.isOpen ? (
      <ConfirmDialog
        open={dialog.isOpen}
        title={dialog.options.title || 'تایید'}
        message={dialog.options.message}
        confirmText={dialog.options.confirmText || 'تایید'}
        cancelText={dialog.options.cancelText || 'انصراف'}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    ) : null
  };
};