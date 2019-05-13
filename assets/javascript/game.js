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
var characterAttack = [100, 125, 150, 50];
let characterCounter = [50, 50, 50, 15];
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
            "name": characterName[i]
        }); // using "for" loop to load each characters stats to their HTML
        character.attr({
            "data-hp": characterHealth[i]
        }); // using data as a jquery function to later access these values
        character.attr({
            "data-attacknumber": characterAttack[i]
        });
        character.attr({
            "data-counterNumber": characterCounter[i]
        });
        characterImg.attr("src", "assets/images/" + charImg[i]); // attaching a src and image to each character[i];
        let currentAttackPowerSpan = $("<span>").addClass("currentAttack").html("    Damage:" + character.data("attacknumber"));
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
    $(".attackingPosition").append($(this));

   //  $('h3').hasClass('pickCharacter').css("display: none"); // How to hide this h3 class?


    // console.log($(this))

    for (let i = 0; i < characterAttack.length; i++) { // making an if loop to check

        if (characterAttack[i] != $(this).data("attacknumber")) { // ASK: better way to check this? By classes perhaps? //

            // console.log("hey")
            $("#" + characterName[i]).removeClass("startingPosition").addClass("defendingCharacter") //targeting Id(#) of each characterName
            // console.log(characterName[i])
            $(".defendingPosition").append($("#" + characterName[i]));
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

    $(this).removeClass("defendingCharacter").addClass("currentOpponent")
    
    
    

    console.log("hey")

})

}
startGame()