"use strict";
/** keyboard input handlers */
window.addEventListener("keydown", handleKeyInput);
window.addEventListener("keyup", handleKeyInput);
/** level selector onClick */
const levelSelector = (levelEL, levelName) => {
    return levelEL.addEventListener("click", () => playLevel(levelName));
};
/** play button clicked */
startBtnEl.addEventListener("click", () => {
    levelContainerEl.block();
});
/** level selector element close */
closeIconEl.addEventListener("click", () => {
    levelContainerEl.hide();
});
/** start button click listener */
reStartBtn.addEventListener("click", restartGame, false);
/** listen menu button click */
mainMenuBtn.addEventListener("click", goToMainMenu, false);
/** start button click listener */
winReStartBtn.addEventListener("click", restartGame, false);
/** listen menu button click */
winMainMenuBtn.addEventListener("click", goToMainMenu, false);
