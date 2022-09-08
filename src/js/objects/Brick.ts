/** brick object */
class Brick {
  x = 0;
  y = 0;
  prevY = 0;
  prevBlur = 0;
  sX = 496;
  sY = 64;
  count = 0;
  sWidth = 48;
  sHeight = 16;
  status = 0;
  width = 80;
  height = 30;
  constructor(x: number, y: number, status: number) {
    this.x = x;
    this.y = y;
    this.prevY = y;
    this.status = status;
  }

  draw() {
    if (this.status)
      drawImage(
        sheet,
        levels[level as keyof ILevels].brick[0],
        levels[level as keyof ILevels].brick[1],
        this.sWidth,
        this.sHeight,
        this.x,
        this.y,
        this.width,
        this.height,
        {
          show: "both",
        }
      );
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
