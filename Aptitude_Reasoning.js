const quizData = [
    {
      question: 'BYE is coded as 245 and OLA is coded as 265. How will CAR be coded in the language?',
      options: ['280', '285', '295', '300'],
      answer: '295',
    },
    {
      question: 'CAP is coded as 262413 and LOG is coded as 171022. How will BED be coded in that language?',
      options: ['11825', '12027', '12025', '1225'],
      answer: '12025',
    },
    {
      question: '5,11,19,29,?,55,71',
      options: ['41', '49', '36', '40'],
      answer: '41',
    },
    {
      question: '84,81,76,69,?,49,36',
      options: ['55', '61', '59', '60'],
      answer: '60',
    },
    {
      question: 'Find the odd number pair?',
      options: ['21:431', '15:225', '13:169', '12:144',],
      answer: '21:431',
    },
    {
      question: 'Find the odd number pair?',
      options: ['2:8', '3:27', '4:64', '5:225',],
      answer: '5:225',
    },
    {
      question: 'First row:243,162,9 <br> Second row:108,72,6 <br> Third row: 48,?,4 ',
      options: ['12', '21', '32', '23',],
      answer: '32',
    },
    {
      question: 'First row:73,52,75 <br> Second row:64,41,63 <br> Third row: 68,47,? ',
      options: ['71', '69', '63', '65'],
      answer: '69',
    },
    {
      question: 'If 90% of a number is 621, what will be 50% of 20% of that number?',
      options: ['79', '54', '74', '69'],
      answer: '74',
    },
    {
      question: 'An amount of Rs. 1003 is to be distributed among A,B and C in the ratio of 11:23:25. How many rupees would B get more than A?',
      options: ['Rs.204', 'Rs.238', 'Rs.29', 'Rs.187'],
      answer: '204',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    // displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();