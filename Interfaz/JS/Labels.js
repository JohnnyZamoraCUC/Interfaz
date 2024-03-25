const apiUrl = 'https://tiusr26pl.cuc-carrera-ti.ac.cr/BackendST/api/Labels/ObtenerLabels';

// Función para obtener la descripción correspondiente al ID de la etiqueta del API
function buscarDescripcionDesdeApi(idElemento) {
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un problema al obtener los datos.');
            }
            return response.json();
        })
        .then(data => {
            const elemento = data.find(item => item.Nombre === idElemento);
            return elemento ? elemento.Descripcion : '';
        })
        .catch(error => {
            console.error('Se produjo un error:', error);
            return ''; // Devuelve una cadena vacía en caso de error
        });
}

// Obtener todas las etiquetas con el atributo "id"
const elementos = document.querySelectorAll('[id]');

// Iterar sobre las etiquetas y actualizar su contenido
elementos.forEach(elemento => {
    buscarDescripcionDesdeApi(elemento.id)
        .then(descripcion => {
            elemento.textContent = descripcion || elemento.id;
        });
});