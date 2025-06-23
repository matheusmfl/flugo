import { CollaboratorEntity, CreateCollaboratorRequest } from "@/services/api/collaborators"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/services/api"
import { COLLABORATORS } from "./useCollaborators"



function useCreateCollaborator() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCollaboratorRequest): Promise<CollaboratorEntity> => api.Collaborator.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COLLABORATORS] })
    },
  })
}

export default useCreateCollaborator
