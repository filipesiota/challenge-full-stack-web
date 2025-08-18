import { z } from 'zod'

export const editStudentParamsSchema = z.object({
  studentId: z.string().min(1),
})

export const editStudentBodySchema = z.object({
  name: z.string().min(1),
  email: z.email(),
})

export type EditStudentParams = z.infer<typeof editStudentParamsSchema>
export type EditStudentBody = z.infer<typeof editStudentBodySchema>
