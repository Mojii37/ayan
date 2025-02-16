// src/components/pwa/InstallPWA.tsx
import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
} from '@mui/material';
import { GetApp } from '@mui/icons-material';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const InstallPWA: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallDialog, setShowInstallDialog] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallDialog(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
    setShowInstallDialog(false);
  };

  if (!deferredPrompt) {
    return null;
  }

  return (
    <Dialog
      open={showInstallDialog}
      onClose={() => setShowInstallDialog(false)}
    >
      <DialogTitle>نصب اپلیکیشن</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <img src="/icons/icon-192x192.png" alt="آیان تراز" width={64} />
          <Typography>با نصب اپلیکیشن آیان تراز، می‌توانید:</Typography>
        </Box>
        <ul>
          <li>به سرعت به سامانه دسترسی داشته باشید</li>
          <li>در حالت آفلاین از امکانات استفاده کنید</li>
          <li>اعلان‌های مهم را دریافت کنید</li>
        </ul>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowInstallDialog(false)}>بعداً</Button>
        <Button
          variant="contained"
          startIcon={<GetApp />}
          onClick={handleInstall}
        >
          نصب اپلیکیشن
        </Button>
      </DialogActions>
    </Dialog>
  );
};
