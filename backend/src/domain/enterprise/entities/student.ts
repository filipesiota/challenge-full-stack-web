import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface StudentProps {
  name: string
  email: string
  enrollmentNumber: string
  cpf: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null
}

export class Student extends Entity<StudentProps> {
  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get name() {
    return this.props.name
  }

  set email(email: string) {
    this.props.email = email
    this.touch()
  }

  get email() {
    return this.props.email
  }

  get enrollmentNumber() {
    return this.props.enrollmentNumber
  }

  get cpf() {
    return this.props.cpf
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get deletedAt() {
    return this.props.deletedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  delete() {
    if (this.props.deletedAt) return
    this.props.deletedAt = new Date()
    this.touch()
  }

  static create(
    props: Optional<StudentProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityId,
  ) {
    const student = new Student(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )

    return student
  }
}
