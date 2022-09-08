/** Ball object */
class Ball {
  x = player.x + player.width / 2.5;
  y = canvas.height - 65;
  sX = 0;
  sY = 0;
  dx = 0;
  dy = 0;
  size = 30;
  speed = 5;

  draw() {
    const [sX, sY] = getLevel(level).ball;

    drawImage(sheet, sX, sY, 17, 17, this.x, this.y, this.size, this.size, {
      show: "both",
    });
  }

  update() {
    if (this.dx === 0 && this.dy === 0 && start) {
      if (movmentKeys.a) {
        this.dy = -this.speed;
        this.dx = -this.speed;
      } else if (movmentKeys.d) {
        this.dy = -this.speed;
        this.dx = this.speed;
      }
    }
    this.y += this.dy;
    this.x += this.dx;
    this.collision();
  }

  collision() {
    const { y, x, dy, dx, size } = this;

    const bottom = canvas.height - size;
    const cornor = canvas.width - size;

    if (y <= 0) {
      this.dy = -dy;
      ballHitPlayer.stop();
      ballHitPlayer.play();
    } else if (y >= bottom) {
      if (
        x >= player.x &&
        x <= player.x + player.width &&
        y + size >= player.y &&
        y <= player.y + player.height
      ) {
        this.dy = -dy;
        ballHitPlayer.stop();
        ballHitPlayer.play();
      } else {
        const el = _createElement({
          Tag: "p",
          innerHTML: "Life -1",
          classList: ["info_msg"],
        });
        infoContainerEl.appendChild(el);

        heartLost.stop();
        heartLost.play();
        resetBallPosition();
        this.dy = 0;
        this.dx = 0;

        lifeCount -= 1;
        movmentKeys.a = false;
        movmentKeys.d = false;
        cancelAnimationFrame(animationFrame);
        start = false;
        setTimeout(() => {
          infoContainerEl.removeChild(el);
        }, 4000);
      }
    }

    if (x >= cornor || x <= 0) {
      this.dx = -dx;
      ballHitPlayer.stop();
      ballHitPlayer.play();
    }
  }
}
