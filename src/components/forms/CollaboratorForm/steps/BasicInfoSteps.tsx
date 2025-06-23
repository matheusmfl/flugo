"use client"

import { Box, TextField, FormControlLabel, Switch, Typography, Alert } from "@mui/material"
import { Controller, useFormContext } from "react-hook-form"
import type { CollaboratorFormData } from "../types"
import { CollaboratorStatusEnum } from "@/services/api/collaborators"

export default function BasicInfoStep() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CollaboratorFormData>()

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ color: "#666", fontWeight: 500 }}>
        Informações Básicas
      </Typography>

      <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 3 }}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nome"
              placeholder="João da Silva"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&.Mui-focused fieldset": {
                    borderColor: "#4CAF50",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#4CAF50",
                },
              }}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="E-mail"
              placeholder="e.g. john@gmail.com"
              type="email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&.Mui-focused fieldset": {
                    borderColor: "#4CAF50",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#4CAF50",
                },
              }}
            />
          )}
        />

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  checked={field.value === CollaboratorStatusEnum.ACTIVE}
                  onChange={(e) =>
                    field.onChange(e.target.checked ? CollaboratorStatusEnum.ACTIVE : CollaboratorStatusEnum.INACTIVE)
                  }
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#4CAF50",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#4CAF50",
                    },
                  }}
                />
              }
              label="Ativo ao criar"
              sx={{ mt: 1 }}
            />
          )}
        />

        {errors.root && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errors.root.message}
          </Alert>
        )}
      </Box>
    </Box>
  )
}
