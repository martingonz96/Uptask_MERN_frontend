import { Link } from "react-router-dom"
import useProyectos from "../useHooks/useProyectos"
import Busqueda from "./Busqueda"
import useAuth from "../useHooks/UseAuth"



function Header() {

  const { handleBuscador, cerrarSesionProyecto } = useProyectos()

  const { cerrarSesionAuth } = useAuth()

  const handleCerrarSesion = ()=> {
    cerrarSesionAuth()
    cerrarSesionProyecto()
    localStorage.removeItem('token')
  }

  return (
    <header className=" px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className=" text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">UpTask</h2>


      <div className=" flex items-center gap-4 flex-col md:flex-row">

      <button
      type="button"
      className="font-bold uppercase"
      onClick={handleBuscador}
      >Buscar Proyecto</button>


        <Link to='/proyectos' className=" font-bold uppercase">Proyectos</Link>

        <button
        type="button"
        className="p-3 bg-sky-600 rounded-md text-white font-bold"
        onClick={handleCerrarSesion}
        >Cerrar Sesión</button>

        <Busqueda/>
      </div>
      </div>
      
    </header>
  )
}

export default Header