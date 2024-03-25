
//JS PARA MOSTRAR LABELS
const apiUrl = 'https://tiusr26pl.cuc-carrera-ti.ac.cr/BackendST/api/Labels/ObtenerLabels';

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
            return '';
        });
}

const elementos = document.querySelectorAll('[id]');
elementos.forEach(elemento => {
    buscarDescripcionDesdeApi(elemento.id)
        .then(descripcion => {
            elemento.textContent = descripcion || elemento.id;
        });
});




