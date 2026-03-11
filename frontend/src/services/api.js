import axios from 'axios'

const apiDjango = axios.create({
  baseURL: 'http://localhost:8000/home/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const obtenerUsuarios = async (id_usuario=null) => {
  const url = id_usuario ? `usuarios/${id_usuario}/` : 'usuarios/';
  const response = await apiDjango.get(url);
  await console.log(response.data)
  return response.data
}
