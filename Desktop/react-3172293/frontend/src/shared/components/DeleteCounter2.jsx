// Ejemplo de contador sin usar datos
import { useState } from "react";

export default function DeleteCounter2(){



    const [count, setCount] = useState(0);

    const increment = () =>{
        setCount((currentCount) => currentCount + 1);
    }


    return(
        <div>
            <p>Contador: {count} </p>
            <button onClick={increment} className="border p-6 rounded-md bg-yellow-500">Incrementar</button>

        </div>
    )


}