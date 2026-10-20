// El service es la capa donde vive la logica del negocio

// Importamos el repositorio de usuarios.
// El service depende del repository para acceder a la persistencia.

// pero el repository NO debe conocer el service.
import { userRepository } from "./user.repository.js";

import bcrypt from "bcrypt";
import Joi from "joi";

const createUserSchema = Joi.object({
    userName: Joi.string().trim().min(3).max(60).required(),
    userEmail: Joi.string().email().max(150).required(),
    userPhone: Joi.string().pattern(/^\d{10}$/).required(),
    userDocumentTypes: Joi.string().min(1).max(20).required(),
    userDocumentNumber: Joi.string().min(5).max(20).required(),
    userPassword: Joi.string()
        .min(8)
        .pattern(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])/, "password complexity")
        .required(),
    userAvatarUrl: Joi.string().uri().allow(null).optional(),
});

// Exportamos el servicio de usuarios.
// El service representa la capa de lógica de negocio de la palicación.
export const userService = {

    // Método encargado de crear un usuario
    // Recibe datos provinientes del controller,
    // idealmente ya validados a nivel estructural (DTO / Schema)
async createUser(data) {
        const { error, value } = createUserSchema.validate(data, { abortEarly: false });
        if (error) {
            error.statusCode = 400;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(value.userPassword, 10);

        const userData = {
            ...value,
            userPassword: hashedPassword,
            isStaff: false,
            isActive: true,
            isSuperuser: false,
        };

        // En este punto, en una arquitectura real, deberián, ocurrir:
        // - Validaciones de reglas de negocio
        // - Transformaciones de datos (ej: hash de password)
        // - Verificaciones de unicidad (email, documento, etc.)
        // - Decisiones de negocio (roles, flags, estados iniciales)

        // Actualmente, el método solo delega directamente al repository,
        // sin agregar ninguna lógica adicional
        return await userRepository.create(userData);
    },    
};