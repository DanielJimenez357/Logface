import { useContext } from 'react';
import { useForm } from '../../hooks/useForm.js';
import { AuthContext } from '../../context/Auth_Context.jsx';
import apiDjango from '../../services/api';

function Ticket_Response({ incidenciaId, onResponseCreated }) {
  const { user } = useContext(AuthContext);

  const { formData, handleChange, handleSubmit, loading } = useForm(
    '/api/respuesta/', 
    async () => {
      try {
        await apiDjango.patch(`/api/ticket/${incidenciaId}/`, { resuelto: true });
        
        if (onResponseCreated) onResponseCreated(); 
      } catch (err) {
        console.error("Error al cerrar el ticket", err);
      }
    }
  );

  const enviarRespuesta = (e) => {
    formData.incidencia = incidenciaId;
    formData.usuario = user.id;
    handleSubmit(e);
  };

  return (
    <form onSubmit={enviarRespuesta} className="mt-4 flex flex-col gap-2 bg-gray-50 p-4 rounded-xl border border-gray-200">
      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
        Responder y Cerrar Caso:
      </label>
      
      <textarea
        name="contenido"
        value={formData.contenido || ''}
        onChange={handleChange}
        placeholder="Escribe la solución para este ticket..."
        rows="3"
        required
        className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-green-500 resize-none text-sm bg-white"
      />

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white text-xs font-bold p-2 px-4 rounded-lg hover:brightness-110 active:scale-95 transition-all shadow cursor-pointer"
        >
          {loading ? 'Enviando...' : 'Resolver e Inutilizar'}
        </button>
      </div>
    </form>
  );
}

export default Ticket_Response;
