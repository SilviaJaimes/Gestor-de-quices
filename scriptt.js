class Quiz {
    constructor (pregunta, opcionUno, opcionDos, opcionTres, opcionCuatro, respuesta) {
        this.pregunta = pregunta;
        this.opcionUno = opcionUno;
        this.opcionDos = opcionDos;
        this.opcionTres = opcionTres;
        this.opcionCuatro = opcionCuatro;
        this.respuesta = respuesta;
        this.completes = false;
    };

    toggleCompleted() {
        this.completed = !this.completed;
    }
};

class ManejoQuiz {
    constructor (){
        this.quizes = [];
    };

    addQuiz(quiz) {
        this.quizes.push(quiz);
    };

    removeQuiz(index) {
        this.quizes.splice(index, 1);
    };

    getQuizes() {
        return this.quizes;
    };
};

const manejoQuiz = new ManejoQuiz ();

const quizForm = document.querySelector('#quiz-form');
const quizPreguntaInput = document.querySelector('#quiz-pregunta');
const quizOpcionUnoInput = document.querySelector('#quiz-opcionUno');
const quizOpcionDosInput = document.querySelector('#quiz-opcionDos');
const quizOpcionTresInput = document.querySelector('#quiz-opcionTres');
const quizOPcionCuatroInput = document.querySelector('#quiz-opcionCuatro');
const quizRespuesta = document.querySelector('#quiz-respuesta');
const quizLista = document.querySelector('#quiz-lista');
let editingIndex = -1;

quizForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const pregunta = quizPreguntaInput.value;
    const opcionUno = quizOpcionUnoInput.value;
    const opcionDos = quizOpcionDosInput.value;
    const opcionTres = quizOpcionTresInput.value;
    const opcionCuatro = quizOPcionCuatroInput.value;
    const respuesta = quizRespuesta.value;

    if(editingIndex !== -1) {
        const quiz = manejoQuiz.getQuizes()[editingIndex];
        quiz.pregunta = pregunta;
        quiz.opcionUno = opcionUno;
        quiz.opcionDos = opcionDos;
        quiz.opcionTres = opcionTres;
        quiz.opcionCuatro = opcionCuatro;
        quiz.respuesta = respuesta;
        editingIndex = -1;
    }
    else {
        const quiz = new Quiz (pregunta, opcionUno, opcionDos, opcionTres, opcionCuatro, respuesta);
        manejoQuiz.addQuiz(quiz);
    };

    renderQuizes();
    quizForm.reset();
});


function renderQuizes () {
    quizLista.innerHTML = "";

    const quizes = manejoQuiz.getQuizes();

    for (let i = 0; i < quizes.length; i++) {
        const quiz = quizes[i];
        const listaItem = document.createElement("li");
        listaItem.innerHTML = `
            <h3>${quiz.pregunta}</h3><br>
            <input type="radio" name="opcion">
            <span>a) ${quiz.opcionUno}</span><br>
            <input type="radio" name="opcion">
            <span>b) ${quiz.opcionDos}</span><br>
            <input type="radio" name="opcion">
            <span>c) ${quiz.opcionTres}</span><br>
            <input type="radio" name="opcion">
            <span>d) ${quiz.opcionCuatro}</span><br>
            <span>Respuesta correcta: ${quiz.respuesta}</span><br>
            <button class="btn btn-primary" id="editar" onclick="editarQuiz(${i})">Editar</button>
            <button class="btn btn-danger" id="eliminar" onclick="removeQuiz(${i})">Eliminar</button>
        `;

        if (i === editingIndex) {
            quizPreguntaInput.value = quiz.pregunta;
            quizOpcionUnoInput.value = quiz.opcionUno;
            quizOpcionDosInput.value = quiz.opcionDos;
            quizOpcionTresInput.value = quiz.opcionTres;
            quizOPcionCuatroInput.value = quiz.opcionCuatro;
            quizRespuesta.value = quiz.respuesta;
        };

        quizLista.appendChild(listaItem);
    };
};

function toggleQuizCompleted(index) {
    const quiz = manejoQuiz.getQuizes()[index];
    quiz.toggleCompleted();
    editingIndex = -1;
    renderQuizes();
}

function removeQuiz (index) {
    manejoQuiz.removeQuiz(index);
    renderQuizes();
};

function editarQuiz(index) {
    editingIndex = index;
    renderQuizes();
}

renderQuizes();