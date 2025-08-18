import { EditStudentUseCase } from '@/domain/application/use-cases/edit-student'
import { PrismaStudentRepository } from '../database/repositories/prisma-student-repository'

export function makeEditStudentUseCase() {
  const prismaStudentRepository = new PrismaStudentRepository()
  const editStudentUseCase = new EditStudentUseCase(prismaStudentRepository)

  return editStudentUseCase
}
