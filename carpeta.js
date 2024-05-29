// Datos simulados de plantas (podrían provenir de una base de datos o una API)
const plantData = [
    { nombre: "Girasol", cuidados: "Riego moderado, luz solar directa", crecimiento: "Altura: 1.5m, Floración: Verano" },
    { nombre: "Cactus", cuidados: "Riego escaso, luz indirecta", crecimiento: "Altura: 20-30cm, Floración: Primavera" },
    { nombre: "Albahaca", cuidados: "Riego regular, luz solar directa", crecimiento: "Altura: 30-60cm, Floración: Verano" },
    { nombre: "Chile Habanero", cuidados: "Riego moderado, luz solar directa", crecimiento: "Altura: 60-90cm, Fructificación: Verano a Otoño" },
    { nombre: "Tomate", cuidados: "Riego regular, luz solar directa", crecimiento: "Altura: 1-2m, Fructificación: Verano a Otoño" },
    { nombre: "Sábila", cuidados: "Riego escaso, luz solar indirecta", crecimiento: "Altura: 60-90cm, Floración: Verano" },
    // Agrega más datos de plantas según sea necesario
];

// Variable para almacenar las plantas que están abiertas actualmente
let openPlantLists = {};

// Función para generar la lista de plantas en el HTML
function renderPlantList() {
    const plantList = document.getElementById("plantList");
    plantData.forEach(plant => {
        const listItem = document.createElement("li");
        listItem.textContent = plant.nombre;
        listItem.addEventListener("click", () => togglePlantDetails(plant, listItem));
        plantList.appendChild(listItem);
    });
}

// Función para mostrar o ocultar los detalles de una planta específica
function togglePlantDetails(plant, listItem) {
    if (openPlantLists[plant.nombre]) {
        // Si la lista ya está abierta, la cerramos
        const plantInfo = document.getElementById(`${plant.nombre}-info`);
        plantInfo.remove();
        openPlantLists[plant.nombre] = false;
    } else {
        // Si la lista no está abierta, la abrimos y cerramos las otras de la misma planta
        closeAllPlantLists(plant.nombre);
        const plantInfo = document.createElement("div");
        plantInfo.id = `${plant.nombre}-info`;
        plantInfo.innerHTML = `
            <h3>${plant.nombre}</h3>
            <p><strong>Cuidados:</strong> ${plant.cuidados}</p>
            <p><strong>Crecimiento:</strong> ${plant.crecimiento}</p>
        `;
        listItem.appendChild(plantInfo);
        openPlantLists[plant.nombre] = true;
    }
}

// Función para cerrar todas las listas de plantas excepto la seleccionada
function closeAllPlantLists(selectedPlantName) {
    for (const plantName in openPlantLists) {
        if (plantName !== selectedPlantName && openPlantLists[plantName]) {
            const plantInfo = document.getElementById(`${plantName}-info`);
            plantInfo.remove();
            openPlantLists[plantName] = false;
        }
    }
}

// Función para validar si el archivo seleccionado es una imagen
function isValidImage(file) {
    return file.type.startsWith('image/');
}

// Función para escanear un código QR desde una imagen
function scanQRCodeFromImage(file) {
    if (!isValidImage(file)) {
        alert("¡El archivo seleccionado no es una imagen válida!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        // Aquí va el código para escanear el código QR desde la imagen
    };
    reader.readAsDataURL(file);
}

// Event listener para el cambio en el input de archivo
document.getElementById("fileInput").addEventListener("change", event => {
    const file = event.target.files[0];
    if (file) {
        scanQRCodeFromImage(file);
    }
});

// Generar la lista de plantas al cargar la página
window.addEventListener("DOMContentLoaded", renderPlantList);
