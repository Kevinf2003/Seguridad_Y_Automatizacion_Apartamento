let video = null;
let detector = null;
let detections = [];
let videoVisibility = true;
let detecting = false;
let habitacion = document.querySelector("#cuartoM")
let puerta = document.querySelector("#puerta1")
let ventana = document.querySelector("#ventana1")
let interaccionP = true;
let interaccionV = true;
let interaccionL = true;
let userName = null;

const videoAction = document.getElementById('videoAction');
const detectionAction = document.getElementById('detectionAction');

function registerUser() {

    const nameInput = document.querySelector('#nameInput');
    const name = nameInput.value.trim();

    if (!name) {
        alert('Por favor ingrese su nombre');
        return;
    }

    userName = name;

    const registerForm = document.querySelector('#registerForm');
    registerForm.style.display = 'none';

    const greeting = `Hola ${userName}, gracias por registrarte. Espero que te sientas cómodo en nuestro sistema.`;
    artyom.say(greeting);
}

const registerBtn = document.querySelector('#registerBtn');
registerBtn.addEventListener('click', function () {
    const registerForm = document.querySelector('#registerForm');
    registerForm.style.display = 'block';
});

const submitBtn = document.querySelector('#submitBtn');
submitBtn.addEventListener('click', function () {
    registerUser();
});

function toggleDoors() {
    if (interaccionP) {
        interaccionP = false;
    } else {
        interaccionP = true;
    }
}

function toggleWindows() {
    if (interaccionV) {
        interaccionV = false;
    } else {
        interaccionV = true;
    }
}

function toggleLights() {
    if (interaccionL) {
        interaccionL = false;
    } else {
        interaccionL = true;
    }
}

document.body.style.cursor = 'wait';

function preload() {
    detector = ml5.objectDetector('cocossd');
}

function setup() {
    const canvasContainer = document.querySelector('#canvasContainer');
    const canvas = createCanvas(640, 480);
    canvas.parent(canvasContainer);
    video = createCapture(VIDEO);
    video.size(640, 480);
}

function draw() {
    if (!video || !detecting) return;
    image(video, 0, 0);
    for (let i = 0; i < detections.length; i++) {
        drawResult(detections[i]);
    }
}

function onDetected(error, results) {
    if (error) {
        console.error(error);
    }
    detections = results;

    if (detecting) {
        detect();
    }
    if (detections[0].label === "person" || detections[0].label === "dog") {
        artyom.say("HAY ALGUIEN EN LA PUERTA, BIENVENIDO");
        toggleDetecting();
    }
}

function detect() {
    detector.detect(video, onDetected);
}

function toggleVideo() {
    if (!video) return;
    if (videoVisibility) {
        video.hide();
        videoAction.innerText = 'Activar Video';
    } else {
        video.show();
        videoAction.innerText = 'Desactivar Video';
    }
    videoVisibility = !videoVisibility;
}

function toggleDetecting() {
    if (!video || !detector) return;

    detectionAction.disabled = true;

    if (!detecting) {
        detect();
        detectionAction.innerText = 'Parar...';
    } else {
        detectionAction.innerText = 'Detectar Objetos';
    }


    setTimeout(function () {
        detectionAction.disabled = false;
    }, 1000);

    detecting = !detecting;
}

var artyom = new Artyom();

function toggleAudio() {
    artyom.say("sonido activado");
}

artyom.addCommands({
    indexes: ["ABRIR PUERTA",
        "CERRAR PUERTA",
        "ABRIR VENTANA",
        "CERRAR VENTANA",
        "ENCENDER LUZ",
        "APAGAR LUZ",
        "CAMBIAR AL CUARTO PRINCIPAL",
        "CAMBIAR AL CUARTO INDIVIDUAL",
        "CAMBIAR A SALA-COMEDOR",
        "CAMBIAR AL PRIMER BAÑO",
        "CAMBIAR A LA COCINA",
        "CAMBIAR AL SEGUNDO BAÑO",
        "CAMBIAR A LA LAVANDERÍA"],
    action: function (i) {
        if (i == 0) {
            if (interaccionP) {
                if (puerta) {
                    artyom.say("ABRIENDO PUERTA");
                    puerta.style.background = "green";
                    console.log("Puerta abierta");
                } else {
                    console.log("No se pudo encontrar la puerta.");
                    artyom.say("No se pudo encontrar la puerta");
                }
            } else {
                artyom.say("Las puertas están desactivadas")
            }
        } else if (i == 1) {
            if (interaccionP) {
                if (puerta) {
                    artyom.say("CERRANDO PUERTA");
                    puerta.style.background = "brown";
                    console.log("Puerta cerrada");
                } else {
                    console.log("No se pudo encontrar la puerta.");
                    artyom.say("No se pudo encontrar la puerta");
                }
            } else {
                artyom.say("Las puertas están desactivadas")
            }
        }
        else if (i == 2) {
            if (interaccionV) {
                if (ventana) {
                    artyom.say("ABRIENDO VENTANA");
                    puerta.style.background = "gray";
                    console.log("Ventana abierta");
                } else {
                    console.log("No se pudo encontrar la ventana");
                    artyom.say("No se pudo encontrar la ventana");
                }
            } else {
                artyom.say("Las ventanas están desactivadas")
            }

        } else if (i == 3) {
            if (interaccionV) {
                if (ventana) {
                    artyom.say("CERRANDO VENTANA");
                    puerta.style.background = "cyan";
                    console.log("ventana cerrada");
                } else {
                    console.log("No se pudo encontrar la ventana.");
                    artyom.say("No se pudo encontrar la ventana");
                }
            } else {
                artyom.say("Las ventanas están desactivadas")
            }
        } else if (i == 4) {
            if (interaccionL) {
                artyom.say("LUZ ENCENDIDA")
                habitacion.style.background = "yellow";
                console.log("Encendiendo luz")
            } else {
                artyom.say("Las luces están desactivadas")
            }
        } else if (i == 5) {
            if (interaccionL) {
                artyom.say("LUZ APAGADA")
                habitacion.style.background = "#b3daff"
            } else {
                artyom.say("Las luces están desactivadas")
            }
        } else if (i == 6) {
            artyom.say("CAMBIANDO AL CUARTO PRINCIPAL")
            habitacion = document.querySelector("#cuartoM")
            puerta = document.querySelector("#puerta1")
            ventana = document.querySelector("#ventana1")
        } else if (i == 7) {
            artyom.say("CAMBIANDO AL CUARTO INDIVIDUAL")
            habitacion = document.querySelector("#cuartoI")
            puerta = document.querySelector("#puerta2")
            ventana = document.querySelector("#ventana3")
        } else if (i == 8) {
            artyom.say("CAMBIANDO A LA SALA COMEDOR")
            habitacion = document.querySelector("#sala")
            puerta = document.querySelector(null)
            ventana = document.querySelector("#ventana2")
        } else if (i == 9) {
            artyom.say("CAMBIANDO AL PRIMER BAÑO")
            habitacion = document.querySelector("#baño1")
            puerta = document.querySelector("#puerta3")
            ventana = document.querySelector("#ventana4")
        } else if (i == 10) {
            artyom.say("CAMBIANDO A LA COCINA")
            habitacion = document.querySelector("#cocina")
            puerta = document.querySelector("#puerta4")
            ventana = document.querySelector("#ventana5")
        } else if (i == 11) {
            artyom.say("CAMBIANDO AL SEGUNDO BAÑO")
            habitacion = document.querySelector("#baño2")
            puerta = document.querySelector("#puerta5")
            ventana = document.querySelector("#ventana6")
        } else if (i == 12) {
            artyom.say("CAMBIANDO A LA LAVANDERÍA")
            habitacion = document.querySelector("#lavanderia")
            puerta = document.querySelector("#puerta6")
            ventana = document.querySelector("#ventana7")
        }
    }
});

artyom.initialize({
    lang: "es-ES",
    debug: true,
    listen: true,
    continuous: true,
    speed: 0.9,
    mode: "normal"
});

artyom.redirectRecognizedTextOutput(function (recognized, isFinal) {
    if (isFinal) {
        console.log("Texto final reconocido: " + recognized);
    } else {
        console.log(recognized);
    }
});