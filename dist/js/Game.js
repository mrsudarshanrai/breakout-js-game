"use strict";
const player = new Player();
const ball = new Ball();
class GameLoader {
    loadAssets() {
        try {
            /** image assets */
            sheet.onerror = () => console.error("Failed to load asset [Sheet]");
            heart.onerror = () => console.error("Failed to load asset [Heart.png]");
            soundOnIcon.onerror = () => console.error("Failed to load asset [soundOnIcon.png]");
            soundOFFIcon.onerror = () => console.error("Failed to load asset [soundOFFIcon.png]");
            sheet.src = getAsset("main_sprite");
            heart.src = getAsset("heart");
            soundOnIcon.src = getAsset("soundOnIcon");
            soundOFFIcon.src = getAsset("soundOffIcon");
            /** sound assets */
            hitSound = new Sound(getAsset("ball_hit_brick"));
            ballHitPlayer = new Sound(getAsset("ball_hit_player"));
            heartLost = new Sound(getAsset("heart_lost"));
            gameOverSound = new Sound(getAsset("gameOverSound"));
            winningSound = new Sound(getAsset("winningSound"));
            isAssetsLoaded = true;
            /** load level list */
            for (let i = 0; i < levelsList.length; i++) {
                const levelEl = _createElement({
                    Tag: "div",
                    innerHTML: levelsList[i].name,
                    classList: ["level"],
                });
                levelsItemEl.appendChild(levelEl);
                levelSelector(levelEl, levelsList[i].name);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    start() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (!render) {
            makeMap().then(() => {
                render = true;
            });
        }
        ball.draw();
        ball.update();
        /** player object */
        player.draw();
        player.update();
        const { x, y, size: size } = ball;
        for (let i = 0; i < bricks.length; i++) {
            bricks[i].draw();
            if (hardLevels.includes(level))
                bricks[i].update();
            if (bricks[i].status)
                isBallCollidingWithBricks(x, y, size, bricks[i]);
            /** render life */
            renderLife();
        }
    }
    Over() {
        const currentGameOverType = isGameOver.type;
        isGameOver = {
            state: true,
            type: currentGameOverType,
        };
        checkGameOverReason();
    }
}
const Game = new GameLoader();
