"use client"

import { Box, Paper, Button, Container, Typography, Breadcrumbs, Link, Alert, CircularProgress } from "@mui/material"
import { ArrowBack, ArrowForward } from "@mui/icons-material"
import { FormProvider } from "react-hook-form"
import { useRouter } from "next/navigation"
import { FormSteps } from "./types"
import StepIndicator from "./components/StepIndicator"
import { useCollaboratorForm } from "./hooks/useCollaboratorForm"
import BasicInfoStep from "./steps/BasicInfoSteps"
import ProfessionalInfoStep from "./steps/ProfessionalInfoSteps"
import AvatarSelectionStep from "./steps/AvatarSelection"



export default function CollaboratorForm() {
  const router = useRouter()
  const {
    form,
    currentStep,
    nextStep,
    prevStep,
    onSubmit,
    getStepProgress,
    isFirstStep,
    isLastStep,
    isLoading,
    error,
  } = useCollaboratorForm()

  const renderCurrentStep = () => {
    switch (currentStep) {
      case FormSteps.BASIC_INFO:
        return <BasicInfoStep />
      case FormSteps.PROFESSIONAL_INFO:
        return <ProfessionalInfoStep />
      case FormSteps.AVATAR_SELECTION:
        return <AvatarSelectionStep />
      default:
        return <BasicInfoStep />
    }
  }

  const handleNext = async () => {
    if (isLastStep) {
      form.handleSubmit(onSubmit)()
    } else {
      await nextStep()
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Breadcrumbs separator="•" sx={{ mb: 3 }}>
        <Link
          color="inherit"
          href="/colaboradores"
          onClick={(e) => {
            e.preventDefault()
            router.push("/colaboradores")
          }}
          sx={{ cursor: "pointer" }}
        >
          Colaboradores
        </Link>
        <Typography color="text.primary">Cadastrar Colaborador</Typography>
      </Breadcrumbs>

      <Paper elevation={1} sx={{ p: 4, borderRadius: 3 }}>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <StepIndicator currentStep={currentStep} progress={getStepProgress()} />


            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                Erro ao criar colaborador: {error.message}
              </Alert>
            )}


            <Box sx={{ minHeight: 300, mb: 4 }}>{renderCurrentStep()}</Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
              <Button
                variant="outlined"
                onClick={isFirstStep ? () => router.push("/colaboradores") : prevStep}
                startIcon={<ArrowBack />}
                disabled={isLoading}
                sx={{
                  borderColor: "#E0E0E0",
                  color: "#666",
                  "&:hover": {
                    borderColor: "#4CAF50",
                    backgroundColor: "rgba(76, 175, 80, 0.04)",
                  },
                }}
              >
                {isFirstStep ? "Voltar" : "Voltar"}
              </Button>

              <Button
                variant="contained"
                onClick={handleNext}
                endIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : <ArrowForward />}
                disabled={isLoading}
                sx={{
                  backgroundColor: "#4CAF50",
                  "&:hover": {
                    backgroundColor: "#45A049",
                  },
                  minWidth: 120,
                }}
              >
                {isLoading ? "Salvando..." : isLastStep ? "Concluir" : "Próximo"}
              </Button>
            </Box>
          </form>
        </FormProvider>
      </Paper>
    </Container>
  )
}
