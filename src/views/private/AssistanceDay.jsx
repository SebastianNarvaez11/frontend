import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Spinner, UncontrolledTooltip, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleQuestion, faPenClip } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../../components/Navbar'
import StudentAssistantTable from '../../components/assistance/StudentAssistantTable'
import ModalNote from '../../components/assistance/ModalNote'

import { getAssistancesToday, getAssistance, approveAssistance } from '../../redux/actions/assistanceActions'
import { dateToString, getHour } from '../../helpers/parseDate'

let fecha = new Date()

const AssistanceDay = () => {

    const dispatch = useDispatch()
    const { assistances, isFetchingAssistance, isUpdatingAssistance, assistanceSelected } = useSelector(state => state.assistance)


    const [schedule, setSchedule] = useState()

    const toogleSchedule = (s) => {
        setSchedule(s)
        dispatch(getAssistancesToday(s))
    }



    const [modalNote, setModalNote] = useState({ show: false, data: null })

    return (
        <Row className='animate__animated animate__fadeIn' style={{ height: '100%' }}>
            <div style={assistanceSelected !== null ? { width: '70%', paddingRight: 40 } : { width: '100%', paddingRight: 40 }}>
                <Navbar />
                <b className='d-flex justify-content-end mt-4' style={{ fontSize: 20 }}>{dateToString(fecha)}</b>
                <div className='d-flex justify-content-start mt-4'>

                    <div style={{ width: 90, textAlignLast: 'center', cursor: 'pointer' }} onClick={() => toogleSchedule(1)}>
                        {schedule === 1 ?
                            <>
                                <b style={{ color: '#23303B', fontSize: 15 }}>Mañana</b>
                                <div style={{ backgroundColor: '#5561FE', height: 5, borderRadius: 10 }}></div>
                            </>
                            :
                            <p className='scheduleActive'>Mañana</p>
                        }
                    </div>
                    <div style={{ width: 90, textAlignLast: 'center', cursor: 'pointer' }} onClick={() => toogleSchedule(2)}>
                        {schedule === 2 ?
                            <>
                                <b style={{ color: '#23303B', fontSize: 15 }}>Tarde</b>
                                <div style={{ backgroundColor: '#5561FE', height: 5, borderRadius: 10 }}></div>
                            </>
                            :
                            <p className='scheduleActive'>Tarde</p>
                        }
                    </div>
                    <div style={{ width: 90, textAlignLast: 'center', cursor: 'pointer' }} onClick={() => toogleSchedule(3)}>
                        {schedule === 3 ?
                            <>
                                <b style={{ color: '#23303B', fontSize: 15 }}>Unica</b>
                                <div style={{ backgroundColor: '#5561FE', height: 5, borderRadius: 10 }}></div>
                            </>
                            :
                            <p className='scheduleActive'>Unica</p>
                        }
                    </div>
                </div>
                <div className='d-flex justify-content-start' style={{ marginTop: 25 }}>
                    {assistanceSelected !== null ?

                        assistances.map(asis => (
                            <div className={asis.id === assistanceSelected.id ? 'card_grade_active animate__animated animate__fadeInDown' : 'card_grade animate__animated animate__fadeInDown'}
                                onClick={() => dispatch(getAssistance(asis.id))} key={asis.id}>
                                {asis.checked ?
                                    <FontAwesomeIcon icon={faCircleCheck} size="2x" style={{ color: '#1CCD9D', marginTop: -10 }} />
                                    :
                                    <FontAwesomeIcon icon={faCircleQuestion} size="2x" style={{ color: '#98A4AF', marginTop: -10 }} />
                                }
                                <br />
                                <b style={{ fontSize: 30 }}>{asis.grade.abreviation}</b><br />
                                <b style={{ fontSize: 12 }}>{asis.grade.name}</b>
                            </div>
                        ))
                        :
                        assistances.map(asis => (
                            <div className='card_grade animate__animated animate__fadeInDown' onClick={() => dispatch(getAssistance(asis.id))} key={asis.id}>
                                {asis.checked ?
                                    <FontAwesomeIcon icon={faCircleCheck} size="2x" style={{ color: '#1CCD9D', marginTop: -10 }} />
                                    :
                                    <FontAwesomeIcon icon={faCircleQuestion} size="2x" style={{ color: '#98A4AF', marginTop: -10 }} />
                                }
                                <br />
                                <b style={{ fontSize: 30 }}>{asis.grade.abreviation}</b><br />
                                <b style={{ fontSize: 12 }}>{asis.grade.name}</b>
                            </div>
                        ))
                    }
                </div>

                {assistanceSelected !== null &&
                    <div style={{height: 100}}>
                        <StudentAssistantTable />
                    </div>

                }

                {isFetchingAssistance && <Spinner />}
            </div>
            {assistanceSelected !== null &&
                <div className='animate__animated animate__slideInRight ' style={{ width: '30%', backgroundColor: '#FCFEFF', boxShadow: 'rgb(231 234 242) 4px 0px 9px 4px', paddingLeft: 0 }}>
                    <div className='d-flex justify-content-center'>
                        <div style={{ backgroundColor: '#5460fe', color: '#FFFFFF', padding: 10, textAlign: 'center', borderRadius: 20, width: 130, height: 130, marginTop: 30 }}>
                            <b style={{ fontSize: 50 }}>{assistanceSelected.grade.abreviation}</b>
                            <p>{assistanceSelected.grade.name}</p>
                        </div>
                    </div>

                    <div style={{ padding: 30, paddingBottom: 0 }}>
                        <b style={{ color: '#23303B', fontSize: 15 }}>Detalles de la asistencia:</b>
                        <div style={{ marginTop: 10 }}>
                            <b style={{ color: '#23303B', fontSize: 15 }}>Autor:</b>
                            <p style={{ color: '#98A4AF', fontSize: 15 }}>{assistanceSelected.user_created.first_name} {assistanceSelected.user_created.last_name}</p>
                        </div>
                        <div style={{ margin: 0 }}>
                            <b style={{ color: '#23303B', fontSize: 15 }}>Hora:</b>
                            <p style={{ color: '#98A4AF', fontSize: 15 }}>{getHour(assistanceSelected.created)}</p>
                        </div>
                    </div>

                    <div style={{ padding: 30 }}>
                        <b style={{ color: '#23303B', fontSize: 15, }}>Estudiantes Ausentes:</b>
                        <div className='style_scrooll' style={{ height: 250, overflowY: 'auto', paddingLeft: 5, paddingRight: 5 }}>
                            {assistanceSelected.details.filter(detail => detail.attended === false).map(detail => (
                                <div key={detail.id} className='d-flex justify-content-between align-items-center' style={{ padding: 15, borderRadius: 20, marginTop: 10, boxShadow: 'rgb(231 234 242) 0px 0px 4px 1px' }}>
                                    <p style={{ margin: 0, fontSize: 15 }}>{detail.student.last_name} {detail.student.first_name}</p>
                                    <div id="nota" style={{ cursor: 'pointer' }} onClick={() => setModalNote({ show: true, data: detail })}>
                                        <FontAwesomeIcon icon={faPenClip} size="xl" style={detail.note === '' ? { color: '#98A4AF' } : { color: '#5460fe' }} />
                                    </div>
                                    <UncontrolledTooltip placement="top" target="nota">Anotación</UncontrolledTooltip>
                                </div>
                            ))}
                        </div>


                        {modalNote.data && <ModalNote modal={modalNote} setShow={setModalNote} />}
                    </div>

                    <div className='d-flex justify-content-center' style={{ marginTop: 0 }}>
                        <Button size='lg' style={{ backgroundColor: '#1CCD9D', border: 0 }} onClick={() => dispatch(approveAssistance(assistanceSelected.id))}>
                            {isUpdatingAssistance && <Spinner />} Guardar Asistencia
                        </Button>
                    </div>

                </div>
            }
        </Row>
    )
}

export default AssistanceDay