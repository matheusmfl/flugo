"use client"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Avatar,
  Chip,
  Divider,
  Grid,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material"
import { Close, Edit, Person, Email, Business, CalendarToday } from "@mui/icons-material"
import { useCollaborator } from "@/hooks/index"
import {
  getDepartmentLabel,
  getStatusLabel,
  getAvatarUrl,
  CollaboratorStatusEnum,
} from "@/services/api/collaborators/schema"

interface CollaboratorDetailsDialogProps {
  open: boolean
  onClose: () => void
  collaboratorId: string | null
  onEdit?: (collaboratorId: string) => void
}

export default function CollaboratorDetailsDialog({
  open,
  onClose,
  collaboratorId,
  onEdit,
}: CollaboratorDetailsDialogProps) {
  const {
    data: collaborator,
    isLoading,
    error,
  } = useCollaborator({
    id: collaboratorId || "",
    options: {
      enabled: !!collaboratorId && open,
    },
  })

  const handleEdit = () => {
    if (collaborator?.id && onEdit) {
      onEdit(collaborator.id)
      onClose()
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return "Data inválida"
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          minHeight: 400,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Detalhes do Colaborador
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Erro ao carregar dados do colaborador: {error.message}
          </Alert>
        )}

        {collaborator && (
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Avatar
                src={getAvatarUrl(collaborator.avatar)}
                alt={collaborator.name}
                sx={{
                  width: 80,
                  height: 80,
                  mr: 3,
                  border: "3px solid #f0f0f0",
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  {collaborator.name}
                </Typography>
                <Chip
                  label={getStatusLabel(collaborator.status)}
                  size="small"
                  sx={{
                    borderRadius: 2,
                    backgroundColor:
                      collaborator.status === CollaboratorStatusEnum.ACTIVE
                        ? "rgba(34, 197, 94, 0.16)"
                        : "rgba(255, 86, 48, 0.16)",
                    color: collaborator.status === CollaboratorStatusEnum.ACTIVE ? "#118D57" : "#B71D18",
                    fontWeight: 700,
                    fontSize: "12px",
                  }}
                />
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />


            <Grid container spacing={3}>
              <Grid size={12}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#333" }}>
                  Informações Pessoais
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Person sx={{ color: "#666", mr: 2 }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Nome Completo
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {collaborator.name}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Email sx={{ color: "#666", mr: 2 }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {collaborator.email}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid size={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#333" }}>
                  Informações Profissionais
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Business sx={{ color: "#666", mr: 2 }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Departamento
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {getDepartmentLabel(collaborator.department)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      backgroundColor: "#666",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 2,
                    }}
                  >
                    <Typography variant="caption" sx={{ color: "white", fontWeight: "bold" }}>
                      S
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Status
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {getStatusLabel(collaborator.status)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid size={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#333" }}>
                  Informações do Sistema
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <CalendarToday sx={{ color: "#666", mr: 2 }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Data de Cadastro
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {formatDate(collaborator.createdAt)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {collaborator.updatedAt && (
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <CalendarToday sx={{ color: "#666", mr: 2 }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Última Atualização
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {formatDate(collaborator.updatedAt)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              )}

              <Grid size={12}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "4px",
                      backgroundColor: "#666",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 2,
                    }}
                  >
                    <Typography variant="caption" sx={{ color: "white", fontWeight: "bold" }}>
                      ID
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      ID do Sistema
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "monospace",
                        backgroundColor: "#f5f5f5",
                        padding: "2px 6px",
                        borderRadius: 1,
                        fontSize: "11px",
                      }}
                    >
                      {collaborator.id}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} variant="outlined" sx={{
          mr: 1, color: 'gray', "&:hover": {
            color: "#16A34A",
          },
        }}>
          Fechar
        </Button>
        {collaborator && onEdit && (
          <Button
            onClick={handleEdit}
            variant="contained"
            startIcon={<Edit />}
            sx={{
              backgroundColor: "#22C55E",
              "&:hover": {
                backgroundColor: "#16A34A",
              },
            }}
          >
            Editar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
