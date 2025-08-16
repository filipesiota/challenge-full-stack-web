import { InMemoryStudentRepository } from '@/test/repositories/in-memory-student-repository'
import { makeStudent } from '@/test/factories/make-student'
import { FetchStudentsUseCase } from './fetch-students'
import { PAGINATION_LIMIT } from '@/core/repositories/pagination-params'

let inMemoryStudentRepository: InMemoryStudentRepository
let sut: FetchStudentsUseCase

describe('Fetch Students', () => {
  beforeEach(() => {
    inMemoryStudentRepository = new InMemoryStudentRepository()
    sut = new FetchStudentsUseCase(inMemoryStudentRepository)
  })

  it('should be able to fetch only not deleted students', async () => {
    await inMemoryStudentRepository.create(makeStudent())
    await inMemoryStudentRepository.create(makeStudent())
    await inMemoryStudentRepository.create(
      makeStudent({
        deletedAt: new Date(),
      }),
    )

    const result = await sut.execute({ page: 1 })

    expect(result.isRight()).toBe(true)
    if (!result.isRight()) return

    expect(result.value.students).toHaveLength(2)
  })

  it('should be able to fetch paginated students', async () => {
    Array.from({ length: PAGINATION_LIMIT + 2 }).forEach(async () => {
      await inMemoryStudentRepository.create(makeStudent())
    })

    const result = await sut.execute({ page: 2 })

    expect(result.isRight()).toBe(true)
    if (!result.isRight()) return

    expect(result.value.students).toHaveLength(2)
  })
})
