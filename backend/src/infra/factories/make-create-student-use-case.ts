import { CreateStudentUseCase } from '@/domain/application/use-cases/create-student'
import { PrismaStudentRepository } from '../database/repositories/prisma-student-repository'

export function makeCreateStudentUseCase() {
  const prismaStudentRepository = new PrismaStudentRepository()
  const createStudentUseCase = new CreateStudentUseCase(prismaStudentRepository)

  return createStudentUseCase
}
