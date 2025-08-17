import type { FastifyInstance } from 'fastify'

import { CreateStudentController } from './create-student-controller'
import { makeCreateStudentUseCase } from '@/infra/factories/make-create-student-use-case'
import { createStudentBodySchema } from '../../schemas/create-student'

export async function studentsRoutes(app: FastifyInstance) {
  const createStudentController = new CreateStudentController(
    makeCreateStudentUseCase(),
  )

  app.post(
    '/students',
    {
      schema: {
        body: createStudentBodySchema,
      },
    },
    createStudentController.handle.bind(createStudentController),
  )
}
