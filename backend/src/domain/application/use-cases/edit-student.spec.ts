import { InMemoryStudentRepository } from '@/test/repositories/in-memory-student-repository'
import { makeStudent } from '@/test/factories/make-student'
import { EditStudentUseCase } from './edit-student'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryStudentRepository: InMemoryStudentRepository
let sut: EditStudentUseCase

describe('Edit Student', () => {
  beforeEach(() => {
    inMemoryStudentRepository = new InMemoryStudentRepository()
    sut = new EditStudentUseCase(inMemoryStudentRepository)
  })

  it('should be able to edit a student', async () => {
    const newStudent = makeStudent({}, new UniqueEntityId('student-1'))

    await inMemoryStudentRepository.create(newStudent)

    const result = await sut.execute({
      studentId: 'student-1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    })

    expect(result.isRight()).toBe(true)
    if (!result.isRight()) return

    expect(result.value.student).toMatchObject({
      name: 'John Doe',
      email: 'john.doe@example.com',
    })

    expect(inMemoryStudentRepository.items).toHaveLength(1)
    expect(inMemoryStudentRepository.items[0]).toEqual(result.value.student)
  })
})
