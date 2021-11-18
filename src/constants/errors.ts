export enum ApiErrorsName {
  DuplicateKey = 'DUPLICATE_KEY',
  GenericName = 'ERROR',
  MissingFields = 'MISSING_FIELDS',
  NoMatchedSchema = 'NO_MATCHED_SCHEMA',
  ResourceNotFound = 'RESOURCE_NOT_FOUND',
  FieldsUpdateNotAllowed = 'FIELDS_UPDATE_NOT_ALLOWED',
}

export enum ApiErrorsType {
  ValidationError = 'VALIDATION_ERROR',
  GenericType = 'ERROR',
  InternalError = 'INTERNAL_ERROR',
}

export enum ApiErrorsMessage {
  InternalError = 'An application error occurred, the server was unable to process your request',
  RouteNotFound = 'Route Not Found',
}

export type ApiErrorsStatusCode =
  | 100
  | 101
  | 102
  | 200
  | 201
  | 202
  | 203
  | 204
  | 205
  | 206
  | 207
  | 208
  | 226
  | 300
  | 301
  | 302
  | 303
  | 304
  | 305
  | 306
  | 307
  | 308
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 418
  | 420
  | 422
  | 423
  | 424
  | 425
  | 426
  | 428
  | 429
  | 431
  | 444
  | 449
  | 450
  | 451
  | 499
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505
  | 506
  | 507
  | 508
  | 509
  | 510
  | 511
  | 598
  | 599;
