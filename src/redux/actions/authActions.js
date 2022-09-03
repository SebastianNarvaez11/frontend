import axios from 'axios'
import { host } from '../../helpers/hosts'
import { startLoading, stopLoading } from '../slices/uiSlice'
import { login, restore, setChecking } from '../slices/authSlice'




export const loginUser = (credentials) => (dispatch) => {

    dispatch(startLoading())

    let url = `${host}api/v1/auth/login`

    axios.post(url, credentials)
        .then(response => {
            dispatch(login(response.data))
            dispatch(stopLoading())
        })
        .catch(error => {
            console.log(error.response);
            dispatch(stopLoading())
        })
}





export const existToken = () => (dispatch) => {

    try {
        const token = localStorage.getItem('TOKEN')

        if (token !== null) {

            let url = `${host}api/v1/auth/token`

            axios.post(url, { token })
                .then(response => {
                    dispatch(restore({
                        token,
                        user: response.data.user
                    }))
                })
                .catch(error => {
                    console.log(error.response)
                    localStorage.removeItem('TOKEN')
                    dispatch(setChecking())
                })

        } else {
            dispatch(setChecking())
        }

    } catch (error) {
        console.log('Error al validar token:', error);
    }
}