// src/shared/services/alertService.js

import Swal from "sweetalert2";

export function showSuccessAlert({
    title = "Éxito",
    text = "",
    confirmButtonText = "Aceptar",
    timer = 1000,
}) {
    return Swal.fire({
        icon: "success",
        title,
        text,
        confirmButtonText,
        timer,
        timerProgressBar: true,

        customClass: {
            popup: "rounded-2x1",
            title: "text-lg font-semibold green-600",
            confirmButton: "bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg",
            timerProgressBar: "bg-green-600 hover:bg-green-700 rounded-lg",
        },

        buttonsStyling: false,
    });
}

export function showCancelAlert({
    title = "Cancelado",
    text = "",
    confirmButtonText = "Aceptar",
    timer = 1000,
}) {
    return Swal.fire({
        icon: "error",
        title,
        text,
        confirmButtonText,
        timer,
        timerProgressBar: true,

        customClass: {
            popup: "rounded-2x1",
            title: "!text-red-600",
            confirmButton: "bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-lg",
            timerProgressBar: "!bg-red-600 hover:bg-red-700 rounded-lg",
        },

        buttonsStyling: false,
    });
}
