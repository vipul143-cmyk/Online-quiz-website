const quizData = [
    {
      question: 'Which gass is usually liberated when an acid reacts with a metal?',
      options: ['Hydrogen','Oxygen','Argon','Neon'],
      answer: 'Hydrogen',
    },
    {
      question: 'Write the chemical name and chemical formula of washing soda?',
      options: ['Sodium carbonate - Na2 CO3.10H2O','Zinc sulphate - ZnSO4','Glucose - C6H5OH.','Carbon Oxide - CO2'],
      answer: 'Sodium carbonate - Na2 CO3.10H2O',
    },
    {
      question: 'Classify the following salt as acidic, basic or neutral?',
      options: ['NaCl','NaSO4','CaCl2','K2CO3'],
      answer: 'NaSO4',
    },
    {
      question: 'List four obeservations that help us to determine whether a chemical rection has taken place?',
      options: [ 'Evolution of gas','Change in temperature','Change in state','Change in colour'],
      answer: 'Evolution of gas',
    },
    {
      question: 'Vegetable matter changing into compost Which type of rection?',
      options: ['Decomposition reaction','Oxidation reaction','Chemical reaction','Displacement reaction'],
      answer: 'Decomposition reaction',
    },
    {
      question: 'Identify the type of reaction form the following?',
      options: ['Combustion rection','Double displacement rection','Combination rection','Displacenent rection'],
      answer: 'Combustion rection',
    },
    {
      question: 'Mention state of rection given by an equation?',
      options: ['Physical state of reaction and products','Condition such as temperature,pressure,heat,etc','Catalyst is state','Change is reaction'],
      answer: 'Physical state of reaction and products',
    },
    {
      question: 'What type of element is mellting point is very low?',
      options: ['Gallium','silver','sodium','Magnesium'],
      answer: 'Gallium',
    },
    {
      question: 'Which type of acids produces in the Aunt body?',
      options: ['Formic acid/Methanoic acid','citric acid','Lactic acid','Oxaliic acid'],
      answer: 'Formic acid/Methanoic acid',
    },
    {
      question: 'Give an eexample of a metal which is the best conductor of heat?',
      options: ['Silver or copper','Iron','Gold','Sodium'],
      answer: 'Silver or copper',
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