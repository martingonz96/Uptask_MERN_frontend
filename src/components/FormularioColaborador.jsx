import { useState } from "react"
import Alerta from "./Alerta"
import useProyectos from "../useHooks/useProyectos"

function FormularioColaborador() {

    const { mostrarAlerta, alerta, submitColaborador } = useProyectos()


    const [email, setEmail] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        if(email === '') {
          mostrarAlerta({
            msg: 'Todos los campos son obligatorios',
            error: true
          })
          return
        }
        submitColaborador(email)
    }

    const { msg } = alerta

    return (

        
        <form
            className=" bg-white py-10 px-5 md:w-1/2 rounded:lg shadow w-full"
            onSubmit={handleSubmit}
        >
            {msg && <Alerta  alerta={alerta}/>}

          <div className='mb-5'>
                                    <label
                                    className=' text-gray-700 uppercase font-bold text-sm'
                                    htmlFor='email'
                                    >
                                    Email Colaborador
                                    </label>
                                    <input
                                    id='email'
                                    type='email'
                                    placeholder='Email'
                                    className=' w-full border-2 p-2 mt-2 placeholder-gray-400'
                                    value={email}
                                    onChange={e=> setEmail(e.target.value)}
                                    />
                                    </div>
                                    <input
                                    type='submit'
                                    className=' bg-sky-600 text-white cursor-pointer p-3 rounded hover:bg-sky-700 transition-colors uppercase font-bold w-full'
                                    value='Buscar Colaborador'
                                    />
        </form>
    )
}

export default FormularioColaborador