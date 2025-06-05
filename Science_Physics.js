const quizData = [
  {
    question: 'The theory of relatively is presented by which scientist?',
    options: ['Albert Einstein','Isaac Newton','Stephen Hawking','Marie Curie'],
    answer: 'Albert Einstein',
  },
  {
    question: 'Total number of colors exists in sunlight?',
    options: ['10','5','7','1'],
    answer: '7',
  },
  {
    question: 'Who is the first person to define speed?',
    options: ['Kepler','Newton','Ptolemy','Galileo'],
    answer: 'Galileo',
  },
  {
    question: 'Which color deviates least when passing through a Prism?',
    options: [ 'Yellow','Blue','Green','Red'],
    answer: 'Red',
  },
  {
    question: 'Which charge carry the proton?',
    options: ['Positive charge','Negative Charge','Neutral Charge','Variable Charge'],
    answer: 'Positive charge',
  },
  {
    question: 'Light year is the unit of?',
    options: ['Length','Light','Speed','None of the above'],
    answer: 'Length',
  },
  {
    question: 'Amphere is the unit of?',
    options: ['Force','Volt','Current','Work'],
    answer: 'Current',
  },
    {
      question: 'Ohms law give a relationship between?',
      options: ['Current and resistance', 'Resistance and potential difference', 'Potential differnce and electric', 'Current and potential difference'],
      answer: 'Current and potential difference',
    },
    {
      question: 'Which of the following branch of physics deal with study of Atomic Nuclei?',
      options: ['Nuclear Physics', 'Bio Phyiscs', 'Atomic Physics', 'None of the above'],
      answer: 'Nuclear Physics',
    },
    {
      question: 'A mass of man is 80kg on the earth. His mass on the moon will be?',
      options: ['36kg', '80kg', '23kg', '12kg'],
      answer: '80kg',
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