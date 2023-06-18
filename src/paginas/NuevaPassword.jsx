import axios from "axios"
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"

function NuevaPassword() {

  const [tokenValido, setTokenValido] = useState(false)

  const [alerta, setAlerta] = useState({})

  const [password, setPassword] = useState('')

  const [passwordModificado, setPasswordModificado] = useState(false)

  const params = useParams()

  const { token } = params

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        const { data } = await clienteAxios(`/usuarios/olvide-password/${token}`)
        setTokenValido(true)

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    return () => { comprobarToken() }
  }, [])

  const { msg } = alerta

  const handleSubmit = async e => {
    e.preventDefault()

    if (password.length < 6) {
      setAlerta({
        msg: "El password debe ser mínimo de 6 caracteres",
        error: true
      })
      return;
    }

    try {
      const url = `/usuarios/olvide-password/${token}`

      const { data } = await clienteAxios.post(url, {
        password
      })

      console.log(data)

      setAlerta({
        msg: data.msg,
        error: false
      })

      setPasswordModificado(true)

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }

  }


  return (
    <>
      <h1 className=" text-sky-600 font-black text-6xl capitalize">Reestablece Tu Password Y No Pierdas Tus
        <span className=" text-slate-600"> Proyectos</span></h1>

      {msg && <Alerta alerta={alerta} />}

      {tokenValido && (
        <form className=" my-10 bg-white shadow rounded-lg p-10 py-10"
          onSubmit={handleSubmit}
        >

          <div className=" my-5">
            <label
              className=" uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              Nuevo Password
            </label>
            <input
              type="password"
              placeholder="Escribe tu nuevo password"
              className=" w-full mt-3 p-3 border rounded-xl bg-gray-50"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

          </div>

          <input
            type="submit"
            value="Guardar Nuevo Password"
            className=" bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />

        </form>
      )}

      {passwordModificado && (<Link
        to="/"
        className=" block text-center my-5 text-slate-500 uppercase text-sm"
      >Inicia Sesión</Link>)}

    </>
  )
}

export default NuevaPassword