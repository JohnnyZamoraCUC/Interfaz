$(document).ready(function () {
    // Mostrar el menú lateral automáticamente al cargar la página
    $('#menuLateral').css('left', '0');
    $('#contenidoPrincipal').css('margin-left', '250px'); // Ajusta el contenido principal

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
    } else {
        console.log('No se recibió respuesta del API.');
    }
});

