const apiUrl = 'https://tiusr26pl.cuc-carrera-ti.ac.cr/BackendST/api/Labels/ObtenerLabels';

// Función para buscar la descripción desde la API
function buscarDescripcionDesdeApi(idElemento) {
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un problema al obtener los datos.');
            }
            return response.json();
        })
        .then(data => {
            // Busca el elemento en el JSON por el nombre (idElemento)
            const elemento = data.find(item => item.Nombre === idElemento);
            // Retorna la descripción si se encontró, de lo contrario, retorna una cadena vacía
            return elemento ? elemento.Descripcion : '';
        })
        .catch(error => {
            console.error('Se produjo un error:', error);
            return ''; // Retorna una cadena vacía en caso de error
        });
}

// Obtiene todos los elementos del navbar por su ID
const elementos = document.querySelectorAll('a[id^="lbl"], button[id^="btn"]');

// Itera sobre cada elemento para actualizar su contenido
elementos.forEach(elemento => {
    // Obtiene la descripción desde la API y actualiza el texto del elemento
    buscarDescripcionDesdeApi(elemento.id)
        .then(descripcion => {
            // Si la descripción está vacía, se mantiene el ID como texto
            elemento.textContent = descripcion || elemento.id;
        });
});


