import { type UseQueryOptions, useQuery } from "@tanstack/react-query"
import api from "@/services/api"
import { CollaboratorEntity, collaboratorSchema } from "@/services/api/collaborators"

export const COLLABORATOR = "COLLABORATOR"

type UseCollaboratorQueryArgs = {
  id: string
  options?: Partial<UseQueryOptions<unknown, Error, CollaboratorEntity, [typeof COLLABORATOR, string]>>
}

function useCollaborator({ id, options }: UseCollaboratorQueryArgs) {
  const queryFn = async () => {
    const response = await api.Collaborator.findOne(id)
    return collaboratorSchema.parse(response)
  }

  return useQuery({
    queryKey: [COLLABORATOR, id],
    queryFn,
    enabled: !!id,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    ...options,
  })
}

export default useCollaborator
