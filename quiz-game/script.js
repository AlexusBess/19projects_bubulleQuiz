// DOM elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
    {
        quesiton: "Bubulle est de quelle couleur ?",
        answers: [
            {   text: "Noir", correct: false    },
            {   text: "Rousse", correct: false    },
            {   text: "Rouquemoute", correct: true    },
            {   text: "Blanche", correct: false    }
        ]
    },

    {
        quesiton: "Bubulle est née en quelle année ?",
        answers: [
            {   text: "2014", correct: false    },
            {   text: "2015", correct: true    },
            {   text: "2016", correct: false    },
            {   text: "2017", correct: false    }
        ]
    },

    {
        quesiton: "Que fait Bubulle lorsqu'elle rencontre quelqu'un pour la première fois ?",
        answers: [
            {   text: "Elle mange", correct: false    },
            {   text: "Elle bois", correct: false    },
            {   text: "Elle fait caca", correct: false    },
            {   text: "Elle sonde le tréfond de ton ÂME", correct: true    }
        ]
    },

    {
        quesiton: "Que fait Bubulle pour exrimer son mécontentement ?",
        answers: [
            {   text: "Elle soufle du nez", correct: true    },
            {   text: "Elle bave de la bouche", correct: false    },
            {   text: "Elle pète du cul", correct: false    },
            {   text: "D, la réponse D", correct: false    }
        ]
    },

    {
        quesiton: "Et enfin, quelle est l'activité principale de Bubulle ?",
        answers: [
            {   text: "Dormir", correct: false    },
            {   text: "Bouffer", correct: false    },
            {   text: "Chier", correct: false    },
            {   text: "Harceler ses humains pour demander des câlins et de l'eau et des croquettes", correct: true    }
        ]
    },
]

// Quiz state vars
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion()
}

function showQuestion () {
    // reset state
    answersDisabled = false;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answers-btn");

        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);
    });
}

function selectAnswer(event) {
    if (answersDisabled) return;

    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else if(button === selectedButton) {
            button.classList.add("incorrect");
        }
    });

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;

        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1000)
}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    if (percentage === 100) {
        resultMessage.textContent = "Bravo, tu as Bubulle dans la peau !";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Tu la connais bien, c'est pas trop mal.";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Bon va faloir la voir plus souvent.";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Euh, ok...";
    } else {
        resultMessage.textContent = "Bubulle te juge très très fortement."
    };
}

function restartQuiz() {
    resultScreen.classList.remove("active");

    startQuiz();
}