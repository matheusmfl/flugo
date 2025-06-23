"use client"

import { Box, FormControl, InputLabel, Select, MenuItem, Typography, Alert } from "@mui/material"
import { Controller, useFormContext } from "react-hook-form"

import type { CollaboratorFormData } from "../types"
import { DepartmentEnum, getDepartmentLabel } from "@/services/api/collaborators"

export default function ProfessionalInfoStep() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CollaboratorFormData>()

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ color: "#666", fontWeight: 500 }}>
        Informações Profissionais
      </Typography>

      <Typography variant="body2" sx={{ color: "#999", mb: 4 }}>
        Selecione um departamento
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Controller
          name="department"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.department}>
              <InputLabel
                sx={{
                  "&.Mui-focused": {
                    color: "#4CAF50",
                  },
                }}
              >
                Departamento
              </InputLabel>
              <Select
                {...field}
                label="Departamento"
                sx={{
                  borderRadius: 2,
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#4CAF50",
                  },
                }}
              >
                {Object.values(DepartmentEnum).map((department) => (
                  <MenuItem key={department} value={department}>
                    {getDepartmentLabel(department)}
                  </MenuItem>
                ))}
              </Select>
              {errors.department && (
                <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                  {errors.department.message}
                </Typography>
              )}
            </FormControl>
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
