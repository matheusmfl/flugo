import { z } from "zod"

export const baseSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
})

export const apiResponseSchema = z.object({
  message: z.string(),
})

export const paginateParamsSchema = z.object({
  page: z.number().optional(),
  itemsPerPage: z.number().optional(),
})

export type PaginateParams = z.infer<typeof paginateParamsSchema>

export enum OrderDirectionEnum {
  ASC = "asc",
  DESC = "desc",
}

export const orderByParamsSchema = z.object({
  orderByColumn: z.union([z.string(), z.number()]).optional(),
  orderByDirection: z.nativeEnum(OrderDirectionEnum).optional(),
})

export type OrderByParams = z.infer<typeof orderByParamsSchema>

export const searchParamsSchema = z.object({
  search: z.string().optional(),
})

export type SearchParams = z.infer<typeof searchParamsSchema>

export const findAllBaseParamsSchema = z.object({
  ...paginateParamsSchema.shape,
  ...orderByParamsSchema.shape,
  ...searchParamsSchema.shape,
})

export type FindAllBaseParams = z.infer<typeof findAllBaseParamsSchema>

export class ErrorResponse {
  statusCode: string
  message: string
  code: string
  timestamp: string
  path: string
  method: string

  constructor(data: ErrorResponse) {
    this.statusCode = data.statusCode
    this.message = data.message
    this.code = data.code
    this.timestamp = data.timestamp
    this.path = data.path
    this.method = data.method
  }
}

export type ApiErrorResponse = z.infer<typeof apiResponseSchema> & ErrorResponse
export type ApiResponseLogin = z.infer<typeof apiResponseSchema>

export type ApiResponse<R> = z.infer<typeof apiResponseSchema> & {
  return: R
}

export interface Paginate<T> {
  items: T[]
  links: {
    first: string | null
    last: string | null
    prev: string | null
    next: string | null
  }
  meta: {
    page: number
    itemsPerPage: number
    total: number
    totalPages: number
  }
}
