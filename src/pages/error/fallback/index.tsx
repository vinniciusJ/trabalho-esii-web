import ErrorPage from '..'

const ErrorFallback = () => {
	return <ErrorPage code={500} title='Aconteceu um erro no Servidor' description='Tente mais tarde ou contate o suporte' />
}

export default ErrorFallback
