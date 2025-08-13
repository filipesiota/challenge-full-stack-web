import { Student } from '@/domain/enterprise/entities/student'

export interface StudentRepository {
  create(student: Student): Promise<void>
  findByEnrollmentNumber(enrollmentNumber: string): Promise<Student | null>
  findByCpf(cpf: string): Promise<Student | null>
}
