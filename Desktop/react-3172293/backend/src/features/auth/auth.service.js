// backend/src/features/auth/auth.service.js 
// Lógica de autenticación + JWT 
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken"; 
import Joi from "joi";
import process from "node:process";
import { authRepository } from "./auth.repository.js"; 

const credentialsSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(1).required(),
});

const invalidCredentials = () => {
    const error = new Error("Credenciales inválidas");
    error.statusCode = 401;
    return error;
};

export const authService = { 
    async login(credentials) {
        const { error, value } = credentialsSchema.validate(credentials);
        if (error) {
            throw invalidCredentials();
        }

        const { email, password } = value;
        const user = await authRepository.findByEmail(email);

        if (!user) { 
            throw invalidCredentials();
        } 

        // SE CAMBIO AQUI: se cambio user.password por user.user_password
        const isMatch = await bcrypt.compare(password, user.user_password); 

        if (!isMatch) { 
            throw invalidCredentials();
        } 

        if (!user.is_active) { 
            throw invalidCredentials();
        } 

        const token = jwt.sign( 
            { id: user.id, email: user.user_email }, 
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_EXPIRES }, 
        ); 
        
        return { 
            token, 
            user: { 
                id: user.id, 
                email: user.user_email, 
            }, 
        }; 
    }, 
};