import {
	type ErrorRequestHandler,
	type NextFunction,
	type Request,
	type Response,
} from 'express'
import { ERROR_CODE, type ApiResponse, type ErrorCode } from '../interface'
import { ValidationError } from 'joi'

export const errorHandler: ErrorRequestHandler = (
	err: AppError | ValidationError | Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (err instanceof AppError) {
		const response: ApiResponse<null> = {
			status: 'error',
			error: {
				code: err.code,
				message: err.message,
			},
		}
		return res.status(err.httpStatus).json(response)
	}

	if (err instanceof ValidationError) {
		const response: ApiResponse<null> = {
			status: 'error',
			error: {
				code: ERROR_CODE.BAD_REQUEST.code,
				message: err.message,
			},
		}
		return res.status(ERROR_CODE.BAD_REQUEST.httpStatus).json(response)
	}

	if (
		err instanceof SyntaxError &&
		'status' in err &&
		err.status === 400 &&
		'body' in err
	) {
		const response = {
			status: 'error',
			error: {
				code: ERROR_CODE.BAD_REQUEST.code,
				message: 'Invalid JSON payload passed.',
			},
		}
		return res.status(ERROR_CODE.BAD_REQUEST.httpStatus).json(response)
	}

	console.error('Error Validation => ', err)
	const response: ApiResponse<null> = {
		status: 'error',
		error: {
			code: ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			message: err.message || ERROR_CODE.INTERNAL_SERVER_ERROR.message,
		},
	}
	res.status(ERROR_CODE.INTERNAL_SERVER_ERROR.httpStatus).json(response)
}

export class AppError extends Error {
	public readonly code: ErrorCode
	public readonly httpStatus: number

	constructor(errorCode: ErrorCode, message?: string) {
		super(ERROR_CODE[errorCode].message)
		this.message = message ?? ERROR_CODE[errorCode].message
		this.code = ERROR_CODE[errorCode].code as ErrorCode
		this.httpStatus = ERROR_CODE[errorCode].httpStatus
	}
}
