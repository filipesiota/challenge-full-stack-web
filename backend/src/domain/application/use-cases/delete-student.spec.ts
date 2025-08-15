import { InMemoryStudentRepository } from '@/test/repositories/in-memory-student-repository'
import { makeStudent } from '@/test/factories/make-student'
import { DeleteStudentUseCase } from './delete-student'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryStudentRepository: InMemoryStudentRepository
let sut: DeleteStudentUseCase

describe('Delete Student', () => {
  beforeEach(() => {
    inMemoryStudentRepository = new InMemoryStudentRepository()
    sut = new DeleteStudentUseCase(inMemoryStudentRepository)
  })

  it('should be able to delete a student', async () => {
    const newStudent = makeStudent({}, new UniqueEntityId('student-1'))

    await inMemoryStudentRepository.create(newStudent)

    const result = await sut.execute({
      studentId: 'student-1',
    })

    expect(result.isRight()).toBe(true)
    if (!result.isRight()) return

    expect(result.value.student).toMatchObject({
      deletedAt: expect.any(Date),
    })

    expect(inMemoryStudentRepository.items).toHaveLength(1)
    expect(inMemoryStudentRepository.items[0]).toEqual(result.value.student)
  })
})
