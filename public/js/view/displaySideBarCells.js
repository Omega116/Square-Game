import { generateSideBarCellsBox } from "../model/generataSideBar.js";

const sideBar = document.querySelector(".pieces-container");

export const displaySideBar = function (obj) {
  sideBar.innerHTML = generateSideBarCellsBox();
};
