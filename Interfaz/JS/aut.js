function submitLoginForm() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    alert("Email: " + email + "\nContraseña: " + password);

    // Enviar las credenciales al endpoint de login
    fetch('https://tiusr26pl.cuc-carrera-ti.ac.cr/BackendST/api/Usuarios/Login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Correo: email,
            Contrasena: password
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data === "Credenciales válidas") {
                alert("Inicio de sesión exitoso");
                // Aquí puedes redireccionar al usuario a otra página si el inicio de sesión es exitoso
            } else {
                alert("Credenciales incorrectas");
                // Limpiar el formulario de inicio de sesión
                document.getElementById("loginForm").reset();
            }
        })
        .catch(error => console.error('Error:', error));

    return false; // Evitar que el formulario se envíe
}

function submitTokenForm() {
    var correo = document.getElementById("correo").value;
    var token = document.getElementById("token").value;

    fetch('https://tiusr26pl.cuc-carrera-ti.ac.cr/BackendST/api/Usuarios/ValidarDobleFactor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Correo: correo,
            Token: token
        })
    })
        .then(response => {
            if (response.ok) {
                alert("Token de doble factor válido");
                // Aquí puedes redireccionar al usuario a otra página si la validación del token es exitosa
            } else if (response.status === 401) {
                alert("Token de doble factor inválido");
                // Aquí puedes manejar el caso en el que el token sea inválido
            } else {
                alert("Error al validar el token de doble factor");
                // Aquí puedes manejar otros posibles errores
            }
        })
        .catch(error => console.error('Error:', error));

    return false; // Evitar que el formulario se envíe
}
