import ErrorPage from '..'

const ErrorNotFound = () => {
	return <ErrorPage code={404} title='Página não encontrada' description='Você está tentando acessar uma página que não existe' />
}

export default ErrorNotFound
