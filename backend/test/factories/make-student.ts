import { faker } from '../libs/faker'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Student, StudentProps } from '@/domain/enterprise/entities/student'

export function makeStudent(
  override: Partial<StudentProps> = {},
  id?: UniqueEntityId,
) {
  const answerAttachment = Student.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      enrollmentNumber: faker.number.int().toString(),
      cpf: faker.br.cpf(),
      ...override,
    },
    id,
  )

  return answerAttachment
}
