import useProyectos from "../useHooks/useProyectos"

function Colaborador({colaborador}) {

    const { handleModalEliminarColaborador, modalEliminarColaborador } = useProyectos()

const { nombre, email, _id} = colaborador

  return (
    <div className=" p-5 border-b flex items-center justify-between">
        <div>
        <p>{nombre}</p>
        <p className=" text-sm text-gray-700">{email}</p>
        </div>
        <div>
        <button type="button"
        className=" bg-red-500 px-4 py-2 font-bold text-sm rounded-lg text-white uppercase"
        onClick={()=> handleModalEliminarColaborador(colaborador)}
        >Eliminar</button>
        </div>
    </div>
  )
}

export default Colaborador