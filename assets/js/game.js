const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuetions = [];
let starGame;
let getNewQuestion;
let incrementScore;

let questions = [


    {
        question: "Who is the most skillful player in football history?",
        choice1: "<Pele>",
        choice2: "<Messi>",
        choice3: "<Ronaldo>",
        choice4: "<Mbape>",
        answer: 1

    },

    {
        question: "What is the most valuable football clubs in the world in 2023?",
        choice1: "<Barcelona>",
        choice2: "<M United.>",
        choice3: "<Real.M>",
        choice4: "<Liverpool>",
        answer: 3
    },

    {
        question: "Who is the fastest human runner in history?",
        choice1: "<Asafa Pawell>",
        choice2: "<Yohan Blake>",
        choice3: "<Tyson Gay>",
        choice4: "<Usain Bolt>",
        answer: 4
    },

    {
        question: "What kind of sport did Peter Schumacher do?",
        choice1: "<F1>",
        choice2: "<Basktbol>",
        choice3: "<athletics>",
        choice4: "<footbol>",
        answer: 1

    },

    {
        question: "In what year did the first Olympic Games take place?",
        choice1: "<In 1985>",
        choice2: "<In 1992>",
        choice3: "<In 1896>",
        choice4: "<In 1900>",
        answer: 3
    },

    {
        question: "Which country has the most World Cups?",
        choice1: "<Germany>",
        choice2: "<France>",
        choice3: "<Itali>",
        choice4: "<Brazil>",
        answer: 4
    }
];

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 6;

starGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuetions = [...questions];
    getNewQuestion();

};

getNewQuestion = () => {
    if (availableQuetions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        // go to the end page
        return window.location.assign("end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    // Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuetions.length);
    currentQuestion = availableQuetions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuetions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }


        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();

        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

starGame();