const playerInput = document.getElementById("PlayNumInput");
const confirmButton = document.getElementById("PlayNumConfirm");
const PlayerList = document.getElementById("PlayerList");
const PlayerInputSection = document.getElementById("PlayerInput");

PlayerList.style.display = "none";


const PlayMinus = document.getElementById("PlayMinus");
const PlayPlus = document.getElementById("PlayPlus");


PlayMinus.addEventListener("click", function() {
  let count = Number(playerInput.value);

  if (count > 6) {
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

const roleIcons = {
  "Unknown": "/images/RoleIcons/Unknown.png",
  "Field Doctor": "/images/RoleIcons/FieldDoctor.png",
  "Detective": "/images/RoleIcons/Detective.png",
  "Sheriff": "/images/RoleIcons/Sheriff.png",
  "Lifevessel": "/images/RoleIcons/Lifevessel.png",
  "Martyr": "/images/RoleIcons/Martyr.png",
  "Operative": "/images/RoleIcons/Operative.png",
  "Journalist": "/images/RoleIcons/Journalist.png",
  "Apothecary": "/images/RoleIcons/Apothecary.png",
  "Medium": "/images/RoleIcons/Medium.png",
  "Civilian": "/images/RoleIcons/Civilian.png",
  "Mafioso": "/images/RoleIcons/Mafioso.png",
  "Silencer": "/images/RoleIcons/Silencer.png",
  "Godfather": "/images/RoleIcons/Godfather.png",
  "Suppressor": "/images/RoleIcons/Suppressor.png",
  "Larkin": "/images/RoleIcons/Larkin.png",
  "Jester": "/images/RoleIcons/Jester.png",
  "Mimic": "/images/RoleIcons/Mimic.png"
}

confirmButton.addEventListener("click", function() {
  const playerCount = playerInput.value;

  PlayerInputSection.style.display = "none";
  PlayerList.style.display = "grid";

  for (let i=1; i <= playerCount; i++) {
    


    /* 1 Player Card */
    const playerCard = document.createElement("div");

    playerCard.classList.add("player-card")



    /* 2 Player Name */
    const playerName = document.createElement("input");

    playerName.classList.add("player-name");
    playerName.value = "Player " + i;



    /* 3 Player Status */
    const playerStatus = document.createElement("button");

    playerStatus.classList.add("player-status");
    playerStatus.textContent = "ALIVE";

    playerStatus.addEventListener("click", function() {
      if (playerStatus.textContent === "ALIVE") {
        playerStatus.textContent = "DEAD";
      } else {
        playerStatus.textContent = "ALIVE"
      }
    });



    /* 4 Suspected Player Role */
    const roleSelection = document.createElement("div");
    roleSelection.classList.add("role-selection");

    const roleIcon = document.createElement("img");
    roleIcon.classList.add("role-icon");
    roleIcon.src = "/images/RoleIcons/Unknown.png";

    const playerRole = document.createElement("select");
    playerRole.classList.add("player-role");
  

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
  }
});