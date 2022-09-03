import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Layout from '../views/private/Layout'
import Waiting from '../views/public/Waiting'
import Home from '../views/private/Home'
import AssistanceDay from '../views/private/AssistanceDay'
import Users from '../views/private/Users'
import Error403 from '../views/public/403'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Error404 from '../views/public/404'
import Login from '../views/public/Login'
import ValidatePermisions from './ValidatePermisions'
import Teacher from '../views/private/Teacher'

import { existToken } from '../redux/actions/authActions'



const Router = () => {

    const dispatch = useDispatch()
    const { isChecking } = useSelector(state => state.auth)



    // se ejecuta solo un vez, cada vez que se carga la app 
    useEffect(() => {
        dispatch(existToken())
    }, [dispatch]);




    if (isChecking) {
        return <Waiting />
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<ValidatePermisions Component={Layout} />}>
                    <Route index element={<ValidatePermisions Component={Home} />} />
                    <Route path='usuarios' element={<ValidatePermisions Component={Users} role={1} />} />

                    <Route path='asistencias/dia' element={<ValidatePermisions Component={AssistanceDay} role={1} />} />

                    <Route path='docentes' element={<ValidatePermisions Component={Teacher} role={2} />} />
                </Route>


                <Route path='login' element={<Login />} />
                <Route path='403' element={<Error403 />} />
                <Route path='*' element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router