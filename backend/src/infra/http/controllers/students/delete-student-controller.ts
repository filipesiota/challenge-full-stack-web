import type { FastifyRequest, FastifyReply } from 'fastify'

import { DeleteStudentUseCase } from '@/domain/application/use-cases/delete-student'
import { DeleteStudentParams } from '../../schemas/delete-student'
import { StudentPresenter } from '../../presenters/student-presenter'
import { NotFoundException } from '../../exceptions/not-found-exception'

export class DeleteStudentController {
  constructor(private readonly deleteStudentUseCase: DeleteStudentUseCase) {}

  async handle(
    request: FastifyRequest<{
      Params: DeleteStudentParams
    }>,
    reply: FastifyReply,
  ) {
    const { studentId } = request.params

    const result = await this.deleteStudentUseCase.execute({
      studentId,
    })

    if (result.isLeft()) {
      const error = result.value

      throw new NotFoundException(error)
    }

    const { student } = result.value

    return reply.status(200).send({
      student: StudentPresenter.toHTTP(student),
    })
  }
}
