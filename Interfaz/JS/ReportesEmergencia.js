
        document.addEventListener('DOMContentLoaded', () => {
            const apiUrl = 'https://tiusr26pl.cuc-carrera-ti.ac.cr/BackendST/api/Emergencia/ObtenerReportes';

            const fetchEmergencyData = async () => {
                try {
                    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
                } catch (error) {
        console.error('Error fetching emergency data:', error);
    return [];
                }
            };

            const renderEmergencyCards = async () => {
                const container = document.getElementById('cardreportdinamicContainer');
    const emergencies = await fetchEmergencyData();

                emergencies.forEach(emergency => {
                    const card = document.createElement('div');
    card.classList.add('card', 'm-1');
    card.style.width = '10rem';

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-primary', 'btn-vuelo');
    button.textContent = `Vuelo ${emergency.DatoVuelo}`;
    button.dataset.emergencyId = emergency.IdEmergencia;

                    button.addEventListener('click', () => {
        openFlightDetailsModal(emergency);
                    });

    cardBody.appendChild(button);
    card.appendChild(cardBody);
    container.appendChild(card);
                });
            };

            const openFlightDetailsModal = (emergency) => {
                const modalTitle = document.getElementById('staticBackdropLabel');
    modalTitle.textContent = `Detalles del Vuelo ${emergency.DatoVuelo}`;

    const modalBody = document.querySelector('#staticBackdrop .modal-body');
    modalBody.innerHTML = ''; // Limpiar el contenido previo del modal

    // Crear elementos para mostrar todos los detalles del vuelo
    const detailsList = document.createElement('ul');
    detailsList.classList.add('list-group');

    const flightDetails = Object.entries(emergency);

                flightDetails.forEach(([key, value]) => {
                    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.innerHTML = `<strong>${key}:</strong> ${value}`;
    detailsList.appendChild(listItem);
                });

    // Agregar la lista de detalles al modal body
    modalBody.appendChild(detailsList);

    // Mostrar el modal de Detalles del Vuelo
    const flightModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    flightModal.show();
            };

    const flightModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));

            // Limpiar el modal cuando se cierra
            flightModal._element.addEventListener('hidden.bs.modal', () => {
                const modalBody = document.querySelector('#staticBackdrop .modal-body');
    modalBody.innerHTML = ''; // Limpiar el contenido del modal al cerrarlo
            });

    renderEmergencyCards();
        });

