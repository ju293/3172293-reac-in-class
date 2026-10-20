// componente CounterEffect

/**
 * objetivo de esta actividad
 * Entender que useEffect se vuelve a ejecutar cuando cambia una dependencia
 */
import { useEffect, useState } from "react"
export default function CounterEffect(){


        // SE CREA EL ESTADO
        const [count, setCount] = useState(0)
        const message = count === 0
            ? "El contador no ah cambiado"
            : `El contador cambio a: ${count}`


        // Se crea el efecto
        useEffect(() => {
            console.log(message)
        },[message])



        return(
            <div>
                <h2>{count}</h2>
                <p>{message}</p>

            {/*cada vez que se oprime el boton se incrementa el contador */}
                <button onClick={() => setCount(count + 1)} className="border p-6 bg-green-300"> Incrementar </button>
            </div>
        )
}