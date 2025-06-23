"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

import {
  updateCollaboratorRequest,
  CollaboratorStatusEnum,
  DepartmentEnum,
  AvatarEnum,
} from "@/services/api/collaborators/schema"
import type { UpdateCollaboratorRequest } from "@/services/api/collaborators"
import { FormSteps } from "../types"
import { useCollaborator, useUpdateCollaborator } from "@/hooks"

export function useCollaboratorEditForm(collaboratorId: string) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(FormSteps.BASIC_INFO)
  const updateMutation = useUpdateCollaborator()

  const {
    data: collaborator,
    isLoading: isLoadingCollaborator,
    error: collaboratorError,
  } = useCollaborator({
    id: collaboratorId,
  })

  const form = useForm<UpdateCollaboratorRequest>({
    resolver: zodResolver(updateCollaboratorRequest),
    defaultValues: {
      name: "",
      email: "",
      status: CollaboratorStatusEnum.ACTIVE,
      department: DepartmentEnum.TI,
      avatar: AvatarEnum.AVATAR_1,
    },
    mode: "onChange",
  })


  useEffect(() => {
    if (collaborator) {
      form.reset({
        name: collaborator.name,
        email: collaborator.email,
        status: collaborator.status,
        department: collaborator.department,
        avatar: collaborator.avatar,
      })
    }
  }, [collaborator, form])

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

  const onSubmit = async (data: UpdateCollaboratorRequest) => {
    try {
      await updateMutation.mutateAsync({ id: collaboratorId, data })
      router.push("/colaboradores")
    } catch (error) {
      console.error("Erro ao atualizar colaborador:", error)
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
    isLoading: updateMutation.isPending,
    error: updateMutation.error,
    collaborator,
    isLoadingCollaborator,
    collaboratorError,
  }
}
