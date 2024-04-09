$(document).ready(function () {
    // Mostrar el menú lateral automáticamente al cargar la página
    $('#menuLateral').css('left', '0');
    $('#contenidoPrincipal').css('margin-left', '250px'); // Ajusta el contenido principal
    $('#tipoEmergenciaSelect, #equipoEmergenciaSelect, #procedimientoSelect, #prioridadSelect, #altitudEmergenciaSelect,#fechaHoraInicioInput  ,#fechaHoraFinInput, #descripcionInput').prop('disabled', true);


    var respuesta = localStorage.getItem('respuestaAPI');
    if (respuesta) {
        var datosVuelo = JSON.parse(respuesta);
        var horaSalida = new Date(datosVuelo[0].HoraSalida);
        var fechaSalida = horaSalida.toDateString(); 
        var horaSalidaFormatted = horaSalida.toLocaleTimeString();

        var horaLlegada = new Date(datosVuelo[0].HoraLlegada);
        var fechaLlegada = horaLlegada.toDateString(); 
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
        $('#lblidvuelo').text(datosVuelo[0].IdVuelo);
        var origin = [datosVuelo[0].AeropuertoOLatitud, datosVuelo[0].AeropuertoOLontigud];
        var destination = [datosVuelo[0].AeropuertoDLatitud, datosVuelo[0].AeropuertoDLongitud];
        var aeronaveLat = datosVuelo[0].AeronaveLat;
        var aeronaveLon = datosVuelo[0].AeronaveLon;

        drawFlightRoute(origin, destination);
        drwaplane(aeronaveLat, aeronaveLon);
        console.log('Respuesta del API:', JSON.parse(respuesta));
        localStorage.removeItem('respuestaAPI');
        habilitarCamposSeleccion();
   
    } else {
        console.log('No se recibió respuesta del API.');
    }
   
});
// URL del API
function habilitarCamposSeleccion() {
    $('#tipoEmergenciaSelect, #equipoEmergenciaSelect, #procedimientoSelect, #prioridadSelect, #altitudEmergenciaSelect,#fechaHoraInicioInput  ,#fechaHoraFinInput, #descripcionInput').prop('disabled', false);
    cargarTiposEmergencia();
    cargarPrioridadesAterrizaje();
    cargarAltitudesEmergencia();
    cargarEquiposEmergencia();
    cargarProcedimientos();
}
const ApiUrlEmergencia = 'https://tiusr26pl.cuc-carrera-ti.ac.cr/BackendST/api/Emergencias/ObtenerTiposEquiposProcedimientos';
const prioridadesUrl = 'https://tiusr26pl.cuc-carrera-ti.ac.cr/BackendST/api/Emergencias/PrioridadAterizaje';
const altitudesUrl = 'https://tiusr26pl.cuc-carrera-ti.ac.cr/BackendST/api/Emergencias/AltitudEmergencia';

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
        cargarEquiposEmergencia();
    } catch (error) {
        console.error('Error al cargar tipos de emergencia:', error);
    }
};

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

 
    cargarProcedimientos();
};

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
            option.text = procedimiento.Descripcion;
            procedimientoSelect.appendChild(option);
        });
    }
};
// Event listener para cargar equipos al cambiar el tipo de emergencia seleccionado
document.getElementById('tipoEmergenciaSelect').addEventListener('change', cargarEquiposEmergencia);

// Event listener para cargar procedimientos al cambiar el equipo seleccionado
document.getElementById('equipoEmergenciaSelect').addEventListener('change', cargarProcedimientos);

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





var map = L.map('map').setView([10, -83.6], 8); // Ajustar vista para mostrar la ruta

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
function drawFlightRoute(origin, destination) {
    var controlPoints = [
        'M', origin,
        'Q', [origin[0] - 0.2, origin[1] + 0.5], // Punto de control 1
        [destination[0] + 0.2, destination[1] - 0.5], // Punto de control 2
        'T', destination
    ];
    var bezier = L.curve(controlPoints, { color: 'blue' }).addTo(map);
    map.fitBounds(bezier.getBounds());

    // Agregar los marcadores de origen y destino al mapa
    var originMarker = L.marker(origin).addTo(map);
    originMarker.bindPopup("<b>Aeropuerto Origen</b><br>Latitud: " + origin[0] + "<br>Longitud: " + origin[1]).openPopup();
    var destinationMarker = L.marker(destination).addTo(map);
    destinationMarker.bindPopup("<b>Aeropuerto Destino</b><br>Latitud: " + destination[0] + "<br>Longitud: " + destination[1]).openPopup();

}
function drwaplane(aeronaveLat, aeronaveLon) {
    var airplaneMarker = L.marker([aeronaveLat, aeronaveLon], {
        icon: L.icon({
            iconUrl: 'https://tiusr26pl.cuc-carrera-ti.ac.cr/Imagenes/Airplane.svg',
            iconSize: [32, 32], // Tamaño del ícono
            iconAnchor: [16, 16], // Punto de anclaje del ícono (centro)
        })
    }).addTo(map);

    // Agregar información al marcador (opcional)
    airplaneMarker.bindPopup("<b>Aeronave Actual</b><br>Latitud: " + aeronaveLat + "<br>Longitud: " + aeronaveLon).openPopup();
}
