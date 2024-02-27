import logger from "./logger"


/*declare class Error {
  public name: string
  public message: string
  public stack: string
  public type: string
  public status: Number
  captureStackTrace: any
  constructor(message?: string);
}*/

/*export class Exception extends Error {
  constructor(public message: string, status:Number) {
      super(message)
      this.name = 'Exception'
      this.message = message
      this.status = status
      this.stack = (<any>new Error()).stack;
  }
  toString() {
      return this.name + ': ' + this.message;
  }
}*/


/*export class AssertionError implements Error {
  public name: string;
  public message: string;

  constructor(public options: IAssertiorErrorOptions) {
    this.name = options.name = 'AssertionError';
    if (options.message) {
      options.message = options.message;
      options.generatedMessage = false;
    } else {
      options.message = getMessage(this);
      options.generatedMessage = true;
    }
    this.message = options.message;
    var stackStartFunction = options.stackStartFunction || fail;
    Error.captureStackTrace(this, stackStartFunction);
  }
}*/



export class AppError extends Error {
  public type: string
  public status: Number
  constructor(message:string, type:string, status:Number) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.type = type
    this.message = message
    this.status = status
    const stack = this.stack ? this.stack.split('\n') : this.stack
    logger.error({
      error: {
        status,
        name: this.name,
        message: this.message,
        type,
        stack: stack && stack.length > 2 ? `${stack[0]}  ${stack[1]}` : stack,
      },
    })
  }
}



export class UnauthorizedError extends AppError {
  constructor(message:string) {
    super(message || 'Site access denied.', 'UNAUTHORIZED', 401)
  }
}

export class Unauthorized extends Error {
  name = 'Unauthorized'
  type = 'UNAUTHORIZED'
  status = 401
  expose = false
}

export class BadRequest extends Error {
  status = 400
  name = 'BadRequest'
  expose = false
}

export class Forbidden extends Error {
  status = 403
  name = 'Forbidden'
  expose = false
}

export class NotFound extends Error {
  status = 404
  name = 'NotFound'
  expose = false
}

export class Conflict extends Error {
  status = 409
  name = 'Conflict'
  expose = false
}

export class InternalServerError extends Error {
  status = 500
  name = 'InternalServerError'
  expose = false
}

export class ResourceAlreadyExists extends Conflict {
  name = 'ResourceAlreadyExists'
  constructor() {
      super('Resource already exists')
  }
}

export class ResourceNotFound extends NotFound {
  name = 'ResourceNotFound'
  constructor() {
      super('Resource not found')
  }
}

export class RequestValidationErrors extends BadRequest {
  name = 'RequestValidationErrors'
  constructor(errorMessage: string) {
      super(`Request Validation Errors: ${errorMessage}`)
  }
}

export class InvalidRequestBodyFormat extends Forbidden {
  name = 'InvalidRequestBodyFormat'
  constructor() {
      super('Invalid format is detected in the request body')
  }
}


export class InvalidToken extends Forbidden {
  name = 'InvalidToken'
  constructor() {
      super('Invalid Token')
  }
}






/*class UnauthorizedError extends AppError {
  constructor(message:string) {
    super(message || 'Site access denied.', 'UNAUTHORIZED', 401)
  }
}*/

/*class UnauthorizedError extends AppError {
  constructor(message:string) {
    //super('sss', message || 'Site access denied.', 'UNAUTHORIZED', 401)
    super(message, 'UNAUTHORIZED', 401)
  }
}*/


/*class IdleTimeoutError extends AppError {
  constructor(message:string) {
    super(message || 'Site access denied.', 'IDLE_TIMEOUT', 401)
  }
}*/

/****class IdleTimeoutError extends AppError {
  constructor() {
    super('sss', 'Site access denied.', 'IDLE_TIMEOUT', 401)
  }
}*/


/*class NotFoundError extends AppError {
  constructor(message:string) {
    super(message || 'Resource not found.','NOT_FOUND', 404,)
  }
}*/

/******class NotFoundError extends AppError {
  constructor() {
    super('sss', 'Resource not found.','NOT_FOUND', 404,)
  }
}*/

/*
class BadRequest extends AppError {
  constructor(message:string, errors:any) {
    super(message || 'Invalid or missing request data.', 'BAD_REQUEST', 400)
    errors = errors
  }
}*/

/******class BadRequest extends AppError {
  constructor(errors:any) {
    super('sss', 'Invalid or missing request data.', 'BAD_REQUEST', 400)
    errors = errors
  }
}*/


/*class ConflictError extends AppError {
  constructor(message:string) {
    super(message || 'The request could not be completed due to a conflict with the current state of the resource.', 'CONFLICT', 409,)
  }
}*/

/******class ConflictError extends AppError {
  constructor() {
    super('sss', 'The request could not be completed due to a conflict with the current state of the resource.', 'CONFLICT', 409,)
  }
}*/



/*class InternalServerError extends AppError {
  constructor(message:string) {
    super(
      message || 'Something went wrong. Please try again later or contact support.', 'INTERNAL_SERVER', 500,)
  }
}*/

/******class InternalServerError extends AppError {
  constructor() {
    super('sss', 'Something went wrong. Please try again later or contact support.', 'INTERNAL_SERVER', 500,)
  }
}*/

/*class ResourceAlreadyExists extends AppError {
  constructor(message:string) {
    super(message || 'Resource already exists.', 'CONFLICT', 409,)
  }
}*/

/*******class ResourceAlreadyExists extends AppError {
  constructor() {
    super('sss', 'Resource already exists.', 'CONFLICT', 409,)
  }
}*/

/*class ResourceNotFound extends AppError {
  constructor(message:string) {
    super(message || 'Resource not found.', 'NOT_FOUND', 404)
  }
}*/

/*******class ResourceNotFound extends AppError {
  constructor() {
    super('sss', 'Resource not found.', 'NOT_FOUND', 404)
  }
}*/


/*class RequestValidationErrors extends AppError {
  name = 'RequestValidationErrors'
  constructor(errorMessage: string) {
      super(`Request Validation Errors: ${errorMessage}`, 'BAD_REQUEST', 400)
  }
}*/

/*class RequestValidationErrors extends AppError {
  name = 'RequestValidationErrors'
  constructor(errorMessage: string) {
      //super('sss', `Request Validation Errors: ${errorMessage}`, 'BAD_REQUEST', 400)
      super(errorMessage, 'BAD_REQUEST', 400)
  }
}*/

/********class InvalidRequestBodyFormat extends AppError {
  name = 'InvalidRequestBodyFormat'
  constructor() {
      super('sss', 'Invalid format is detected in the request body', 'BAD_REQUEST', 400)
  }
}*/


/*******class InvalidToken extends AppError {
  name = 'InvalidToken'
  constructor() {
      super('sss', 'Invalid Token', 'BAD_REQUEST', 400)
  }
}*/
