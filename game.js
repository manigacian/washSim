var player = {

  skills: {
    GenWXP: 0,
    GenWIA: 1,
    GenWMax: 2,
    GenWL: 0,

    PltWXP: 0,
    PltWIA: 1,
    PltWMax: 5,
    PltWL: 0,

    CutWXP: 0,
    CutWIA: 1,
    CutWMax: 5,
    CutWL: 0,

    PotWXP: 0,
    PotWIA: 1,
    PotWMax: 5,
    PotWL: 0,

    GenDXP: 0,
    GenDIA: 1,
    GenDMax: 5,
    GenDL: 0,

    PltDXP: 0,
    PltDIA: 1,
    PltDMax: 5,
    PltDL: 0,

    CutDXP: 0,
    CutDIA: 1,
    CutDMax: 5,
    CutDL: 0,

    PotDXP: 0,
    PotDIA: 1,
    PotDMax: 5,
    PotDL: 0

  },

  unlocks: {

    initialSkills: false, // GenWL == 1
    money: false, // GenWL == 2
    initialUpgrades: false, // GenWL == 3
    specialSkills: false, // GenWL == 5
    drying: false, // upgrades.fifteen == true
    dryingSpecial: false // GenDL == 5

  },

  upgrades: {

    one: false,
    oneCost: 5,

    two: false,
    twoCost: 10,

    three: false,
    threeCost: 20,

    four: false,
    fourCost: 25,

    five: false,
    fiveCost: 40,

    six: false,
    sixCost: 100,

    seven: false,
    sevenCost: 80,

    eight: false,
    eightCost: 400,

    nine: false,
    nineCost: 80,

    ten: false,
    tenCost: 1600,

    eleven: false,
    elevenCost: 500,

    twelve: false,
    twelveCost: 2000,

    thirteen: false,
    thirteenCost: 8000,

    fourteen: false,
    fourteenCost: 20000,

    fifteen: false,
    fifteenCost: 1000,

    sixteen: false,
    sixteenCost: 5000,

    seventeen: false,
    seventeenCost: 10000,

    eighteen: false,
    eighteenCost: 100000,

    additionalData: {

      autoWashLoop: null,
      autoWashCooldown: 5000,

      autoDryLoop: null,
      autoDryCooldown: 10,

      drySalaryMultiplier: 1,
      dryMultiplier: 1

    }

  },

  actions: {

    washBarLoop: null,
    washCooldown: false,
    washCooldownTime: 1000,

    dryBarLoop: null,
    dryCooldown: false,
    dryCooldownTime: 2500

  },

  currency: {

    money: 0

  },

  income: {

    salary: 1,
    salaryCooldown: 5,
    salaryCooldownMax: 5

  },

  tutorial: {
    general: true,
    initialSkills: true,
    money: true,
    initialUpgrades: true,
    specialSkills: true,
    drying: true,
    dryingSpecial: true
  },

  version: "0.1.1"

}
var drySalaryMulti = null;
var darkModeOn = false;
// event listeners
//action btns
document.getElementById("washBtn").addEventListener("click", Wash);
document.getElementById("dryBtn").addEventListener("click", Dry);
document.getElementById("settingsBtn").addEventListener("click", Settings);
document.getElementById("saveBtn").addEventListener("click", save);
document.getElementById("darkModeBtn").addEventListener("click", darkMode);
//upgrade btns
document.getElementById("upgradeOneBtn").addEventListener("click", upgradeOne);
document.getElementById("upgradeTwoBtn").addEventListener("click", upgradeTwo);
document.getElementById("upgradeThreeBtn").addEventListener("click", upgradeThree);
document.getElementById("upgradeFourBtn").addEventListener("click", upgradeFour);
document.getElementById("upgradeFiveBtn").addEventListener("click", upgradeFive);
document.getElementById("upgradeSixBtn").addEventListener("click", upgradeSix);
document.getElementById("upgradeSevenBtn").addEventListener("click", upgradeSeven);
document.getElementById("upgradeEightBtn").addEventListener("click", upgradeEight);
document.getElementById("upgradeNineBtn").addEventListener("click", upgradeNine);
document.getElementById("upgradeTenBtn").addEventListener("click", upgradeTen);
document.getElementById("upgradeElevenBtn").addEventListener("click", upgradeEleven);
document.getElementById("upgradeTwelveBtn").addEventListener("click", upgradeTwelve);
document.getElementById("upgradeThirteenBtn").addEventListener("click", upgradeThirteen);
document.getElementById("upgradeFourteenBtn").addEventListener("click", upgradeFourteen);
document.getElementById("upgradeFifteenBtn").addEventListener("click", upgradeFifteen);
document.getElementById("upgradeSixteenBtn").addEventListener("click", upgradeSixteen);
document.getElementById("upgradeSeventeenBtn").addEventListener("click", upgradeSeventeen);
document.getElementById("upgradeEighteenBtn").addEventListener("click", upgradeEighteen);

// game loop

var gameLoop = setInterval(function(){

  // Skill Level Ups
  // General Lvl Up
  if (player.skills.GenWXP >= player.skills.GenWMax){

    player.skills.GenWXP = player.skills.GenWXP - player.skills.GenWMax;
    player.skills.GenWL++;
    player.skills.GenWMax = Math.floor((player.skills.GenWL+1) ** 1.6) + 1;

    player.actions.washCooldownTime = (Math.floor(player.actions.washCooldownTime * 0.9))+1;

  }
  if (player.skills.GenDXP >= player.skills.GenDMax){

    player.skills.GenDXP = player.skills.GenDXP - player.skills.GenDMax;
    player.skills.GenDL++;
    player.skills.GenDMax = Math.floor((player.skills.GenDL+1) ** 1.7) + 3;

    player.upgrades.additionalData.drySalaryMultiplier = player.upgrades.additionalData.drySalaryMultiplier + 0.1;

    player.actions.dryCooldownTime = (Math.floor(player.actions.dryCooldownTime * 0.9))+1;

  }
  // Plate Lvl Up
  if ((player.skills.PltWXP >= player.skills.PltWMax)&&(player.unlocks.specialSkills == true)){

    player.skills.PltWXP = player.skills.PltWXP - player.skills.PltWMax;
    player.skills.PltWL++;
    player.skills.PltWMax = Math.floor((player.skills.PltWL+1) ** 1.6) + 3;

    player.income.salary = player.income.salary + 0.5;

  }
  if ((player.skills.PltDXP >= player.skills.PltDMax)&&(player.unlocks.dryingSpecial == true)){

    player.skills.PltDXP = player.skills.PltDXP - player.skills.PltDMax;
    player.skills.PltDL++;
    player.skills.PltDMax = Math.floor((player.skills.PltDL+1) ** 1.7) + 3;

    player.upgrades.additionalData.drySalaryMultiplier = player.upgrades.additionalData.drySalaryMultiplier + 0.5;

  }
  // Cutlery Lvl Up
  if ((player.skills.CutWXP >= player.skills.CutWMax)&&(player.unlocks.specialSkills == true)){

    player.skills.CutWXP = player.skills.CutWXP - player.skills.CutWMax;
    player.skills.CutWL++;
    player.skills.CutWMax = Math.floor((player.skills.CutWL+1) ** 1.6) + 3;

    player.income.salary++;

  }
  if ((player.skills.CutDXP >= player.skills.CutDMax)&&(player.unlocks.dryingSpecial == true)){

    player.skills.CutDXP = player.skills.CutDXP - player.skills.CutDMax;
    player.skills.CutDL++;
    player.skills.CutDMax = Math.floor((player.skills.CutDL+1) ** 1.7) + 3;

    player.upgrades.additionalData.drySalaryMultiplier = player.upgrades.additionalData.drySalaryMultiplier + 1;

  }
  //Pot Lvl Up
  if ((player.skills.PotWXP >= player.skills.PotWMax)&&(player.unlocks.specialSkills == true)){

    player.skills.PotWXP = player.skills.PotWXP - player.skills.PotWMax;
    player.skills.PotWL++;
    player.skills.PotWMax = Math.floor((player.skills.PotWL+1) ** 1.6) + 3;

    player.income.salary = player.income.salary + 2;

  }
  if ((player.skills.PotDXP >= player.skills.PotDMax)&&(player.unlocks.dryingSpecial == true)){

    player.skills.PotDXP = player.skills.PotDXP - player.skills.PotDMax;
    player.skills.PotDL++;
    player.skills.PotDMax = Math.floor((player.skills.PotDL+1) ** 1.7) + 3;

    player.upgrades.additionalData.drySalaryMultiplier = player.upgrades.additionalData.drySalaryMultiplier + 2;

  }

  //Initial Skills unlock

  if ((player.unlocks.initialSkills == false)&&(player.skills.GenWL >= 1)){

    initialSkillsUnlock();

  }

  // Money unlock

  if ((player.unlocks.money == false)&&(player.skills.GenWL >= 2)){

    moneyUnlock();

  }

  // initial Upgrades unlock

  if ((player.unlocks.initialUpgrades == false)&&(player.skills.GenWL >= 3)){

    initialUpgradesUnlock();

  }

  // special wash skills unlock

  if ((player.unlocks.specialSkills == false)&&(player.skills.GenWL >= 5)){

    specialSkillsUnlock();

  }

  // drying special skills unlock

  if ((player.unlocks.dryingSpecial == false)&&(player.skills.GenDL >= 5)){

    dryingSpecialUnlock();

  }

  //Salary Rewarding
  if (player.income.salaryCooldown == 0){

    player.currency.money = player.currency.money + (player.income.salary * player.upgrades.additionalData.drySalaryMultiplier);

    player.income.salaryCooldown = player.income.salaryCooldown + player.income.salaryCooldownMax;

  }

  // Screen Updates

  // Money, Salary Updates

  if (player.upgrades.additionalData.drySalaryMultiplier < 10){
    drySalaryMulti = player.upgrades.additionalData.drySalaryMultiplier.toFixed(1);
  } else {
    drySalaryMulti = numberformat.format(player.upgrades.additionalData.drySalaryMultiplier);
  }

  document.getElementById("moneyLbl").innerHTML = "Money: " + numberformat.format(player.currency.money);

  if (player.unlocks.drying == true){

    document.getElementById("salaryLbl").innerHTML = "Salary: " + numberformat.format(player.income.salary) + " * " + drySalaryMulti;

  } else {

      document.getElementById("salaryLbl").innerHTML = "Salary: " + numberformat.format(player.income.salary);

  }

  //Wash/Dry Progress Bar updates
  document.getElementById("washProg").max = player.actions.washCooldownTime / 1000;
  document.getElementById("dryProg").max = player.actions.dryCooldownTime / 1000;

  //General Skill Progress updates
  document.getElementById("generalWashProgress").value = player.skills.GenWXP;
  document.getElementById("generalWashProgress").max = player.skills.GenWMax;
  document.getElementById("generalWashLbl").innerHTML = "General Washing Skill: " + player.skills.GenWL;

  document.getElementById("generalDryProgress").value = player.skills.GenDXP;
  document.getElementById("generalDryProgress").max = player.skills.GenDMax;
  document.getElementById("generalDryLbl").innerHTML = "General Drying Skill: " + player.skills.GenDL;

  // Special Skills Progress Updates
  document.getElementById("plateWashProgress").value = player.skills.PltWXP;
  document.getElementById("plateWashProgress").max = player.skills.PltWMax;
  document.getElementById("plateWashLbl").innerHTML = "Plate Washing Skill: " + player.skills.PltWL;

  document.getElementById("cutleryWashProgress").value = player.skills.CutWXP;
  document.getElementById("cutleryWashProgress").max = player.skills.CutWMax;
  document.getElementById("cutleryWashLbl").innerHTML = "Cutlery Washing Skill: " + player.skills.CutWL;

  document.getElementById("potWashProgress").value = player.skills.PotWXP;
  document.getElementById("potWashProgress").max = player.skills.PotWMax;
  document.getElementById("potWashLbl").innerHTML = "Pot Washing Skill: " + player.skills.PotWL;

  document.getElementById("plateDryProgress").value = player.skills.PltDXP;
  document.getElementById("plateDryProgress").max = player.skills.PltDMax;
  document.getElementById("plateDryLbl").innerHTML = "Plate Drying Skill: " + player.skills.PltDL;

  document.getElementById("cutleryDryProgress").value = player.skills.CutDXP;
  document.getElementById("cutleryDryProgress").max = player.skills.CutDMax;
  document.getElementById("cutleryDryLbl").innerHTML = "Cutlery Drying Skill: " + player.skills.CutDL;

  document.getElementById("potDryProgress").value = player.skills.PotDXP;
  document.getElementById("potDryProgress").max = player.skills.PotDMax;
  document.getElementById("potDryLbl").innerHTML = "Pot Drying Skill: " + player.skills.PotDL;

  console.log("Looped");

}, 20);

// save loop

var saveLoop = setInterval(function(){
  save();
  console.log("Saved!")
}, 10000)

// core functions

function Wash(){

  if (player.actions.washCooldown == false){

    player.actions.washCooldown = true;

    player.skills.GenWXP = player.skills.GenWXP + player.skills.GenWIA;

    player.income.salaryCooldown--;

    // check unlock then randomly decide, plate, cutlery or pot

    if(player.unlocks.specialSkills == true){

      var rnd = Math.floor(Math.random() * 10);

      if (rnd < 1){

        player.skills.PotWXP = player.skills.PotWXP + player.skills.PotWIA;

      } else if (rnd < 3){

        player.skills.CutWXP = player.skills.CutWXP + player.skills.CutWIA;

      } else {

        player.skills.PltWXP = player.skills.PltWXP + player.skills.PltWIA;

      }

    }

    document.getElementById("washProg").value = 0;

    var loopTimes = 0;

    player.actions.washBarLoop = setInterval(function(){

      document.getElementById("washProg").value = document.getElementById("washProg").value + 0.001;

      loopTimes++;

      if (loopTimes >= player.actions.washCooldownTime){

        clearInterval(player.actions.washBarLoop);

        player.actions.washCooldown = false;

      }

	}, 1);

  }

  if (player.tutorial.general == true){

    $('#modalGeneralTutorial').modal('open');
    player.tutorial.general = false;

  }

}

function Dry(){

  if (player.actions.dryCooldown == false){

    player.actions.dryCooldown = true;

    player.skills.GenDXP = player.skills.GenDXP + (player.skills.GenDIA * player.upgrades.additionalData.dryMultiplier);

    if(player.unlocks.dryingSpecial == true){

      var rnd = Math.floor(Math.random() * 10);

      if (rnd < 1){

        player.skills.PotDXP = player.skills.PotDXP + player.skills.PotDIA;

      } else if (rnd < 3){

        player.skills.CutDXP = player.skills.CutDXP + player.skills.CutDIA;

      } else {

        player.skills.PltDXP = player.skills.PltDXP + player.skills.PltDIA;

      }

    }

    document.getElementById("dryProg").value = 0;

    var loopTimes = 0;

    player.actions.dryBarLoop = setInterval(function(){

      document.getElementById("dryProg").value = document.getElementById("dryProg").value + 0.001;

      loopTimes++;

      if (loopTimes >= player.actions.dryCooldownTime){

        clearInterval(player.actions.dryBarLoop);

        player.actions.dryCooldown = false;

      }

	}, 1);

  }

}

function removeUpgradeSection(number){

  var upgradeSection = "upgradeSection" + number;
  var upgradeDivider = "divider" + number;

  document.getElementById(upgradeSection).style = "display: none;";
  document.getElementById(upgradeDivider).style = "display: none;";

}

function addUpgradeSection(number){

  var upgradeSection = "upgradeSection" + number;
  var upgradeDivider = "divider" + number;

  document.getElementById(upgradeSection).style = "";
  document.getElementById(upgradeDivider).style = "";

}

function autoWash(){

  player.upgrades.additionalData.autoWashLoop = setInterval(function(){

    Wash();

  }, player.upgrades.additionalData.autoWashCooldown);

}

function autoDry(){

  player.upgrades.additionalData.autoDryLoop = setInterval(function(){

    Dry();

  }, player.upgrades.additionalData.autoDryCooldown);

}

// Misc/Settings functions

function Settings(){

  $('#modalSettings').modal('open');

}

function darkMode(){

  if (darkModeOn == false){

    document.getElementById("body").style = "background-color: #263238; color: white;";

    $('.modal').css('background-color', '#263238');
    $( ".modal-footer" ).css( "background-color", "#263238" );
    $( ".modal-action" ).css( "color", "white" );

    darkModeOn = true;

  } else {

    document.getElementById("body").style = "";
    $('.modal').css('background-color', 'white');
    $( ".modal-footer" ).css( "background-color", "white" );
    $( ".modal-action" ).css( "color", "black" );

    darkModeOn = false;

  }

}

// unlock functions

function initialSkillsUnlock(){

  document.getElementById("skillsDiv").style = "";
  document.getElementById("washingDiv").classList.remove("s12");
  document.getElementById("washingDiv").classList.add("s8");

  player.unlocks.initialSkills = true;

  if (player.tutorial.initialSkills == true){

    $('#modalInitialSkills').modal('open');

    player.tutorial.initialSkills = false;

  }

}

function moneyUnlock(){

  document.getElementById("moneyLbl").style = "position: absolute; top: 1%; left: 50%; transform: translate(-50%, -50%);";
  document.getElementById("salaryLbl").style = "position: absolute; top: 5%; left: 50%; transform: translate(-50%, -50%);";

  player.unlocks.money = true;

  if (player.tutorial.money == true){

    $('#modalMoney').modal('open');

    player.tutorial.money = true;

  }

}

function initialUpgradesUnlock(){

  document.getElementById("upgradesDiv").style = "";
  document.getElementById("washingDiv").classList.remove("s8");
  document.getElementById("washingDiv").classList.add("s6");
  document.getElementById("skillsDiv").classList.remove("s4");
  document.getElementById("skillsDiv").classList.add("s3");

  document.getElementById("settingsBtn").style = "position: absolute; bottom: 3%; left: 5%; transform: translate(-50%, -50%);"

  player.unlocks.initialUpgrades = true;

  if (player.tutorial.initialUpgrades == true){

    $('#modalUpgrades').modal('open');

    player.tutorial.initialUpgrades = false;

  }

}

function specialSkillsUnlock(){

  document.getElementById("specialWashSkillSection").style = "";

  player.unlocks.specialSkills = true;

  if (player.tutorial.specialSkills == true){

    $('#modalSpecialSkills').modal('open');

    player.tutorial.specialSkills = false;

  }

}

function dryUnlock(){

  document.getElementById("dryDiv").style = "";

  document.getElementById("genDryDiv").style = "";

  player.unlocks.drying = true;

  if (player.tutorial.drying == true){

    $('#modalDrying').modal('open');

    player.tutorial.drying = false;

  }

}

function dryingSpecialUnlock(){

  document.getElementById("specialDrySkillSection").style = "";

  player.unlocks.dryingSpecial = true;

  if (player.tutorial.dryingSpecial == true){

    $('#modalDryingSpecial').modal('open');

    player.tutorial.dryingSpecial = false;

  }

}

// upgrade functions

function upgradeOne(){

  if (player.currency.money >= player.upgrades.oneCost){

    player.currency.money = player.currency.money - player.upgrades.oneCost;

    player.upgrades.one = true;

    removeUpgradeSection("One");
    addUpgradeSection("Two");

    autoWash();

  }

}

function upgradeTwo(){

  if (player.currency.money >= player.upgrades.twoCost){

    player.currency.money = player.currency.money - player.upgrades.twoCost;

    player.upgrades.two = true;

    removeUpgradeSection("Two");
    addUpgradeSection("Three");
    addUpgradeSection("Four");

    clearInterval(player.upgrades.additionalData.autoWashLoop);

    player.upgrades.additionalData.autoWashCooldown = 2500;

    autoWash();

  }

}

function upgradeThree(){

  if (player.currency.money >= player.upgrades.threeCost){

    player.currency.money = player.currency.money - player.upgrades.threeCost;

    player.upgrades.three = true;

    removeUpgradeSection("Three");
    addUpgradeSection("Five");

    clearInterval(player.upgrades.additionalData.autoWashLoop);

    player.upgrades.additionalData.autoWashCooldown = 1250;

    autoWash();

  }

}

function upgradeFour(){

  if (player.currency.money >= player.upgrades.fourCost){

    player.currency.money = player.currency.money - player.upgrades.fourCost;

    player.upgrades.four = true;

    removeUpgradeSection("Four");
    addUpgradeSection("Six");

    player.income.salaryCooldownMax = player.income.salaryCooldownMax - 1;

  }

}

function upgradeFive(){

  if (player.currency.money >= player.upgrades.fiveCost){

    player.currency.money = player.currency.money - player.upgrades.fiveCost;

    player.upgrades.five = true;

    removeUpgradeSection("Five");
    addUpgradeSection("Seven");

    clearInterval(player.upgrades.additionalData.autoWashLoop);

    player.upgrades.additionalData.autoWashCooldown = 625;

    autoWash();

  }

}

function upgradeSix(){

  if (player.currency.money >= player.upgrades.sixCost){

    player.currency.money = player.currency.money - player.upgrades.sixCost;

    player.upgrades.six = true;

    removeUpgradeSection("Six");
    addUpgradeSection("Eight");

    player.income.salaryCooldownMax = player.income.salaryCooldownMax - 1;

  }

}

function upgradeSeven(){

  if (player.currency.money >= player.upgrades.sevenCost){

    player.currency.money = player.currency.money - player.upgrades.sevenCost;

    player.upgrades.seven = true;

    removeUpgradeSection("Seven");
    addUpgradeSection("Nine");

    clearInterval(player.upgrades.additionalData.autoWashLoop);

    player.upgrades.additionalData.autoWashCooldown = 313;

    autoWash();

  }

}

function upgradeEight(){

  if (player.currency.money >= player.upgrades.eightCost){

    player.currency.money = player.currency.money - player.upgrades.eightCost;

    player.upgrades.eight = true;

    removeUpgradeSection("Eight");
    addUpgradeSection("Ten");

    player.income.salaryCooldownMax = player.income.salaryCooldownMax - 1;

  }

}

function upgradeNine(){

  if (player.currency.money >= player.upgrades.nineCost){

    player.currency.money = player.currency.money - player.upgrades.nineCost;

    player.upgrades.nine = true;

    removeUpgradeSection("Nine");
    addUpgradeSection("Eleven");

    clearInterval(player.upgrades.additionalData.autoWashLoop);

    player.upgrades.additionalData.autoWashCooldown = 156;

    autoWash();

  }

}

function upgradeTen(){

  if (player.currency.money >= player.upgrades.tenCost){

    player.currency.money = player.currency.money - player.upgrades.tenCost;

    player.upgrades.ten = true;

    removeUpgradeSection("Ten");
    addUpgradeSection("Fifteen");

    player.income.salaryCooldownMax = player.income.salaryCooldownMax - 1;

  }

}

function upgradeEleven(){

  if (player.currency.money >= player.upgrades.elevenCost){

    player.currency.money = player.currency.money - player.upgrades.elevenCost;

    player.upgrades.eleven = true;

    removeUpgradeSection("Eleven");
    addUpgradeSection("Twelve");

    clearInterval(player.upgrades.additionalData.autoWashLoop);

    player.upgrades.additionalData.autoWashCooldown = 78;

    autoWash();

  }

}

function upgradeTwelve(){

  if (player.currency.money >= player.upgrades.twelveCost){

    player.currency.money = player.currency.money - player.upgrades.twelveCost;

    player.upgrades.twelve = true;

    removeUpgradeSection("Twelve");
    addUpgradeSection("Thirteen");

    clearInterval(player.upgrades.additionalData.autoWashLoop);

    player.upgrades.additionalData.autoWashCooldown = 39;

    autoWash();

  }

}

function upgradeThirteen(){

  if (player.currency.money >= player.upgrades.thirteenCost){

    player.currency.money = player.currency.money - player.upgrades.thirteenCost;

    player.upgrades.thirteen = true;

    removeUpgradeSection("Thirteen");
    addUpgradeSection("Fourteen");

    clearInterval(player.upgrades.additionalData.autoWashLoop);

    player.upgrades.additionalData.autoWashCooldown = 20;

    autoWash();

  }

}

function upgradeFourteen(){

  if (player.currency.money >= player.upgrades.fourteenCost){

    player.currency.money = player.currency.money - player.upgrades.fourteenCost;

    player.upgrades.fourteen = true;

    removeUpgradeSection("Fourteen");

    clearInterval(player.upgrades.additionalData.autoWashLoop);

    player.upgrades.additionalData.autoWashCooldown = 0;

    autoWash();

  }

}

function upgradeFifteen(){

  if (player.currency.money >= player.upgrades.fifteenCost){

    player.currency.money = player.currency.money - player.upgrades.fifteenCost;

    player.upgrades.fifteen = true;

    removeUpgradeSection("Fifteen");

    addUpgradeSection("Sixteen");

    dryUnlock();

  }

}

function upgradeSixteen(){

  if (player.currency.money >= player.upgrades.sixteenCost){

    player.currency.money = player.currency.money - player.upgrades.sixteenCost;

    player.upgrades.sixteen = true;

    removeUpgradeSection("Sixteen");
    addUpgradeSection("Seventeen");

    autoDry();

  }

}

function upgradeSeventeen(){

  if (player.currency.money >= player.upgrades.seventeenCost){

    player.currency.money = player.currency.money - player.upgrades.seventeenCost;

    player.upgrades.seventeen = true;

    removeUpgradeSection("Seventeen");
    addUpgradeSection("Eighteen");

    player.upgrades.additionalData.dryMultiplier = player.upgrades.additionalData.dryMultiplier * 1.5;

  }

}

function upgradeEighteen(){

  if (player.currency.money >= player.upgrades.eighteenCost){

    player.currency.money = player.currency.money - player.upgrades.eighteenCost;

    player.upgrades.eighteen = true;

    removeUpgradeSection("Eighteen");

    player.upgrades.additionalData.dryMultiplier = player.upgrades.additionalData.dryMultiplier * 1.5;

  }

}

// Saving

function save(){

  Cookies.remove('game')
  Cookies.set('game', player);

}

function loadSave(){
  if (Cookies.getJSON('game') != null){
    player = Cookies.getJSON('game');
  }

  player.actions.dryCooldown = false;
  player.actions.washCooldown = false;

  if (player.unlocks.initialSkills == true){
    initialSkillsUnlock();
  }
  if(player.unlocks.money == true){
    moneyUnlock();
  }
  if(player.unlocks.initialUpgrades == true){
    initialUpgradesUnlock();
    loadUpgrades();
  }
  if(player.unlocks.specialSkills == true){
    specialSkillsUnlock();
  }
  if(player.unlocks.drying == true){
    dryUnlock();
  }
  if(player.unlocks.dryingSpecial == true){
    dryingSpecialUnlock();
  }
  if(player.upgrades.additionalData.autoWashLoop != null){
    autoWash();
  }
  if(player.upgrades.additionalData.autoDryLoop != null){
    autoDry();
  }

  fixSave();

}

function loadUpgrades(){

  if(player.upgrades.one == true){
    removeUpgradeSection("One");
    addUpgradeSection("Two");
  }
  if(player.upgrades.two == true){
    removeUpgradeSection("Two");
    addUpgradeSection("Three");
    addUpgradeSection("Four");
  }
  if(player.upgrades.three == true){
    removeUpgradeSection("Three");
    addUpgradeSection("Five");
  }
  if(player.upgrades.four == true){
    removeUpgradeSection("Four");
    addUpgradeSection("Six");
  }
  if(player.upgrades.five == true){
    removeUpgradeSection("Five");
    addUpgradeSection("Seven");
  }
  if(player.upgrades.six == true){
    removeUpgradeSection("Six");
    addUpgradeSection("Eight");
  }
  if(player.upgrades.seven == true){
    removeUpgradeSection("Seven");
    addUpgradeSection("Nine");
  }
  if(player.upgrades.eight == true){
    removeUpgradeSection("Eight");
    addUpgradeSection("Ten");
  }
  if(player.upgrades.nine == true){
    removeUpgradeSection("Nine");
    addUpgradeSection("Eleven");
  }
  if(player.upgrades.ten == true){
    removeUpgradeSection("Ten");
    addUpgradeSection("Fifteen");
  }
  if(player.upgrades.eleven == true){
    removeUpgradeSection("Eleven");
    addUpgradeSection("Twelve");
  }
  if(player.upgrades.twelve == true){
    removeUpgradeSection("Twelve");
    addUpgradeSection("Thirteen");
  }
  if(player.upgrades.thirteen == true){
    removeUpgradeSection("Thirteen");
    addUpgradeSection("Fourteen");
  }
  if(player.upgrades.fourteen == true){
    removeUpgradeSection("Fourteen")
  }
  if(player.upgrades.fifteen == true){
    removeUpgradeSection("Fifteen");
    addUpgradeSection("Sixteen");
  }
  if(player.upgrades.sixteen == true){
    removeUpgradeSection("Sixteen");
    addUpgradeSection("Seventeen");
  }
  if(player.upgrades.seventeen == true){
    removeUpgradeSection("Seventeen");
    addUpgradeSection("Eighteen");
  }
  if(player.upgrades.eighteen == true){
    removeUpgradeSection("Eighteen")
  }

}

function fixSave(){

  if (player.version != "0.1.1"){

    player.skills.PltDXP = 0;
    player.skills.PltDIA = 1;
    player.skills.PltDMax = 5;
    player.skills.PltDL = 0;

    player.skills.CutDXP = 0;
    player.skills.CutDIA = 1;
    player.skills.CutDMax = 5;
    player.skills.CutDL = 0;

    player.skills.PotDXP = 0;
    player.skills.PotDIA = 1;
    player.skills.PotDMax = 5;
    player.skills.PotDL = 0;

    player.unlocks.dryingSpecial = false;
    player.tutorial = {
      general: true,
      initialSkills: true,
      money: true,
      initialUpgrades: true,
      specialSkills: true,
      drying: true,
      dryingSpecial: true
    }

  }

}

$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });
