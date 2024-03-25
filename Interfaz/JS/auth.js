
function guardarCorreo(email) {
    localStorage.setItem('correo', email);
}

// Función para obtener el correo electrónico del almacenamiento local
function obtenerCorreo() {
    return localStorage.getItem('correo');
}

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var formData = {
        "Correo": email,
        "Contrasena": password
    };
    guardarCorreo(email);

    fetch("https://tiusr26pl.cuc-carrera-ti.ac.cr/BackendST/api/Usuarios/Login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
        .then(function (response) {
            if (response.status === 401) {
                //document.getElementById("loginForm").reset(); 
                document.getElementById("loginForm").style.display = "none";
                document.getElementById("tokenForm").style.display = "block";
            } else if (response.status === 409) {
                console.log("Token Invalido"); s
            } else {
                console.error("Error al iniciar sesión");
            }
        })
        .catch(function (error) {
            console.error("Error de red:", error);
        });
});

document.getElementById("tokenForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var email = obtenerCorreo();

    var email = document.getElementById("email").value;
    var token = document.getElementById("token").value;

    var formData = {
        "Correo": email,
        "Token": token
    };
    // alert("Datos del formulario:\n" + JSON.stringify(formData));
    fetch("https://tiusr26pl.cuc-carrera-ti.ac.cr/BackendST/api/Usuarios/ValidarDobleFactor", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
        .then(function (response) {
            if (response.status === 200) {
                window.location.href = "/Interfaz/usr/Home.html";
            } else {
                console.log("Respuesta del servidor:", response);
            }
        })
        .catch(function (error) {
            console.error("Error de red:", error);
        });
});