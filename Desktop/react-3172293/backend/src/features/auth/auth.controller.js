// backend/src/features/auth/auth.controller.js
import { authService } from "./auth.service.js";

export const authController = {
  async login(req, res) {
    try {
      const result = await authService.login(req.body);

      res.status(200).json({
        message: "Login exitoso",
        ...result, // Sin espacio después de los tres puntos
      });
    } catch (err) {
      const statusCode = err.statusCode === 401 ? 401 : 500;
      if (statusCode === 500) {
        console.error("Error al iniciar sesión:", err);
      }

      res.status(statusCode).json({
        error: statusCode === 401 ? "Credenciales inválidas" : "Error interno del servidor",
      });
    }
  },
};