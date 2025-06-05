const quizData = [
    {
      question: 'Which term of the AP 3,15,27,39,... will be 132 more than its 54th term?',
      options: ['63rd', '64th', '65th', '66th'],
      answer: '65th',
    },
    {
      question: 'What is the value of 2(power of 10)?',
      options: ['512', '1000', '2048', '1024'],
      answer: '1024',
    },
    {
      question: 'A sum of money at simple interest amounts to be Rs.815 in 3 years and to Rs.854 in 4 years. What is the sum?',
      options: ['Rs. 650', 'Rs. 690', 'Rs. 698', 'Rs. 700'],
      answer: 'Rs. 698',
    },
    {
      question: 'For a sphare of radius 20cm, the numerical value of surface area is what percent of the numerical value of its volume?',
      options: ['33.33%', '15%', '30%', '20%'],
      answer: '15%',
    },
    {
      question: 'Find the single discount equivalent to two successive discounts of 10% and 20%?',
      options: ['15%', '14.5%', '7.5%', '12.75%'],
      answer: '14.5%',
    },
    {
      question: 'After how many years will a sum of Rs.12500 become Rs.17500 at the rate of 10% per annum?',
      options: ['1 years', '2 years', '3 years', '4 years',],
      answer: '4 years',
    },
    {
      question: 'A sum of money is to be distributed amonng A,B,C and D in the proportion of 2:3:5:4. If C gets Rs.3000, what is share of A?',
      options: ['Rs.600', 'Rs.1200', 'Rs.1500', 'Rs.750',],
      answer: 'Rs.1200',
    },
    {
      question: 'The average of 20 number is zero. Of them, at the most, how many may be greater than zero?',
      options: ['0', '1', '10', '19'],
      answer: '19',
    },
    {
      question: 'A man rows upstream 13 km and downstream 28 km, taking 5 h each time. What is the velocity of the current?',
      options: ['1.5 km/h', '1.2 km/h', '3.6 km/h', '2 km/h'],
      answer: '1.5 km/h',
    },
    {
      question: 'Find the ratio in which sugar at Rs. 7.20 per kg be mixed with rice at Rs 5.70 a kg to produce a mixture worth Rs. 6.30 a kg?',
      options: ['1:3', '2:3', '3:5', '4:5'],
      answer: '2:3',
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