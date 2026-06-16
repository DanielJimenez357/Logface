import List_Component from './List_Component.jsx'

function List({ title, content_list = [], loading }) {
  return (
    <>
      <div className="bg-white border border-negro1 rounded-lg h-6/10 mb-4 flex flex-col overflow-hidden shadow shadow-gris2">
        <p className="bg-gris2 text-white text-center font-bold p-1.5 border-b border-negro1">{title}</p>
        <div className="overflow-y-auto flex-1 p-2 bg-gray-50">
          {loading && (
            <p className="text-center text-xs text-gray-400 py-4 animate-pulse">Cargando...</p>
          )}
          {!loading && content_list.length === 0 && (
            <p className="text-center text-xs text-gray-400 py-4">No hay registros</p>
          )}
          {!loading && content_list.map((element) => (
            <List_Component 
              key={element.id} 
              content={element.username ? element.username : element.nombre} 
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default List
