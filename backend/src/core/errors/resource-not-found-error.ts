import { Identifier } from '@/core/types/identifier'

export class ResourceNotFoundError extends Error {
  resource: string
  identifier: Identifier

  constructor(resource: string, identifier: Identifier) {
    super(
      `Resource '${resource}' not found with ${identifier.label} '${identifier.value}'`,
    )

    this.resource = resource
    this.identifier = identifier
  }
}
