import type { FastifyRequest, FastifyReply } from 'fastify'

import { EditStudentUseCase } from '@/domain/application/use-cases/edit-student'
import { EditStudentBody, EditStudentParams } from '../../schemas/edit-student'
import { StudentPresenter } from '../../presenters/student-presenter'
import { NotFoundException } from '../../exceptions/not-found-exception'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { ConflictException } from '../../exceptions/conflict-exception'

export class EditStudentController {
  constructor(private readonly editStudentUseCase: EditStudentUseCase) {}

  async handle(
    request: FastifyRequest<{
      Body: EditStudentBody
      Params: EditStudentParams
    }>,
    reply: FastifyReply,
  ) {
    const { studentId } = request.params
    const { name, email } = request.body

    const result = await this.editStudentUseCase.execute({
      studentId,
      name,
      email,
    })

    if (result.isLeft()) {
      const error = result.value

      if (error instanceof ResourceNotFoundError) {
        throw new NotFoundException(error)
      } else {
        throw new ConflictException(error)
      }
    }

    const { student } = result.value

    return reply.status(200).send({
      student: StudentPresenter.toHTTP(student),
    })
  }
}
