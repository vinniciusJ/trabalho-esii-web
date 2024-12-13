import { lazy } from 'react'

import { Navigate, createBrowserRouter } from 'react-router-dom'

import { NavigationLayout } from './layouts/navigation'
import ErrorNotFound from './pages/error/not-found'

const EventTypes = lazy(() => import('@/pages/event-types'))

export const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				element: <NavigationLayout />,
				children: [
					{
						index: true,
						element: <Navigate to='event-types' />,
					},
					{
						path: 'event-types',
						children: [
							{
								index: true,
								element: <EventTypes />,
							},
							
						],
					},
					{
						path: 'events',
						children: [
							{
								index: true,
								//element: <EventTypes />,
							},
							
						],
					},
				]
			},
			{
				path: '*',
				element: <ErrorNotFound />,
			},
		],
	},
])
