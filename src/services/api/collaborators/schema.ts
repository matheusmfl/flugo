import { z } from "zod"
import { baseSchema } from "../schema"

export enum CollaboratorStatusEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum DepartmentEnum {
  TI = "TI",
  DESIGN = "DESIGN",
  PRODUTO = "PRODUTO",
  MARKETING = "MARKETING",
  VENDAS = "VENDAS",
  RH = "RH",
  FINANCEIRO = "FINANCEIRO",
}

export enum AvatarEnum {
  AVATAR_1 = "avatar-1",
  AVATAR_2 = "avatar-2",
  AVATAR_3 = "avatar-3",
  AVATAR_4 = "avatar-4",
  AVATAR_5 = "avatar-5",
  AVATAR_6 = "avatar-6",
  AVATAR_7 = "avatar-7",
  AVATAR_8 = "avatar-8",
}

export const collaboratorSchema = z
  .object({
    name: z
      .string({
        required_error: "Nome é obrigatório",
        invalid_type_error: "Nome deve ser uma string",
      })
      .min(2, { message: "Nome deve ter pelo menos 2 caracteres" })
      .max(100, { message: "Nome deve ter no máximo 100 caracteres" }),

    email: z
      .string({
        required_error: "Email é obrigatório",
        invalid_type_error: "Email deve ser uma string",
      })
      .email({ message: "Email deve ter um formato válido" })
      .toLowerCase(),

    status: z.nativeEnum(CollaboratorStatusEnum, {
      required_error: "Status é obrigatório",
      invalid_type_error: "Status deve ser ACTIVE ou INACTIVE",
    }),

    department: z.nativeEnum(DepartmentEnum, {
      required_error: "Departamento é obrigatório",
      invalid_type_error: "Departamento inválido",
    }),

    avatar: z.nativeEnum(AvatarEnum, {
      required_error: "Avatar é obrigatório",
      invalid_type_error: "Avatar inválido",
    }),
  })
  .merge(baseSchema)

export type CollaboratorEntity = z.infer<typeof collaboratorSchema>

export const createCollaboratorRequest = collaboratorSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export type CreateCollaboratorRequest = z.infer<typeof createCollaboratorRequest>

export const updateCollaboratorRequest = collaboratorSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial()

export type UpdateCollaboratorRequest = z.infer<typeof updateCollaboratorRequest>


export const collaboratorListResponse = collaboratorSchema.pick({
  id: true,
  name: true,
  email: true,
  status: true,
  department: true,
  avatar: true,
})

export type CollaboratorListResponse = z.infer<typeof collaboratorListResponse>


export const getDepartmentLabel = (department: DepartmentEnum): string => {
  const labels = {
    [DepartmentEnum.TI]: "Tecnologia da Informação",
    [DepartmentEnum.DESIGN]: "Design",
    [DepartmentEnum.PRODUTO]: "Produto",
    [DepartmentEnum.MARKETING]: "Marketing",
    [DepartmentEnum.VENDAS]: "Vendas",
    [DepartmentEnum.RH]: "Recursos Humanos",
    [DepartmentEnum.FINANCEIRO]: "Financeiro",
  }
  return labels[department]
}

export const getStatusLabel = (status: CollaboratorStatusEnum): string => {
  const labels = {
    [CollaboratorStatusEnum.ACTIVE]: "Ativo",
    [CollaboratorStatusEnum.INACTIVE]: "Inativo",
  }
  return labels[status]
}

export const getAvatarUrl = (avatar: AvatarEnum): string => {
  const avatarUrls = {
    [AvatarEnum.AVATAR_1]: "https://api.dicebear.com/9.x/adventurer/svg?seed=Ryker",
    [AvatarEnum.AVATAR_2]: "https://api.dicebear.com/9.x/adventurer/svg?seed=Maria",
    [AvatarEnum.AVATAR_3]: "https://api.dicebear.com/9.x/adventurer/svg?seed=Jessica",
    [AvatarEnum.AVATAR_4]: "https://api.dicebear.com/9.x/adventurer/svg?seed=Liliana",
    [AvatarEnum.AVATAR_5]: "https://api.dicebear.com/9.x/adventurer/svg?seed=Aidan",
    [AvatarEnum.AVATAR_6]: "https://api.dicebear.com/9.x/adventurer/svg?seed=Eliza",
    [AvatarEnum.AVATAR_7]: "https://api.dicebear.com/9.x/adventurer/svg?seed=Jocelyn",
    [AvatarEnum.AVATAR_8]: "https://api.dicebear.com/9.x/adventurer/svg?seed=Amaya",
  }
  return avatarUrls[avatar]
}
