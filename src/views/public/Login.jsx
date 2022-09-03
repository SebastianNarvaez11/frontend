import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik';
import { Form, FormGroup, Label, Input, Button, Spinner } from 'reactstrap'

import { loginUser } from '../../redux/actions/authActions'


const Login = () => {

    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector(state => state.auth)
    const { isLoading } = useSelector(state => state.ui)


    const formik = useFormik({
        initialValues: {
            username: 'sebastian',
            password: 'tatannvrz'
        },

        onSubmit: (values) => {
            dispatch(loginUser(values))
        }
    })



    if (isAuthenticated) {
        return <Navigate to='/' />
    }

    return (
        <div style={{ height: '100%' }}>
            <Form onSubmit={formik.handleSubmit}>
                <FormGroup>
                    <Label>Usuario</Label>
                    <Input className="form-control-alternative"
                        placeholder="Usuario"
                        type="text"
                        name='username'
                        id="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                    />
                </FormGroup>
                <FormGroup>
                    <Label >Contraseña</Label>
                    <Input className="form-control-alternative" placeholder="Contraseña"
                        type="password"
                        name='password'
                        id="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                </FormGroup>
                <Button block id='btn' className='mb-3' color="primary" size="lg" type="submit">
                    Ingresar {isLoading && <Spinner/> }
                </Button>
            </Form>
        </div>
    )
}

export default Login