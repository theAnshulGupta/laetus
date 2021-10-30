(function () {
  function buildQuiz() {
    const output = [];

    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answers = [];

      for (letter in currentQuestion.answers) {
        answers.push(
          `<label id="radio-outer">
                <input id="radio-itself" type="radio" class="checkmark" name="question${questionNumber}" value="${letter}">              
                <span class="radio-text">${currentQuestion.answers[letter]}</span>
            </label>
            `
        );
      }
      output.push(
        `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
      );
    });
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    previousButton.style.display = "none";
    homeButton.style.display = "none";
    nextButton.style.display = "none";
    submitButton.style.display = "none";
    finishedButton.style.display = "inline-block";
    finishedIcon.style.display = "inline-block";
    finishedText.style.display = "inline-block";
    quizContainer.style.display = "none";

    const answerContainers = quizContainer.querySelectorAll(".answers");

    let numCorrect = 0;

    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      if (userAnswer === currentQuestion.correctAnswer) {
        numCorrect++;
      }
    });

    // resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    finishedButton.style.display = "none";
    finishedIcon.style.display = "none";
    finishedText.style.display = "none";
    if (currentSlide === 0) {
      previousButton.style.display = "none";
      homeButton.style.display = "inline-block";
    } else {
      previousButton.style.display = "inline-block";
      homeButton.style.display = "none";
    }
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const finishedText = document.getElementById("finishedText");
  const myQuestions = [
    {
      question:
        "If you point at something across the room, does your child look at it?",
      answers: {
        a: "Yes",
        b: "No",
      },
    },
    {
      question: "Have you ever wondered if your child might be deaf?",
      answers: {
        a: "Yes",
        b: "No",
      },
    },
    {
      question: "Does your child play pretend or make-believe?",
      answers: {
        a: "Yes",
        b: "No",
      },
    },
    {
      question: "Does your child like climbing or walking over on things?",
      answers: {
        a: "Yes",
        b: "No",
      },
    },
    {
      question:
        "Does your child make unusual finger movements near his or her eyes?",
      answers: {
        a: "Yes",
        b: "No",
      },
    },
    {
      question:
        "Does your child point with one finger to ask for something or to get help?",
      answers: {
        a: "Yes",
        b: "No",
      },
    },
    {
      question:
        "Does your child point with one finger to show you something interesting?",
      answers: {
        a: "Yes",
        b: "No",
      },
    },
    {
      question:
        "Does your child show you things by bringing them to for you to see?",
      answers: {
        a: "Yes",
        b: "No",
      },
    },
    {
      question: "Does your child respond when you call his or her name?",
      answers: {
        a: "Yes",
        b: "No",
      },
    },
    {
      question:
        "When you smile at your child, does he or she smile back at you?",
      answers: {
        a: "Yes",
        b: "No",
      },
    },
    {
      question: "Does your child get upset by everyday noises?",
      answers: {
        a: "Yes",
        b: "No",
      },
    },
    {
      question: "Is your child able to walk on both of their legs?",
      answers: {
        a: "Yes",
        b: "No",
      },
    },
    {
      question:
        "Does your child look you in the eye when you talk, play, or dress them?",
      answers: {
        a: "Yes",
        b: "No",
      },
    },
    {
      question: "Does your child try to copy anything you do?",
      answers: {
        a: "Yes",
        b: "No",
      },
    },
    {
      question:
        "If you look at something, does your child look to see what you are looking at?",
      answers: {
        a: "Yes",
        b: "No",
      },
    },

    {
      question: "Does your child try to get you to watch him or her?",
      answers: {
        a: "Yes",
        b: "No",
      },
    },

    {
      question:
        "Does your child understand when you tell him or her to do something?",
      answers: {
        a: "Yes",
        b: "No",
      },
    },

    {
      question:
        "If something new happens, does your child look at your face to see how you feel?",
      answers: {
        a: "Yes",
        b: "No",
      },
    },

    {
      question: "Final question: Does your child like movement activities?",
      answers: {
        a: "Yes",
        b: "No",
      },
    },
  ];

  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const homeButton = document.getElementById("home");
  const finishedButton = document.getElementById("finished");
  const finishedIcon = document.getElementById(
    "b9d0ca34-aec4-4b08-bd35-3611e70d45c1"
  );

  const slides = document.querySelectorAll(".slide");

  let currentSlide = 0;

  showSlide(currentSlide);

  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
