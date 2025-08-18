import type { FastifyRequest, FastifyReply } from 'fastify'

import { FetchStudentsUseCase } from '@/domain/application/use-cases/fetch-students'
import { StudentPresenter } from '../../presenters/student-presenter'
import { FetchStudentsQueryString } from '../../schemas/fetch-students'
import { InternalServerErrorException } from '../../exceptions/internal-server-error-exception'

export class FetchStudentsController {
  constructor(private readonly fetchStudentsUseCase: FetchStudentsUseCase) {}

  async handle(
    request: FastifyRequest<{ Querystring: FetchStudentsQueryString }>,
    reply: FastifyReply,
  ) {
    const { page } = request.query

    const result = await this.fetchStudentsUseCase.execute({
      page,
    })

    if (result.isLeft()) {
      throw new InternalServerErrorException()
    }

    const { students } = result.value

    return reply.status(200).send({
      students: students.map(StudentPresenter.toHTTP),
    })
  }
}
