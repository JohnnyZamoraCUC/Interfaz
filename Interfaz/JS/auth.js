
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
               
                console.log("Token Invalido"); 
                mostrarNotificacion();
                
            } else {
                 // Mostrar la notificación de error
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
                window.location.href = "/Interfaz/usr/General/Home.html";
            } else {
                mostrarNotificaciontoken()
                console.log("Respuesta del servidor:", response);
            }
        })
        .catch(function (error) {
            console.error("Error de red:", error);
        });
});


function mostrarNotificacion() {
    const notificationCard = document.getElementById('notificationCard');
    notificationCard.style.display = 'block';


    notificationCard.style.animationName = 'slideIn';


    setTimeout(function () {
        ocultarNotificacion();
    }, 3000);
}

// Función para ocultar la tarjeta de notificación
function ocultarNotificacion() {
    const notificationCard = document.getElementById('notificationCard');
    notificationCard.style.animationName = 'slideOut'; // Agregar animación de salida
    setTimeout(function () {
        notificationCard.style.display = 'none';
    }, 500);
}


function mostrarNotificaciontoken() {
    const notificationtoken = document.getElementById('notificationtoken');
    notificationtoken.style.display = 'block';


    notificationtoken.style.animationName = 'slideIn';


    setTimeout(function () {
        ocultarNotificaciontoken();
    }, 3000);
}

// Función para ocultar la tarjeta de notificación
function ocultarNotificaciontoken() {
    const notificationtoken = document.getElementById('notificationtoken');
    notificationtoken.style.animationName = 'slideOut'; // Agregar animación de salida
    setTimeout(function () {
        notificationtoken.style.display = 'none';
    }, 500);
}



