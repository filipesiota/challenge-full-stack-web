import { InMemoryStudentRepository } from '@/test/repositories/in-memory-student-repository'
import { makeStudent } from '@/test/factories/make-student'
import { CreateStudentUseCase } from './create-student'

let inMemoryStudentRepository: InMemoryStudentRepository
let sut: CreateStudentUseCase

describe('Create Student', () => {
  beforeEach(() => {
    inMemoryStudentRepository = new InMemoryStudentRepository()
    sut = new CreateStudentUseCase(inMemoryStudentRepository)
  })

  it('should be able to create a student', async () => {
    const { name, email, enrollmentNumber, cpf } = makeStudent()

    const result = await sut.execute({
      name,
      email,
      enrollmentNumber,
      cpf,
    })

    expect(result.isRight()).toBe(true)
    if (!result.isRight()) return

    expect(inMemoryStudentRepository.items).toHaveLength(1)
    expect(inMemoryStudentRepository.items[0]).toEqual(result.value.student)
  })
})
