const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "これは警告だ",
    answers: [
      { text: "this is the warning", correct: true },
      { text: "it is the warning", correct: false },
    ],
  },
  {
    question: "止まれ",
    answers: [
      { text: "stop", correct: true },
      { text: "don't move", correct: false },
    ],
  },
  {
    question: "動くな",
    answers: [
      { text: "don't move", correct: true },
      { text: "stop", correct: false },
    ],
  },
  {
    question: "離れろ/下がれ",
    answers: [
      { text: "stand back", correct: true },
      { text: "stay back", correct: false },
    ],
  },
  {
    question: "やめろ",
    answers: [
      { text: "stop it", correct: true },
      { text: "no way", correct: false },
    ],
  },
  {
    question: "ここに入るな",
    answers: [
      { text: "don't enter", correct: true },
      { text: "no enter", correct: false },
    ],
  },
  {
    question: "近づくな",
    answers: [
      { text: "keep away", correct: true },
      { text: "take off me", correct: false },
    ],
  },
  {
    question: "跪け",
    answers: [
      { text: "on your knees", correct: true },
      { text: "get down", correct: false },
    ],
  },
  {
    question: "後ろを向け",
    answers: [
      { text: "turn around", correct: true },
      { text: "back to face", correct: false },
    ],
  },
  {
    question: "２歩前へ",
    answers: [
      { text: "two steps forward", correct: true },
      { text: "two steps back", correct: false },
    ],
  },
  {
    question: "２歩後へ",
    answers: [
      { text: "two steps back", correct: true },
      { text: "two steps forward", correct: false },
    ],
  },
  {
    question: "ここで待て",
    answers: [
      { text: "wait here", correct: true },
      { text: "stay here", correct: false },
    ],
  },
  {
    question: "静かにしろ",
    answers: [
      { text: "be quiet", correct: true },
      { text: "order", correct: false },
    ],
  },
  {
    question: "それを置け",
    answers: [
      { text: "put it down", correct: true },
      { text: "down slowly", correct: false },
    ],
  },
  {
    question: "それを開けろ",
    answers: [
      { text: "open it", correct: true },
      { text: "open slowly", correct: false },
    ],
  },
  {
    question: "それを見せろ",
    answers: [
      { text: "show me that", correct: true },
      { text: "show me your hands", correct: false },
    ],
  },
  {
    question: "ここから立ち去れ",
    answers: [
      { text: "get out of here", correct: true },
      { text: "over there", correct: false },
    ],
  },
  {
    question: "武器を捨てろ",
    answers: [
      { text: "drop your wepon", correct: true },
      { text: "put on your wepon", correct: false },
    ],
  },
  {
    question: "止まれ、止まらないと撃つぞ",
    answers: [
      { text: "stop or I will fire", correct: true },
      { text: "don't move I'll fire", correct: false },
    ],
  },
  {
    question: "撃つぞ",
    answers: [
      { text: "I'm gonna shoot you", correct: true },
      { text: "I shoot you", correct: false },
    ],
  },
  {
    question: "捨てろ",
    answers: [
      { text: "drop it", correct: true },
      { text: "take out it", correct: false },
    ],
  },
  {
    question: "手を挙げろ",
    answers: [
      { text: "hands up", correct: true },
      { text: "show me your hands", correct: false },
    ],
  },
  {
    question: "出てこい",
    answers: [
      { text: "come out", correct: true },
      { text: "come on", correct: false },
    ],
  },
  {
    question: "その場に立て",
    answers: [
      { text: "stand up", correct: true },
      { text: "wake up", correct: false },
    ],
  },
  {
    question: "ボディーサーチをする",
    answers: [
      { text: "we will do body search", correct: true },
      { text: "I search you", correct: false },
    ],
  },
  {
    question: "壁の方を向け",
    answers: [
      { text: "face the wall", correct: true },
      { text: "turn wall", correct: false },
    ],
  },
  {
    question: "壁に手をつけ",
    answers: [
      { text: "hands on the wall", correct: true },
      { text: "put your wall", correct: false },
    ],
  },
  {
    question: "手を頭の上に置け",
    answers: [
      { text: "hands on your head", correct: true },
      { text: "put your head", correct: false },
    ],
  },
  {
    question: "うつ伏せになれ",
    answers: [
      { text: "on the ground", correct: true },
      { text: "get down", correct: false },
    ],
  },
  {
    question: "",
    answers: [
      { text: "", correct: true },
      { text: "", correct: false },
    ],
  },
  {
    question: "",
    answers: [
      { text: "", correct: true },
      { text: "", correct: false },
    ],
  },
  {
    question: "",
    answers: [
      { text: "", correct: true },
      { text: "", correct: false },
    ],
  },
  {
    question: "",
    answers: [
      { text: "", correct: true },
      { text: "", correct: false },
    ],
  },

];
