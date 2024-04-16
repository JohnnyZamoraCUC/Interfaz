
document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://tiusr26pl.cuc-carrera-ti.ac.cr/BackendST//api/Emergencias/ObtenerReportes";
    const prioridadesAterrizajeUrl = "https://tiusr26pl.cuc-carrera-ti.ac.cr/BackendST/api/Emergencias/PrioridadAterizaje";
    const altitudemergencia = "https://tiusr26pl.cuc-carrera-ti.ac.cr/BackendST/api/Emergencias/AltitudEmergencia";
    const tiposEquiposProcedimientosUrl = "https://tiusr26pl.cuc-carrera-ti.ac.cr/BackendST/api/Emergencias/ObtenerTiposEquiposProcedimientos";
    const fechaHoraInicioInput = document.getElementById("fechaHoraInicioInput");
    const fechaHoraFinInput = document.getElementById("fechaHoraFinInput");
    const tipoEmergenciaSelect = document.getElementById("tipoEmergenciaSelect");
    const equipoEmergenciaSelect = document.getElementById("equipoEmergenciaSelect");
    const procedimientoSelect = document.getElementById("procedimientoSelect");
    const prioridadSelect = document.getElementById("prioridadSelect");
    const altitudemerge = document.getElementById("altitudEmergenciaSelect");

    // Función para realizar una solicitud a una URL y devolver los datos JSON
    async function fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error al obtener los datos:", error);
            return null;
        }
    }

    // Evento clic para los botones de vuelo
    const flightButtonsContainer = document.getElementById("flightButtonsContainer");
    flightButtonsContainer.addEventListener("click", async (event) => {
        if (event.target.classList.contains("flight-button")) {
            const flightId = event.target.textContent;

            try {
                // Realizar todas las solicitudes de datos necesarias en paralelo
                const [emergenciaDetails, tiposEquiposProcedimientos] = await Promise.all([
                    fetchData(`https://tiusr26pl.cuc-carrera-ti.ac.cr/BackendST/api/Emergencias/EmergenciasPorNumeroVuelo?numeroVuelo=${flightId}`),
                    fetchData(tiposEquiposProcedimientosUrl)

                ]);

                // Mostrar cada respuesta por separado en la consola
                console.log("Detalles de la emergencia:", emergenciaDetails);
                console.log("Tipos de Equipos y Procedimientos:", tiposEquiposProcedimientos);

                // Obtener el ID de procedimiento de los detalles de la emergencia
                const idProcedimiento = emergenciaDetails[0].IdTipoProcedimiento;

                console.log("IDPROCEDIMIENTO:", idProcedimiento);
                // Encontrar el procedimiento correspondiente en los tipos de equipos y procedimientos
                const procedimientoEncontrado = tiposEquiposProcedimientos
                    .flatMap(tipo => tipo.Equipos)
                    .flatMap(equipo => equipo.Procedimientos)
                    .find(procedimiento => procedimiento.IdProcedimiento === idProcedimiento);

                // Actualizar el select de procedimientos con la descripción del procedimiento encontrado
                if (procedimientoEncontrado) {
                    procedimientoSelect.innerHTML = "";
                    const option = document.createElement("option");
                    option.value = procedimientoEncontrado.IdProcedimiento;
                    option.textContent = procedimientoEncontrado.Pasos;
                    procedimientoSelect.appendChild(option);
                } else {
                    console.error("No se encontró el procedimiento con ID:", idProcedimiento);
                }

                // Buscar el nombre del equipo de emergencia utilizando el ID de procedimiento
                const equipoEmergenciaEncontrado = tiposEquiposProcedimientos
                    .flatMap(tipo => tipo.Equipos)
                    .find(equipo => equipo.Procedimientos.some(procedimiento => procedimiento.IdProcedimiento === idProcedimiento));

                // Actualizar el select de equipo de emergencia con el nombre del equipo encontrado
                if (equipoEmergenciaEncontrado) {
                    equipoEmergenciaSelect.innerHTML = "";
                    const optionEquipo = document.createElement("option");
                    optionEquipo.value = equipoEmergenciaEncontrado.IdEquipoEmergencia;
                    optionEquipo.textContent = equipoEmergenciaEncontrado.NombreEquipo;
                    equipoEmergenciaSelect.appendChild(optionEquipo);
                } else {
                    console.error("No se encontró el equipo de emergencia para el procedimiento con ID:", idProcedimiento);
                }
                // Encontrar el tipo de emergencia correspondiente al procedimiento buscado
                const tipoEmergenciaEncontrado = tiposEquiposProcedimientos.find(tipo => {
                    return tipo.Equipos.some(equipo => {
                        return equipo.Procedimientos.some(procedimiento => procedimiento.IdProcedimiento === idProcedimiento);
                    });
                });

                // Actualizar el select de tipo de emergencia con el tipo encontrado
                if (tipoEmergenciaEncontrado) {
                    tipoEmergenciaSelect.innerHTML = "";
                    const optionTipo = document.createElement("option");
                    optionTipo.value = tipoEmergenciaEncontrado.IdTipoEmergencia;
                    optionTipo.textContent = tipoEmergenciaEncontrado.Tipo;
                    tipoEmergenciaSelect.appendChild(optionTipo);
                } else {
                    console.error("No se encontró el tipo de emergencia para el procedimiento con ID:", idProcedimiento);
                }

                if (emergenciaDetails && emergenciaDetails.length > 0) {
                    const firstEmergencia = emergenciaDetails[0]; // Tomamos el primer elemento si es un arreglo
                    fechaHoraInicioInput.value = firstEmergencia.FechaHoraInicio;
                    fechaHoraFinInput.value = firstEmergencia.FechaHoraFin;
                } else {
                    console.error("No se encontraron detalles de emergencia para el vuelo:", flightId);
                }

                // Obtener la descripción de la prioridad de aterrizaje
                const prioridadesAterrizaje = await fetchData(prioridadesAterrizajeUrl);
                const idPrioridadAterrizaje = emergenciaDetails[0].idprioridadaterrizaje;
                const prioridadEncontrada = prioridadesAterrizaje.find(prioridad => prioridad.IdPrioridadAterrizaje === idPrioridadAterrizaje);
                if (prioridadEncontrada) {
                    prioridadSelect.innerHTML = "";
                    const optionPrioridad = document.createElement("option");
                    optionPrioridad.value = prioridadEncontrada.IdPrioridadAterrizaje;
                    optionPrioridad.textContent = prioridadEncontrada.Descripcion;
                    prioridadSelect.appendChild(optionPrioridad);
                } else {
                    console.error("No se encontró la prioridad de aterrizaje para el ID:", idPrioridadAterrizaje);
                }

                const altituddata = await fetchData(altitudemergencia);
                const idAltitudEmergencia = emergenciaDetails[0].idaltitudemergencia;
                const altitudEncontrada = altituddata.find(altitud => altitud.IdAltitudEmergencia === idAltitudEmergencia);
                if (altitudEncontrada) {
                    altitudEmergenciaSelect.innerHTML = "";
                    const optionAltitud = document.createElement("option");
                    optionAltitud.value = altitudEncontrada.IdAltitudEmergencia;
                    optionAltitud.textContent = altitudEncontrada.Altitud;
                    altitudemerge.appendChild(optionAltitud);
                } else {
                    console.error("No se encontró la altitud de emergencia para el ID:", idAltitudEmergencia);
                }


            } catch (error) {
                console.error("Error al obtener los detalles:", error);
            }
        }
    });

    // Obtener datos de la API y crear botones dinámicamente
    fetchData(apiUrl)
        .then(data => {
            if (data && Array.isArray(data)) {
                const flightButtonsContainer = document.getElementById("flightButtonsContainer");

                // Recorrer los datos y crear botones
                data.forEach(emergencia => {
                    const flightButton = document.createElement("button");
                    flightButton.textContent = emergencia.DatoVuelo;
                    flightButton.classList.add("flight-button");
                    flightButtonsContainer.appendChild(flightButton);
                });
            } else {
                console.error("La respuesta de la API no es un arreglo válido:", data);
            }
        })
        .catch(error => {
            console.error("Error al obtener los datos de la API:", error);
        });
});