interface IBrick {
  x: number;
  y: number;
  width: number;
  height: number;
  status: number;
  draw: () => void;
  update: () => void;
}

interface IBlasts {
  x: number;
  y: number;

  draw: () => void;
  update: () => void;
}

interface IKeys {
  a: boolean;
  d: boolean;
}

type AssetType = "image" | "sound";

interface IAssets {
  main_sprite: string;
  heart: string;
  ball_hit_brick: string;
  ball_hit_player: string;
  heart_lost: string;
  landing_theme: string;
  soundOnIcon: string;
  soundOffIcon: string;
  gameOverSound: string;
  winningSound: string;
}

interface IDrawImage_Config {
  show: "both" | "outline";
}

type keys = "level_1" | "level_2";

interface ILevels_Items {
  brick: Array<number>;
  ball: Array<number>;
  player: Array<number>;
  bricks: Array<Array<number>>;
}
interface ILevels {
  [key: string]: ILevels_Items;
}

interface IBackground {
  level_1: string;
  level_2: string;
  level_3: string;
  level_4: string;
  level_5: string;
}
