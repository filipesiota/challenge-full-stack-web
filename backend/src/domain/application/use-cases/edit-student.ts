import { Either, left, right } from '@/core/either'
import { StudentRepository } from '../repositories/student-repository'
import { Student } from '@/domain/enterprise/entities/student'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { ResourceAlreadyExistsError } from '@/core/errors/resource-already-exists-error'

interface EditStudentUseCaseProps {
  studentId: string
  name: string
  email: string
}

type EditStudentUseCaseResponse = Either<
  ResourceNotFoundError | ResourceAlreadyExistsError,
  {
    student: Student
  }
>

export class EditStudentUseCase {
  constructor(private readonly studentRepository: StudentRepository) {}

  async execute({
    studentId,
    name,
    email,
  }: EditStudentUseCaseProps): Promise<EditStudentUseCaseResponse> {
    const student = await this.studentRepository.findById(studentId)

    if (!student) {
      return left(
        new ResourceNotFoundError('student', {
          label: 'id',
          value: studentId,
        }),
      )
    }

    if (student.email !== email) {
      const studentWithSameEmail =
        await this.studentRepository.findByEmail(email)

      if (studentWithSameEmail) {
        return left(
          new ResourceAlreadyExistsError('student', {
            label: 'email',
            value: email,
          }),
        )
      }
    }

    student.name = name
    student.email = email

    await this.studentRepository.save(student)

    return right({
      student,
    })
  }
}
