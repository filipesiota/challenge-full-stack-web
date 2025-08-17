import { Either, left, right } from '@/core/either'
import { StudentRepository } from '../repositories/student-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Student } from '@/domain/enterprise/entities/student'

interface DeleteStudentUseCaseProps {
  studentId: string
}

type DeleteStudentUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    student: Student
  }
>

export class DeleteStudentUseCase {
  constructor(private readonly studentRepository: StudentRepository) {}

  async execute({
    studentId,
  }: DeleteStudentUseCaseProps): Promise<DeleteStudentUseCaseResponse> {
    const student = await this.studentRepository.findById(studentId)

    if (!student) {
      return left(
        new ResourceNotFoundError('student', {
          label: 'id',
          value: studentId,
        }),
      )
    }

    student.delete()

    await this.studentRepository.save(student)

    return right({
      student,
    })
  }
}
