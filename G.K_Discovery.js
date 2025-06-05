const quizData = [
    {
      question: 'Who is credited with inventing the telephone?',
      options: ['Thomas Edison', 'Alexander Graham Bell', 'Nikola Tesla', 'James Watt'],
      answer: 'Alexander Graham Bell',
    },
    {
      question: 'Which is known as a light inventor?',
      options: ['Isaac Newton', 'Benjamin Fraklin', 'Albert Einstein', 'Thomas Edison'],
      answer: 'Thomas Edison',
    },
    {
      question: 'The discovery of America is credited to?',
      options: ['Christopher Columbus', 'Vasdo da Gama', 'Ferdinand Magellan', 'Marco Polo'],
      answer: 'Christopher Columbus',
    },
    {
      question: 'Who is responsible for developing the world wide web(WWW)?',
      options: ['Tim Berners-Lee', 'Steve Jobs', 'Bill Gates', 'Mark Zuckerberg'],
      answer: 'Tim Berners-Lee',
    },
    {
      question: 'Who was the father of DNA fingerprinting?',
      options: ['James Watson', 'Hargobind Khurana', 'Alec Jeffreys', 'Nirenberg',],
      answer: 'Alec Jeffreys',
    },
    {
      question: 'Who is known as the father of plastic surgery?',
      options: ['Charaka', 'G.D Naid', 'Sushruta', 'None of the above',],
      answer: 'Sushruta',
    },
    {
      question: 'Robert brown is known for his discovery of?',
      options: ['Chloroplast', 'Nucleus', 'Mitochondria', 'Golgi Complex',],
      answer: 'Nucleus',
    },
    {
      question: 'Who is known as the father of plastic surgery?',
      options: ['Patanjali', 'Jagadish Chandra Bose', 'Verghese Kurein', 'Raja Ramanna'],
      answer: 'Verghese Kurein',
    },
    {
      question: 'Who invented coffee filter?',
      options: ['Orville', 'Wilbur Wright', 'Melitta Bentz', 'Nikola Tesla'],
      answer: 'Melitta Bentz',
    },
    {
      question: 'Who invented the aeroplane?',
      options: ['James Watt', 'Galileo Galilei', 'The Wright Brothers', 'Thomas Edition'],
      answer: 'The Wright Brothers',
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