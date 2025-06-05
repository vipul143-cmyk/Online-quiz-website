const quizData = [
    {
      question: 'Who captained India to its first ever Cricket World Cup victory in 1983?',
      options: ['Kapil Dev', 'Sunil Gavaskar', 'Sachin Tendulkar', 'M.S Dhoni'],
      answer: 'Kapil Dev',
    },
    {
      question: 'Which Indian Badminton player became the first Indian to win an Olympic medal in the sport?',
      options: ['Kidami Srikanth', 'PV Sindhu', 'Saina Nehwal', 'Prakash Padukon'],
      answer: 'Saina Nehwal',
    },
    {
      question: 'Which city hosted the iconic 2011 Cricket World Cup final between India and Sri lanka?',
      options: ['Mumbai', 'Kolkata', 'Chennai', 'Delhi'],
      answer: 'Mumbai',
    },
    {
      question: 'Who was the first Indian Cricketer to score a double century in ODI?',
      options: ['Sunil Gavaskar', 'Sachin Tendulkar', 'Virender Sehwag', 'Kapil Dev'],
      answer: 'Sachin Tendulkar',
    },
    {
      question: 'Who is the only Indian male boxer to win a medal at the Olympics?',
      options: ['Manoj Kumar', 'Mary Kom', 'Vikas Krishan Yadav', 'Vijendra Singh',],
      answer: 'Vijendra Singh',
    },
    {
      question: 'Which team won the last World Hockey Championship?',
      options: ['Russia', 'Canada', 'United States', 'Finland'],
      answer: 'Canada',
    },
    {
      question: 'What ball is used in table tennis?',
      options: ['Football', 'Basketball', 'Tennis', 'Ping-Pong',],
      answer: 'Ping-Pong',
    },
    {
      question: 'What game is called the "sports of king"?',
      options: ['Football', 'Polo', 'Bridge', 'Tennis'],
      answer: 'Polo',
    },
    {
      question: 'What ball is used in basketball?',
      options: ['Football', 'Volleyball', 'Handball', 'Basketball'],
      answer: 'Basketball',
    },
    {
      question: 'Sunil Chhetri is a distinguished player in which of the following sports/games?',
      options: ['Badminton', 'Shooting', 'Football', 'Hockey'],
      answer: 'Football',
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