  // select the Elements
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex  

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() { // what happens when we click the start button
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5) // to return the shuffeld question
    currentQuestionIndex = 0 // to return the shuffled arrayed answer
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() { // what happens when we click the next button 
    resetState() 
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => { 
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        } 
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() { // to reset everything on the body,form,questions back to it's default state any time we set a new question
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
    
}

function selectAnswer(e) { // what happens when we select an answer
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass (element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'what is 4 * 2 ?',
        answers: [
            { text: '8', correct: true },
            { text: '22', correct: false },
            { text: '34', correct: false },
            { text: '39', correct: false }
        ]
    },

    {
        question: 'what is 2 + 2 ?',
        answers: [
            {text: '4', correct: true},
            {text: '22', correct: false},
            {text: '34', correct: false},
            {text: '39', correct: false}
        ]
    },
    {
        question: 'who is your best YouTuber?',
        answers: [
            {text: 'Web Dev Simplified', correct: true},
            {text: 'Traversy Media', correct: true},
            {text: 'Dev Ed', correct: true},
            {text: 'Fun Fun Function', correct: true}
        ]
    },
    {
        question: 'is web development fun?',
        answers: [
            { text: 'Kinda', correct: false },
            { text: 'YESS!!', correct: true },
            { text: 'Um No', correct: false },
            { text: 'IDK', correct: false }
        ]
    },
    {
        question: 'who is the best Footballer on the planet?',
        answers: [
            { text: 'Eden Hazard', correct: false },
            { text: 'Cristiano Ronaldo', correct: false },
            { text: 'Lionel Messi', correct: true },
            { text: 'Nyemar Jr', correct: false }
        ]
    }
]