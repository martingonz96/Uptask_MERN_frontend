import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"


function ConfirmarCuenta() {

const [alerta, setAlerta] = useState({})
const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

const params = useParams()

const { id } = params

useEffect(()=>{
  const confirmarCuenta = async ()=> {

    try {
      const url = `/usuarios/confirmar/${id}`
      const { data } = await clienteAxios(url)
      setAlerta({
        msg: data.msg,
        error: false
      })
      setCuentaConfirmada(true)
    } catch (error) {
      setAlerta({
        msg : error.response.data.msg,
        error: true
      })
      setCuentaConfirmada(false)
    }

  }
  return ()=>{confirmarCuenta()}
}
,[])

const { msg } = alerta

  return (
    <>
    <h1 className=" text-sky-600 font-black text-6xl capitalize">Confirma Tu Cuenta Y Comienza A Crear Tus
    <span className=" text-slate-600"> Proyectos</span></h1>

    <div className="mt-20 px-5 py-10 rounded-xl bg-white shadow-lg md:mt-10">
      {msg && <Alerta alerta={alerta}/>}
      {cuentaConfirmada && (<Link 
       to="/" 
       className=" block text-center my-5 text-slate-500 uppercase text-sm"
       >Inicia Sesión</Link> )}
    </div>
    
    </>
  )
}

export default ConfirmarCuenta