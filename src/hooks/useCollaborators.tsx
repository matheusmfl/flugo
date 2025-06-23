import { type UseQueryOptions, useQuery } from "@tanstack/react-query"
import api from "@/services/api"
import type { Paginate } from "@/services/api/schema"
import { CollaboratorEntity, collaboratorSchema, FindAllCollaboratorParams } from "@/services/api/collaborators"


export const COLLABORATORS = "COLLABORATORS"

type UseCollaboratorsQueryArgs = {
  params: FindAllCollaboratorParams
  options?: Partial<UseQueryOptions<unknown, Error, Paginate<CollaboratorEntity>, [typeof COLLABORATORS, string]>>
}

function useCollaborators({ params, options }: UseCollaboratorsQueryArgs) {
  const queryFn = async () => {
    const response = await api.Collaborator.find(params)
    response.items = response.items.map((item) => collaboratorSchema.parse(item))
    return response
  }

  return useQuery({
    queryKey: [COLLABORATORS, JSON.stringify(params)],
    queryFn,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    ...options,
  })
}

export default useCollaborators
