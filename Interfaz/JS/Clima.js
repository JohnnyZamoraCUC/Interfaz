var map = L.map('map').setView([9.9281, -84.0907], 13); // Coordenadas de San José
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 50,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var planeIcon = L.icon({
    iconUrl: '/Imagenes/modo-avion.png',
    iconSize: [50, 50],
    iconAnchor: [25, 25],
    popupAnchor: [0, -25]
});

// Agregar marcador de avión en San José
var planeMarker = L.marker([9.9281, -84.0907], { icon: planeIcon }).addTo(map);
planeMarker.bindPopup("<b>San José</b>").openPopup();

// función para obtener las coordenadas del destino y cargar la información del clima
function loadWeatherInfo(destination) {
    fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(destination))
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                var lat = parseFloat(data[0].lat);
                var lon = parseFloat(data[0].lon);
                map.setView([lat, lon], 13); // Centrar el mapa en las coordenadas del destino
                planeMarker.setLatLng([lat, lon]); // Posicionar el marcador del avión en las coordenadas del destino
                planeMarker.bindPopup("<b>" + destination + "</b>").openPopup(); // Mostrar el nombre del destino en el popup del marcador
                updateWeatherInfo(lat, lon); // Cargar automáticamente la información del clima del destino
            } else {
                console.error('No se encontraron resultados para el destino:', destination);
            }
        })
        .catch(error => console.error('Error al obtener las coordenadas del destino:', error));
}

// Agregar event listener al botón "Clima" en cada carta de vuelo
document.querySelectorAll('.btn-dark').forEach(button => {
    button.addEventListener('click', function () {
        var destination = this.closest('.card').querySelector('.destination').textContent;
        loadWeatherInfo(destination);
    });
});

// función para actualizar la información del clima del destino
function updateWeatherInfo(lat, lon) {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric&appid=8bc72b3287c3a1c3d10858c7744eb76b')
        .then(response => response.json())
        .then(data => {
            document.getElementById('weather-description').textContent = 'Descripción: ' + data.weather[0].description;
            document.getElementById('temperature').textContent = 'Temperatura: ' + data.main.temp + ' °C';
            document.getElementById('humidity').textContent = 'Humedad: ' + data.main.humidity + '%';
            document.getElementById('wind-speed').textContent = 'Velocidad del viento: ' + data.wind.speed + ' m/s';
            document.getElementById('city-country').textContent = 'Ciudad, País: ' + data.name + ', ' + data.sys.country;
            document.getElementById('coordinates').textContent = 'Coordenadas: Latitud ' + lat.toFixed(6) + ', Longitud ' + lon.toFixed(6);

            var windDegree = data.wind.deg;
            var windDirection = getWindDirection(windDegree);
            document.getElementById('wind-direction').textContent = 'Dirección del viento: ' + windDirection;
        })
        .catch(error => console.error('Error al obtener datos del clima:', error));
}


// función para obtener la dirección del viento
function getWindDirection(degrees) {
    var directions = ['Norte', 'Noreste', 'Este', 'Sureste', 'Sur', 'Suroeste', 'Oeste', 'Noroeste'];
    var index = Math.round((degrees % 360) / 45);
    return directions[index];
}

// función para actualizar la fecha y hora
function updateDateTime() {
    var currentTime = new Date();
    var dateTimeString = currentTime.toLocaleString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
    document.getElementById('current-time').textContent = dateTimeString;
}

// actualizar fecha y hora cada segundo
setInterval(updateDateTime, 1000);

//Menu
document.getElementById('toggle-menu').addEventListener('click', function () {
    document.querySelector('.menu').classList.toggle('show');
});

// Agregar event listener al mapa para obtener las coordenadas al hacer clic
map.on('click', function (e) {
    var lat = e.latlng.lat;
    var lon = e.latlng.lng;
    loadWeatherInfoByCoordinates(lat, lon);
});

// función para cargar la información del clima utilizando las coordenadas
function loadWeatherInfoByCoordinates(lat, lon) {
    updateMarkerPosition(lat, lon); // Actualizar la posición del marcador
    updateWeatherInfo(lat, lon); // Obtener y mostrar la información del clima
}

// función para actualizar la posición del marcador en el mapa
function updateMarkerPosition(lat, lon) {
    planeMarker.setLatLng([lat, lon]); // Posicionar el marcador del avión en las coordenadas del destino
    map.setView([lat, lon], 13); // Centrar el mapa en las coordenadas del destino
}
