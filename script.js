// Listening for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Defining an array of quiz questions and answers
    const questions = [
        {
            question: "What is chemical formula for salt?",  // Storing the question text
            choices: ["Na3Cl", "Na2Cl", "Na7Cl", "NaCl"],  // Listing possible answers
            correct: 3  // Identifying the index of the correct answer
        },
        {
            question: "What is the chemical formula for water?",
            choices: ["H4O", "H2O", "HO", "H12O"],
            correct: 1
        },
        {
            question: "What is the chemical formula for sugar?",
            choices: ["HO3HC", "C4O2", "C12H22O11", "Na8Cl2"],
            correct: 2
        }
    ];

    // Initializing variables for tracking quiz progress
    let currentQuestion = 0;  // Setting the index for the current question
    let correctCount = 0;  // Counting correct answers
    let answered = false;  // Checking if the current question has been answered
    let correctAnswers = [];  // Storing correct answers for display at the end

    // Accessing DOM elements
    const questionElement = document.getElementById('question');  // Retrieving the element for the current question
    const choicesElement = document.getElementById('choices');  // Retrieving the list element for choices
    const submitButton = document.getElementById('submit-answer');  // Retrieving the submit button
    const resultElement = document.getElementById('result');  // Retrieving the element for displaying results
    const correctAnswersElement = document.createElement('div');  // Creating an element for displaying correct answers

    // Loading and displaying the current question and choices
    function loadQuestion() {
        answered = false;  // Resetting the answered flag
        resultElement.textContent = '';  // Clearing previous results
        const question = questions[currentQuestion];  // Getting the current question
        questionElement.textContent = question.question;  // Displaying the question text
        choicesElement.innerHTML = '';  // Clearing previous choices

        // Creating and appending list items for each choice
        question.choices.forEach((choice, index) => {
            const li = document.createElement('li');
            li.textContent = choice;  // Setting text to the choice
            li.onclick = () => selectAnswer(index, li);  // Adding click handler to select an answer
            choicesElement.appendChild(li);  // Appending the choice to the list
        });

        submitButton.disabled = true;  // Disabling the submit button until a choice is made
    }

    // Handling answer selection
    function selectAnswer(index, li) {
        if (!answered) {  // Running logic only if the question has not yet been answered
            answered = true;
            submitButton.disabled = false;
            document.querySelectorAll('#choices li').forEach(li => li.style.backgroundColor = '');  // Removing background color from all choices
            li.style.backgroundColor = '#F0F0F0';  // Highlighting the selected answer

            // Checking if the selected answer is correct and updating feedback
            if (index === questions[currentQuestion].correct) {
                resultElement.textContent = "Correct!";
                correctCount++;  // Incrementing the correct answer count
            } else {
                resultElement.textContent = "Wrong!";
            }
        }
    }

    // Adding a click event listener to the submit button for navigating through questions
    submitButton.addEventListener('click', () => {
        // Saving the correct answer for display
        correctAnswers.push(`${questions[currentQuestion].question}: ${questions[currentQuestion].choices[questions[currentQuestion].correct]}`);

        if (currentQuestion < questions.length - 1) {  // Checking if more questions are available
            currentQuestion++;  // Incrementing the question index
            loadQuestion();  // Loading the next question
        } else {
            showFinalResults();  // Showing final results if no more questions are left
        }
    });

    // Displaying final results and a list of correct answers
    function showFinalResults() {
        questionElement.textContent = "Quiz Completed!";  // Announcing the quiz completion
        choicesElement.innerHTML = '';  // Clearing the choices
        resultElement.textContent = `Final Score: ${correctCount} / ${questions.length}`;  // Displaying the final score
        submitButton.style.display = 'none';  // Hiding the submit button

        // Formatting and displaying the list of correct answers
        correctAnswersElement.innerHTML = '<h3>Correct Answers:</h3>' + correctAnswers.map(answer => `<p>${answer}</p>`).join('');
        document.body.appendChild(correctAnswersElement);  // Appending the correct answers to the document body
    }

    loadQuestion();  // Loading the initial question
});
