let questions = [
  {
    text: "He … for you opposite the hospital.",
    right: 2,
    answers: ["are waiting", "waits", "is waiting", "am waiting"],
  },

  {
    text: "Max … his teeth every day.",
    right: 2,
    answers: ["is brushing", "brush", "brushes", "are brushing"],
  },

  {
    text: "What … in his garage now?",
    right: 1,
    answers: [
      "your father is doing",
      "is your father doing",
      "do your father do",
      "your father do",
    ],
  },

  {
    text: "Emma … soups at all.",
    right: 2,
    answers: ["isn’t cooking", "not cooks", "doesn’t cook", "don’t cook"],
  },

  {
    text: "Mr. John … French to his friend at the moment.",
    right: 1,
    answers: ["speaks", "is speaking", "are speaking", "speaking"],
  },

  {
    text: "My brother is busy now. He … his homework.",
    right: 3,
    answers: ["does", "do", "is do", "is doing"],
  },

  {
    text: "My family … to the village every summer.",
    right: 1,
    answers: ["are going", "goes", "go", "is going"],
  },

  {
    text: "No, I … TV at the moment.",
    right: 0,
    answers: [
      "am not watching",
      "don’t watch",
      "don’t watching",
      "amn`t watching",
    ],
  },

  {
    text: "No, my mother … in her room.",
    right: 0,
    answers: ["isn’t sleeping", "don’t sleep", "doesn't sleep", "sleeps not"],
  },

  {
    text: "… in ghosts?",
    right: 1,
    answers: [
      "Are you believing",
      "Do you believe",
      "Are you believe",
      "You don’t believe",
    ],
  },
];

let questionText;

let questionForm;

let questionNumber;

let questionId = 0;

let lastQuestion = questions.length - 1;

let usersAnswers = {};

let boxCatchAnswers = [];

let noticeMessаgeWindow;

let score = 0;

// генерирует в html формы под вопросы

function startTest() {
  // создаём поле с текстом вопроса
  questionText = document.createElement("span");
  test.appendChild(questionText);
  questionText.classList.add("qText");

  // создаём поле с номером вопроса
  questionNumber = document.createElement("span");
  mainContainer.appendChild(questionNumber);
  questionNumber.classList.add("qNumber");

  // создаём форму для вариантов ответов
  questionForm = document.createElement("form");
  test.appendChild(questionForm);
  questionForm.classList.add("qForm");

  // отображаем первый вопрос
  nextPreviousQuestion(questionId);

  //скрываем кнопку buttonStartTest
  buttonNextQuestion.style.display = "inline";
  buttonPreviousQuestion.style.display = "inline";
}

// показываем след./пред. вопрос

function nextPreviousQuestion(currentShownQuestionId, shownRadioButtons) {
  // задаём условие отображения кнопки buttonNextQuestion

  if (currentShownQuestionId == lastQuestion) {
    buttonNextQuestion.disabled = true;
    buttonCheckAnswers.style.display = "inline";
  } else {
    buttonNextQuestion.disabled = false;
  }

  // задаём условие отображения кнопки buttonPreviousQuestion

  if (currentShownQuestionId == 0) {
    buttonPreviousQuestion.disabled = true;
  } else {
    buttonPreviousQuestion.disabled = false;
  }

  // обращаемся к массиву questions и получаем нужный объект

  let questionToShow = questions[currentShownQuestionId];

  // обращаемся к массиву questions за нужным индексом
  qNumberToShow = questions.indexOf(questions[currentShownQuestionId]);

  qNumberToShow++;

  // отображаем нужный номер вопроса
  questionNumber.innerHTML = qNumberToShow + "/" + questions.length;

  //заполняем поле с текстом вопроса
  questionText.innerHTML = questionToShow.text;

  //чистим форму questionForm
  questionForm.textContent = "";

  //чистим переменную в которой содержатся все radio - boxCatchAnswers

  boxCatchAnswers = [];

  //заполняем форму вариантов ответов
  for (answer of questionToShow.answers) {
    //создаём контейнер с ответами
    let answerLabel = document.createElement("label");
    questionForm.appendChild(answerLabel);
    answerLabel.textContent = answer;
    answerLabel.classList.add("radio");

    //создаём радиокнопки
    let shownRadioButton = document.createElement("span");
    shownRadioButton.classList.add("radio");
    answerLabel.prepend(shownRadioButton);

    let radioButton = document.createElement("input");
    radioButton.type = "radio";
    radioButton.name = "radiogroup";
    radioButton.classList.add("radio");
    answerLabel.prepend(radioButton);

    // передаём значение radioButton в BoxCatch Answers
    boxCatchAnswers.push(radioButton);
  }
  if (usersAnswers[questionId] !== undefined) {
    boxCatchAnswers[usersAnswers[questionId]].checked = true;
  }
}

//собираем ответы пользователя и передаём их в объект userAnswers
function сatchAnswers() {
  let i = 0;
  for (boxCatchAnswer of boxCatchAnswers) {
    if (boxCatchAnswer.checked) {
      usersAnswers[questionId] = i;
    }
    i++;
  }
}

//создаём всплывающее окно для подтверждения проверки
function findMissAnswers(cancelled) {
  disabledElements(1);

  if (cancelled == 1) {
    //создаём переменную size и присваиваем ей длинну объекта
    let size = Object.keys(usersAnswers).length;

    if (size != questions.length) {
      noticeMessаgeWindow = document.createElement("div");
      test.appendChild(noticeMessаgeWindow);
      noticeMessаgeWindow.classList.add("notMessWindow");
      noticeMessаgeWindow.style.display = "inline";

      let noticeMessage = document.createElement("span");
      noticeMessаgeWindow.appendChild(noticeMessage);
      noticeMessage.textContent =
        "У вас есть пропущенные вопросы, вы уверены что хотите продолжить?";
      noticeMessage.classList.add("notMess");

      let answerButtonYes = document.createElement("button");
      noticeMessage.appendChild(answerButtonYes);
      answerButtonYes.textContent = "Да";
      answerButtonYes.classList.add("answButYes");

      let answerButtonNo = document.createElement("button");
      noticeMessage.appendChild(answerButtonNo);
      answerButtonNo.textContent = "Нет";
      answerButtonNo.classList.add("answButNo");

      //прописываем обработчики на кнопки
      answerButtonYes.addEventListener("click", function () {
        popUpScore();
      });
      answerButtonNo.addEventListener("click", function () {
        findMissAnswers(0);
        disabledElements(0);
      });
    } else {
      popUpScore();
    }
  } else if (cancelled == 0) {
    noticeMessаgeWindow.style.display = "none";
  }
}

function popUpScore() {
  //обращаемся к массиву и задаём условие подсчёта кол-ва правильных ответов
  questions.forEach(function (question, number) {
    if (question.right == usersAnswers[number]) {
      score++;
    }
  });
  //создаём окно score
  let popUpWindow = document.createElement("div");
  test.appendChild(popUpWindow);
  popUpWindow.classList.add("popUpWind");
  //создаём лист для текста
  let popUpList = document.createElement("ul");
  popUpWindow.appendChild(popUpList);
  popUpList.classList.add("poUplist");
  //создаём первую часть текста
  let popUpText = document.createElement("li");
  popUpList.appendChild(popUpText);
  popUpText.textContent =
    "Вы ответили правильно на " + score + " вопрос (-а, -ов)";
  //создаём вторую часть текста
  let popUpComment = document.createElement("li");
  popUpList.appendChild(popUpComment);

  let butPopOk = document.createElement("button");
  popUpWindow.appendChild(butPopOk);
  butPopOk.classList.add("butOk");
  butPopOk.textContent = "Ok";
  butPopOk.addEventListener("click", function () {
    disabledElements(0);
    checkAnswers();
  });

  let sadEmoji = document.createElement("img");
  sadEmoji.src = "../img/Sad.png";
  popUpWindow.appendChild(sadEmoji);
  sadEmoji.classList.add("sadEmojiPop");

  let normEmoji = document.createElement("img");
  normEmoji.src = "../img/Norm.png";
  popUpWindow.appendChild(normEmoji);
  normEmoji.classList.add("normEmojiPop");

  let goodEmoji = document.createElement("img");
  goodEmoji.src = "../img/Good.png";
  popUpWindow.appendChild(goodEmoji);
  goodEmoji.classList.add("goodEmojiPop");

  let excellEmoji = document.createElement("img");
  excellEmoji.src = "../img/Excellent.png";
  popUpWindow.appendChild(excellEmoji);
  excellEmoji.classList.add("excellEmojiPoP");

  // задаём условия добавления второй части текста
  let sumOfQuest = questions.length;

  if (score < 0.5 * sumOfQuest) {
    popUpComment.textContent = "Попробуйте ещё раз!";
    sadEmoji.style.display = "inline";
  } else if (score >= 0.5 * sumOfQuest && score < 0.6 * sumOfQuest) {
    popUpComment.textContent = " Неплохо, но можете лучше!";
    normEmoji.style.display = "inline";
  } else if (score >= 0.6 * sumOfQuest && score < 0.8 * sumOfQuest) {
    popUpComment.textContent = " Хорошо!";
    goodEmoji.style.display = "inline";
  } else if (score >= 0.8 * sumOfQuest) {
    popUpComment.textContent = " Отлично!";
    excellEmoji.style.display = "inline";
  }
}

//генерирует форму с результатами теста в виде списка
function checkAnswers() {
  mainContainer.textContent = "";

  butTryAgain.style.display = "inline";

  butBackToIndex.style.display = "inline";

  questions.forEach(function (question, number) {
    qTextAndImg = document.createElement("div");
    mainContainer.appendChild(qTextAndImg);
    // создаём поле с текстом вопроса
    questionText = document.createElement("span");
    qTextAndImg.appendChild(questionText);

    //заполняем поле с текстом вопроса
    questionText.innerHTML = question.text;
    questionText.style.paddingRight = "10px";
    questionText.style.fontWeight = "bold";

    // создаём форму для вариантов ответов
    questionForm = document.createElement("form");
    mainContainer.appendChild(questionForm);

    // создаём список для вывода ответов
    let answersList = document.createElement("ul");
    questionForm.appendChild(answersList);
    answersList.classList.add("answList");

    // заполняем правильные/неправильные ответы
    let answerText = document.createElement("li");
    answersList.appendChild(answerText);
    answerText.textContent =
      "Правильный ответ: " + question.answers[question.right];

    //комментарий по ответу пользователя
    let answerComment = document.createElement("li");
    answersList.appendChild(answerComment);

    let testWindowForm = document.getElementById("testWindow");
    testWindowForm.style.padding = "40px";
    testWindowForm.style.fontSize = "23px";
    mainContainer.style.overflowY = "scroll";
    mainContainer.style.width = "659px";
    mainContainer.style.height = "340px";
    testWindowForm.appendChild(butTryAgain);
    testWindowForm.appendChild(butBackToIndex);

    if (question.right == usersAnswers[number]) {
      let green = document.createElement("img");
      green.src = "../img/Green.png";
      qTextAndImg.appendChild(green);
      green.style.display = "inline";
      answerText.textContent =
        "Вы ответили верно: " + question.answers[question.right];
    } else if (usersAnswers[number] === undefined) {
      let red = document.createElement("img");
      red.src = "../img/Red.png";
      qTextAndImg.appendChild(red);
      red.style.display = "inline";
      answerComment.textContent += " Вы не ответили на данный вопрос ";
    } else {
      let red = document.createElement("img");
      red.src = "../img/Red.png";
      qTextAndImg.appendChild(red);
      red.style.display = "inline";
      answerComment.textContent +=
        " Ваш ответ: " + question.answers[usersAnswers[number]];
    }
  });
}

//блокируем действие всех кнопок
function disabledElements(cancelled) {
  if (cancelled == 1) {
    let allButtons = testWindow.getElementsByTagName("button");
    for (let oneButton of allButtons) {
      oneButton.disabled = true;
    }

    let allInputs = testWindow.getElementsByClassName("radio");
    for (let oneInput of allInputs) {
      oneInput.disabled = true;
    }
  }
  //снимаем блокировку
  if (cancelled == 0) {
    let allButtons = testWindow.getElementsByTagName("button");
    for (let oneButton of allButtons) {
      oneButton.disabled = false;
    }

    let allInputs = testWindow.getElementsByClassName("radio");
    for (let oneInput of allInputs) {
      oneInput.disabled = false;
    }
  }
}

//создаём кнопки
let butTryAgain = document.querySelector("#butTryAgain");

let butBackToIndex = document.querySelector("#butBackToIndex");

let buttonNextQuestion = document.querySelector("#buttonNextQuestion");
buttonNextQuestion.addEventListener("click", function () {
  сatchAnswers();
  nextPreviousQuestion(++questionId);
});

let buttonPreviousQuestion = document.querySelector("#buttonPreviousQuestion");
buttonPreviousQuestion.addEventListener("click", function () {
  сatchAnswers();
  nextPreviousQuestion(--questionId);
});

let buttonCheckAnswers = document.querySelector("#buttonCheckAnswers");
buttonCheckAnswers.addEventListener("click", function () {
  сatchAnswers();
  findMissAnswers(1);
});
startTest();
