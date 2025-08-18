import type { FastifyRequest, FastifyReply } from 'fastify'

import { CreateStudentUseCase } from '@/domain/application/use-cases/create-student'
import { CreateStudentBody } from '../../schemas/create-student'
import { StudentPresenter } from '../../presenters/student-presenter'
import { ConflictException } from '../../exceptions/conflict-exception'

export class CreateStudentController {
  constructor(private readonly createStudentUseCase: CreateStudentUseCase) {}

  async handle(
    request: FastifyRequest<{ Body: CreateStudentBody }>,
    reply: FastifyReply,
  ) {
    const { name, email, enrollmentNumber, cpf } = request.body

    const result = await this.createStudentUseCase.execute({
      name,
      email,
      enrollmentNumber,
      cpf,
    })

    if (result.isLeft()) {
      const error = result.value

      throw new ConflictException(error)
    }

    const { student } = result.value

    return reply.status(201).send({
      student: StudentPresenter.toHTTP(student),
    })
  }
}
