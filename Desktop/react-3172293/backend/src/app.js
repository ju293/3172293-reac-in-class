// Importamos Express, el framework base para construir el servidor HTTP
import express from "express";
import process from "node:process";

// Importamos el middleware CORS
// Permite controlar qué orígenes pueden comunicarse con el backend
import cors from "cors";

// Importamos las rutas del feature users
// Cada feature expone su porpio router independiente
import userRoutes from "./features/users/user.routes.js";
import authRoutes from "./features/auth/auth.routes.js";

// Creamos la isntancia principal de la aplicacion Express
const app = express();

// Middleware de CORS
// Permite solicitudes unicamente desde el fonrtend en localhost:5173
// (típico proyecto Vite en desarrollo)
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173" }));

// Middleware para parsear cuerpois de peticion en formato JSON

// Sin este middleware, req.body sería undfined
app.use(express.json());

// Registro del router de usuarios
// Todas las rutas del feature users quedarán bajo del prefijo /api/users
// Ejemplo final: POST http://localhost:4000/api/users
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Exportamos la aplicación configurada
// El arranque del servidor se hace en server.js
export default app;

