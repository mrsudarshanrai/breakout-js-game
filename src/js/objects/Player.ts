class Player {
  dx = 6;
  width = 150;
  height = 25;
  sX = 0;
  sY = 0;
  sWidth = 80;
  sHeight = 16;
  x = canvas.width / 2 - this.width / 2;
  y = canvas.height - this.height;

  draw() {
    const [sX, sY] = getLevel(level).player;
    drawImage(
      sheet,
      sX,
      sY,
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
