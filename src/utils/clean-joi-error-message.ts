export const cleanJoiErrorMessage = (error: any) => {
	if (error.isJoi) {
		const { details } = error
		const message = details
			.map((i: any) => i.message.replace(/"/g, ''))
			.join(', ')
		return message
	}
	return error.message
}
