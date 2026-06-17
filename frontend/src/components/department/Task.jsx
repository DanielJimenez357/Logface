import { useDraggable } from '@dnd-kit/react'
import { CSS } from '@dnd-kit/utilities'

function Task({ id, content, description, onClick, setDetailsDescription, setDetailsImplicated, implicated }) {

  const { ref, transform, listeners, attributes } = useDraggable({
    id,
  })

  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
  }

  return (
    <div 
      ref={ref} 
      style={style}              
      {...listeners}            
      {...attributes}            
      className="p-3 m-2 bg-white rounded-lg border border-negro1 hover:border-rojo1 flex justify-between items-center cursor-grab active:cursor-grabbing shadow-sm"
    >
      <p className="font-semibold text-gray-800">{content}</p>
      
      <button 
        type="button"
        onClick={(e) => {
          e.stopPropagation() 
          onClick()           
          setDetailsDescription(description)
          setDetailsImplicated(implicated)
        }}
        className="text-xs font-bold text-rojo1 hover:underline cursor-pointer ml-2"
      >
        Detalles
      </button>
    </div>
  )
}

export default Task
