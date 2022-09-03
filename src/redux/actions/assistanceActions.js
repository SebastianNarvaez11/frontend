import axios from 'axios'
import Swal from 'sweetalert2'
import { host } from '../../helpers/hosts'
import { Toast } from '../../assets/js/alerts'

import { setFetchingAssistance, setAssitances, setAssitanceSelected, setLoadingDetail, setDetailAssistance, setUpdatingAssistance, updateAssistance } from '../slices/assistanceSlice'




export const approveAssistance = (id) => (dispatch) => {

    dispatch(setUpdatingAssistance())

    let url = `${host}api/v1/assistance/update/${id}`

    axios.put(url, { 'checked': true })
        .then(response => {
            dispatch(updateAssistance(response.data))
            dispatch(setUpdatingAssistance())
            Toast.fire({ icon: 'success', title: 'Asistencia Aprobada' })
        })
        .catch(error => {
            console.log(error);
            dispatch(setUpdatingAssistance())
        })
}



export const getAssistancesToday = (schedule) => (dispatch) => {

    dispatch(setAssitanceSelected(null))
    dispatch(setFetchingAssistance())

    let url = `${host}api/v1/assistance/list/${schedule}`

    axios.get(url)
        .then(response => {
            dispatch(setAssitances(response.data))
            dispatch(setFetchingAssistance())
        })
        .catch(error => {
            console.log(error);
            dispatch(setFetchingAssistance())
        })
}



export const getAssistance = (id) => (dispatch) => {

    dispatch(setFetchingAssistance())

    let url = `${host}api/v1/assistance/get/${id}`

    axios.get(url)
        .then(response => {
            dispatch(setAssitanceSelected(response.data))
            dispatch(setFetchingAssistance())
        })
        .catch(error => {
            console.log(error)
            dispatch(setFetchingAssistance())
        })
}


export const updateDetailAssistance = (detail, closeModal) => (dispatch) => {

    dispatch(setLoadingDetail())

    let url = `${host}api/v1/assistance/detail/${detail.id}`

    axios.put(url, detail)
        .then(response => {
            dispatch(setDetailAssistance(response.data))
            dispatch(setLoadingDetail())
            Toast.fire({ icon: 'success', title: 'Anotación Creada' })
            closeModal({ show: false, data: null })
        })
        .catch(error => {
            console.log(error);
            dispatch(setLoadingDetail())
            closeModal({ show: false, data: null })
        })
}