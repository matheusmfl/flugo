import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/services/api"
import { COLLABORATORS } from "./useCollaborators"
import { COLLABORATOR } from "./useCollaborator"

function useDeleteCollaborator() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string): Promise<void> => api.Collaborator.remove(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: [COLLABORATORS] })
      queryClient.removeQueries({ queryKey: [COLLABORATOR, id] })
    },
  })
}

export default useDeleteCollaborator
