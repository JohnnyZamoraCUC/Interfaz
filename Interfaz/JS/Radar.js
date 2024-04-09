
    var map = L.map('map').setView([10, -83.6], 8); // Ajustar vista para mostrar la ruta

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Crear un nuevo icono personalizado
    var airplaneIcon = L.icon({
        iconUrl: 'https://tiusr26pl.cuc-carrera-ti.ac.cr/Imagenes/Airplane.svg',
    iconSize: [38, 38], // tamaño del icono
    iconAnchor: [22, 94], // punto del icono que corresponderá a la ubicación del marcador
    popupAnchor: [-3, -76] // punto desde donde se abrirá el popup
    });

    // Función para trazar la ruta aérea entre el aeropuerto de origen y destino
    function drawFlightRoute(origin, destination) {
        var controlPoints = [
    'M', origin,
    'Q', [origin[0] - 0.2, origin[1] + 0.5], // Punto de control 1
    [destination[0] + 0.2, destination[1] - 0.5], // Punto de control 2
    'T', destination
    ];
    var bezier = L.curve(controlPoints, {color: 'blue'}).addTo(map);
    map.fitBounds(bezier.getBounds());

    // Agregar un marcador de avión en la ubicación del avión
    L.marker(origin, {icon: airplaneIcon}).addTo(map);
    }

    // Hacer solicitud al API
    fetch('https://tiusr26pl.cuc-carrera-ti.ac.cr/BackendST/api/Vuelos/Obtener')
        .then(response => response.json())
        .then(data => {
            // Obtener las coordenadas del aeropuerto de origen y destino del primer vuelo en los datos
            var origin = [data[0].AeropuertoOLatitud, data[0].AeropuertoOLontigud];
             var destination = [data[0].AeropuertoDLatitud, data[0].AeropuertoDLongitud];

    // Agregar los marcadores de origen y destino al mapa
        var originMarker = L.marker(origin).addTo(map);
        originMarker.bindPopup("<b>Aeropuerto Origen</b><br>Latitud: " + origin[0] + "<br>Longitud: " + origin[1]).openPopup();
        var destinationMarker = L.marker(destination).addTo(map);
        destinationMarker.bindPopup("<b>Aeropuerto Destino</b><br>Latitud: " + destination[0] + "<br>Longitud: " + destination[1]).openPopup();

            // Trazar la ruta aérea entre el aeropuerto de origen y destino
            drawFlightRoute(origin, destination);
        })
        .catch(error => console.error('Error fetching flight data:', error));
 