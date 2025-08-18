import { DeleteStudentUseCase } from '@/domain/application/use-cases/delete-student'
import { PrismaStudentRepository } from '../database/repositories/prisma-student-repository'

export function makeDeleteStudentUseCase() {
  const prismaStudentRepository = new PrismaStudentRepository()
  const deleteStudentUseCase = new DeleteStudentUseCase(prismaStudentRepository)

  return deleteStudentUseCase
}
