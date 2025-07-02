import { type NextFunction, type Request, type Response } from 'express'
import { logger } from './logger'

const catchAsync =
	(func: any) => (request: Request, response: Response, next: NextFunction) => {
		Promise.resolve(func(request, response, next)).catch((error) => {
			logger.error(error)
			next(error)
		})
	}

export default catchAsync
