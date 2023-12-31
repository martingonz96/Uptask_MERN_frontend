import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import axios from 'axios'
import clienteAxios from "../config/clienteAxios"

function Registrar() {

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [alerta , setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()
    if([nombre, password, email, repetirPassword].includes("")){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })

      return

    }

    if(password !== repetirPassword) {
      setAlerta({
        msg: 'Los passwords no son iguales',
        error: true
      })
      return
    }

    if(password.length < 6) {
      setAlerta({
        msg: 'Password Corto, agrega más de 6 caracteres',
        error: true
      })
      return
    }

    setAlerta({})

    //Crear Usuaio en API
    try {
      const { data } = await clienteAxios.post(`/usuarios`, 
      {nombre, email, password})
      setAlerta({
        msg: data.msg,
        error: false
      })

      setNombre('')
      setPassword('')
      setEmail('')
      setRepetirPassword('')

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
    
  }

  const { msg } = alerta

  return (
    <>
    <h1 className=" text-sky-600 font-black text-6xl capitalize">Crea Tu Cuenta y Administra Tus 
    <span className=" text-slate-600"> Proyectos</span></h1>

    {msg && <Alerta alerta={alerta} />}

    <form className=" my-10 bg-white shadow rounded-lg p-10 py-10"
    onSubmit={handleSubmit}
    >

    <div className=" my-5">
        <label 
        className=" uppercase text-gray-600 block text-xl font-bold"
        htmlFor="nombre"
        >
          Nombre
        </label>
        <input
        type="text"
        placeholder="Ingresa Tu Nombre"
        className=" w-full mt-3 p-3 border rounded-xl bg-gray-50"
        id="nombre"
        value={nombre}
        onChange={(e)=> setNombre(e.target.value)}
        />
        
        </div>

        <div className=" my-5">
        <label 
        className=" uppercase text-gray-600 block text-xl font-bold"
        htmlFor="email"
        >
          Email
        </label>
        <input
        type="email"
        placeholder="Email de Registro"
        className=" w-full mt-3 p-3 border rounded-xl bg-gray-50"
        id="email"
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
        />
        
        </div>

        <div className=" my-5">
        <label 
        className=" uppercase text-gray-600 block text-xl font-bold"
        htmlFor="password"
        >
          Password
        </label>
        <input
        type="password"
        placeholder="Password de Registro"
        className=" w-full mt-3 p-3 border rounded-xl bg-gray-50"
        id="password"
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
        />
        
        </div>

        <div className=" my-5">
        <label 
        className=" uppercase text-gray-600 block text-xl font-bold"
        htmlFor="password2"
        >
          Confirmar Password
        </label>
        <input
        type="password"
        placeholder="Repetir Tu Password"
        className=" w-full mt-3 p-3 border rounded-xl bg-gray-50"
        id="password2"
        value={repetirPassword}
        onChange={(e)=> setRepetirPassword(e.target.value)}
        />
        
        </div>

        <input
        type="submit"
        value="Crear Cuenta"
        className=" bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
        
    </form>


    <nav className=" lg:flex lg:justify-between">
    <Link 
    to="/" 
    className=" block text-center my-5 text-slate-500 uppercase text-sm"
    >Ya tiene una cuenta? Inicia Sesión</Link>
    <Link 
    to="/olvide-password" 
    className=" block text-center my-5 text-slate-500 uppercase text-sm"
    >Olvidé Password</Link>
    </nav>
    </>
  )
}

export default Registrar