/* eslint-disable max-classes-per-file */

export class PublicError extends Error {}

export class HttpPublicError extends PublicError {
  statusCode: number = 200
}
