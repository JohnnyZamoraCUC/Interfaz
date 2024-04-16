$(document).ready(function () {
    // Función para consultar el API de vuelos
    function consultarVuelos() {
        // Mostrar el spinner con una transición suave
        $('#spinnerRow').fadeIn('slow');

        $.ajax({
            url: 'https://tiusr26pl.cuc-carrera-ti.ac.cr/BackendST/api/Vuelos/Obtener',
            type: 'GET',
            success: function (response) {
                // Limpiar el contenido de la tabla
                $('#vuelosTableBody').empty();
                // Iterar sobre los vuelos y agregarlos a la tabla
                response.forEach(function (vuelo) {
                    var fila = '<tr>' +
                        '<td>' + vuelo.Aerolinea + '</td>' +
                        '<td>' + vuelo.NumeroVuelo + '</td>' +
                        '<td>' + vuelo.Prioridad + '</td>' +
                        '<td><button type="button" class="btn btn-primary seleccionar" data-codigo="' + vuelo.NumeroVuelo + '">Seleccionar</button></td>' +
                        '</tr>';
                    $('#vuelosTableBody').append(fila);
                });
                // Ocultar el spinner con una transición suave
                $('#spinnerRow').fadeOut('slow');
            },
            error: function (xhr, status, error) {
                console.error('Error al consultar el API de vuelos:', error);
                // Ocultar el spinner en caso de error
                $('#spinnerRow').fadeOut('slow');
            }
        });
    }
    $('#modalEmergencia').on('shown.bs.modal', function (e) {
        consultarVuelos();
    });

    $(document).on('click', '.seleccionar', function () {
        var codigoVuelo = $(this).data('codigo');

        $.ajax({
            url: 'https://tiusr26pl.cuc-carrera-ti.ac.cr/BackendST/api/Vuelos/ObtenerPorCodigo',
            type: 'GET',
            data: { codigoVuelo: codigoVuelo },
            success: function (response) {
                console.log('Respuesta del API:', response);
                localStorage.setItem('respuestaAPI', JSON.stringify(response));
                window.location.href = 'emergencia.html';
            },
            error: function (xhr, status, error) {
                console.error('Error al enviar el código de vuelo al API:', error);
            }
        });
    });


});




