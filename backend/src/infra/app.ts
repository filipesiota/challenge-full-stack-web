import fastify, { FastifySchemaValidationError } from 'fastify'
import fastifyCors from '@fastify/cors'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { env } from '@/infra/env'
import { studentsRoutes } from './http/controllers/students/routes'
import { ConflictException } from './http/exceptions/conflict-exception'
import { NotFoundException } from './http/exceptions/not-found-exception'
import { InternalServerErrorException } from './http/exceptions/internal-server-error-exception'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, { origin: '*' })
app.register(studentsRoutes, { prefix: '/api' })

app.setErrorHandler((error, _, reply) => {
  if (error.code === 'FST_ERR_VALIDATION') {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error?.validation?.map((v: FastifySchemaValidationError) => ({
        path: v.instancePath,
        message: v.message,
      })),
    })
  }

  if (error instanceof ConflictException) {
    return reply.status(409).send({
      message: error.message,
      resource: error.resource,
      identifier: error.identifier,
    })
  }

  if (error instanceof NotFoundException) {
    return reply.status(404).send({
      message: error.message,
      resource: error.resource,
      identifier: error.identifier,
    })
  }

  if (error instanceof InternalServerErrorException) {
    return reply.status(500).send({
      message: 'Internal server error',
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: here we should log to an external tool for observability
  }

  return reply.status(500).send({
    message: 'Internal server error',
  })
})
