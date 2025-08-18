import type { FastifyInstance } from 'fastify'

import { CreateStudentController } from './create-student-controller'
import { makeCreateStudentUseCase } from '@/infra/factories/make-create-student-use-case'
import { createStudentBodySchema } from '../../schemas/create-student'
import {
  editStudentBodySchema,
  editStudentParamsSchema,
} from '../../schemas/edit-student'
import { EditStudentController } from './edit-student-controller'
import { makeEditStudentUseCase } from '@/infra/factories/make-edit-student-use-case'

export async function studentsRoutes(app: FastifyInstance) {
  const createStudentController = new CreateStudentController(
    makeCreateStudentUseCase(),
  )
  const editStudentController = new EditStudentController(
    makeEditStudentUseCase(),
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

  app.put(
    '/students/:studentId',
    {
      schema: {
        body: editStudentBodySchema,
        params: editStudentParamsSchema,
      },
    },
    editStudentController.handle.bind(editStudentController),
  )
}
