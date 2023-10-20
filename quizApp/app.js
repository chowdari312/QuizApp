const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Madrid", "Berlin", "Paris", "Rome"],
        correctAnswer: 2,
        selectedAnswer: null
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
        selectedAnswer: null
    },
    {
        question: "How many continents are there in the world?",
        choices: ["5", "6", "7", "8"],
        correctAnswer: 2,
        selectedAnswer: null
    },
    {
        question: "What is the largest mammal in the world?",
        choices: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correctAnswer: 1,
        selectedAnswer: null
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        choices: ["William Shakespeare", "Charles Dickens", "Jane Austen", "George Orwell"],
        correctAnswer: 0,
        selectedAnswer: null
    }
];

let currentQuestion = 0;
let score = 0;
let quizCompleted = false;

function displayQuestion() {
    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    questionElement.textContent = questions[currentQuestion].question;
    choicesElement.innerHTML = "";

    for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
        const choice = questions[currentQuestion].choices[i];
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        if (questions[currentQuestion].selectedAnswer === i) {
            choiceButton.classList.add("selected");
        }
        choiceButton.addEventListener("click", () => selectChoice(i));
        choicesElement.appendChild(document.createElement("li")).appendChild(choiceButton);
    }

    prevButton.disabled = currentQuestion === 0;
    nextButton.disabled = currentQuestion === questions.length - 1;
}

function selectChoice(index) {
    questions[currentQuestion].selectedAnswer = index;
    displayQuestion();
}

function prevQuestion() {
    currentQuestion--;
    displayQuestion();
}

function nextQuestion() {
    currentQuestion++;
    displayQuestion();
}
function submitQuiz() {
    let totalScore = 0;
    for (const question of questions) {
        if (question.selectedAnswer === question.correctAnswer) {
            totalScore++;
        }
    }
    const resultElement = document.getElementById("result");
    const scoreElement = document.getElementById("score");
    const quizControls = document.getElementById("quiz-controls");
    resultElement.textContent = `Your score: ${totalScore} out of ${questions.length}`;
    scoreElement.textContent = totalScore;
    resultElement.classList.remove("hidden");
    quizCompleted = true;
    document.getElementById("restart").removeAttribute("disabled");
}
function restartQuiz() {
    currentQuestion = 0;
    quizCompleted = false;
    document.getElementById("restart").setAttribute("disabled", true);
    for (const question of questions) {
        question.selectedAnswer = null;
    }
    displayQuestion();
}

displayQuestion();