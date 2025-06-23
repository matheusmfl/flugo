import { FirebaseEndpoint, type FirebaseQueryConfig } from "../firebaseAdapter"
import type { FindAllBaseParams, Paginate } from "../schema"
import {
  type CollaboratorEntity,
  type CreateCollaboratorRequest,
  type UpdateCollaboratorRequest,
  type DepartmentEnum,
  CollaboratorStatusEnum,
} from "./schema"

export * from "./schema"

export type FindAllCollaboratorParams = FindAllBaseParams & {
  department?: DepartmentEnum
  status?: CollaboratorStatusEnum
}

class CollaboratorEndpoint extends FirebaseEndpoint {
  find = async (params: FindAllCollaboratorParams): Promise<Paginate<CollaboratorEntity>> => {
    const config: FirebaseQueryConfig = {
      where: [],
      orderBy: [],
      limit: params.itemsPerPage || 10,
    }


    if (params.department) {
      config.where?.push({
        field: "department",
        operator: "==",
        value: params.department,
      })
    }

    if (params.status) {
      config.where?.push({
        field: "status",
        operator: "==",
        value: params.status,
      })
    }

    if (params.search) {
      config.where?.push({
        field: "name",
        operator: ">=",
        value: params.search,
      })
      config.where?.push({
        field: "name",
        operator: "<=",
        value: params.search + "\uf8ff",
      })
    }

    if (params.orderByColumn) {
      config.orderBy?.push({
        field: params.orderByColumn as string,
        direction: params.orderByDirection || "asc",
      })
    } else {
      config.orderBy?.push({
        field: "name",
        direction: "asc",
      })
    }


    const items = await this.getMany<CollaboratorEntity>(config)


    const page = params.page || 1
    const itemsPerPage = params.itemsPerPage || 10
    const total = items.length
    const totalPages = Math.ceil(total / itemsPerPage)

    return {
      items: items,
      links: {
        first: page > 1 ? "1" : null,
        last: totalPages > 1 ? totalPages.toString() : null,
        prev: page > 1 ? (page - 1).toString() : null,
        next: page < totalPages ? (page + 1).toString() : null,
      },
      meta: {
        page,
        itemsPerPage,
        total,
        totalPages,
      },
    }
  }


  findOne = (id: CollaboratorEntity["id"]): Promise<CollaboratorEntity> => this.getOne<CollaboratorEntity>(id)

  create = (data: CreateCollaboratorRequest): Promise<CollaboratorEntity> =>
    this.post<CreateCollaboratorRequest, CollaboratorEntity>(data)

  update = (id: string, data: UpdateCollaboratorRequest): Promise<CollaboratorEntity> =>
    this.patch<UpdateCollaboratorRequest, CollaboratorEntity>(id, data)

  remove = (id: string): Promise<void> => this.delete(id)
  
  activate = (id: string): Promise<CollaboratorEntity> =>
    this.patch<UpdateCollaboratorRequest, CollaboratorEntity>(id, {
      status: CollaboratorStatusEnum.ACTIVE,
    })

  deactivate = (id: string): Promise<CollaboratorEntity> =>
    this.patch<UpdateCollaboratorRequest, CollaboratorEntity>(id, {
      status: CollaboratorStatusEnum.INACTIVE,
    })

  findByDepartment = (department: DepartmentEnum): Promise<CollaboratorEntity[]> =>
    this.getMany<CollaboratorEntity>({
      where: [{ field: "department", operator: "==", value: department }],
      orderBy: [{ field: "name", direction: "asc" }],
    })

  findByStatus = (status: CollaboratorStatusEnum): Promise<CollaboratorEntity[]> =>
    this.getMany<CollaboratorEntity>({
      where: [{ field: "status", operator: "==", value: status }],
      orderBy: [{ field: "name", direction: "asc" }],
    })
}

export const Collaborator = new CollaboratorEndpoint("collaborators")
