document.addEventListener("DOMContentLoaded", function () {
    const dropdownContents = {
        lblAirplaneLanding: ["Opción 1", "Opción 2", "Opción 3"],
        lblAirplaneApproach: ["Opción A", "Opción B", "Opción C"],
        lblEmergencyReports: ["Emergencia 1", "Emergencia 2", "Emergencia 3"]
    };

    function createDropdown(options) {
        const dropdown = document.createElement("ul");
        dropdown.classList.add("dropdown-menu");

        options.forEach((option) => {
            const listItem = document.createElement("li");
            const anchor = document.createElement("a");
            anchor.href = "#";
            anchor.textContent = option;
            listItem.appendChild(anchor);
            dropdown.appendChild(listItem);
        });

        return dropdown;
    }

    function showDropdown(event) {
        const targetId = event.target.id;
        const dropdownContainer = document.getElementById(targetId);

        if (dropdownContainer) {
            // Eliminar el dropdown anterior si existe
            const existingDropdown = dropdownContainer.querySelector(".dropdown-menu");
            if (existingDropdown) {
                existingDropdown.remove();
            }

            // Crear el nuevo dropdown con las opciones correspondientes
            const options = dropdownContents[targetId];
            const newDropdown = createDropdown(options);

            // Adjuntar el dropdown al contenedor del enlace
            dropdownContainer.appendChild(newDropdown);
        }
    }

    function hideDropdown(event) {
        const targetId = event.target.id;
        const dropdownContainer = document.getElementById(targetId);

        if (dropdownContainer) {
            const existingDropdown = dropdownContainer.querySelector(".dropdown-menu");
            if (existingDropdown) {
                existingDropdown.remove();
            }
        }
    }

    // Adjuntar eventos a los enlaces
    const links = document.querySelectorAll('a[id^="lbl"]');
    links.forEach((link) => {
        link.addEventListener("mouseover", showDropdown);
        link.addEventListener("mouseout", hideDropdown);
    });
});
