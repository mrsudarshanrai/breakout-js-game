const getAsset = (name: keyof IAssets) => assets[name];
/** handles user keyboard inputs */
const handleKeyInput = (_: KeyboardEvent) => {
  if (lifeCount <= 0) return null;
  const { key, type } = _;
  if (type === "keyup") start = true;
  if (type === "keyup") {
    movmentKeys[key as keyof IKeys] = false;
  }
  if (type === "keyup") return null;
  if (key === "a") {
    movmentKeys.a = true;
  } else if (key === "d") {
    movmentKeys.d = true;
  }

  return movmentKeys;
};

/** create element */
const _createElement = (initObj: any) => {
  const element = document.createElement(initObj.Tag);
  for (const prop in initObj) {
    if (prop === "childNodes") {
      initObj.childNodes.forEach(function (node: Node) {
        element.appendChild(node);
      });
    } else if (prop === "attributes") {
      initObj.attributes.forEach(function (attr: any) {
        element.setAttribute(attr.key, attr.value);
      });
    } else element[prop] = initObj[prop];
  }

  return element;
};

const resetControls = () => {
  ball.dy = 0;
  ball.dx = 0;
  movmentKeys.a = false;
  movmentKeys.d = false;
};

const won = () => {
  gameWinScreenEl.flex();
  winningSound.play();
  winScoreCountEl.innerText = score.toString();
};

const lost = () => {
  gameOverScreenEl.flex();
  gameOverSound.play();
  scoreCountEl.innerText = score.toString();
};

const checkGameOverReason = () => {
  if (!bricks.filter((x) => x.status).length) won();
  else lost();
};

/** check if ball is colliding with bricks */
const isBallCollidingWithBricks = (
  x: number,
  y: number,
  size: number,
  brickObj: IBrick
) => {
  const { x: brickX, y: brickY, width, height } = brickObj;

  if (
    y >= brickY + height ||
    y + size <= brickY ||
    x >= brickX + width ||
    x + size <= brickX
  ) {
  } else {
    ball.dy = -ball.dy;
    brickObj.status = 0;
    hitSound.play();
    score += 12;

    scoreEl.innerText = score.toString();

    if (!bricks.filter((x) => x.status).length) {
      lifeCount = 0;
      resetControls();
      cancelAnimationFrame(animationFrame);
    }
  }
};

/** render rect outline on object */
const showOutlines = (x: number, y: number, width: number, height: number) => {
  ctx!.strokeStyle = "blue";
  ctx!.rect(x, y, width, height);
  ctx!.stroke();
};

/** draw image on canvas */
const drawImage = (
  sheet: HTMLImageElement,
  sX: number,
  sY: number,
  sWidth: number,
  sHeight: number,
  x: number,
  y: number,
  width: number,
  height: number,
  config?: IDrawImage_Config
) => {
  const { show } = config || {};
  ctx?.beginPath();

  /** render hitpoints id debugOutline =true */
  if (debugOutline) {
    if (show === "both") {
      ctx!.drawImage(sheet, sX, sY, sWidth, sHeight, x, y, width, height);
      showOutlines(x, y, width, height);
      return null;
    } else return showOutlines(x, y, width, height);
  } else ctx!.drawImage(sheet, sX, sY, sWidth, sHeight, x, y, width, height);
};

/** render player life */
const renderLife = () => {
  let lifeLeftOffset = 0;
  for (let i = 0; i < lifeCount; i++) {
    lifeLeftOffset += 40;
    ctx!.drawImage(heart, lifeLeftOffset, 10, 20, 15);
  }
};

/** get current level */
const getLevel = (level: keyof ILevels) => levels[level];

/** make map out of 2D array */
const makeMap = () =>
  new Promise((res, rej) => {
    bricks = [];
    try {
      const { bricks: map } = getLevel(level);

      /** map builder */
      const GRID = Math.floor(800 / map[0].length);
      for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
          bricks.push(new Brick(GRID * j + 30, 40 * i + 50, map[i][j]));
        }
      }
      res(true);
    } catch (error) {
      rej(false);
    }
  });

/** reset player position */
const resetPlayerPosition = () => {
  player.x = canvas.width / 2 - player.width / 2;
  player.y = canvas.height - player.height;
};

/** reset ball position */
const resetBallPosition = () => {
  ball.x = player.x + player.width / 2.5;
  ball.y = canvas.height - 65;
};

const resetGame = () => {
  score = 0;
  scoreEl.innerText = score.toString();
  gameOverSound.stop();
  ready = true;
  render = false;
  lifeCount = initialLifeCount[level as keyof InitialLifeCount];
  resetPlayerPosition();
  resetBallPosition();
  gameOverScreenEl.hide();
  gameWinScreenEl.hide();
  start = false;
  canvasEl.style.filter = "drop-shadow(12px 14px 116px black)";
  isGameOver = {
    state: false,
    type: "",
  };
};

/** play selected level */
const playLevel = (levelSelected: number) => {
  const levelName = `level_${levelSelected}`;
  level = levelName;
  lifeCount = initialLifeCount[levelName as keyof InitialLifeCount];
  levelContainerEl.hide();
  resetGame();
  canvasEl.style.backgroundImage = `url(${
    backgrounds[levelName as keyof IBackground]
  })`;
  screenEl.hide();
};

/** restart current played game */
const restartGame = () => {
  resetGame();
};

/** redirect to main menu */
const goToMainMenu = () => {
  screenEl.flex();
  resetGame();
};
