// Este archivo es el punto de arranque del backend
import dotenv from "dotenv";
import process from "node:process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config({ path: resolve(dirname(fileURLToPath(import.meta.url)), "../.env") });

const requiredEnvironmentVariables = [
    "DB_HOST",
    "DB_PORT",
    "DB_USER",
    "DB_NAME",
    "JWT_SECRET",
    "JWT_EXPIRES",
];
const missingEnvironmentVariables = requiredEnvironmentVariables.filter(
    (name) => !process.env[name],
);

if (missingEnvironmentVariables.length > 0) {
    throw new Error(
        `Faltan variables de entorno requeridas: ${missingEnvironmentVariables.join(", ")}`,
    );
}

const databasePort = Number(process.env.DB_PORT);
if (!Number.isInteger(databasePort) || databasePort < 1 || databasePort > 65535) {
    throw new Error("DB_PORT debe ser un puerto válido");
}

const port = Number(process.env.PORT || 4000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT debe ser un puerto válido");
}

const { default: app } = await import("./app.js");

// Iniciamos el servidor HTTP usando la app de Express
// Listen levanta el servidor y queda a la espera de peticiones
app.listen(port, () => {
    // Log informativo indicando que el servidor está corriendo 
    console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
