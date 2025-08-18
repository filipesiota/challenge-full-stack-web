import { Student } from '@/domain/enterprise/entities/student'

export class StudentPresenter {
  static toHTTP(student: Student) {
    return {
      id: student.id.toString(),
      name: student.name,
      email: student.email,
      enrollmentNumber: student.enrollmentNumber,
      cpf: student.cpf,
      isActive: student.deletedAt === null,
    }
  }
}
