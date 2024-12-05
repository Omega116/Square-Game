import { generateCells } from "../model/generateGameCells.js";

const gameBoard = document.querySelector(".game-board");

export const displayCells = function () {
  gameBoard.insertAdjacentHTML("afterbegin", generateCells());
};
