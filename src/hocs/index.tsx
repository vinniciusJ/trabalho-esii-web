import { FC, FunctionComponent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import ErrorPage from '@/pages/error'
import { Role } from '@/schemas/user'

export const withAuthentication = <P extends object>(
    Component: FunctionComponent<P>,
    roles: Role[]
): FC<P> => {
    const WrappedComponent: FC<P> = (props) => {
        const { hasSomeRole, isAuthenticated } = useAuth()
        const navigate = useNavigate()

        useEffect(() => {
            if (!isAuthenticated()) {
                navigate('/login')
            }
        }, [isAuthenticated, navigate])

        const hasRequiredRoles = hasSomeRole(roles)

        if (!hasRequiredRoles) {
            return (
                <ErrorPage
                    code={401}
                    title="Ops! Você não possui autorização para acessar esta página."
                />
            )
        }

        return <Component {...props} />
    }

    WrappedComponent.displayName = `WithAuthentication(${Component.displayName || Component.name})`

    return WrappedComponent
}
