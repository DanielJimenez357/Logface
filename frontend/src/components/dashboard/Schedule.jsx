import Time_Slot from "./Time_Slot.jsx"

function Schedule({titulo}, hora1, hora2) {

  const datos_prueba = []

  for (let i = 0; i < 10; i++) {
    datos_prueba.push(i)
  }

  return (
  <>
  <div className="border border-negro1 rounded-lg bg-white w-8/10 h-10/12 shadow shadow-gris2">
    <p className="mb-2 border-b border-gris2 flex justify-center">{titulo}</p>
        <div className="h-9/10 flex-col content-evenly">
          {
            datos_prueba.map((elemento, index) => (
              <Time_Slot hora1={index} hora2={index} />
            ))
          }
        </div>
  </div>
    </>
  )
}

export default Schedule
