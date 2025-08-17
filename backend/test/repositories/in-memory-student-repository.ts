import {
  PAGINATION_LIMIT,
  PaginationParams,
} from '@/core/repositories/pagination-params'
import { StudentRepository } from '@/domain/application/repositories/student-repository'
import { Student } from '@/domain/enterprise/entities/student'

export class InMemoryStudentRepository implements StudentRepository {
  items: Student[] = []

  async create(student: Student): Promise<void> {
    this.items.push(student)
  }

  async save(student: Student): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === student.id)

    this.items[itemIndex] = student
  }

  async findById(id: string): Promise<Student | null> {
    const student = this.items.find((item) => item.id.toString() === id)

    if (!student) {
      return null
    }

    return student
  }

  async findByEmail(email: string): Promise<Student | null> {
    const student = this.items.find((item) => item.email === email)

    if (!student) {
      return null
    }

    return student
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

  async findMany({ page }: PaginationParams): Promise<Student[]> {
    const students = this.items
      .filter((item) => !item.deletedAt)
      .slice((page - 1) * PAGINATION_LIMIT, page * PAGINATION_LIMIT)

    return students
  }
}
