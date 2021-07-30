// Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail')

const er = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;

// Variables de forumulario
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');


eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', iniciarApp);
    
    // Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    // Enviar email
    formulario.addEventListener('submit', enviarEmail);

    // Resetear formulario
    btnReset.addEventListener('click', resetForm);
}



// Funciones

function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

function validarFormulario(e) { 

    if (e.target.value.length > 0) {
        
        //elimina los errores 
        const error = document.querySelector('p.error');
        if (error) {
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    }else{
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son requeridos');
    }
    
    if (e.target.type === 'email') {

        if (er.test( e.target.value )) {
            // Elimina errores
            const error = document.querySelector('p.error');
            if (error) {
                error.remove();
            }
    
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else{
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no valido');
        }
    }

    if (er.test( email.value ) && asunto.value != '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if (errores.length === 0) {
        formulario.appendChild(mensajeError);
    }
}

function enviarEmail(e) {
    e.preventDefault();

    // Mostrar spiner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    // Ocultar botones
    const botones = document.querySelector('div .flex');
    botones.style.display = 'None';

    // Despues de 3 segundos se oculpta el spiner
    setTimeout(() => {
        spinner.style.display = 'None';
        botones.style.display = 'Flex';

        // Mnesaje de confirmacion de mensaje
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje a sido enviado con exito';
        parrafo.classList.add('border', 'border-green-500', 'bg-green-100', 'text-white-500', 'p-3', 'mt-5', 'mb-5', 'text-center');
        
        // Inserta el parrafo antes del spiner
        formulario.insertBefore(parrafo, spinner);
        
        // Rsetear mensaje
        setTimeout(() => {
            parrafo.remove();
            resetForm(e);
        }, 3000);

    }, 2000);
}


// Resetear el formilario
function resetForm(e) {
    e.preventDefault();
    
    formulario.reset();
    iniciarApp();
}