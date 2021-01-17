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
    question: "注目しろ",
    answers: [
      { text: "attention", correct: true },
      { text: "look me", correct: false },
    ],
  },
  {
    question: "道をあけろ",
    answers: [
      { text: "clear the way", correct: true },
      { text: "open the way", correct: false },
    ],
  },
  {
    question: "直ちに解散しろ",
    answers: [
      { text: "disperse now", correct: true },
      { text: "good bye", correct: false },
    ],
  },
  {
    question: "大丈夫か",
    answers: [
      { text: "are you all right", correct: true },
      { text: "are you okay", correct: false },
    ],
  },
  {
    question: "ついてきてください",
    answers: [
      { text: "follow me", correct: true },
      { text: "this way", correct: false },
    ],
  },
  {
    question: "足を骨折しました",
    answers: [
      { text: "I broke my leg", correct: true },
      { text: "my leg is broken", correct: false },
    ],
  },
  {
    question: "意識がありません",
    answers: [
      { text: "he is unconscious", correct: true },
      { text: "that is unconsious", correct: false },
    ],
  },
  {
    question: "大量に出血しています",
    answers: [
      { text: "she is massive bleeding", correct: true },
      { text: "he lost blood", correct: false },
    ],
  },
  {
    question: "AEDを持ってきてください",
    answers: [
      { text: "bring an AED please", correct: true },
      { text: "please bring", correct: false },
    ],
  },
  {
    question: "救急車をよんでください",
    answers: [
      { text: "please call an ambulance", correct: true },
      { text: "call car", correct: false },
    ],
  },
  {
    question: "私は日本隊のASOです。お会いできてうれしいです",
    answers: [
      { text: "I am sergeant aso of japanese unit nice to meet you", correct: true },
      { text: "I am E-5 aso of japanese unit nice to meet you", correct: false },
    ],
  },
  {
    question: "お名前を伺ってもいいですか",
    answers: [
      { text: "may I have your name", correct: true },
      { text: "tell me your name", correct: false },
    ],
  },
  {
    question: "もう一度おっしゃってください",
    answers: [
      { text: "please say that again", correct: true },
      { text: "one more please", correct: false },
    ],
  },
  {
    question: "少しお待ちください",
    answers: [
      { text: "please wait a minute", correct: true },
      { text: "just moment", correct: false },
    ],
  },
  {
    question: "私たちに協力してください",
    answers: [
      { text: "please cooperate with us", correct: true },
      { text: "cooperate me", correct: false },
    ],
  },
  {
    question: "もっとゆっくり話していただけませんか",
    answers: [
      { text: "please speak more slowly", correct: true },
      { text: "slow down please", correct: false },
    ],
  },
  {
    question: "通訳を連れてきます",
    answers: [
      { text: "I will bring an interpreter", correct: true },
      { text: "come on interpreter", correct: false },
    ],
  },
  {
    question: "理解できません",
    answers: [
      { text: "I couldn't understand", correct: true },
      { text: "I don't understand", correct: false },
    ],
  },
  {
    question: "ここに書いていただけますか",
    answers: [
      { text: "please write it down", correct: true },
      { text: "write this paper", correct: false },
    ],
  },
  {
    question: "名前を書いていただけますか",
    answers: [
      { text: "please write down your name", correct: true },
      { text: "write this your name", correct: false },
    ],
  },
  {
    question: "彼を呼びます",
    answers: [
      { text: "I will call him", correct: true },
      { text: "call to him", correct: false },
    ],
  },
  {
    question: "お手洗いはどこですか",
    answers: [
      { text: "where is a rest room", correct: true },
      { text: "it is a water closet", correct: false },
    ],
  },
  {
    question: "キャンプFUJIへの行き方を教えてください",
    answers: [
      { text: "please tell me how to get to camp FUJI", correct: true },
      { text: "please tell me how to get to road", correct: false },
    ],
  },

];
