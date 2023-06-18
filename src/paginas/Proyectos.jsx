
import { useEffect } from 'react'
import Alerta from '../components/Alerta'
import ReviewProyecto from '../components/ReviewProyecto'
import useProyectos from '../useHooks/useProyectos'
import io from 'socket.io-client'

let socket;

function Proyectos() {

  useEffect(()=>{
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('prueba', proyectos)

    socket.on('respuesta', (persona)=> {
      console.log('Desde el frontend', persona)
    })
  })

    const { proyectos, alerta } = useProyectos()

    const { msg } = alerta

  return (
    <>
    <h1 className=' text-4xl font-black'>Proyectos</h1>

    {msg && <Alerta alerta={alerta} />}

    <div className=' bg-white shadow mt-10 rounded-lg'>
       {proyectos.length ?
        proyectos.map(proyecto=> (
            <ReviewProyecto 
            key={proyecto._id}
            proyecto={proyecto}/>
        )) :
       <p className=' mt-5 text-center text-gray-600 uppercase  p-5'>No hay Proyectos</p>}
    </div>
    </>
  )
}

export default Proyectos