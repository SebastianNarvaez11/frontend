import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from "react-router-dom";
import { UncontrolledTooltip } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faBell, faCalendar, faClipboardCheck, faBullhorn, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import '../assets/css/sidebar.css'
import logo from '../assets/img/colegio.png'

import { logout } from '../redux/slices/authSlice'
import { setShowSidebar } from '../redux/slices/uiSlice'




const Sidebar = () => {

    const { sidebarActive } = useSelector(state => state.ui)
    const location = useLocation()
    const dispatch = useDispatch()


    return (
        <div style={{
            width: 150, backgroundColor: '#FFFFFF', boxShadow: 'rgb(231 234 242) -2px 0px 9px 4px',
            borderTopRightRadius: 40, borderBottomRightRadius: 40, textAlign: 'center', zIndex: 1
        }}>
            <img src={logo} alt="logo colegio" style={{ objectFit: 'cover', width: '60%', paddingTop: '50%' }} />
            <ul className="list-group list-group-flush" style={{ paddingTop: '40%', listStyle: 'none' }}>
                <li style={{ marginBottom: 30 }}>
                    <Link to="/" id="home">
                        <FontAwesomeIcon className={location.pathname === '/' ? 'iconActive' : 'iconInactive'} icon={faHouse} size="lg" />
                    </Link>
                    <UncontrolledTooltip placement="bottom" target="home">Inicio</UncontrolledTooltip>
                </li>

                <li style={{ marginBottom: 30 }}>
                    <div id='usuarios' onClick={() => dispatch(setShowSidebar('usuarios'))} style={{ cursor: 'pointer' }}>
                        <FontAwesomeIcon className={sidebarActive === 'usuarios' ? 'iconActive' : 'iconInactive'} icon={faCalendar} size="lg" />
                    </div>
                    <UncontrolledTooltip placement="bottom" target="usuarios">Eventos</UncontrolledTooltip>
                </li>

                <li style={{ marginBottom: 30 }} >
                    <div id='assistance' onClick={() => dispatch(setShowSidebar('assistance'))} style={{ cursor: 'pointer' }}>
                        <FontAwesomeIcon className={sidebarActive === 'assistance' || location.pathname === '/asistencias/dia' ? 'iconActive' : 'iconInactive'} icon={faClipboardCheck} size="lg" />
                    </div>
                    <UncontrolledTooltip placement="bottom" target="assistance">Asistencias</UncontrolledTooltip>
                </li>

                <li style={{ marginBottom: 30 }}>
                    <Link to="/">
                        <FontAwesomeIcon className={location.pathname === '/zxc' ? 'iconActive' : 'iconInactive'} icon={faBell} size="lg" />
                    </Link>
                </li>

                <li style={{ marginBottom: 30 }}>
                    <Link to="/">
                        <FontAwesomeIcon className={location.pathname === '/zxczc' ? 'iconActive' : 'iconInactive'} icon={faBullhorn} size="lg" />
                    </Link>
                </li>

                <li style={{ marginBottom: 30 }}>
                    <FontAwesomeIcon id='logout' cursor='pointer' color='#5460fe' icon={faArrowRightFromBracket} size="lg" onClick={() => dispatch(logout())} />
                    <UncontrolledTooltip placement="bottom" target="logout">Salir</UncontrolledTooltip>
                </li>
            </ul>

        </div>
    )
}

export default Sidebar