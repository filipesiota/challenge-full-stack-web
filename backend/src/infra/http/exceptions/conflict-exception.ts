import { ResourceAlreadyExistsError } from '@/core/errors/resource-already-exists-error'

export class ConflictException extends ResourceAlreadyExistsError {
  constructor({ resource, identifier }: ResourceAlreadyExistsError) {
    super(resource, identifier)
  }
}
