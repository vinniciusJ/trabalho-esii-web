import { lazy } from 'react'

import { Navigate, createBrowserRouter } from 'react-router-dom'

import { NavigationLayout } from './layouts/navigation'
import ErrorNotFound from './pages/error/not-found'
import RegisterForm from './pages/register'

const EventTypesPage = lazy(() => import('@/pages/event-type'))
const EventsPage = lazy(() => import('@/pages/event'))

export const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				element: <NavigationLayout />,
				children: [
					{
						index: true,
						element: <Navigate to='events' />,
					},
					{
						path: 'event-types',
						children: [
							{
								index: true,
								element: <EventTypesPage />,
							},
							
						],
					},
					{
						path: 'events',
						children: [
							{
								index: true,
								element: <EventsPage />,
							},
							
						],
					},
					
				]
			},
			{
				path: 'register',
				children: [
					{
						index: true,
						element: <RegisterForm />,
					},
					
				],
			},
			{
				path: '*',
				element: <ErrorNotFound />,
			},
		],
	},
])
