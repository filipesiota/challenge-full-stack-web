import { Identifier } from '@/core/types/identifier'
import { UseCaseError } from '../use-case-error'

export class ResourceAlreadyExistsError extends Error implements UseCaseError {
  resource: string
  identifier: Identifier

  constructor(resource: string, identifier: Identifier) {
    super(
      `Resource '${resource}' already exists with ${identifier.label} '${identifier.value}'.`,
    )

    this.resource = resource
    this.identifier = identifier
  }
}
