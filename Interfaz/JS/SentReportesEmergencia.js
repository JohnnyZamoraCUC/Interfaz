document.addEventListener('DOMContentLoaded', function () {
    function enviarDatosEmergencia() {

        const procedimiento = document.getElementById('procedimientoSelect').value;
        const prioridad = document.getElementById('prioridadSelect').value;
        const altitudEmergencia = document.getElementById('altitudEmergenciaSelect').value;
        const fechaHoraInicio = document.getElementById('fechaHoraInicioInput').value;
        const fechaHoraFin = document.getElementById('fechaHoraFinInput').value;
        const descripcion = document.getElementById('descripcionInput').value;
        const idvuelo = document.getElementById('lblidvuelo').textContent;


        const idTipoProcedimiento = parseInt(procedimiento, 10);
        const idVueloint = parseInt(idvuelo, 10);
        const idaltitudEmergenciaINT = parseInt(altitudEmergencia, 10);

        const datosEmergencia = {
            FechaHoraInicio: fechaHoraInicio,
            FechaHoraFin: fechaHoraFin,
            idTipoProcedimiento: idTipoProcedimiento,
            idvuelo: idVueloint,
            idaltitudemergencia: idaltitudEmergenciaINT,
            idprioridadaterrizaje: prioridad,
            DescripcionReportada: descripcion,
            IDUsuario: 1
        };


        const datosJSON = JSON.stringify(datosEmergencia, null, 2); // Convierte el objeto a JSON con formato
        //alert('Datos de emergencia:\n' + datosJSON);
        //console.log('Datos de emergencia:\n', datosEmergencia);
        // URL de la API donde enviarás los datos
        const Ednpoint = 'https://tiusr26pl.cuc-carrera-ti.ac.cr/BackendST/api/Emergencias/CrearEmergencia';

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosEmergencia)
        };

        fetch(Ednpoint, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al enviar los datos de emergencia.');
                }
                return response.json();
            })
            .then(data => {
                console.log('La emergencia ha sido creada exitosamente:', data);
                mostrarNotificacion();

            })
            .catch(error => {
                console.error('Error al crear la emergencia:', error);
            });
    }


    const btnRealizarReporte = document.querySelector('.btn-success');
    btnRealizarReporte.addEventListener('click', function () {

        enviarDatosEmergencia();
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
        window.location.reload();
    }, 500);
}
