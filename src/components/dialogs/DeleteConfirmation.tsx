"use client"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material"
import { Warning } from "@mui/icons-material"

interface DeleteConfirmationDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  collaboratorName?: string
  isLoading?: boolean
  error?: string | null
}

export default function DeleteConfirmationDialog({
  open,
  onClose,
  onConfirm,
  collaboratorName,
  isLoading = false,
  error,
}: DeleteConfirmationDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={!isLoading ? onClose : undefined}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: "rgba(244, 67, 54, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Warning sx={{ color: "#f44336", fontSize: 20 }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Confirmar Exclusão
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Typography variant="body1" sx={{ mb: 2 }}>
          Tem certeza que deseja excluir o colaborador <strong>{collaboratorName || "selecionado"}</strong>?
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Esta ação não pode ser desfeita. Todos os dados do colaborador serão permanentemente removidos.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          disabled={isLoading}
          sx={{
            borderColor: "#E0E0E0",
            color: "#666",
            "&:hover": {
              borderColor: "#666",
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : null}
          sx={{
            backgroundColor: "#f44336",
            "&:hover": {
              backgroundColor: "#d32f2f",
            },
            minWidth: 120,
          }}
        >
          {isLoading ? "Excluindo..." : "Excluir"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
