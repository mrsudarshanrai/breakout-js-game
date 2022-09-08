"use strict";
const main = () => {
    /** load game */
    if (!isAssetsLoaded)
        Game.loadAssets();
    if (isAssetsLoaded && ready && lifeCount)
        Game.start();
    if (!lifeCount && !isGameOver.state)
        Game.Over();
    /** prepare animation frame. 60fps :) */
    animationFrame = requestAnimationFrame(main);
};
main();
