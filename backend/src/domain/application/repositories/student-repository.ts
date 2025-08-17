import { PaginationParams } from '@/core/repositories/pagination-params'
import { Student } from '@/domain/enterprise/entities/student'

export interface StudentRepository {
  create(student: Student): Promise<void>
  save(student: Student): Promise<void>
  findById(id: string): Promise<Student | null>
  findByEmail(email: string): Promise<Student | null>
  findByEnrollmentNumber(enrollmentNumber: string): Promise<Student | null>
  findByCpf(cpf: string): Promise<Student | null>
  findMany(params: PaginationParams): Promise<Student[]>
}
