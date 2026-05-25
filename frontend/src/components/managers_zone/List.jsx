import List_Component from './List_Component.jsx'

function List({title, content_list, loading}) {

  return (
  <>
    <div className="bg-white border border-negro1 overflow-y-scroll rounded-lg h-6/10 mb-10">
      <p className="bg-gris2 text-white text-center rounded-t-lg">{title}</p>
      <div className="">
          {!loading && (content_list.map((element, key)=>(
          <List_Component content={element.username ? element.username : element.nombre} />
        )))}

      </div>
    </div>
    </>
  )
}

export default List
