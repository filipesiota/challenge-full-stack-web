import { Identifier } from '@/core/types/identifier'
import { UseCaseError } from '../use-case-error'

export class ResourceNotFoundError extends Error implements UseCaseError {
  resource: string
  identifier: Identifier

  constructor(resource: string, identifier: Identifier) {
    super(
      `Resource '${resource}' not found with ${identifier.label} '${identifier.value}'.`,
    )

    this.resource = resource
    this.identifier = identifier
  }
}
