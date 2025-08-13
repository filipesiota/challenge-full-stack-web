import { StudentRepository } from '@/domain/application/repositories/student-repository'
import { Student } from '@/domain/enterprise/entities/student'

export class InMemoryStudentRepository implements StudentRepository {
  items: Student[] = []

  async create(student: Student): Promise<void> {
    this.items.push(student)
  }

  async findByEnrollmentNumber(
    enrollmentNumber: string,
  ): Promise<Student | null> {
    const student = this.items.find(
      (item) => item.enrollmentNumber === enrollmentNumber,
    )

    if (!student) {
      return null
    }

    return student
  }

  async findByCpf(cpf: string): Promise<Student | null> {
    const student = this.items.find((item) => item.cpf === cpf)

    if (!student) {
      return null
    }

    return student
  }
}
