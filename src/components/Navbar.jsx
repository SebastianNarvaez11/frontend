import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faGear } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {

    const { user } = useSelector(state => state.auth)

    return (
        <div className='d-flex flex-row-reverse' style={{ paddingTop: 15 }}>
            <p style={{ marginRight: 20 }}>{user.first_name} {user.last_name}</p>
            <FontAwesomeIcon icon={faGear} size="lg" color='#5460fe' style={{ marginRight: 30 }} />
            <FontAwesomeIcon icon={faBell} size="lg" color='#5460fe' style={{ marginRight: 30 }} />
        </div>
    )
}

export default Navbar