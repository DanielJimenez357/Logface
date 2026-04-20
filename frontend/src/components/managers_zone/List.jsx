import List_Component from './List_Component.jsx'

function List({title, content_list=[]}) {

  return (
  <>
    <div className="bg-white border border-negro1 rounded-lg h-6/10 mb-10">
      <p className="bg-gris2 text-white text-center rounded-t-lg">{title}</p>
      <div className="overflow-scroll">
      {content_list.map((element, key)=>(
          <List_Component content={element.content} />
        ))}

      </div>
    </div>
    </>
  )
}

export default List
