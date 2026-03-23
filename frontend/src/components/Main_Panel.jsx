import Clock_Component from "./Clock_Component.jsx"
import Schedule from "./Schedule.jsx"
import Week_Resume from "./Week_Resume.jsx"
function Main_Panel() {
  return (
  <>
    <div className=" relative bg-gris1 w-10/12 ml-8 h-full flex flex-row border border-negro1u items-center rounded-lg p-3 justify-center">
      <Clock_Component />
        <div className="grid grid-cols-3 w-8/10 h-8/10 justify-items-center ">
        <Schedule className="col-span-1" titulo="Horarios" />
        <Week_Resume className="col-span-1" />
        </div>
      </div>

    </>
  )
}

export default Main_Panel
