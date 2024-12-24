let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let dinoHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const dinoStats = document.querySelector("#dinoStats");
const dinoNameText = document.querySelector("#dinoName");
const dinoHealthText = document.querySelector("#dinoHealth");

// main menu
const goStore = () => {
    update(locations[1]);
}

const goCave = () => {
    update(locations[2]);
}

const fightDino = () => {
    fighting = 2;
    goFight();
}

// store menu
const buyHealth = () => {
    if(gold >= 10){
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    }else{
        text.innerText = "You don't have enough gold!!!";
    }
}

const buyWeapon = () => {
    if(currentWeapon < weapons.length - 1){
        if(gold >= 30){
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You now have a "+newWeapon+".";
            inventory.push(newWeapon);
            text.innerText += " In your inventory you have: "+inventory;
        }else{
            text.innerText = "You don't have enough gold!!!";
        }
    }else{
        text.innerText = "You can't buy any more weapons. You already have the most powerful weapon!";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}

const sellWeapon = () => {
    if(inventory.length > 1){
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a "+currentWeapon+" for 15 gold.";
    }else{
        text.innerText = "Don't sell your only weapon!";
    }
}

const goTown = () => {
    update(locations[0]);
}

// cave menu
const fightTriceratops = () => {
    fighting = 0;
    goFight();
}

const fightGigantosaurus = () => {
    fighting = 1;
    goFight();
}

const goFight = () => {
    update(locations[3]);
    dinoHealth = dinosaurs[fighting].health;
    dinoStats.style.display = "block";
    dinoNameText.innerText = dinosaurs[fighting].name;
    dinoHealthText.innerText = dinoHealth;
}

const getDinoAttackValue = (level) => {
    let hit = (level*5) - (Math.floor(Math.random()*xp));
    console.log(hit);
    return hit;
}

const isDinoHit = () => {
    return Math.random() > 0.2 || health < 20;
}

// fight menu
const attack = () => {
    text.innerText = "The "+dinosaurs[fighting].name+" attacks.";
    text.innerText += " You attack it with your "+weapons[currentWeapon].name+".";
    if(isDinoHit()){
        health -= getDinoAttackValue(dinosaurs[fighting].level);
    }else{
        text.innerText += " You miss.";
    }
    dinoHealth -= weapons[currentWeapon].power + Math.floor(Math.random()*xp) + 1;
    healthText.innerText = health;
    dinoHealthText.innerText = dinoHealth;
    if(health <= 0){
        lose();
    }else if(dinoHealth <= 0){
        fighting === 2 ? winGame() : defeatdino();
    }
    if(Math.random() <= 1 && inventory.length !== 1){
        text.innerText += " Your "+inventory.pop()+" breaks";
        currentWeapon--;
    }
}

const dodge = () => {
    text.innerText = "You dodge the "+dinosaurs[fighting].name+"'s attack.";
}

const defeatdino = () => {
    gold += Math.floor(dinosaurs[fighting].level * 6.7);
    xp += dinosaurs[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
    text.innerText = "You defeated the "+dinosaurs[fighting].name+"!";
}

const lose = () => {
    update(locations[5]);
}

const winGame = () => {
    update(locations[6]);
}

const replay = () => {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}

const easterEgg = () => {
    update(locations[7]);
}

const pickTwo = () => {
    pick(2);
}

const pickEight = () => {
    pick(8);
}

const pick = (guess) => {
    let numbers = [];
    while(numbers.length < 10){
        numbers.push(Math.floor(Math.random()*11));
    }
    text.innerText = "You picked "+guess+". Here are the random numbers:\n";
    for(let i = 0; i < 10; i++){
        text.innerText += numbers[i] + "\n";
    }
    if(numbers.indexOf(guess) !== -1){
        text.innerText = "Right! You won 20 gold!";
        gold +=20;
        gold.innerText = gold;
    }else{
        text.innerText = "Wrong! You lost 10 health!";
        health -= 10;
        health.innerText = health;
        if(health <= 0){
            lose();
        }
    }
}

// dinosaur array or list
const dinosaurs = [
    {
        name : "Triceratops",
        level : 2,
        health : 15
    },
    {
        name : "Gigantosaurus",
        level : 8,
        health : 60
    },
    {
        name : "Tyrannosaurus Rex",
        level : 20,
        health : 300
    }
];

// weapons array or list
const weapons = [
    {
        name : "stick",
        power : 5
    },
    {
        name : "dagger",
        power : 30
    },
    {
        name : "claw hammer",
        power : 50
    },
    {
        name : "sword",
        power : 100
    }
];

/*
This next part contains an array consisting of object related to different locations in the game. It will further help us in navigating through these just by JSON.
*/
const locations = [
    {
        name : "town square",
        "button text" : ["Go to store", "Go to cave", "Fight dinosaur"],
        "button functions" : [goStore, goCave, fightDino],
        text : "You are in the town square. You see a sign that says \"store\"."
    },
    {
        name : "store",
        "button text" : ["Buy 10 health (10 gold)", "Buy weappon (30 gold)", "Go to town square"],
        "button functions" : [buyHealth, buyWeapon, goTown],
        text : "You enter the store"
    },
    {
        name : "cave",
        "button text" : ["Fight Triceratops", "Fight Gigantosaurus", "Go to town square"],
        "button functions" : [fightTriceratops, fightGigantosaurus, goTown],
        text : "You enter the cave. You see some dinos."
    },
    {
        name : "fight",
        "button text" : ["Attack", "Dodge", "Run"],
        "button functions" : [attack, dodge, goTown],
        text : "You are fighting a dino."
    },
    {
        name : "kill dino",
        "button text" : ["Go to town square", "Go to town square", "Go to town square"],
        "button functions" : [easterEgg, goTown, easterEgg],
        text : "The dino screams \"Argh!\" as it dies. You gain experience points and find gold."
    },
    {
        name : "lose",
        "button text" : ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions" : [replay, replay, replay],
        text : "You died. Better luck next time. 💀"
    },
    {
        name : "win",
        "button text" : ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions" : [replay, replay, replay],
        text : "You defeat the final boss(Tyranosaurus) and win the game! 🎉"
    },
    {
        name : "easter egg",
        "button text" : ["2", "8", "Go to town square"],
        "button functions" : [pickTwo, pickEight, goTown],
        text : "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    }
];

// update location using data from the locations array declared earlier.
const update = (location) => {
    dinoStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}



// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDino;

