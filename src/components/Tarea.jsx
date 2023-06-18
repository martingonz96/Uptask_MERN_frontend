import { formatearFecha } from "../helpers/formatearFecha"
import useAdmin from "../useHooks/useAdmin"
import useProyectos from "../useHooks/useProyectos"

function Tarea({ tarea }) {

  const { handleModalEditarTarea, handleEliminarTarea, completarTarea } = useProyectos()

  const  admin = useAdmin()

  const { nombre, descripcion, prioridad, fechaEntrega, _id, estado } = tarea
  
  return (
    <div className=" border-b p-5 flex justify-between items-center">
      <div className=" flex flex-col items-start">
        <p className="mb-1 text-xl">{nombre}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
        <p className="mb-1 text-sm">{formatearFecha(fechaEntrega)}</p>
        <p className="mb-1 text-xl text-gray-600">Prioridad: {prioridad}</p>
        {estado && <p className=" text-xs bg-green-500 uppercase p-1 rounded-lg text-white">
          Completada por: {tarea.completado?.nombre}</p>}
      </div>
      <div className="flex  flex-col lg:flex-row gap-2 ">
        {admin && (

          <button
            className=" py-3 font-bold rounded-lg bg-indigo-600 text-white uppercase px-4"
            onClick={() => handleModalEditarTarea(tarea)}
          >Editar</button>

        )}
 
          <button
            className={`${estado ? ' bg-sky-600' : 'bg-gray-600'} py-3 font-bold rounded-lg text-white uppercase px-4`}
              onClick={()=> completarTarea(_id)} 
          >{estado ? 'Completa' : 'Incompleta' }</button>
       

        {admin && (

          <button
            className=" py-3 font-bold rounded-lg bg-red-600 text-white uppercase px-4"
            onClick={() => handleEliminarTarea(tarea)}
          >Eliminar</button>

        )}

      </div>
    </div>
  )
}

export default Tarea