function List_Component({content, profile, id, setDepartment}) {
  return (
    <>
    <p onClick={()=>{setDepartment(id)}} className="border border-negro1 hover:brightness-75 bg-white hover:cursor-default rounded-lg">{content}</p>
    </> 
  )
}

export default List_Component
