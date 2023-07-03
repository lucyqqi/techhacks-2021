const questions = [
        {
        question: "What's the average price for a house in Canada?",
        optionA: "$304,754",
        optionB: "$511,276",
        optionC: "$716,828",
        optionD: "$689,095",
        correctOption: "optionC"
    },

    {
        question: "How much money does the average person spend on groceries per year?",
        optionA: "$1,598",
        optionB: "$2,094",
        optionC: "$1,792",
        optionD: "$2,568",
        correctOption: "optionD"
    },

    {
        question: "On average, how much money do Canadians earn each year?",
        optionA: "$73,109.24",
        optionB: "$55,806.40",
        optionC: "$42,901.78",
        optionD: "$87,001.81",
        correctOption: "optionB"
    },

    {
        question: "How much does it cost for higher education in Canada each year?",
        optionA: "$4,709",
        optionB: "$9,223",
        optionC: "$7,056",
        optionD: "$6,463",
        correctOption: "optionC"
    },

    {
        question: "Which of the following is not impacted negatively by wealth inequality?",
        optionA: "All of these are affected by wealth inequality!",
        optionB: "Life expectancy",
        optionC: "Mental health",
        optionD: "Education levels",
        correctOption: "optionA"
    },

    {
        question: "How much of Canada's wealth do the top 1% own?",
        optionA: "16.7%",
        optionB: "32.1%",
        optionC: "25.6%",
        optionD: "11.9%",
        correctOption: "optionC"
    },

    {
        question: "_____ is the average salary for Canadians without a degree, diploma, or certificate.",
        optionA: "$26,824",
        optionB: "$39,015",
        optionC: "$43,258",
        optionD: "$19,762",
        correctOption: "optionA"
    },

    {
        question: "_____ Canadians are below the poverty line in 2021.",
        optionA: "3.7 million",
        optionB: "2.4 million",
        optionC: "1.9 million",
        optionD: "4.6 million",
        correctOption: "optionA"
    },

    {
        question: "How can you help fight and mitigate the effects wealth inequality?",
        optionA: "Write to politicians to urge them to take action",
        optionB: "Volunteer your time at Food Banks or as a Tutor",
        optionC: "Donate used clothing and books",
        optionD: "All of the above!",
        correctOption: "optionD"
    },

    {
        question: "What percentage of Canadians are in debt?",
        optionA: "88.1%",
        optionB: "45.3%",
        optionC: "73.2%",
        optionD: "36.7%",
        correctOption: "optionC"
    },

]


let shuffledQuestions = [] //empty array to hold shuffled selected questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0

// function for displaying next question in the array to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })
   
    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "#77DD77"
            playerScore++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "#ff6961"
            document.getElementById(correctOption).style.backgroundColor = "#77DD77"
            wrongAttempt++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    //delays next question displaying for a second
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colours
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 4) {
        remark = "Good try, but not quite!"
        remarkColor = "#ff6961"
    }
    else if (playerScore >= 5 && playerScore < 8) {
        remark = "Almost there!"
        remarkColor = "#FAC898"
    }
    else if (playerScore >= 8) {
        remark = "Amazing, you're an expert!"
        remarkColor = "#77DD77"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal and resets game
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}