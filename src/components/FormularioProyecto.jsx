import { useState, useEffect } from "react"
import useProyectos from "../useHooks/useProyectos"
import Alerta from '../components/Alerta'
import { useParams } from "react-router-dom"

function FormularioProyecto() {

  const params = useParams()

    const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos()

const [nombre, setNombre] = useState('')
const [descripcion, setDescripcion] = useState('')
const [fechaEntrega, setFechaEntrega] = useState('')
const [cliente, setCliente] = useState('')
const [id , setId] = useState(null)

useEffect(()=>{

  if(params.id){
    setId(proyecto._id)
    setNombre(proyecto.nombre)
    setDescripcion(proyecto.descripcion)
    setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
    setCliente(proyecto.cliente)
  }

},[params])

const handleSubmit = async e => {
    e.preventDefault()
    if([nombre, descripcion, fechaEntrega, cliente].includes('')){
      mostrarAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    //Pasar datos del provider al provider

    await submitProyecto({ nombre, descripcion, fechaEntrega, cliente, id })

    setId(null)
    setNombre('')
    setDescripcion('')
    setFechaEntrega('')
    setCliente('')

} 



const { msg } = alerta

  return (
    <form className=' bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'
    onSubmit={handleSubmit}
    >

    {msg && <Alerta alerta={alerta}/>}

    <div className=" mb-5">
        <label
        className=' text-gray-700 uppercase font-bold text-sm'
        htmlFor='nombre'
        >Nombre Proyecto</label>
        <input
        type='text'
        className=' border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
        id='nombre'
        placeholder='Nombre del Proyecto'
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        />
    </div>
    <div className=" mb-5">
        <label
        className=' text-gray-700 uppercase font-bold text-sm'
        htmlFor='descripcion'
        >Descripción</label>
        <textarea
        type='text'
        className=' border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
        id='descripcion'
        placeholder='Descripción del Proyecto'
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
        />
    </div>
    <div className=" mb-5">
        <label
        className=' text-gray-700 uppercase font-bold text-sm'
        htmlFor='fecha-entrega'
        >Fecha de Entrega</label>
        <input
        type='date'
        className=' border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
        id='fecha-entrega'
        placeholder='Nombre del Proyecto'
        value={fechaEntrega}
        onChange={e => setFechaEntrega(e.target.value)}
        />
    </div>
    <div className=" mb-5">
        <label
        className=' text-gray-700 uppercase font-bold text-sm'
        htmlFor='cliente'
        >Nombre del Cliente</label>
        <input
        type='text'
        className=' border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
        id='cliente'
        placeholder='Nombre del Cliente'
        value={cliente}
        onChange={e => setCliente(e.target.value)}
        />
    </div>
    <input
    type="submit"
    value={id ? 'Editar Proyecto': 'Crear Proyecto'}
    className=" bg-sky-600 w-full p-3 uppercase text-white rounded cursor-pointer hover:bg-sky-800 transition-colors"
    />
    </form>
  )
}

export default FormularioProyecto