import Clock from 'react-clock'
import 'react-clock/dist/Clock.css'
import {useEffect, useState} from 'react'

function Clock_Component() {

  const [value, setValue] = useState( new Date())

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
  <>
      <div className=" flex absolute w-full right-5 top-5 justify-end ">
        <Clock value={value} className="absolute" />
      </div>
    </>
  )
}

export default Clock_Component
