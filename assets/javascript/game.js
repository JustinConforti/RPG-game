// function Character(name, health, attackpower, counterattack, attacker) {

//         this.name = name;
//         this.health = health;
//         this.attackpower = attackpower;
//         this.counterattack = counterattack;
//         this.attacker = true;

// }
let charImg = ["avatar.jpg", "zuko.jpg", "katara.jpg", "appa.jpg"];
let characterName = ["Aang", "Zuko", "Katara", "Oppa", ];
let characterHealth = [1500, 1250, 1000, 4500];
var characterAttack = [7, 12, 15, 2];
let characterCounter = [95, 75, 100, 15];
var currentHealthPoints
let opponentHealth;
let opponentAttack;
let currentAttackPower;
let totalOpponents = 3;
let gameStarted = false;
let pickedCharacter = false;
// create start / restart button that will flag gameStarted and run startGame()
// character-buttons will not be generated until startGame function has been run
// use of .data?
function startGame() {

    for (let i = 0; i < characterName.length; i++) {
        let character = $("<button>"); //creates a button tag and assigns it to the local variable character
        let characterImg = $("<img>"); // creates img tag within button tag and assigns it to characterImg 
        character.addClass("startingPosition"); // assigns startingPosition class which will push all characters to their starting spot
        character.attr("id", characterName[i]);
        character.attr({
            "data-name": characterName[i]
        }); // using "for" loop to load each characters stats to their HTML
        character.attr({
            "data-hp": characterHealth[i]
        }); // using data as a jquery function to later access these values
        character.attr({
            "data-attacknumber": characterAttack[i]
        });
        character.attr({
            "data-counternumber": characterCounter[i]
        });
        characterImg.attr("src", "assets/images/" + charImg[i]); // attaching a src and image to each character[i];
        let currentAttackPowerSpan = $("<span>").addClass("currentAttack").html("    Damage:" + character.data("attacknumber"));
        // let currentCounterPowerSpan = $("<span>").addClass("counterAttack").html("    Counter Damage:" +character.data("counternumber"));
        let currentHpSpan = $("<span>").addClass("currentHp").html("Health:" + character.data("hp")); // making a child span with class currentHP and setting its html to characters("hp") using .data function
        character.append(characterName[i], characterImg, currentHpSpan, currentAttackPowerSpan); // add later: HP alert? + character damage number? spans/id?
        $("#starting").append(character); // appends character variable to starting div and repeats until no more characters in characterName array
    }
}
// ASK : why does this work? $(".startingPosition") with click function won't work but (document) does due to scoping issues //

$(document).on('click', '.startingPosition', function () { // on click function to assign starting character when clicked

    $(this).removeClass("startingPosition"); // removing starting position class and moving it to userCharacter 
    $(this).addClass("userCharacter");
    currentHealthPoints = $(this).data("hp"); // assigns the chosen characters hp value to the global currentHealthPoint variable
    console.log(currentHealthPoints)
    $(".userCharacter").find("span").remove(); //remove span elements
    $(".userCharacter").append("<span>").addClass("Health")
    $('.userCharacter span').html("Max Health: " + currentHealthPoints);


    $(".attackingPosition").append($(this));

    //  $('h3').hasClass('pickCharacter').css("display: none"); // How to hide this h3 class?
    // console.log($(this))
    for (let i = 0; i < characterAttack.length; i++) { // making an if loop to check
        if (characterAttack[i] != $(this).data("attacknumber")) { // ASK: better way to check this? By classes perhaps? //

            let currentCounterPowerSpan = $("<span>").addClass("counterAttack").html("    Counter Damage:" + ($(this).data("counternumber")));
            $("#" + characterName[i] + "span").removeClass("currentAttack"); // WHY??!?!?! NO WORK
            $("#" + characterName[i]).removeClass("startingPosition").addClass("defendingCharacter") //targeting Id(#) of each characterName
            $("#" + characterName[i]).append(currentCounterPowerSpan);
            $(".defendingPosition").append($("#" + characterName[i]));
            $(".message-box").text("Pick your opponent!")

        }




    }
    whoIsOpponent();

    // if ($(this).hasClass("defendingPosition")) {   <------ DEBUGGGER IF STILL NECESSARY
    //     console.log('hey')
    //     $(this).removeClass("defendingPosition")

    // }
    // else {
    //     return;
    // }

});

function whoIsOpponent() {
    $(document).on('click', '.defendingCharacter', function () {
        opponentHealth = $(this).data('hp')
        $(this).removeClass("defendingCharacter").addClass("currentOpponent");
        $(".currentOpponentList").append($(this));
        $(".currentOpponent").find("span").remove(); //remove span elements
        $(".currentOpponent").append("<span>").addClass("enemyHealth")
        $('.currentOpponent span').html("Max Health:  " + opponentHealth);
        $(".message-box").text("Prepare to fight!")

        console.log("hey")

    })
    fightMode()
}


function fightMode() {
    $('.hit').on('click', function () {

        currentHealthPoints = $(".userCharacter").data("hp");
        opponentHealth = $(".currentOpponent").data("hp");
        currentAttackPower = $('.userCharacter').data('attacknumber');
        opponentAttack = $(".currentOpponent").data("counternumber")
        // console.log(currentAttackPower)
        // console.log($(".currentOpponent").data("hp"))

        if ($(".currentOpponent").data("hp") > 0) {
            opponentHealth = parseInt($(".currentOpponent").data("hp") - currentAttackPower);
            currentHealthPoints = parseInt($(".userCharacter").data("hp") - opponentAttack)
           currentAttackPower = Math.floor(currentAttackPower);

        
            console.log(currentHealthPoints)
            $(".message-box").text("You swing and hit your opponent for " + currentAttackPower + "  his health is now " + opponentHealth + "       Your opponent counter swings and hits you for  " + opponentAttack + "  your health is currently   " + currentHealthPoints)
            // $(".message-box").append("<span>").addClass("secondline")
            // $(".secondline").text("second line start here")


        }

        updateHP()
        updateAttackPower()
        checkWin()

        
    })

}

function updateAttackPower() {
    currentAttackPower = currentAttackPower * 1.1 + 1
    console.log(currentAttackPower)

    $('.userCharacter').data('attacknumber', currentAttackPower);

}

function updateHP() {


    $('.currentOpponent').data('hp', opponentHealth);
    $('.currentOpponent span').html("Remaining health: " + opponentHealth);
    $(".userCharacter").data("hp", currentHealthPoints)
    $(".userCharacter span").html("Remaining health: " + currentHealthPoints)


}

function checkWin() {

    if (opponentHealth < 0) {
        // $(".")
        var currentEnemyPlayer = $(".currentOpponent").data("name")
        console.log(currentEnemyPlayer)
        $("#" + currentEnemyPlayer).remove()
        $(".message-box").text("You defeated your opponent! Pick another challenger")

        totalOpponents--
        console.log(totalOpponents)
        whoIsOpponent()

    } 
    if ((totalOpponents === 0) && (opponentHealth <= 0)) {
        $(".message-box").text("All opponents defeated. You are the true master of the elements!")

    }
    if (currentHealthPoints <= 0) {
        $(".message-box").text("You have been defeated. Better luck next time!")

    }

}


startGame()