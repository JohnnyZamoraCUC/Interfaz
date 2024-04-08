$(document).ready(function () {
    // Mostrar el menú lateral automáticamente al cargar la página
    $('#menuLateral').css('left', '0');
    $('#contenidoPrincipal').css('margin-left', '250px'); // Ajusta el contenido principal
    $('#tipoEmergenciaSelect, #equipoEmergenciaSelect, #procedimientoSelect, #prioridadSelect, #altitudEmergenciaSelect,#fechaHoraInicioInput  ,#fechaHoraFinInput, #descripcionInput').prop('disabled', true);

    // Obtener la respuesta del almacenamiento local del navegador
    var respuesta = localStorage.getItem('respuestaAPI');
    if (respuesta) {
        // Convertir la respuesta a un objeto JavaScript
        var datosVuelo = JSON.parse(respuesta);
        var horaSalida = new Date(datosVuelo[0].HoraSalida);
        var fechaSalida = horaSalida.toDateString(); // Obtiene la fecha en formato de cadena
        var horaSalidaFormatted = horaSalida.toLocaleTimeString();

        var horaLlegada = new Date(datosVuelo[0].HoraLlegada);
        var fechaLlegada = horaLlegada.toDateString(); // Obtiene la fecha en formato de cadena
        var horaLlegadaFormatted = horaLlegada.toLocaleTimeString();

        $('#imgAvion').html('<img src="' + datosVuelo[0].AeronaveImagen + '">');
        $('#lblNumeroVuelo').text(datosVuelo[0].NumeroVuelo);
        $('#lblAerolinea').text(datosVuelo[0].Aerolinea);
        $('#lblAeronave').text(datosVuelo[0].Aeronave);
        $('#lblEstadoVuelo').text(datosVuelo[0].EstadoVuelo);
        $('#lblPiloto').text(datosVuelo[0].PilotoNombre + ' ' + datosVuelo[0].PilotoApellido);
        $('#lblPrioridad').text(datosVuelo[0].Prioridad);
        $('#lblTipoVuelo').text(datosVuelo[0].TipoVuelo);
        $('#lblOrigen').text(datosVuelo[0].Origen);
        $('#lblDestino').text(datosVuelo[0].Destino);
        $('#lblRuta').text(datosVuelo[0].Ruta);
        $('#lblHoraSalida').text(horaSalidaFormatted);
        $('#lblHoraLlegada').text(horaLlegadaFormatted);
        $('#lblFechaSalida').text(fechaSalida);
        $('#lblFechaLlegada').text(fechaLlegada);
        $('#lblDuracionEstimada').text(datosVuelo[0].DuracionEstimada);
        
        console.log('Respuesta del API:', JSON.parse(respuesta));

        // Limpiar la respuesta del almacenamiento local para evitar confusiones
        localStorage.removeItem('respuestaAPI');
        habilitarCamposSeleccion();
    } else {
        console.log('No se recibió respuesta del API.');
    }
});
// URL del API
function habilitarCamposSeleccion() {
    $('#tipoEmergenciaSelect, #equipoEmergenciaSelect, #procedimientoSelect, #prioridadSelect, #altitudEmergenciaSelect,#fechaHoraInicioInput  ,#fechaHoraFinInput, #descripcionInput').prop('disabled', false);

    // Llamar a las funciones para cargar dinámicamente los dropdowns
    cargarTiposEmergencia();
    cargarPrioridadesAterrizaje();
    cargarAltitudesEmergencia();
    cargarEquiposEmergencia();
    cargarProcedimientos();
}
const ApiUrlEmergencia = 'https://tiusr26pl.cuc-carrera-ti.ac.cr/BackendST/api/Emergencias/ObtenerTiposEquiposProcedimientos';
const prioridadesUrl = 'https://tiusr26pl.cuc-carrera-ti.ac.cr/BackendST/api/Emergencias/PrioridadAterizaje';

// URL de la API para obtener las altitudes de emergencia
const altitudesUrl = 'https://tiusr26pl.cuc-carrera-ti.ac.cr/BackendST/api/Emergencias/AltitudEmergencia';


// Función para cargar el tipo de emergencia en el primer dropdown
const cargarTiposEmergencia = async () => {
    try {
        const response = await fetch(ApiUrlEmergencia);
        const data = await response.json();

        const tipoEmergenciaSelect = document.getElementById('tipoEmergenciaSelect');
        data.forEach(tipo => {
            const option = document.createElement('option');
            option.value = tipo.IdTipoEmergencia;
            option.text = tipo.Tipo;
            tipoEmergenciaSelect.appendChild(option);
        });

        // Llamar a la función para cargar equipos basados en el tipo de emergencia seleccionado
        cargarEquiposEmergencia();
    } catch (error) {
        console.error('Error al cargar tipos de emergencia:', error);
    }
};

// Función para cargar los equipos basados en el tipo de emergencia seleccionado
const cargarEquiposEmergencia = async () => {
    const tipoEmergenciaSelect = document.getElementById('tipoEmergenciaSelect');
    const selectedTipoId = tipoEmergenciaSelect.value;

    const response = await fetch(ApiUrlEmergencia);
    const data = await response.json();

    const equiposEmergenciaSelect = document.getElementById('equipoEmergenciaSelect');
    equiposEmergenciaSelect.innerHTML = '';

    const tipoSeleccionado = data.find(tipo => tipo.IdTipoEmergencia === parseInt(selectedTipoId));

    if (tipoSeleccionado) {
        tipoSeleccionado.Equipos.forEach(equipo => {
            const option = document.createElement('option');
            option.value = equipo.IdEquipoEmergencia;
            option.text = equipo.NombreEquipo;
            equiposEmergenciaSelect.appendChild(option);
        });
    }

    // Llamar a la función para cargar procedimientos basados en el equipo seleccionado
    cargarProcedimientos();
};

// Función para cargar los procedimientos basados en el equipo seleccionado
const cargarProcedimientos = async () => {
    const equipoEmergenciaSelect = document.getElementById('equipoEmergenciaSelect');
    const selectedEquipoId = equipoEmergenciaSelect.value;

    const response = await fetch(ApiUrlEmergencia);
    const data = await response.json();

    const procedimientoSelect = document.getElementById('procedimientoSelect');
    procedimientoSelect.innerHTML = '';

    const equipoSeleccionado = data.flatMap(tipo => tipo.Equipos).find(equipo => equipo.IdEquipoEmergencia === parseInt(selectedEquipoId));

    if (equipoSeleccionado) {
        equipoSeleccionado.Procedimientos.forEach(procedimiento => {
            const option = document.createElement('option');
            option.value = procedimiento.IdProcedimiento;
            option.text = procedimiento.Nombre;
            procedimientoSelect.appendChild(option);
        });
    }
};

const cargarPrioridadesAterrizaje = async () => {
    try {
        const response = await fetch(prioridadesUrl);
        const prioridadesData = await response.json();

        const prioridadSelect = document.getElementById('prioridadSelect');
        prioridadesData.forEach(prioridad => {
            const option = document.createElement('option');
            option.value = prioridad.IdPrioridadAterrizaje;
            option.textContent = prioridad.Descripcion;
            prioridadSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar las prioridades de aterrizaje:', error);
    }
};

// Función para cargar las altitudes de emergencia
const cargarAltitudesEmergencia = async () => {
    try {
        const response = await fetch(altitudesUrl);
        const altitudesData = await response.json();

        const altitudSelect = document.getElementById('altitudEmergenciaSelect');
        altitudesData.forEach(altitud => {
            const option = document.createElement('option');
            option.value = altitud.IdAltitudEmergencia;
            option.textContent = `${altitud.Altitud} Metros`;
            altitudSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar las altitudes de emergencia:', error);
    }
};


document.addEventListener('DOMContentLoaded', () => {
    const descripcionInput = document.getElementById('descripcionInput');
    const modalDescripcion = new bootstrap.Modal(document.getElementById('modalDescripcion'));
    const descripcionTextarea = document.getElementById('descripcionTextarea');
    const guardarDescripcionBtn = document.getElementById('guardarDescripcion');

    // Mostrar modal al hacer clic en el campo de entrada
    descripcionInput.addEventListener('click', () => {
        modalDescripcion.show(); // Mostrar el modal
        descripcionTextarea.value = descripcionInput.value; // Iniciar el textarea con el valor actual
    });

    // Acción al hacer clic en Guardar
    guardarDescripcionBtn.addEventListener('click', () => {
        descripcionInput.value = descripcionTextarea.value; // Asignar el valor del textarea al campo de entrada
        modalDescripcion.hide(); // Ocultar el modal
    });
});