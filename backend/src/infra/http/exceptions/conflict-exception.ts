import { ResourceAlreadyExistsError } from '@/core/errors/resource-already-exists-error'
import { Identifier } from '@/core/types/identifier'

export class ConflictException extends ResourceAlreadyExistsError {
  constructor(resource: string, identifier: Identifier) {
    super(resource, identifier)
  }
}
