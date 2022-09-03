import { Link } from 'react-router-dom'

const Error404 = () => {
    return (
        <>
            <h1>Error 404</h1>
            <h2>Lo sentimos, no encontramos la pagina</h2>
            <Link to="/">Volver a Home </Link>
        </>

    )
}

export default Error404