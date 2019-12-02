window.onload = init;

let video = document.querySelector("video");
let barra = document.querySelector(".barra");

let duracion;

let enCurso = true;

let anuncioActivado = true;

let contador = 10;

function init() {
    
    console.log("** Inicializanzo funciones... **");
    document.querySelector(".silenciar").addEventListener("click", silenciar);
    document.querySelector(".playy").addEventListener("click", reproducir);
    document.querySelector(".retroceder").addEventListener("click", retroceder);
    document.querySelector(".avanzar").addEventListener("click", avanzar);
    
    document.querySelector(".reiniciar").addEventListener("click", reiniciar);
    document.querySelector(".bajarVol").addEventListener("click", bajarVol);
    document.querySelector(".subirVol").addEventListener("click", subirVol);
    document.querySelector(".cruz").addEventListener("click", eliminarAnuncio);

    let videosLateral = document.querySelectorAll(".videos > video");

    videosLateral.forEach(item => item.addEventListener("click", videos));

    document.querySelectorAll("video").forEach(item => item.addEventListener(("contextmenu"), event => event.preventDefault()));

    document.querySelectorAll("video").forEach(item => item.addEventListener("click", reproducir));

    anuncioActivado = true;

    barra.setAttribute("max", Math.round(video.duration));
    barra.setAttribute("value", 0);

    duracion = Math.round(video.duration);
}

function videos() {

    video.reset
    video.src = this.querySelector("source").src;
    video.currentTime = 0;
    video.pause;

    video.onloadedmetadata = function() {
        barra.setAttribute("max", Math.round(video.duration));
        barra.setAttribute("value", 0);

        duracion = Math.round(video.duration);

        //barraProgreso();
    };

    ponerAnuncio();
    anuncio();
}

// Hacemos un nonito asíncrono para poder utilizarlo en los bucles
function hacerNonos(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function barraProgreso() {

    let contador = 0;

    while (enCurso && contador < duracion) {
        
        if (barra.value < duracion) {
            barra.value += 1;

            await hacerNonos(1000);
        }

        contador++;
    }

    enCurso = false;

    if (!enCurso) {
        document.querySelector(".playy").classList.remove("pausar");
        document.querySelector(".playy").classList.add("play");
        barra.value = 0;
    }
}

function silenciar() {

    if (video.muted) {
        desmutar();
    } else {
        video.muted = true;
    }
}

function desmutar() {
    video.muted = false;
}

function pausar() {
    video.pause();
    enCurso = false;
}

function reproducir() {

    enCurso = true;

    anuncio();

    if (!video.paused) {
        pausar();
        document.querySelector(".playy").classList.remove("pausar");
        document.querySelector(".playy").classList.add("play");
    } else if (video.paused) {
        document.querySelector(".playy").classList.remove("play");
        document.querySelector(".playy").classList.add("pausar");
        video.play();
    } else {
        document.querySelector(".playy").classList.remove("play");
        document.querySelector(".playy").classList.add("pausar");
        video.currentTime = 0;
        video.play();
    }

    barraProgreso();
}

function retroceder() {
    
    let reproduccionActual = video.currentTime;

    video.currentTime = reproduccionActual - 10;
    barra.value -= 10;
}

function avanzar() {
    
    let reproduccionActual = video.currentTime;

    video.currentTime = reproduccionActual + 10;
    barra.value += 10;
}

function reiniciar() {

    if (video.paused) {
        document.querySelector(".playy").classList.remove("play");
        document.querySelector(".playy").classList.add("pausar");
    }

    barra.value = 0;
    video.currentTime = 0;
    video.play();
}

function bajarVol() {
    video.volume -= 0.1;
}

function subirVol() {
    video.volume += 0.1;
}

async function anuncio() {

    document.querySelector(".cruz").classList.add("ocultarAnuncio");

    while (contador >= 0) {

        if (!anuncioActivado) break;

        document.querySelector(".cuentaAtras").innerText = contador;
        await hacerNonos(1000);

        contador--;
    }

    document.querySelector(".cruz").classList.remove("ocultarAnuncio");
}


function eliminarAnuncio() {
    anuncioActivado = false;
    document.querySelector(".anuncio").classList.add("ocultarAnuncio");
}

function ponerAnuncio() {
    anuncioActivado = true;
    document.querySelector(".anuncio").classList.remove("ocultarAnuncio");
}