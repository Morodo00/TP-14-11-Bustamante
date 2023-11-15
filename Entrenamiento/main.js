// Desestructuración de la función log del objeto console
const { log } = console;

// Obtener referencias a elementos del DOM
const nav = document.getElementById("nav");
const ejercicioHtml = document.getElementById("ejercicio-cat");
const filtrar = document.getElementById("filtrar");

// Mostrar en la consola el elemento con id "filtrar"
log(filtrar);

// Declaración de un arreglo vacío para almacenar datos
let data = [];

// Función asincrónica para obtener datos desde el archivo JSON
async function obtenerDatos() {
    await fetch("./data.json")
        .then(async respuesta => {
            data = await respuesta.json();
            mostrarTarjetas(data);
        });
}

// Función para crear el HTML de una tarjeta de ejercicio
function crearTarjetaHtml(ejercicio) {
    const { nombre, imagen, categoria, serie, repeticiones, video } = ejercicio;
    return `
        <div class="card">
            <h3>${nombre}</h3>
            <img src="${imagen}" alt="" class="img-card" />
            <div class="info-card">
                <span>${categoria}</span>
                <div class="descripcion">
                    <ul>
                        <li><i class="fa-solid fa-dumbbell"></i>Series:${serie}</li>
                        <li><i class="fa-solid fa-dumbbell"></i>Repeticiones:${repeticiones}</li>
                    </ul>
                    <span><a href="${video}" target="_blank">Video Descriptivo </a></span>
                </div>
            </div>
        </div>
    `;
}

// Función para mostrar las tarjetas de ejercicio en el DOM
function mostrarTarjetas(arrayDeEjercicio) {
    ejercicioHtml.innerHTML = arrayDeEjercicio.map(ejercicio => crearTarjetaHtml(ejercicio)).join("");
}

// Función para aplicar filtros a los datos
function aplicarFiltros(e) {
    if (e.target.classList.contains("btn-categoria")) {
        if (e.target.value === "Todos") {
            mostrarTarjetas(data);
        } else {
            let valor = e.target.value;
            let daltosFiltrados = data.filter(ejercicio => ejercicio.categoria === valor);
            mostrarTarjetas(daltosFiltrados);
        }
    }
}

// Función principal de inicialización
function iniciar() {
    // Llamada a la función para obtener datos
    obtenerDatos();
    
    // Evento click en el botón de filtrar
    filtrar.addEventListener("click", aplicarFiltros);
}

// Llamada a la función principal de inicialización
iniciar();
