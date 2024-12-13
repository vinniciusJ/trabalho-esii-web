import { format, parse } from 'date-fns'

export const formatStringToDate = (date: string | null) => {
	return date ? parse(date, 'dd/MM/yyyy HH:mm:ss', new Date()) : null
}
export const formatDateToString = (date: Date | null) => {
	return date ? format(date, 'dd/MM/yyyy HH:mm:ss') : ''
}