import { Identifier } from '@/core/types/identifier'

export class ResourceAlreadyExistsError extends Error {
  resource: string
  identifier: Identifier

  constructor(resource: string, identifier: Identifier) {
    super(
      `Resource '${resource}' already exists with ${identifier.label} '${identifier.value}'`,
    )

    this.resource = resource
    this.identifier = identifier
  }
}
