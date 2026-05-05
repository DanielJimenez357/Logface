import axios from 'axios'
import {ENDPOINTS} from './endpoints.js'
//Instancia de axios "apiDjango" maneja las peticiones a django
const apiDjango = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/`, //url base
  headers: {
    'Content-Type': 'application/json'
  }
})

//Interceptor de apiDjango, asegura que todas las peticiones cuenten con el token de seguridad
apiDjango.interceptors.request.use(
  (config) => {
    // recoge el token de "localStorage"
      const token = localStorage.getItem('access_token');
      if (token) {
          //introduce el token en el encabezado de la peticion
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);



//Interceptor de apiDjango, refresca el token de seguridad en caso de que haya caducado
apiDjango.interceptors.response.use(
  //si esta todo bien, no hace nada (response 200)
  (response) => {
      return response;
  },
  async (error) => {
      //guardamos la peticion fallida para usarla mas adelante de nuevo
      const originalRequest = error.config;
      //comprobamos que el error sea por token caducado y evitamos un blucle infinito de peticiones
      if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
              //obtenemos el "refresh_token"
              const refreshToken = localStorage.getItem('refresh_token');
              const base_url = import.meta.env.VITE_API_URL;
              //hacemos una peticion a django con el "refresh_token" para que nos de un nuevo token de seguridad
              const response = await axios.post(`${base_url}+ ${ENDPOINTS.REFRESH}`, {
                  refresh: refreshToken
              });
              //actualizamos el token de seguridad
              localStorage.setItem('access_token', response.data.access);
              //repetimpos la peticion original con el nuevo token
              originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
              return apiDjango(originalRequest);

          //En caso de que el "refresh_token" este caducado, te manda a logearte
          } catch (refreshError) {
              console.error("Sesión caducada. Por favor, inicie sesion nuevamente.");
              localStorage.clear();
              window.location.href = '/login';
              return Promise.reject(refreshError);
          }
      }
      //En caso de error general
      return Promise.reject(error);
  }
);

export const obtenerUsuarios = async (id_usuario=null) => {
  const url = id_usuario ? `usuarios/${id_usuario}/` : 'usuarios/';
  const response = await apiDjango.get(url);
  return response.data
}

export const crearUsuario = async (datos) => {
  const response = await apiDjango.post('usuarios/', datos)
  return response.data
}
