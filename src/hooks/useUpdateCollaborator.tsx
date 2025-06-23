import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/services/api"
import type { UpdateCollaboratorRequest, CollaboratorEntity } from "@/services/api/collaborators"
import { COLLABORATORS } from "./useCollaborators"
import { COLLABORATOR } from "./useCollaborator"

type UpdateCollaboratorArgs = {
  id: string
  data: UpdateCollaboratorRequest
}

function useUpdateCollaborator() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: UpdateCollaboratorArgs): Promise<CollaboratorEntity> =>
      api.Collaborator.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [COLLABORATORS] })
      queryClient.setQueryData([COLLABORATOR, data.id], data)
    },
  })
}

export default useUpdateCollaborator
