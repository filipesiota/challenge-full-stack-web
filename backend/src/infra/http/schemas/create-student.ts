import { isCPF } from 'validation-br'
import { z } from 'zod'

export const createStudentBodySchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  enrollmentNumber: z.string().min(1),
  cpf: z.string().refine((value) => isCPF(value), { error: 'Invalid cpf' }),
})

export type CreateStudentBody = z.infer<typeof createStudentBodySchema>
