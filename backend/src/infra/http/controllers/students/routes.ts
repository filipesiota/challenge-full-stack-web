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
import { makeDeleteStudentUseCase } from '@/infra/factories/make-delete-student-use-case'
import { DeleteStudentController } from './delete-student-controller'
import { deleteStudentParamsSchema } from '../../schemas/delete-student'
import { FetchStudentsController } from './fetch-students-controller'
import { makeFetchStudentsUseCase } from '@/infra/factories/make-fetch-students-use-case'
import { fetchStudentsQueryStringSchema } from '../../schemas/fetch-students'

export async function studentsRoutes(app: FastifyInstance) {
  const createStudentController = new CreateStudentController(
    makeCreateStudentUseCase(),
  )
  const editStudentController = new EditStudentController(
    makeEditStudentUseCase(),
  )
  const deleteStudentController = new DeleteStudentController(
    makeDeleteStudentUseCase(),
  )
  const fetchStudentsController = new FetchStudentsController(
    makeFetchStudentsUseCase(),
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

  app.delete(
    '/students/:studentId',
    {
      schema: {
        params: deleteStudentParamsSchema,
      },
    },
    deleteStudentController.handle.bind(deleteStudentController),
  )

  app.get(
    '/students',
    {
      schema: {
        querystring: fetchStudentsQueryStringSchema,
      },
    },
    fetchStudentsController.handle.bind(fetchStudentsController),
  )
}
