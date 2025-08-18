import { z } from 'zod'

export const fetchStudentsQueryStringSchema = z.object({
  page: z.coerce.number().min(1),
})

export type FetchStudentsQueryString = z.infer<
  typeof fetchStudentsQueryStringSchema
>
