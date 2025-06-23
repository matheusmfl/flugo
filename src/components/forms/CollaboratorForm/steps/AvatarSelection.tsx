"use client"

import { Box, Typography, Avatar, Grid, Paper, Alert } from "@mui/material"
import { Controller, useFormContext } from "react-hook-form"
import type { CollaboratorFormData } from "../types"
import { AvatarEnum, getAvatarUrl } from "@/services/api/collaborators"

export default function AvatarSelectionStep() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CollaboratorFormData>()

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ color: "#666", fontWeight: 500 }}>
        Selecionar Avatar
      </Typography>

      <Typography variant="body2" sx={{ color: "#999", mb: 4 }}>
        Escolha um avatar para o colaborador
      </Typography>

      <Controller
        name="avatar"
        control={control}
        render={({ field }) => (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {Object.values(AvatarEnum).map((avatar, i) => (
              <Grid key={avatar + i} size={{ xs: 6, sm: 4, md: 3 }} >
                <Paper
                  elevation={field.value === avatar ? 3 : 1}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    cursor: "pointer",
                    border: field.value === avatar ? "2px solid #4CAF50" : "2px solid transparent",
                    borderRadius: 2,
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      elevation: 3,
                      transform: "translateY(-2px)",
                    },
                  }}
                  onClick={() => field.onChange(avatar)}
                >
                  <Avatar
                    src={getAvatarUrl(avatar)}
                    alt={`Avatar ${avatar}`}
                    sx={{
                      width: 64,
                      height: 64,
                      mx: "auto",
                      mb: 1,
                      border: field.value === avatar ? "3px solid #4CAF50" : "none",
                    }}
                  />
                  <Typography variant="caption" display="block">
                    {avatar.replace("avatar-", "Avatar ")}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      />

      {errors.avatar && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errors.avatar.message}
        </Alert>
      )}

      {errors.root && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errors.root.message}
        </Alert>
      )}
    </Box>
  )
}
