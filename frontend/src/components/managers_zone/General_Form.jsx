function General_Form({fields, url, visible}) {
  return(
    <>
      { visible &&
        <div className="flex flex-col items-center">
        <p>"pegatina"</p>  
      <form className={'bg-white flex flex-col p-5 rounded-lg '}>
    {Object.entries(fields).map(([key, field])=> (
        <input className="bg-gris1 rounded-xs m-2 p-2 focus-visible:outline-0" type={field[1]} placeholder={field[0]}/>
      ))}
        <button type="submit">Crear</button>
            </form>

        </div>
      }
    </>

  )
}

export default General_Form
