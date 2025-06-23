"use client"

import { Box, Typography, LinearProgress } from "@mui/material"
import { Check } from "@mui/icons-material"

interface StepIndicatorProps {
  currentStep: number
  progress: number
}

const steps = [
  { label: "Infos Básicas", key: "basic" },
  { label: "Infos Profissionais", key: "professional" },
  { label: "Avatar", key: "avatar" },
]

export default function StepIndicator({ currentStep, progress }: StepIndicatorProps) {
  return (
    <Box sx={{ mb: 4 }}>
      {/* Progress Bar */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Progresso
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {Math.round(progress)}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 6,
            borderRadius: 3,
            backgroundColor: "#E0E0E0",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#4CAF50",
              borderRadius: 3,
            },
          }}
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {steps.map((step, index) => (
          <Box key={step.key} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: index < currentStep ? "#4CAF50" : index === currentStep ? "#4CAF50" : "#E0E0E0",
                color: index <= currentStep ? "white" : "#999",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {index < currentStep ? <Check sx={{ fontSize: 16 }} /> : index + 1}
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: index <= currentStep ? "#4CAF50" : "#999",
                fontWeight: index === currentStep ? "bold" : "normal",
              }}
            >
              {step.label}
            </Typography>
            {index < steps.length - 1 && (
              <Box
                sx={{
                  width: 20,
                  height: 2,
                  backgroundColor: index < currentStep ? "#4CAF50" : "#E0E0E0",
                  ml: 1,
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  )
}
