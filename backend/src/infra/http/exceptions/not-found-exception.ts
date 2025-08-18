import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

export class NotFoundException extends ResourceNotFoundError {
  constructor({ resource, identifier }: ResourceNotFoundError) {
    super(resource, identifier)
  }
}
