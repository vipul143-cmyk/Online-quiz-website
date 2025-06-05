const quizData = [
    {
      question: 'The sum of two numbers is 84. One number is 6 more than the other. What is the smaller of the two numbers?',
      options: ['39', '35', '33', '32'],
      answer: '39',
    },
    {
      question: 'What is the sixth number in ther series: 3,6,12,24?',
      options: ['96', '30', '48', '90'],
      answer: '96',
    },
    {
      question: 'How many square feet of tile are needed for a 24 foot x 24 foot room?',
      options: ['576 square feet', '96 square feet', '288 square feet', '144 square feet'],
      answer: '576 square feet',
    },
    {
      question: 'You just drive 280 kilometers and it look you 5 hours. What was your average speed?',
      options: ['56km/hr', '60km/hr', '58km/hr', '55km/hr'],
      answer: '56km/hr',
    },
    {
      question: 'Find the HCF of 12,18,24?',
      options: ['4', '12', '6', '24',],
      answer: '6',
    },
    {
      question: 'A person bought a car for Rs. 75000 and sold it for Rs. 67500. Find his gain or loss percent?',
      options: ['5%', '20%', '10%', '15%',],
      answer: '10%',
    },
    {
      question: 'The LCM of three different numbers is 120. Which of the following cannot be their HCF?',
      options: ['8', '12', '24', '35'],
      answer: '35',
    },
    {
      question: 'How many 2 digits numbers are there which are divisible by 6?',
      options: ['12', '15', '16', '17'],
      answer: '15',
    },
    {
      question: 'Value of 0/0?',
      options: ['0', 'Error', 'infinite', 'None of the above'],
      answer: 'Error',
    },
    {
      question: 'Value of 1/0?',
      options: ['0', 'Error', 'infinite', 'None of the above'],
      answer: 'infinite',
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