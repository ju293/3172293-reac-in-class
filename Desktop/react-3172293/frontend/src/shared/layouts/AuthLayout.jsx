// src/shared/layouts/AuthLayout.jsx
import { Outlet } from "react-router-dom";
import authBg from "@/assets/images/bg-1.png";

export default function AuthLayout() {
    return (
    <div
    className="min-h-screen w-full flex items-center justify-center"
    style={{
        backgroundImage: `url(${authBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        }}
    >
    <main className="w-full max-w-md p-4">
        
        <Outlet />
        </main>
    </div>
    );
}

// import{useState, useEffect} from "react";
// import { Outlet } from "react-router-dom";
// import authBg from "@/assets/images/bg-1.png";
// import {Input, 
//     Button, 
//     DeleteCounter2, 
//     Select, 
//     Checkbox 
// } 
// from "@/shared";
// // import EffectDemo from "../components/EffectDemo";
// import { getDocumentTypes } from "../../services/selectService";

// export default function AuthLayout(){
//     // Estado para los tipos de documentos
//     const[documentTypes, setDocumentTypes] = useState ([])
//     // El uso del estado  useEffect
//     useEffect(() =>{
//         getDocumentTypes().then(setDocumentTypes);
//     },[])
    
//     return(
//         <>
//         <div className="min-h-screen w-full"
//         style={{
//             backgroundImage: `url(${authBg})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//         }}
//         >
//         <main className="mx-auto">
//                 <Input 
//                     label="nombre"
//                     type="text"
//                     placeholder="Escribe tu nombre"
//                     htmlFor="user-name"
//                     variant="primary"
//                     size="sm"
//                 />
//                 <Input 
//                     label="correo"
//                     type="email"
//                     placeholder="Escribe tu correo"
//                     htmlFor="user-email"
//                 />
//                 <Input 
//                     label="Telefono"
//                     type="tel"
//                     placeholder="Escribe tu número de teléfono"
//                     htmlFor="user-phone"
//                 />
//                 <Input 
//                     label="borrar tipo de documento"
//                     type="text"
//                     placeholder="Escribe tu nombre"
//                     htmlFor="name"
//                 />
//                 <Input 
//                     label="Documento"
//                     type="text"
//                     placeholder="Escribe tu número de documento"
//                     htmlFor="user-document-number"
//                 />
//                 <Select
//                         label="tipos de documentos"
//                         name="userDocumentTypes"
//                         htmlFor="userDocumentTypes"
//                         options={documentTypes}
//                 />
//                     {/*Actions*/}
//                 <div className="flex gap-6 items-center">
                
//                 <Button
//                   variant="secondary"
//                   size="sm"
//                   type="submit"
//                   onClick={() => console.log("se oprimio el submit")}

//                 >  
//                  cancelar
//                 </Button>
//                 <Button
//                   variant="primary"
//                   size="md"
//                   type="submit"
//                   onClick={() => console.log("se oprimio el submit")}

//                 >  
//                  Guardar
//                 </Button>
//                 </div>{/*Actions*/}

//                 {/*Implementación del estado  useState */}
//                 <div className="mt-10">
//                     <h1>Ejemplo useState</h1>
//                 <DeleteCounter2/>
//                 </div>
//                 {/* <EffectDemo/> */}
//                     {/*<h1>Hola que tal</h1>*/}

//                     {/* Implementación de useEffect */}
//                     {/* <div>
//                         <h1>Este es mi useEffect</h1>
//                         <EffectDemo/>
//                     </div> */}
//                     {/* <CounterEffect/> */}

//                     <Select
//                         label="tipos de documentos"
//                         name="userDocumentTypes"
//                         htmlFor="userDocumentTypes"
//                         options={documentTypes}
//                     />
//                     <Checkbox/>
//                 <Outlet/>
//         </main>
//         </div>   
//         </>
//     );
// }