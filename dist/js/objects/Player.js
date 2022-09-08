"use strict";
class Player {
    constructor() {
        this.dx = 6;
        this.width = 150;
        this.height = 25;
        this.sX = 0;
        this.sY = 0;
        this.sWidth = 80;
        this.sHeight = 16;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height;
    }
    draw() {
        const [sX, sY] = getLevel(level).player;
        drawImage(sheet, sX, sY, this.sWidth, this.sHeight, this.x, this.y, this.width, this.height, {
            show: "both",
        });
    }
    update() {
        if (movmentKeys.a && start) {
            this.x -= this.dx;
            if (this.x <= 0) {
                this.x = 0;
            }
        }
        if (movmentKeys.d && start) {
            this.x += this.dx;
            if (this.x >= canvas.width - this.width) {
                this.x = canvas.width - this.width;
            }
        }
    }
}
