import { displayCells } from "./view/displayCells.js";

import { displaySideBar } from "./view/displaySideBarCells.js";

import { displayPieces } from "./view/displayPieces.js";

import { dropPieces } from "./view/dropPieces.js";

import { piecesSetPlayer1 } from "./model/generatePieces.js";
import { piecesSetPlayer2 } from "./model/generatePieces.js";
import { piecesSetPlayer3 } from "./model/generatePieces.js";
import { piecesSetPlayer4 } from "./model/generatePieces.js";

//Flip A Peace
import { flipPiece } from "./flipPiece.js";
import { flipPieceY } from "./flipPiece.js";
export let players = [
  piecesSetPlayer1,
  piecesSetPlayer2,
  piecesSetPlayer3,
  piecesSetPlayer4,
];

export let currentPlayer = 0;
export let pieces;
export let droppable = true;

displayCells();
export const startGame = function (currentPlayer) {
  displaySideBar(players[currentPlayer]);
  displayPieces(players[currentPlayer]);
  pieces = players[currentPlayer];
  const piecesEl = document.querySelectorAll(".piece-box");
  piecesEl.forEach((pieceEl) => {
    const pieceID = Number(pieceEl.getAttribute("piece"));
    pieceEl.addEventListener("click", function () {
      flipPiece(pieceID, pieces);
    });
  });
  piecesEl.forEach((pieceEl) => {
    const pieceID = Number(pieceEl.getAttribute("piece"));
    pieceEl.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      flipPieceY(pieceID, pieces);
    });
  });
  let target, piece, x, y;

  document.querySelectorAll(".piece-box").forEach((pieceb) => {
    pieceb.addEventListener("dragstart", (event) => {
      target = event.target;
      piece = target.getAttribute("piece");

      target.style.background = "none";
    });
    pieceb.addEventListener("mousedown", function (e) {
      x = parseInt(e.target.getAttribute("x"));
      y = parseInt(e.target.getAttribute("y"));
    });
  });
  document.querySelectorAll(".cell").forEach(function (cell) {
    cell.addEventListener("dragover", (event) => {
      event.preventDefault();
    });
    cell.addEventListener("drop", (event) => {
      event.preventDefault();

      dropPieces(
        [event.target.getAttribute("x"), event.target.getAttribute("y")],
        piece,
        [x, y],
        target,
        currentPlayer
      );
    });
  });
  const quit = document.querySelector(".btn-quit");
  const playerQuit = function (e) {
    let player = document.querySelector(
      `.player-${players[currentPlayer].index}`
    );

    player.classList.remove("active");
    player.classList.remove(`player-${players[currentPlayer].index}`);
    player.querySelector(".icon").innerHTML = `  <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M9.875 21.125L8.3 9.275q-.125-.9.475-1.588t1.5-.687h3.45q.9 0 1.5.687t.475 1.588l-1.575 11.85q-.05.375-.337.625t-.663.25h-2.25q-.375 0-.663-.25t-.337-.625M12 6q-.825 0-1.412-.587T10 4t.588-1.412T12 2t1.413.588T14 4t-.587 1.413T12 6"
          />
        </svg>`;
    player.querySelector("svg").style.fill = `${players[currentPlayer].color}`;
    players[currentPlayer].quited = true;

    player.classList.add("quited");
    currentPlayer++;
    if (currentPlayer === players.length) {
      currentPlayer = 0;
    }
    while (players[currentPlayer].quited == true) {
      currentPlayer++;
      if (currentPlayer === players.length) {
        currentPlayer = 0;
      }
    }

    player = document.querySelector(`.player-${players[currentPlayer].index}`);
    player.classList.add("active");
    if (player.classList.contains("active")) {
      player.querySelector(".icon").innerHTML = `  <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 100 100"
        >
          <path
            d="m68.913 48.908l-.048.126l.042-.115zm-5.065 24.446l-1.383 1.71c1.87.226 3.68.491 5.375.812l-5.479 1.623l7.313 1.945l5.451-1.719c3.348 1.123 7.984 2.496 9.52 4.057h-10.93l1.086 3.176h11.342c-.034 1.79-3.234 3.244-6.29 4.422l-7.751-1.676l-7.303 2.617l7.8 1.78c-4.554 1.24-12.2 1.994-18.53 2.341l-.266-3.64h-7.606l-.267 3.64c-6.33-.347-13.975-1.1-18.53-2.34l7.801-1.781l-7.303-2.617l-7.752 1.676c-3.012-.915-6.255-2.632-6.289-4.422H25.2l1.086-3.176h-10.93c1.536-1.561 6.172-2.934 9.52-4.057l5.451 1.719l7.313-1.945l-5.479-1.623a83 83 0 0 1 5.336-.807l-1.363-1.713c-14.785 1.537-27.073 4.81-30.295 9.979C.7 91.573 19.658 99.86 49.37 99.989c.442.022.878.006 1.29 0c29.695-.136 48.636-8.42 43.501-16.654c-3.224-5.171-15.52-8.445-30.314-9.981"
            color="currentColor"
          />
          <path
            d="M49.855 0A10.5 10.5 0 0 0 39.5 10.5A10.5 10.5 0 0 0 50 21a10.5 10.5 0 0 0 10.5-10.5A10.5 10.5 0 0 0 50 0zm-.057 23.592c-7.834.002-15.596 3.368-14.78 10.096l2 14.625c.351 2.573 2.09 6.687 4.687 6.687h.185l2.127 24.531c.092 1.105.892 2 2 2h8c1.108 0 1.908-.895 2-2l2.127-24.53h.186c2.597 0 4.335-4.115 4.687-6.688l2-14.625c.524-6.734-7.384-10.097-15.219-10.096M-159.25 61.817l-.048.126c.016-.038.027-.076.043-.115q.001-.006.006-.01z"
            color="currentColor"
          />
        </svg>`;
    }

    startGame(currentPlayer);
  };
  quit.addEventListener("click", playerQuit);
};

startGame(currentPlayer);

// document.getElementById("0-0").style.backgroundColor = "red";
// document.getElementById("0-0").classList.add(`red`);
// document.getElementById("0-0").style.boxShadow =
//   "0 3px 10px 3px rgba(0, 0, 0, 0.582)";
// Drag and Dr§op
