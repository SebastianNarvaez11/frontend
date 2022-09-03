import axios from "axios";

export function getToken() {
    return localStorage.getItem('TOKEN');
}

export function deleteToken() {
    localStorage.removeItem('TOKEN');
}

//Funcion que pasa el token en todas las solicitudes a la API
//Se tiene que llamar la funcionen Componente mas superior (APP en este caso)
export function initAxiosInterceptors() {
    axios.interceptors.request.use(config => {
        const token = getToken();

        if (token) {
            config.headers.Authorization = token;
        }

        return config;
    });

    axios.interceptors.response.use(
        response => response,
        error => {
            if (error.response.status === 401) {
                deleteToken();
                console.log(error.response);
                alert('Ocurrio un Error: ' + error.response.data.msg)
                window.location.reload()
            } else {
                return Promise.reject(error);
            }
        }
    );
}