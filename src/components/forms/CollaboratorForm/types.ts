import { createCollaboratorRequest } from "@/services/api/collaborators"
import type { z } from "zod"


export type CollaboratorFormData = z.infer<typeof createCollaboratorRequest>

export interface StepProps {
  onNext: () => void
  onBack: () => void
  isLastStep?: boolean
  isFirstStep?: boolean
}

export enum FormSteps {
  BASIC_INFO = 0,
  PROFESSIONAL_INFO = 1,
  AVATAR_SELECTION = 2,
}
