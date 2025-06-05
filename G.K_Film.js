const quizData = [
    {
      question: 'Which of the following was the first coloured film in India?',
      options: ['Alam Ara', 'Pather Panchali', 'Kisan kanya', 'Devdas'],
      answer: 'Kisan kanya',
    },
    {
      question: 'Which of the following is known as father of Indian Cinema?',
      options: ['Dhundhi Raj Govind Phalke', 'Dada Saheb Phalke', 'Both A and B', 'Mani Sethna'],
      answer: 'Dhundhi Raj Govind Phalke',
    },
    {
      question: 'Which was the first talkie films of India?',
      options: ['Alam Ara', 'Pundlik', 'Raja Harishchandra', 'Nal Damayanti'],
      answer: 'Alam Ara',
    },
    {
      question: 'Which of the following regional cinema referred to as kollywood?',
      options: ['Punjabi Cinema', 'Tamil Cinema', 'Marathi Cinema', 'Malayalam Cinema'],
      answer: 'Tamil Cinema',
    },
    {
      question: 'Which is the first Sanskrit film?',
      options: ['Shankaracharya', 'Bhagvad Gita', 'Gunda', 'Margazhi Raagam',],
      answer: 'Shankaracharyav',
    },
    {
      question: 'Which is the first serialised animation film in India?',
      options: ['Ek anek aur ekta', 'Ghayab Aya', 'Kittu', 'Motu Patlu',],
      answer: 'Ghayab Aya',
    },
    {
      question: 'For which of the following the term sandalwood is used?',
      options: ['Kannada Cinema', 'Telugu Cinema', 'Tamil Cinema', 'South Indian Cinema',],
      answer: 'Ping-Pong',
    },
    {
      question: 'Whick among the following are key players in Film Production?',
      options: ['Production Manager', 'Composer', 'Both option 1 & option 2', 'Announcer'],
      answer: 'Polo',
    },
    {
      question: 'How do movies impact our socities?',
      options: ['Movies mirror culture', 'Movies shape culture', 'Movie teach us history', 'All of the above'],
      answer: 'All of the above',
    },
    {
      question: 'Which movie create Milestone in history of world cinema?',
      options: ['The Birth of a Nation', 'The wrestler', 'Titanic', 'Alam Ara'],
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