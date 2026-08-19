const playerInput = document.getElementById("PlayNumInput");
const confirmButton = document.getElementById("PlayNumConfirm");
const PlayerList = document.getElementById("PlayerList");
const PlayerInputSection = document.getElementById("PlayerInput");
const MePlayerList = document.getElementById("MePlayerList");
const GameInfo = document.getElementById("GameInfo");

PlayerList.style.display = "none";
GameInfo.style.display = "none";



const PlayMinus = document.getElementById("PlayMinus");
const PlayPlus = document.getElementById("PlayPlus");


PlayMinus.addEventListener("click", function() {
  let count = Number(playerInput.value);

  if (count > 4) {
    playerInput.value = count - 1;
  }
});

PlayPlus.addEventListener("click", function () {
  let count = Number(playerInput.value);

  if (count < 20) {
    playerInput.value = count + 1;
  }
});

playerInput.addEventListener("change", function() {
  let count = Number(playerInput.value);
  let min = Number(playerInput.min);
  let max = Number(playerInput.max);

  if (count < min) {
    playerInput.value = min;
  }
  if (count > max) {
    playerInput.value = max;
  }
});




const roles = [
  "Unknown",
  "Field Doctor",
  "Detective",
  "Sheriff",
  "Lifevessel",
  "Martyr",
  "Operative",
  "Journalist",
  "Apothecary",
  "Medium",
  "Civilian",
  "Mafioso",
  "Silencer",
  "Godfather",
  "Suppressor",
  "Larkin",
  "Jester",
  "Mimic"
];

const roleIcons = {
  "Unknown": "../images/RoleIcons/Unknown.png",
  "Field Doctor": "../images/RoleIcons/FieldDoctor.png",
  "Detective": "../images/RoleIcons/Detective.png",
  "Sheriff": "../images/RoleIcons/Sheriff.png",
  "Lifevessel": "../images/RoleIcons/Lifevessel.png",
  "Martyr": "../images/RoleIcons/Martyr.png",
  "Operative": "../images/RoleIcons/Operative.png",
  "Journalist": "../images/RoleIcons/Journalist.png",
  "Apothecary": "../images/RoleIcons/Apothecary.png",
  "Medium": "../images/RoleIcons/Medium.png",
  "Civilian": "../images/RoleIcons/Civilian.png",
  "Mafioso": "../images/RoleIcons/Mafioso.png",
  "Silencer": "../images/RoleIcons/Silencer.png",
  "Godfather": "../images/RoleIcons/Godfather.png",
  "Suppressor": "../images/RoleIcons/Suppressor.png",
  "Larkin": "../images/RoleIcons/Larkin.png",
  "Jester": "../images/RoleIcons/Jester.png",
  "Mimic": "../images/RoleIcons/Mimic.png"
}

const bloodPNG = [
  "../images/Blood/blood1.png",
  "../images/Blood/blood2.png"
];




confirmButton.addEventListener("click", function() {
  const playerCount = playerInput.value;

  PlayerInputSection.style.display = "none";
  PlayerList.style.display = "grid";
  GameInfo.style.display = "grid";


  for (let i=2; i <= playerCount; i++) {
    


    /* 1 Player Card */
    const playerCard = document.createElement("div");

    playerCard.classList.add("player-card");



    /* 2 Player Name */
    const playerName = document.createElement("input");

    playerName.classList.add("player-name");
    playerName.value = "Person " + (i - 1);



    /* 3 Player Status */
    const playerStatus = document.createElement("button");

    playerStatus.classList.add("player-status");
    playerStatus.textContent = "ALIVE";



    /* 4 Suspected Player Role */
    const roleSelection = document.createElement("div");
    roleSelection.classList.add("role-selection");

    const roleIcon = document.createElement("img");
    roleIcon.classList.add("role-icon");
    roleIcon.src = "/images/RoleIcons/Unknown.png";

    const playerRole = document.createElement("select");
    playerRole.classList.add("player-role");
  


    for (let role of roles) {
      const roleOption = document.createElement("option");
      roleOption.textContent = role;

      playerRole.appendChild(roleOption);
    }

    playerRole.addEventListener("change", function() {
      const selectedRole = playerRole.value;

      roleIcon.src = roleIcons[selectedRole];
    });

    roleSelection.appendChild(roleIcon);
    roleSelection.appendChild(playerRole);



    /* 5 Player Notes */
    const playerNotes = document.createElement("textarea");

    playerNotes.classList.add("player-notes");
    playerNotes.placeholder = "Notes about this Player..."



    /* Heiracrchy */
    playerCard.appendChild(playerName);
    playerCard.appendChild(playerStatus);
    playerCard.appendChild(roleSelection);
    playerCard.appendChild(playerNotes);

    PlayerList.appendChild(playerCard);


    /* Blood thing */
    const bloodLayer = document.createElement("div");
    bloodLayer.classList.add("blood-layer"); 

    function bloodRandom(min, max) {
      return Math.random() * (max - min) + min;
    }

    function bloodGen() {
      bloodLayer.innerHTML = "";

      const bloodAmount = Math.floor(bloodRandom(10, 20));

      for (let i = 0; i < bloodAmount; i++) {
        const bloodThing = document.createElement("img");

        bloodThing.src = bloodPNG[
          Math.floor(Math.random() * bloodPNG.length)
        ];

        bloodThing.classList.add("bloodstain");

        const size = bloodRandom(50, 200);
        bloodThing.style.width = `${size}px`;

        bloodThing.style.left = `${bloodRandom(0, 100)}%`;
        bloodThing.style.top = `${bloodRandom(0, 100)}%`;

        bloodThing.style.transform = `translate(-50%, -50%) rotate(${bloodRandom(-0, 360)}deg)`;

        bloodThing.style.opacity = `${bloodRandom(30, 75)}%`;

        bloodLayer.appendChild(bloodThing);
      }
    }
    
    playerStatus.addEventListener("click", function() {
      if (playerStatus.textContent === "ALIVE") {
        playerStatus.textContent = "DEAD";
        bloodGen();
      } else {
        playerStatus.textContent = "ALIVE";
        bloodLayer.innerHTML = "";
      }
    });


    playerCard.appendChild(bloodLayer);
  }
});




/* 1 Own Player Card */
const mePlayerCard = document.getElementById("MePlayerCard");

/* 2 Own Player Name */
const mePlayerName = document.getElementById("MePlayerName");

/* 3 Own Player Status */
const mePlayerStatus = document.getElementById("MePlayerStatus");

/* 4 Own Player Role */
const meRoleSelection = document.getElementById("MeRoleSelection");
const meRoleIcon = document.getElementById("MeRoleIcon");
const mePlayerRole = document.getElementById("MePlayerRole");

for (let role of roles) {
  const meRoleOption = document.createElement("option");
  meRoleOption.textContent = role;

  mePlayerRole.appendChild(meRoleOption);
}

mePlayerRole.addEventListener("change", function () {
  const selectedRole = mePlayerRole.value;

  meRoleIcon.src = roleIcons[selectedRole];
});

/* 5 Blood thing */
const meBloodLayer = document.createElement("div");
meBloodLayer.classList.add("blood-layer"); 

function bloodRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function bloodGen() {
  meBloodLayer.innerHTML = "";

  const bloodAmount = Math.floor(bloodRandom(5, 10));

  for (let i = 0; i < bloodAmount; i++) {
    const bloodThing = document.createElement("img");

    bloodThing.src = bloodPNG[
      Math.floor(Math.random() * bloodPNG.length)
    ];

    bloodThing.classList.add("bloodstain");

    const size = bloodRandom(50, 200);
    bloodThing.style.width = `${size}px`;

    bloodThing.style.left = `${bloodRandom(0, 100)}%`;
    bloodThing.style.top = `${bloodRandom(0, 100)}%`;

    bloodThing.style.transform = `translate(-50%, -50%) rotate(${bloodRandom(-0, 360)}deg)`;

    bloodThing.style.opacity = `${bloodRandom(30, 75)}%`;

    meBloodLayer.appendChild(bloodThing);
  }
}

mePlayerStatus.addEventListener("click", function() {
  if (mePlayerStatus.textContent === "ALIVE") {
    mePlayerStatus.textContent = "DEAD";
    bloodGen();
  } else {
    mePlayerStatus.textContent = "ALIVE";
    meBloodLayer.innerHTML = "";
  }
});


mePlayerCard.appendChild(meBloodLayer);




const gameTime = document.getElementById("GameTime");
const timePrev = document.getElementById("TimePrev");
const timeNext = document.getElementById("TimeNext");

const gamePhases = [
  "DAY 1",
  "NIGHT 1",
  "DAY 2",
  "NIGHT 2",
  "DAY 3",
  "NIGHT 3",
  "DAY 4",
  "NIGHT 4",
  "DAY 5",
  "NIGHT 5",
  "DAY 6",
  "NIGHT 6",
  "DAY 7",
  "NIGHT 7",
  "DAY 8",
  "NIGHT 8",
  "DAY 9",
  "NIGHT 9",
  "DAY 10",
  "NIGHT 10",
  "DAY 11",
  "NIGHT 11",
  "DAY 12",
  "NIGHT 12",
  "DAY 13",
  "NIGHT 13",
  "DAY 14",
  "NIGHT 14",
  "DAY 15",
  "NIGHT 15",
  "DAY 16",
  "NIGHT 16",
  "DAY 17",
  "NIGHT 17",
  "DAY 18",
  "NIGHT 18",
  "DAY 19",
  "NIGHT 19",
  "DAY 20",
  "NIGHT 20",
  "DAY 21+",
  "NIGHT 21+",
];

let currentPhase = 0;

timeNext.addEventListener("click", function() {
  if (currentPhase < gamePhases.length - 1) {
    currentPhase++;
    gameTime.textContent = gamePhases[currentPhase];
  }
});

timePrev.addEventListener("click", function () {
  if (currentPhase > 0) {
    currentPhase--;
    gameTime.textContent = gamePhases[currentPhase];
  }
});






