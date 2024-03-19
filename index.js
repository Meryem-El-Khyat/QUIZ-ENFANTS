var skip = document.getElementById('skip');
var score = document.getElementById('score');
var totalScore = document.getElementById('totalScore');
var countdown = document.getElementById('countdown');
var count = 0;
var scoreCount = 0;
var totalQuestionTime = 0; // Variable pour stocker le temps total de toutes les questions
var qaSet = document.querySelectorAll('.qa_set');
var qaAnsRow = document.querySelectorAll('.qa_set .qa_ans_row input');

// Initialise la variable duration à 1 pour démarrer le compteur dès le début du quiz
var duration = 1;

skip.addEventListener('click', function() {
    step();
    duration = 20;
});

qaAnsRow.forEach(function(qaAnsRowSingle) {
    qaAnsRowSingle.addEventListener('click', function() {
        setTimeout(function() {
            step();
            duration = 20;
        }, 500);

        var valid = this.getAttribute("valid");
        if (valid == "valid") {
            scoreCount += 10;
            score.innerHTML = scoreCount;
            totalScore.innerHTML = scoreCount;
        }
    });
});



//fonction pour marcher les question 1->10
function step() {
    count += 1;
    for (var i = 0; i < qaSet.length; i++) {
        qaSet[i].className = 'qa_set';
    }
    qaSet[count].className = 'qa_set_active';
    if (count == 10) {
        skip.style.display = 'none';
        clearInterval(durationTime);
        countdown.innerHTML = 0;

        // Mettre à jour l'affichage du temps total de toutes les questions
        document.getElementById("quizTime").innerHTML = formatTime(totalQuestionTime);
    }
}

// Ajouter le temps de la première question au début du quiz
totalQuestionTime += 20;

var durationTime = setInterval(function() {
    if (duration == 20) {
        duration = 0;
    }
    duration += 1;
    countdown.innerHTML = duration;
    totalQuestionTime += 1; // Ajoutez la durée de chaque seconde à la variable de temps total de toutes les questions

    if (countdown.innerHTML == 20) {
        step();
    }

}, 1000);

function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
    return minutes + "min " + remainingSeconds + "sec";
}




