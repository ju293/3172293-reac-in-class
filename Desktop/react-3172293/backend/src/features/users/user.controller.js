//Este archivo implementa el controlado hhttp del feature users. orquestar la peticion delegar la logica de negocio y contruir una resputsta http

//Importamos el servicio de usuarios.
// El controller NO implementa lógica de negocio, 
// solo delega la operación al service correspondiente.
import { userService } from "./user.service.js";

// Exportamos un objeto controlador.
// Agrupar handlers en un objeto permite escalabildad
// (create, update, deleta, getById, etc.)
export const userController ={

    // Método encargado de manejar la creación de un usuario
    // se asume que este método será usado como handler de una ruta Express
    async create(req, res) {

        try {
            // Llamamos al servicio de usuario, pasando los datos recibidos
            // Aquí ocurre la lógica real de negocio (validaciones, persistencia, etc.)
            const user = await userService.createUser(req.body);

            // Respuesta HTTP en caso de éxito 
            // 201: recurso creado correctamente según el estándar REST
            res.status(201).json ({
                // Mensaje informativo para el cliente
                message: "Usuario creado correctamente",
                
                // Retornamos únicamente el ID del susuario creado
                // Evite exponer información sensible innecesaria
                userId: user.id,
            });
        } catch (err) {
            const statusCode = err.statusCode || (err.code === "23505" ? 409 : 500);
            if (statusCode === 500) {
                console.error("Error al crear usuario:", err);
            }

            const errorMessage = statusCode === 409
                ? "El correo o documento ya está registrado"
                : statusCode === 500
                    ? "Error interno del servidor"
                    : err.message;

            res.status(statusCode).json({ error: errorMessage });
        }
    },
};