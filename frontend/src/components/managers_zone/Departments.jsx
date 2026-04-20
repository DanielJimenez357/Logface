import List_Component from './List_Component.jsx'


function Departments() {

  let departamentos = [
    "Marketing",
    "Finanzas",
    "Desarrollo",
    "Investigacion"
  ]


  return (
  <>
    <div className="bg-white rounded-lg border border-negro1 text-center w-7/10 mb-20">
      <p className="bg-gris2 text-white rounded-t-lg ">Departamentos</p>
      <div>
        {
            departamentos.map((element, key) =>(
            <List_Component content={element} />
            ))
          }
      </div>
    </div>
    </>
  )
}

export default Departments
