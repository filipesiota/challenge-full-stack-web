import { Either, left, right } from '@/core/either'
import { StudentRepository } from '../repositories/student-repository'
import { Student } from '@/domain/enterprise/entities/student'
import { ResourceNotFoundError } from '@/core/errors/generic/resource-not-found-error'

interface DeleteStudentUseCaseProps {
  studentId: string
  name: string
  email: string
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
    name,
    email,
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

    student.name = name
    student.email = email

    await this.studentRepository.update(student)

    return right({
      student,
    })
  }
}
