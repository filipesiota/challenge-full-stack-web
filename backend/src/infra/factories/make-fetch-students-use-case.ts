import { FetchStudentsUseCase } from '@/domain/application/use-cases/fetch-students'
import { PrismaStudentRepository } from '../database/repositories/prisma-student-repository'

export function makeFetchStudentsUseCase() {
  const prismaStudentRepository = new PrismaStudentRepository()
  const fetchStudentsUseCase = new FetchStudentsUseCase(prismaStudentRepository)

  return fetchStudentsUseCase
}
