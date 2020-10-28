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

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
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

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
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

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: '後ろを向け',
    answers: [
      { text: 'turn around', correct: true },
      { text: 'turn back', correct: false }
    ]
  },
  {
    question: 'ついてきてください',
    answers: [
      { text: 'follow me', correct: true },
      { text: 'this way', correct: false }
    ]
  },
  {
    question: '注目しろ',
    answers: [
      { text: 'attention', correct: true },
      { text: 'get back', correct: false }
    ]
  },
  {
    question: '道を空けろ',
    answers: [
      { text: 'clear the way', correct: true },
      { text: 'make it way', correct: false }
    ]
  },
  {
    question: '直ちに解散しろ',
    answers: [
      { text: 'disperse now', correct: true },
      { text: 'good bye' , correct: false }
    ]
  },
  {
    question: '大丈夫か',
    answers: [
      { text: 'are you all rigth', correct: true },
      { text: 'are you OK', correct: false }
    ]
  },
  {
    question: '足を骨折しました',
    answers: [
      { text: 'I broke my leg', correct: true },
      { text: 'he broken', correct: false }
    ]
  },
  {
    question: '意識がありません',
    answers: [
      { text: 'He is unconscious', correct: true },
      { text: 'I am conscious', correct: false }
    ]
  },
  {
    question: 'AEDを持ってきてください',
    answers: [
      { text: 'bring an AED please', correct: true },
      { text: 'give me AED', correct: false }
    ]
  },
  {
    question: '救急車をよんでください',
    answers: [
      { text: 'please call an ambulanse', correct: true },
      { text: '', correct: false }
    ]
  },
  {
    question: '私は日本隊のあそうです。お会いできて嬉しいです',
    answers: [
      { text: 'I am sag aso of japanese unit nice to meet you', correct: true },
      { text: 'hi nice to meet you', correct: false }
    ]
  },
  {
    question: 'お名前を伺っても良いですか',
    answers: [
      { text: 'may I have your name', correct: true },
      { text: 'can I call your name', correct: false }
    ]
  },
  {
    question: 'もう一度おっしゃってください',
    answers: [
      { text: 'please say that again', correct: true },
      { text: 'one more please', correct: false }
    ]
  },
  {
    question: '少しお待ちください',
    answers: [
      { text: 'please wait a minute', correct: true },
      { text: 'just it moment', correct: false }
    ]
  },
  {
    question: '私に協力してください',
    answers: [
      { text: 'plesse cooperate with me', correct: true },
      { text: 'power for me', correct: false }
    ]
  },
  {
    question: 'もっとゆっくり話していただけませんか',
    answers: [
      { text: 'please speak more slowly', correct: true },
      { text: 'down speak', correct: false }
    ]
  },
  {
    question: '通訳を連れてきます',
    answers: [
      { text: 'I will bring an interpreter', correct: true },
      { text: 'import interpreter ', correct: false }
    ]
  },
  {
    question: '理解できません',
    answers: [
      { text: 'I could not understand', correct: true },
      { text: 'no way', correct: false }
    ]
  },
  {
    question: 'ここに書いていただけますか',
    answers: [
      { text: 'please write it down', correct: true },
      { text: 'write this', correct: false }
    ]
  },
  {
    question: '名前を書いていただけますか',
    answers: [
      { text: 'please write down your name', correct: true },
      { text: 'please write it down', correct: false }
    ]
  },
  {
    question: '通訳を呼びます',
    answers: [
      { text: 'I will call interpreter', correct: true },
      { text: 'I will do call interpreter', correct: false }
    ]
  },
  {
    question: 'お手洗いはどこですか',
    answers: [
      { text: 'where is a rest room', correct: true },
      { text: 'where is a WC', correct: false }
    ]
  },
  {
    question: 'キャンプ富士への行き方を教えてください',
    answers: [
      { text: 'please tell me how to ge to camp FUji', correct: true },
      { text: 'where is a Fuji', correct: false }
    ]
  },
  {
    question: 'これは警告だ',
    answers: [
      { text: 'this is the warning', correct: true },
      { text: 'this final warning', correct: false }
    ]
  },
  {
    question: '止まれ',
    answers: [
      { text: 'stop', correct: true },
      { text: 'do not move', correct: false }
    ]
  },
  {
    question: '動くな',
    answers: [
      { text: 'do not move', correct: true },
      { text: 'freeze', correct: false }
    ]
  },
  {
    question: '下がれ',
    answers: [
      { text: 'stand back', correct: true },
      { text: 'take off me', correct: false }
    ]
  },
  {
    question: 'その行為をやめろ',
    answers: [
      { text: 'stop it', correct: true },
      { text: 'do not it', correct: false }
    ]
  },
  {
    question: 'ここに入るな',
    answers: [
      { text: 'do not enter', correct: true },
      { text: 'keep away', correct: false }
    ]
  },
  {
    question: '近づくな',
    answers: [
      { text: 'keep away', correct: true },
      { text: 'get off me', correct: false }
    ]
  },
  {
    question: '2歩前へ',
    answers: [
      { text: 'tow steps foward ', correct: true },
      { text: 'tow step back', correct: false }
    ]
  },
  {
    question: '',
    answers: [
      { text: '', correct: true },
      { text: '', correct: false }
    ]
  },

  {
    question: '撃つぞ',
    answers: [
      { text: 'I am gonna shoot you', correct: true },
      { text: 'I will fire', correct: false },
    ]
  },
  {
    question: '大出血しています',
    answers: [
      { text: 'I am Major bleeding', correct: false },
      { text: 'I am Massive bleeding', correct: true },
      { text: 'Lost blood', correct: false },
      { text: 'Take off blood', correct: false }
    ]
  },
  {
    question: '膝をつけ',
    answers: [
      { text: 'Kneel down', correct: true },
      { text: 'Get down', correct: false }
    ]
  }
]
