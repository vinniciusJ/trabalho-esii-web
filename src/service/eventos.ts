import axios from 'axios'

export const eventosAPI = axios.create({
	baseURL: import.meta.env.VITE_EVENTOS_API_URL,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
	},
})
