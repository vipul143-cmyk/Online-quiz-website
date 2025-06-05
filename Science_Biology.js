const quizData = [
   {  
        question: 'The place for keeping and studying dry plant is called?',
        options: ['arboreum', 'yasculum', 'herbarium', 'museum'],
        answer: 'herbarium',
    },
    { 
        question:'Pusa Lerma is an improverd variety of?',
        options: ['raci', 'wheat', 'mazie', 'soybean'],
        answer:  'wheat',
    },
    {
       question: 'The botanical name  if sunn hemp is?',
       options: ['crotolaria', 'leans culinaris', 'trifolium alexandrium', 'sebania aculeata'],
       answer: 'crotolaria',
    },
    {
       question: 'Wax glands of honey bee are present in?',
       options: ['queen', 'drones', 'workers', 'both (a)and(c)'],
       answer: 'both(a)and(c)',
    }, 
    {
      question: 'Maximum milk yielding buffalo?',
      options: ['naaggpuri', 'suri', 'mehsana', 'murrah'],
      answer: 'murrach',
    },
    {
      question: 'The common biofertilizers used in organic farming are?',
      options: ['margosa', 'pyrethrum', 'green manure', 'nitrogin fixing bacteria and cyanobacteri'],
      answer: 'nitrogin fixing bactreia and cyanobacteria',
    },
    {
      question: 'The element  which is required in largest quaantity by plant is?',
      options: ['ssulpher', 'calcim', 'phosphorus', 'nitrogen'],
      answer: 'nitrrogen',
    },
    {    
      question: ' Which of the following natural iinsecticides',
      options: ['nicoten', 'neem', 'pyrethrum', 'all of this'],
      answer: 'all of this',
    },
    {
      question: 'All animals are?',
      options: ['parasitic', 'saprophytic', 'autrophic', 'heatrotophic'],
      answer: 'parasitic',
    },
    { 
     question: '10 the principal ccereal crop of india is?',
     options: ['wwheat', 'rice', 'maize', 'sorghum'],
     answer: 'rice', 
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
