import { Either, right } from '@/core/either'
import { StudentRepository } from '../repositories/student-repository'
import { Student } from '@/domain/enterprise/entities/student'
import { PaginationParams } from '@/core/repositories/pagination-params'

type FetchStudentsUseCaseResponse = Either<
  null,
  {
    students: Student[]
  }
>

export class FetchStudentsUseCase {
  constructor(private readonly studentRepository: StudentRepository) {}

  async execute({
    page,
  }: PaginationParams): Promise<FetchStudentsUseCaseResponse> {
    const students = await this.studentRepository.findMany({
      page,
    })

    return right({
      students,
    })
  }
}
