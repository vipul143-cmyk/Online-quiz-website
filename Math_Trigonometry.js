const quizData = [
    {
      question: 'The three primary function of trigonometry are?',
      options: ['Sine,tangent and secant', 'Sine,cosine and tangent', 'Cosine,cotangent and secant', 'Cosecant and cotangent'],
      answer: 'Sine,cosine and tangent',
    },
    {
      question: 'The length of the hypotenuse in an unit circle is?',
      options: ['0', '1', '1/2', 'None of these'],
      answer: '1',
    },
    {
      question: 'Trigonometry helps to study the relationship between the sides and angle of which triangle?',
      options: ['Acute', 'Obtuse', 'Right', 'None of these'],
      answer: 'Right',
    },
    {
      question: 'Find the value of cos A, if the value of tan A is 4/3',
      options: ['1', '4/3', '3/5', 'None of the above'],
      answer: '3/5',
    },
    {
      question: 'Tan0 and sec0 are not defined at?',
      options: ['60 degree', '45 degree', '90 degree', '30 degree',],
      answer: '90 degree',
    },
    {
      question: 'If tan A = cot B, then the value of A+B is:',
      options: ['60 degree', '45 degree', '90 degree', '30 degree',],
      answer: '90 degree',
    },
    {
      question: 'The multiplicative inverse of sin x is:',
      options: ['1/cos x', 'cot x', 'cosec x', '1/sec x',],
      answer: '',
    },
    {
      question: 'If sinA = cosB, then the value of A+B is:',
      options: ['60 degree', '45 degree', '90 degree', '180 degree',],
      answer: '90 degree',
    },
    {
      question: 'In Trigonometry ratios, the product of tan y and cot y is equal to:',
      options: ['2','0','1','1/2',],
      answer: '1',
    },
    {
      question: 'Calculate the value of arctan(x) is not defined?',
      options: ['120 degree', '60 degree', '90 degree', '45 degree'],
      answer: '90 degree',
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