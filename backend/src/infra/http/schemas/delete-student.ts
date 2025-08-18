import { z } from 'zod'

export const deleteStudentParamsSchema = z.object({
  studentId: z.string().min(1),
})

export type DeleteStudentParams = z.infer<typeof deleteStudentParamsSchema>
