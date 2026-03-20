function Link_Header({Nombre_link}) {
  return (
  <>
    <div className=" hover:bg-gris2 hover:text-white hover:cursor-pointer transition-colors bg-white border border-negro1 rounded-r-xl w-full p-1.5">
      <p>{Nombre_link}</p>
    </div>

    </>
  )
}

export default Link_Header
