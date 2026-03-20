import Clock_Component from "./Clock_Component.jsx"
import Schedule from "./Schedule.jsx"
function Main_Panel() {
  return (
  <>
    <div className=" relative bg-gris1 w-10/12 ml-8 h-full flex flex-row border border-negro1u items-center rounded-lg p-3 justify-center">
      <Clock_Component />
        <Schedule titulo="Horarios" />
        <Schedule titulo="Retrasos esta semana"/>
    </div>

    </>
  )
}

export default Main_Panel
