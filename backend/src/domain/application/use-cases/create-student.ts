import { Either, left, right } from '@/core/either'
import { StudentRepository } from '../repositories/student-repository'
import { Student } from '@/domain/enterprise/entities/student'
import { ResourceAlreadyExistsError } from '@/core/errors/generic/resource-already-exists-error'

interface CreateStudentUseCaseProps {
  name: string
  email: string
  enrollmentNumber: string
  cpf: string
}

type CreateStudentUseCaseResponse = Either<
  ResourceAlreadyExistsError,
  {
    student: Student
  }
>

export class CreateStudentUseCase {
  constructor(private readonly studentRepository: StudentRepository) {}

  async execute({
    name,
    email,
    enrollmentNumber,
    cpf,
  }: CreateStudentUseCaseProps): Promise<CreateStudentUseCaseResponse> {
    const studentWithSameEnrollmentNumber =
      await this.studentRepository.findByEnrollmentNumber(enrollmentNumber)

    if (studentWithSameEnrollmentNumber) {
      return left(
        new ResourceAlreadyExistsError('student', {
          label: 'enrollmentNumber',
          value: enrollmentNumber,
        }),
      )
    }

    const studentWithSameCpf = await this.studentRepository.findByCpf(cpf)

    if (studentWithSameCpf) {
      return left(
        new ResourceAlreadyExistsError('student', {
          label: 'cpf',
          value: cpf,
        }),
      )
    }

    const student = Student.create({
      name,
      email,
      enrollmentNumber,
      cpf,
    })

    await this.studentRepository.create(student)

    return right({
      student,
    })
  }
}
