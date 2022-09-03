import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck, faClockRotateLeft, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import '../assets/css/sidebar.css'

import { setShowSidebar } from '../redux/slices/uiSlice'


const SubSidebar = () => {

    const { sidebarActive } = useSelector(state => state.ui)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const openScreen = (rute) => {
        dispatch(setShowSidebar(''))
        navigate(rute)
    }

    switch (sidebarActive) {

        case 'assistance':
            return (
                <div className='animate__animated animate__slideInLeft' style={{ width: 300, backgroundColor: '#FCFEFF', boxShadow: 'rgb(231 234 242) 9px 0px 12px -10px', marginLeft: 10 }}>

                    <ul className="list-group list-group-flush d-flex justify-content-center" style={{ paddingTop: '20%', listStyle: 'none', textAlign: 'center', alignItems: 'center' }}>
                        <p style={{ fontSize: 20 }}>Asistencias</p>
                        <li style={{ marginBottom: 30, marginTop: 15 }}>
                            <div className='card-button d-flex flex-row' style={{ backgroundColor: '#FCAF2A', cursor: 'pointer' }} onClick={() => openScreen('asistencias/dia')}>
                                <div style={{ width: '100%' }}>
                                    <FontAwesomeIcon icon={faCalendarCheck} size='3x' color='#FFFFFF' />

                                    <div style={{ marginTop: '10%' }}>
                                        <p style={{ color: '#FFFFFF', fontSize: 12 }}>Asistencias <br /> del día</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li style={{ marginBottom: '100%' }}>
                            <div className='card-button d-flex flex-row' style={{ backgroundColor: '#1CCD9D', cursor: 'pointer'  }}>
                                <div style={{ width: '100%' }}>
                                    <FontAwesomeIcon icon={faClockRotateLeft} size='3x' color='#FFFFFF' />
                                    <div style={{ marginTop: '10%' }}>
                                        <p style={{ color: '#FFFFFF', fontSize: 12 }}>Historial de<br />asistencias</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <FontAwesomeIcon className='iconInactive' cursor='pointer' icon={faArrowLeft} size='xl' color='#5460fe' style={{ padding: 10 }} onClick={() => dispatch(setShowSidebar(''))} />
                        </li>
                    </ul>
                </div>
            )




        case 'usuarios':
            return (
                <div className='animate__animated animate__slideInLeft' style={{ width: 300, backgroundColor: '#FCFEFF', boxShadow: 'rgb(231 234 242) 9px 0px 12px -10px', marginLeft: 10 }}>
                    <ul className="list-group list-group-flush d-flex justify-content-center" style={{ paddingTop: '20%', listStyle: 'none', textAlign: 'center', alignItems: 'center' }}>
                        <p style={{ fontSize: 20 }}>Usuarios</p>
                        <li>
                            <FontAwesomeIcon className='iconInactive' cursor='pointer' icon={faArrowLeft} size='xl' color='#5460fe' style={{ padding: 10 }} onClick={() => dispatch(setShowSidebar(''))} />
                        </li>
                    </ul>
                </div>
            )

        default:
            <>
            </>;
    }
}

export default SubSidebar