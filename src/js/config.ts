/**
 * create canvas element and append on bod
 */
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 660;
document.querySelector(".canvas")!.appendChild(canvas);

/** elements */
const canvasEl = document.querySelector(".canvas") as HTMLDivElement;
const levelsItemEl = document.querySelector(".levels_items") as HTMLDivElement;
const scoreEl = document.querySelector("#score") as HTMLParagraphElement;
const infoContainerEl = document.querySelector(
  ".info_container"
) as HTMLDivElement;
const closeIconEl = document.querySelector(".close_icon") as HTMLDivElement;
const startBtnEl = document.querySelector(".start_btn") as HTMLButtonElement;

const scoreCountEl = document.querySelector(
  ".score_count"
) as HTMLParagraphElement;
const winScoreCountEl = document.querySelector(
  ".win_score_count"
) as HTMLParagraphElement;
const reStartBtn = document.querySelector(".restart_btn") as HTMLButtonElement;
const mainMenuBtn = document.querySelector(".main_menu") as HTMLButtonElement;

const winReStartBtn = document.querySelector(
  ".win_restart_btn"
) as HTMLButtonElement;
const winMainMenuBtn = document.querySelector(
  ".win_main_menu"
) as HTMLButtonElement;
/** with DOM */
const gameOverScreenEl = new DOM(
  document.querySelector(".game_over_screen") as HTMLElement
);
const gameWinScreenEl = new DOM(
  document.querySelector(".game_won_screen") as HTMLElement
);
const levelContainerEl = new DOM(
  document.querySelector(".levels") as HTMLDivElement
);
const screenEl = new DOM(
  document.querySelector(".screen_landing") as HTMLDivElement
);

// --- loader check
let isAssetsLoaded = false;
let assetsTimeTakenToLoad = 0;
let debugOutline = false;

// initial config
interface InitialLifeCount {
  [key: string]: number;
}
const initialLifeCount: InitialLifeCount = {
  level_1: 2,
  level_2: 3,
  level_3: 3,
  level_4: 4,
  level_5: 5,
};

// ---
let ready = false;
let render = false;
let start = false;
let isGameOver = {
  state: false,
  type: "",
};

let level = "level_1";
let score = 0;
let blur_ = 0;
let lifeCount = initialLifeCount[level];
let animationFrame = 0;
const hardLevels = ["level_4", "level_5"];
let bricks: IBrick[] = [];

/** sound assets */
let hitSound = new Sound();
let ballHitPlayer = new Sound();
let heartLost = new Sound();
let gameOverSound = new Sound();
let winningSound = new Sound();
/** image assets */
let sheet = new Image();
let soundOnIcon = new Image();
let soundOFFIcon = new Image();
let heart = new Image();

// player movement keys
const intiKeys = {
  a: false, // left
  d: false, // right
};
const movmentKeys = {
  ...intiKeys,
};

/**
 * assets
 */
/** assets paths */
const assetsPaths: Partial<Record<AssetType, string>> = {
  image: "assets/sprites/",
  sound: "assets/sounds/",
};
const pathMerge = (fileName: string, type?: string) =>
  assetsPaths[(type || "image") as AssetType] + fileName;

const assets: IAssets = {
  // images
  main_sprite: pathMerge("sheet.png"),
  heart: pathMerge("heart.png"),
  soundOnIcon: pathMerge("soundOn.png"),
  soundOffIcon: pathMerge("soundOff.png"),
  // sounds
  landing_theme: pathMerge("menuTheme.mp3", "sound"),
  ball_hit_brick: pathMerge("brickHit.wav", "sound"),
  ball_hit_player: pathMerge("bounce.wav", "sound"),
  heart_lost: pathMerge("heartLost.wav", "sound"),
  gameOverSound: pathMerge("gameOver.wav", "sound"),
  winningSound: pathMerge("win.mp3", "sound"),
};

const backgrounds: IBackground = {
  level_1: pathMerge("background_1.png"),
  level_2: pathMerge("background_2.png"),
  level_3: pathMerge("background_3.png"),
  level_4: pathMerge("background_4.png"),
  level_5: pathMerge("background_5.png"),
};

/**levels */
const levelsList = [
  {
    name: 1,
  },
  {
    name: 2,
  },
  {
    name: 3,
  },
  {
    name: 4,
  },
  {
    name: 5,
  },
];
