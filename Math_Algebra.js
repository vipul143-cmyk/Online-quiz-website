const quizData = [
    {
      question: '7+2x = 15 Find x',
      options: ['4', '8', '3', '9'],
      answer: '4',
    },
    {
      question: 'F(x)=17x-30 Find f(2)-f(1)?',
      options: ['13', '4', '17', '9'],
      answer: '4',
    },
    {
      question: 'What is the coefficient of x in 2x+3?',
      options: ['0', '3', '2', '5'],
      answer: '2',
    },
    {
      question: 'Single term of algebraic expression is called?',
      options: ['Monomial', 'Binomial', 'Trinomial', 'None of these'],
      answer: 'Monomial',
    },
    {
      question: 'Is x+y is an algebraic expression?',
      options: ['Yes', 'No', 'Cannot be identified', 'None of these',],
      answer: 'Yes',
    },
    {
      question: 'Write a statement as an equation: 4 times a number  equals 40',
      options: ['4*y=40', '4+y=40', '4=y+40', '4*40=y',],
      answer: '4*y=40',
    },
    {
      question: 'Solve this equation for t: 4t-3=33 ',
      options: ['9', '7.5', '12', '8',],
      answer: '9',
    },
    {
      question: 'The quation has',
      options: ['Exactly one real root', 'Exactly four real root', 'Infinite number of real roots', 'No real roots'],
      answer: 'No real roots',
    },
    {
      question: 'The equation x+2y+2z=1 and 2z+4y+4z=9 have',
      options: ['Unique solution', 'Only two solution', 'Infinite number of solution', 'None of these'],
      answer: 'None of these',
    },
    {
      question: 'Simplify the expression  2+2a+a+2c+b-5-13a-6b?',
      options: ['-3-10a-5b+2c', '-16abc', '-8a-5b+2c', '-8a-11b+2c'],
      answer: '-3-10a-5b+2c',
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