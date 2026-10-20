// src/features/auth/components/Login.jsx
import { useState } from "react";
import { loginSchema } from "../schemas/loginSchema";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import { Input, Button } from "@/shared"; 

import { showSuccessAlert, showCancelAlert } from "@/shared/services/alertService";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    try {
      const data = await login(result.data);
      console.log("LOGIN RESPONSE:", data);

      sessionStorage.setItem("token", data.token);

      // Metemos un sweetaler dentro del try que avisara que se pudo iniciar sesion correctamente 
      await showSuccessAlert({
        title: "Inicio de sesión exitoso",
        text: "Bienvenido al sistema",
        timer: 1500,
      });

      navigate("/dashboard/home");

    } catch (error) {
      console.error("Error en login:", error.message);

      // lo mismo hacemos en el cath por si llega a fallar y no encuentra el usuario o la contraseña es incorrecta
      await showCancelAlert({
        title: "Error al iniciar sesión",
        text: "Credenciales incorrectas",
        timer: 2000,
      });
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-text-primary text-2xl mb-6 text-center pt-6">
        Inicio de sesión
      </h1>

      <form
        className="grid grid-cols-1 items-center gap-6"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-6 my-auto mx-auto border p-[48px] rounded-[6px] bg-white shadow-md w-full">
          <Input
            label="Correo"
            name="userEmail"
            type="email"
            placeholder="Ingrese su correo"
            value={formData.userEmail}
            onChange={handleChange}
            error={errors.userEmail}
          />

          <Input
            label="Contraseña"
            name="userPassword"
            placeholder="Ingrese su contraseña"
            type="password"
            value={formData.userPassword}
            onChange={handleChange}
            error={errors.userPassword}
          />

          <div className="text-center text-sm my-2">
            <Link
              to="/dashboard/userCreate"
              className="text-primary font-bold hover:underline"
            >
              No tienes cuenta? Regístrate aquí
            </Link>
          </div>

          <div className="flex justify-center gap-4">

            <Button variant="primary" size="md" type="submit">
              Ingresar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}