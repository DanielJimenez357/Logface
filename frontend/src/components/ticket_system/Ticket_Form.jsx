import {FiX} from "react-icons/fi"

function Ticket_Form({show, onClose}) {
  return (
    <div 
      className={`
        absolute top-0 right-0 h-full w-100 shadow-2xl flex flex-col
        transition-transform duration-500 ease-in-out bg-white z-20
        border-l-2 border-negro1
        ${show ? "translate-x-0" : "translate-x-full"} 
      `}
    > 
      <div className="flex justify-between items-center p-5 border-b bg-gris2 text-white">
        <h2 className="text-xl font-bold">Nueva Incidencia</h2>
        <button 
          onClick={onClose} 
          className="text-white cursor-pointer hover:text-gray-300 transition-colors"
        >
          <FiX className="text-2xl" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 text-gray-800">
        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Asunto</label>
          <input 
            placeholder="Ej: No funciona la impresora" 
            className="border border-negro1 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-rojo1 focus:border-transparent transition-all"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Descripción detallada</label>
          <textarea 
            rows="5" 
            placeholder="Describe el problema que estás experimentando..." 
            className="border border-negro1 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-rojo1 resize-none transition-all"
          ></textarea>
        </div>

      </div>

      <div className="p-5 border-t border-gray-300 bg-gray-50 flex justify-end gap-3">
        <button 
          onClick={onClose}
          className="px-4 py-2 border border-negro1 text-gray-700 hover:cursor-pointer font-medium rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancelar
        </button>
        <button 
          className="px-4 py-2 bg-rojo1 text-white font-medium rounded-lg hover:cursor-pointer hover:brightness-90 active:scale-95 transition-all shadow-md"
        >
          Crear Ticket
        </button>
      </div>

    </div>
  );
}
export default Ticket_Form
