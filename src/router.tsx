import { lazy } from 'react'

import { Navigate, createBrowserRouter } from 'react-router-dom'

import { NavigationLayout } from './layouts/navigation'
import ErrorNotFound from './pages/error/not-found'
import RegisterForm from './pages/register'
import LoginPage from './pages/login'

const EventTypesPage = lazy(() => import('@/pages/event-types'))
const EventsPage = lazy(() => import('@/pages/events'))
const EventPage = lazy(() => import('@/pages/event'))
const ManagersPage = lazy(() => import('@/pages/managers'))
const ParticipantsPage = lazy(() => import('@/pages/participants'))

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
						path: 'events',
						children: [
							{
								index: true,
								element: <EventsPage />,
							},
							{
								path: ':eventId',
								element: <EventPage />
							}
						],
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
						path: 'managers',
						children: [
							{
								index: true,
								element: <ManagersPage />,
							},
							
						],
					},
					{
						path: 'participants',
						children: [
							{
								index: true,
								element: <ParticipantsPage />,
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
				path: 'login',
				children: [
					{
						index: true,
						element: <LoginPage />,
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
