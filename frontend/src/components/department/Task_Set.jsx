import Task_Activity from './Task_Activity.jsx'

function Task_Set({title}) {
  
  return (
  <>
    <div className="w-full h-full content-center">
      <p className="absolute top-0 right-30 bg-white border border-negro1 rounded-b-lg p-2 pl-6 pr-6">Marketing</p>
        <div className="w-full h-17/20 flex flex-row justify-around">
          
        <Task_Activity title="Pendientes" />
        <Task_Activity title="Activos"/>
        <Task_Activity title="Completados"/>

        </div>
    </div>
    </>
  )
}

export default Task_Set
