import Swal from 'sweetalert2'

export const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    iconColor: 'white',
    customClass: {
        popup: 'colored-toast'
    }
})

export const ToastDelete = (msg) => Swal.mixin({
    text: msg,
    icon: 'warning',
    title: '¿Esta seguro?',
    
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Sí, estoy seguro!'
})

export const ToastError = (msg) => Swal.mixin({
    text: msg,
    icon: 'error',
    title: 'Oops...',
})
