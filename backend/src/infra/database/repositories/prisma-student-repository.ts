import {
  PAGINATION_LIMIT,
  PaginationParams,
} from '@/core/repositories/pagination-params'
import { StudentRepository } from '@/domain/application/repositories/student-repository'
import { Student } from '@/domain/enterprise/entities/student'
import { prisma } from '@/infra/lib/prisma'
import { PrismaStudentMapper } from '../mappers/prisma-student-mapper'

export class PrismaStudentRepository implements StudentRepository {
  async create(student: Student): Promise<void> {
    const data = PrismaStudentMapper.toPrisma(student)

    await prisma.student.create({
      data,
    })
  }

  async save(student: Student): Promise<void> {
    const data = PrismaStudentMapper.toPrisma(student)

    await prisma.student.update({
      where: {
        id: student.id.toString(),
      },
      data,
    })
  }

  async findById(id: string): Promise<Student | null> {
    const student = await prisma.student.findUnique({
      where: {
        id,
      },
    })

    if (!student) {
      return null
    }

    return PrismaStudentMapper.toDomain(student)
  }

  async findByEmail(email: string): Promise<Student | null> {
    const student = await prisma.student.findUnique({
      where: {
        email,
      },
    })

    if (!student) {
      return null
    }

    return PrismaStudentMapper.toDomain(student)
  }

  async findByEnrollmentNumber(
    enrollmentNumber: string,
  ): Promise<Student | null> {
    const student = await prisma.student.findUnique({
      where: {
        enrollmentNumber,
      },
    })

    if (!student) {
      return null
    }

    return PrismaStudentMapper.toDomain(student)
  }

  async findByCpf(cpf: string): Promise<Student | null> {
    const student = await prisma.student.findUnique({
      where: {
        cpf,
      },
    })

    if (!student) {
      return null
    }

    return PrismaStudentMapper.toDomain(student)
  }

  async findMany({ page }: PaginationParams): Promise<Student[]> {
    const students = await prisma.student.findMany({
      where: {
        deletedAt: null,
      },
      skip: (page - 1) * PAGINATION_LIMIT,
      take: PAGINATION_LIMIT,
    })

    return students.map(PrismaStudentMapper.toDomain)
  }
}
