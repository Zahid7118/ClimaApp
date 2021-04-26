//definir los elementos del DOM
let pantallaPrincipal = document.getElementById('pantalla');
let lugar = document.getElementById('lugar');
let temperatura = document.getElementById('temperatura-grados');
let descripcion = document.getElementById('descripcion');
let imagen = document.getElementsByTagName('img');
let temperaturaMinima = document.getElementById('temp-minima');
let temperaturaMinimaDescripcion = document.getElementById('temp-minima-des');
let temperaturaMaxima = document.getElementById('temp-maxima');
let temperaturaMaximaDescripcion = document.getElementById('temp-maxima-des');
let humedad = document.getElementById('hum');
let humedadDescripcion = document.getElementById('hum-des');
let elegirCiudad = document.getElementById('ciudades');
let animacion = 0;
//variables a utlizar
let temperaturaActual;
let temperaturaMinimaActual;
let temperaturaMaximaActual;
let descripcionTemperatura;
let humedadActual;
let ciudad;


//event para registrar cambio en el select 
elegirCiudad.onchange = function() {
    if (elegirCiudad.value !== '0') {
        obtenerClima(elegirCiudad.value);
    } else {
        location.reload();
    }
}

function obtenerClima(ciudad) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&lang=es&appid=3e7ced112385369bc87b1f341448ce8a`;
    fetch(api)
        .then(response => response.json())
        .then(
            data => asignarValores(data)
        );
}

function asignarValores(data) {
    descripcionTemperatura = data.weather[0].description;
    temperaturaActual = calcularGrados(data.main.temp);
    temperaturaMinimaActual = calcularGrados(data.main.temp_min);
    temperaturaMaximaActual = calcularGrados(data.main.temp_max);
    humedadActual = data.main.humidity;
    ciudad = data.name;
    modificarDatos(temperaturaActual, descripcionTemperatura, temperaturaMinimaActual, temperaturaMaximaActual, humedadActual, ciudad);
}

function modificarDatos(temA, des, temMi, temMa, hum, ciu) {
    console.log(animacion);
    lugar.textContent = ciu;
    temperatura.textContent = temA.toFixed(2) + " °";
    descripcion.textContent = des;
    temperaturaMinima.textContent = temMi.toFixed(2) + " °";
    temperaturaMinimaDescripcion.textContent = "Temperatura minima";
    temperaturaMaxima.textContent = temMa.toFixed(2) + " °";
    temperaturaMaximaDescripcion.textContent = "Temperatura maxima";
    humedad.textContent = hum + " %";
    humedadDescripcion.textContent = "Humedad";
    apariencia(temA, des);
}

function apariencia(temp, des) {
    //cambiar css que se enciama con la hoja de estilo?????
    if (temp <= 15) {
        pantallaPrincipal.classList.remove('principal');
        pantallaPrincipal.classList.remove('calor');
        pantallaPrincipal.classList.add('frio');
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Abrigate bien',
            showConfirmButton: false,
            timer: 1500,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    }

    if (temp >= 15) {
        pantallaPrincipal.classList.remove('principal');
        pantallaPrincipal.classList.remove('frio');
        pantallaPrincipal.classList.add('calor');
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Usa ropa comoda',
            showConfirmButton: false,
            timer: 1500,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });

    }

    if (des === "nubes" || des === "muy nuboso" || des === "nubes dispersas" || des === "algo de nubes") {
        imagen[0].src = "img/nubes2.svg";
        imagen[1].src = "img/nubes2.svg";
    } else if (des === "cielo claro") {
        imagen[0].src = "img/soleado.svg";
        imagen[1].src = "img/soleado.svg";
    } else {
        imagen[0].src = "img/lluvia.svg";
        imagen[1].src = "img/lluvia.svg";
    }
}

function calcularGrados(temp) {
    return temp - 273.14;
}