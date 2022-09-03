
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ValidatePermisions = ({ Component, role }) => {

    const { isAuthenticated, user } = useSelector(state => state.auth)

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }


    if (role && user.type !== role) {
        return <Navigate to="/403" />;
    }

    return (
        <Component />
    )
}

export default ValidatePermisions