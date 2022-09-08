"use strict";
/** brick object */
class Brick {
    constructor(x, y, status) {
        this.x = 0;
        this.y = 0;
        this.prevY = 0;
        this.prevBlur = 0;
        this.sX = 496;
        this.sY = 64;
        this.count = 0;
        this.sWidth = 48;
        this.sHeight = 16;
        this.status = 0;
        this.width = 80;
        this.height = 30;
        this.x = x;
        this.y = y;
        this.prevY = y;
        this.status = status;
    }
    draw() {
        if (this.status)
            drawImage(sheet, levels[level].brick[0], levels[level].brick[1], this.sWidth, this.sHeight, this.x, this.y, this.width, this.height, {
                show: "both",
            });
    }
    update() {
        this.count++;
        if (this.count >= 400) {
            this.y = this.prevY + 30;
            this.prevY = this.y;
            if (level === "level_5") {
                blur_ = this.prevBlur + 2;
                this.prevBlur = blur_;
                canvasEl.style.filter = `blur(${blur_}px)`;
            }
            this.count = 0;
        }
        /** check if active brick touches the player */
        if (this.status && this.y + this.height >= player.y - ball.size) {
            lifeCount = 0;
        }
    }
}
