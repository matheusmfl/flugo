"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { CollaboratorFormData, FormSteps } from "../types"
import useCreateCollaborator from "@/hooks/useCreateCollaborator"
import { AvatarEnum, CollaboratorStatusEnum, createCollaboratorRequest, DepartmentEnum } from "@/services/api/collaborators"



export function useCollaboratorForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(FormSteps.BASIC_INFO)
  const createMutation = useCreateCollaborator()

  const form = useForm<CollaboratorFormData>({
    resolver: zodResolver(createCollaboratorRequest),
    defaultValues: {
      name: "",
      email: "",
      status: CollaboratorStatusEnum.ACTIVE,
      department: DepartmentEnum.TI,
      avatar: AvatarEnum.AVATAR_1,
    },
    mode: "onChange",
  })

  const nextStep = async () => {
    const isValid = await form.trigger()
    if (isValid && currentStep < FormSteps.AVATAR_SELECTION) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > FormSteps.BASIC_INFO) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data: CollaboratorFormData) => {
    try {
      await createMutation.mutateAsync(data)
      router.push("/colaboradores")
    } catch (error) {
      console.error("Erro ao criar colaborador:", error)
    }
  }

  const getStepProgress = () => {
    return ((currentStep + 1) / 3) * 100
  }

  const isFirstStep = currentStep === FormSteps.BASIC_INFO
  const isLastStep = currentStep === FormSteps.AVATAR_SELECTION

  return {
    form,
    currentStep,
    nextStep,
    prevStep,
    onSubmit,
    getStepProgress,
    isFirstStep,
    isLastStep,
    isLoading: createMutation.isPending,
    error: createMutation.error,
  }
}
