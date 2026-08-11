const playerInput = document.getElementById("PlayNumInput");
const confirmButton = document.getElementById("PlayNumConfirm");
const PlayerList = document.getElementById("PlayerList");

confirmButton.addEventListener("click", function() {
  const playerCount = playerInput.value;

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
    const playerRole = document.createElement("select");

    playerRole.classList.add("player-role");
    

    const roles = [
      "Unknown",
      "Field Doctor",
      "Detective"
    ];

    for (let role of roles) {
      const roleOption = document.createElement("option");
      roleOption.textContent = role;

      playerRole.appendChild(roleOption);
    }



    /* 5 Player Notes */
    const playerNotes = document.createElement("textarea");

    playerNotes.classList.add("player-notes");
    playerNotes.placeholder = "Notes about this Player..."



    /* Heiracrchy */
    playerCard.appendChild(playerName);
    playerCard.appendChild(playerStatus);
    playerCard.appendChild(playerRole);
    playerCard.appendChild(playerNotes);
    PlayerList.appendChild(playerCard);

  }
});