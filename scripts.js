const questionPool = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Paris", correct: true },
            { text: "Rome", correct: false },
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Mars", correct: true },
            { text: "Earth", correct: false },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question: "Who wrote 'Hamlet'?",
        answers: [
            { text: "William Shakespeare", correct: true },
            { text: "Charles Dickens", correct: false },
            { text: "Leo Tolstoy", correct: false },
            { text: "Mark Twain", correct: false }
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Pacific Ocean", correct: true },
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false }
        ]
    },
    {
        question: "What is the capital of Japan?",
        answers: [
            { text: "Tokyo", correct: true },
            { text: "Seoul", correct: false },
            { text: "Beijing", correct: false },
            { text: "Bangkok", correct: false }
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            { text: "Leonardo da Vinci", correct: true },
            { text: "Vincent van Gogh", correct: false },
            { text: "Pablo Picasso", correct: false },
            { text: "Claude Monet", correct: false }
        ]
    },
    {
        question: "What is the boiling point of water?",
        answers: [
            { text: "100°C", correct: true },
            { text: "0°C", correct: false },
            { text: "50°C", correct: false },
            { text: "200°C", correct: false }
        ]
    },
    {
        question: "What is the smallest country in the world?",
        answers: [
            { text: "Vatican City", correct: true },
            { text: "Monaco", correct: false },
            { text: "San Marino", correct: false },
            { text: "Liechtenstein", correct: false }
        ]
    },
    {
        question: "What language has the most native speakers?",
        answers: [
            { text: "Mandarin Chinese", correct: true },
            { text: "English", correct: false },
            { text: "Spanish", correct: false },
            { text: "Hindi", correct: false }
        ]
    },
    {
        question: "What is the square root of 64?",
        answers: [
            { text: "8", correct: true },
            { text: "6", correct: false },
            { text: "7", correct: false },
            { text: "9", correct: false }
        ]
    }
];

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const resultContainer = document.getElementById('result-container');
const scoreText = document.getElementById('score-text');
const correctAnswersList = document.getElementById('correct-answers');

let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];

function startQuiz() {
    selectedQuestions = getRandomQuestions(5); // Get a random set of 5 questions
    currentQuestionIndex = 0;
    score = 0;
    questionContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    nextButton.innerText = "Next"; // Reset button text to "Next"
    showQuestion(selectedQuestions[currentQuestionIndex]);
}

function getRandomQuestions(num) {
    const shuffled = questionPool.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = '';

    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(button, answer));
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(button, answer) {
    if (answer.correct) {
        score++;
        button.style.backgroundColor = 'green';
    } else {
        button.style.backgroundColor = 'red';
    }
    Array.from(answerButtonsElement.children).forEach(btn => btn.disabled = true);
    nextButton.classList.remove('hidden');
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion(selectedQuestions[currentQuestionIndex]);
        nextButton.classList.add('hidden');
    } else {
        showResult();
        nextButton.innerText = "Restart"; // Change button text to "Restart"
    }
}

function showResult() {
    questionContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    scoreText.innerText = `Your Score: ${score}/${selectedQuestions.length}`;
    
    correctAnswersList.innerHTML = '';
    selectedQuestions.forEach((question, index) => {
        const correctAnswer = question.answers.find(answer => answer.correct);
        const listItem = document.createElement('p');
        listItem.innerText = `${index + 1}. ${question.question} - Correct Answer: ${correctAnswer.text}`;
        correctAnswersList.appendChild(listItem);
    });
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex >= selectedQuestions.length) {
        startQuiz(); // Restart the quiz if at the end
    } else {
        showNextQuestion(); // Go to next question
    }
});

startQuiz();
