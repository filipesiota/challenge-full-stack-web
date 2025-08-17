import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Student } from '@/domain/enterprise/entities/student'
import { Prisma, Student as PrismaStudent } from '@prisma/client'

export class PrismaStudentMapper {
  static toDomain(raw: PrismaStudent): Student {
    return Student.create(
      {
        name: raw.name,
        email: raw.email,
        enrollmentNumber: raw.enrollmentNumber,
        cpf: raw.cpf,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(student: Student): Prisma.StudentCreateInput {
    return {
      id: student.id.toString(),
      name: student.name,
      email: student.email,
      enrollmentNumber: student.enrollmentNumber,
      cpf: student.cpf,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
      deletedAt: student.deletedAt,
    }
  }
}
