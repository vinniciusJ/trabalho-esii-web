import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import App from './app'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const container = document.querySelector('#root')!
const root = createRoot(container)

const queryClient = new QueryClient()

root.render(
	<ThemeProvider theme={theme}>
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</StrictMode>
	</ThemeProvider>
)
