import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, Form, FormGroup, Input, Spinner } from 'reactstrap'

import { updateDetailAssistance } from '../../redux/actions/assistanceActions'

const ModalNote = ({ modal, setShow }) => {

    const { isLoadingDetail } = useSelector(state => state.assistance)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            note: modal.data.note,
        },

        onSubmit: (values) => {
            const detail = {
                ...modal.data,
                note: values.note
            }

            dispatch(updateDetailAssistance(detail, setShow))
        },
    });

    return (
        <Modal isOpen={modal.show}>
            <Form onSubmit={formik.handleSubmit}>
                <ModalHeader>
                    Agregar Anotación
                </ModalHeader>
                <ModalBody>
                    <b>Estudiante: </b>
                    <p>{modal.data.student.last_name} {modal.data.student.first_name}</p>

                    <b>Anotacion: </b>
                    <FormGroup>
                        <Input
                            style={{ height: 200 }}
                            id="note"
                            name="note"
                            type="textarea"
                            onChange={formik.handleChange}
                            value={formik.values.note}
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    {isLoadingDetail && <Spinner color="primary" />}
                    {' '}
                    <Button style={{ backgroundColor: '#5460fe', border: 0 }} type='submit'>Guardar</Button>
                    {' '}
                    <Button onClick={() => { setShow({ show: false, data: null }) }}>Cancelar</Button>
                </ModalFooter>
            </Form>
        </Modal>
    )
}

export default ModalNote