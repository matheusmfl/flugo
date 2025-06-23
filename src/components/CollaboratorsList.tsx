"use client"

import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  IconButton,
  CircularProgress,
  Alert,
  TableSortLabel,
  Typography,
  Container,
} from "@mui/material"
import { Add, Edit, Delete } from "@mui/icons-material"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useCollaborators, useDeleteCollaborator } from "@/hooks/index"
import {
  CollaboratorStatusEnum,
  getDepartmentLabel,
  getStatusLabel,
  getAvatarUrl,
  type CollaboratorEntity,
} from "@/services/api/collaborators/schema"
import { OrderDirectionEnum } from "@/services/api/schema"
import CollaboratorDetailsDialog from "./dialogs/CollaboratorDetailDialog"
import DeleteConfirmationDialog from "./dialogs/DeleteConfirmation"


type SortableColumns = "name" | "email" | "department" | "status"

export default function CollaboratorsList() {
  const router = useRouter()
  const [orderBy, setOrderBy] = useState<SortableColumns>("name")
  const [orderDirection, setOrderDirection] = useState<OrderDirectionEnum>(OrderDirectionEnum.ASC)
  const [selectedCollaboratorId, setSelectedCollaboratorId] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [collaboratorToDelete, setCollaboratorToDelete] = useState<CollaboratorEntity | null>(null)

  const { data, isLoading, error } = useCollaborators({
    params: {
      page: 1,
      itemsPerPage: 50,
      orderByColumn: orderBy,
      orderByDirection: orderDirection,
    },
  })

  const deleteMutation = useDeleteCollaborator()

  const handleSort = (column: SortableColumns) => {
    const isAsc = orderBy === column && orderDirection === OrderDirectionEnum.ASC
    setOrderDirection(isAsc ? OrderDirectionEnum.DESC : OrderDirectionEnum.ASC)
    setOrderBy(column)
  }

  const getSortDirection = (column: SortableColumns): "asc" | "desc" | undefined => {
    if (orderBy !== column) return undefined
    return orderDirection === OrderDirectionEnum.ASC ? "asc" : "desc"
  }

  const handleAvatarClick = (collaboratorId: string) => {
    setSelectedCollaboratorId(collaboratorId)
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setSelectedCollaboratorId(null)
  }

  const handleEditFromDialog = (collaboratorId: string) => {
    router.push(`/colaboradores/${collaboratorId}/editar`)
  }

  const handleDeleteClick = (collaborator: CollaboratorEntity) => {
    setCollaboratorToDelete(collaborator)
    setDeleteDialogOpen(true)
  }

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false)
    setCollaboratorToDelete(null)
  }

  const handleConfirmDelete = async () => {
    if (!collaboratorToDelete) return

    try {
      await deleteMutation.mutateAsync(collaboratorToDelete.id)
      handleCloseDeleteDialog()
    } catch (error) {
      console.error("Erro ao excluir colaborador:", error)
    }
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Erro ao carregar colaboradores: {error.message}
      </Alert>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: "#333" }}>
          Colaboradores
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => router.push("/colaboradores/novo")}
          sx={{
            backgroundColor: "#22C55E",
            "&:hover": {
              backgroundColor: "#16A34A",
            },
            px: 3,
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Novo Colaborador
        </Button>
      </Box>

      <Paper elevation={1} sx={{ borderRadius: 3, overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#F8F9FA" }}>
                <TableCell sx={{ fontWeight: 600, color: "#666" }}>
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={getSortDirection("name")}
                    onClick={() => handleSort("name")}
                    sx={{
                      "&.MuiTableSortLabel-root": {
                        color: "#666",
                        fontWeight: 600,
                      },
                      "&.MuiTableSortLabel-root:hover": {
                        color: "#22C55E",
                      },
                      "&.Mui-active": {
                        color: "#22C55E",
                        "& .MuiTableSortLabel-icon": {
                          color: "#22C55E",
                        },
                      },
                    }}
                  >
                    Nome
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#666" }}>
                  <TableSortLabel
                    active={orderBy === "email"}
                    direction={getSortDirection("email")}
                    onClick={() => handleSort("email")}
                    sx={{
                      "&.MuiTableSortLabel-root": {
                        color: "#666",
                        fontWeight: 600,
                      },
                      "&.MuiTableSortLabel-root:hover": {
                        color: "#22C55E",
                      },
                      "&.Mui-active": {
                        color: "#22C55E",
                        "& .MuiTableSortLabel-icon": {
                          color: "#22C55E",
                        },
                      },
                    }}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#666" }}>
                  <TableSortLabel
                    active={orderBy === "department"}
                    direction={getSortDirection("department")}
                    onClick={() => handleSort("department")}
                    sx={{
                      "&.MuiTableSortLabel-root": {
                        color: "#666",
                        fontWeight: 600,
                      },
                      "&.MuiTableSortLabel-root:hover": {
                        color: "#22C55E",
                      },
                      "&.Mui-active": {
                        color: "#22C55E",
                        "& .MuiTableSortLabel-icon": {
                          color: "#22C55E",
                        },
                      },
                    }}
                  >
                    Departamento
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#666" }}>
                  <TableSortLabel
                    active={orderBy === "status"}
                    direction={getSortDirection("status")}
                    onClick={() => handleSort("status")}
                    sx={{
                      "&.MuiTableSortLabel-root": {
                        color: "#666",
                        fontWeight: 600,
                      },
                      "&.MuiTableSortLabel-root:hover": {
                        color: "#22C55E",
                      },
                      "&.Mui-active": {
                        color: "#22C55E",
                        "& .MuiTableSortLabel-icon": {
                          color: "#22C55E",
                        },
                      },
                    }}
                  >
                    Status
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#666", width: 120 }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.items?.map((collaborator) => (
                <TableRow key={collaborator.id} sx={{ "&:hover": { backgroundColor: "#F8F9FA" } }}>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar
                        src={getAvatarUrl(collaborator.avatar)}
                        alt={collaborator.name || ""}
                        sx={{
                          cursor: "pointer",
                          transition: "transform 0.2s ease-in-out",
                          "&:hover": {
                            transform: "scale(1.1)",
                          },
                        }}
                        onClick={() => handleAvatarClick(collaborator.id)}
                      />
                      <Typography onClick={() => handleAvatarClick(collaborator.id)} variant="body1" sx={{ fontWeight: 500, cursor: 'pointer' }}>
                        {collaborator.name || ""}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {collaborator.email || ""}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {collaborator.department ? getDepartmentLabel(collaborator.department) : ""}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={collaborator.status ? getStatusLabel(collaborator.status) : ""}
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
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => router.push(`/colaboradores/${collaborator.id}/editar`)}
                        sx={{
                          color: "#666",
                          "&:hover": {
                            backgroundColor: "rgba(34, 197, 94, 0.1)",
                            color: "#22C55E",
                          },
                        }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteClick(collaborator)}
                        sx={{
                          color: "#666",
                          "&:hover": {
                            backgroundColor: "rgba(244, 67, 54, 0.1)",
                            color: "#f44336",
                          },
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              )) || []}
            </TableBody>
          </Table>
        </TableContainer>

        {!data?.items?.length && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Box sx={{ fontSize: "48px", mb: 2 }}>👥</Box>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Nenhum colaborador encontrado
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Comece adicionando seu primeiro colaborador
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => router.push("/colaboradores/novo")}
              sx={{
                backgroundColor: "#22C55E",
                "&:hover": {
                  backgroundColor: "#16A34A",
                },
              }}
            >
              Adicionar Colaborador
            </Button>
          </Box>
        )}
      </Paper>


      <CollaboratorDetailsDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        collaboratorId={selectedCollaboratorId}
        onEdit={handleEditFromDialog}
      />


      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        collaboratorName={collaboratorToDelete?.name}
        isLoading={deleteMutation.isPending}
        error={deleteMutation.error?.message || null}
      />
    </Container>
  )
}
