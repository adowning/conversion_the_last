export interface IUser {
  id: number;
  username: string;
  balance: number | string; // Handle PHP strings
  count_balance: number | string;
  session: string | null; // Serialized string
  shop_id: number;
}

export interface IShop {
  id: number;
  percent: number | string;
  currency: string;
  max_win: number;
  is_blocked: number;
}

export interface IGame {
  id: number;
  name: string;
  bet: string; // "0.01, 0.02..."
  denomination: number;
  gamebank: string;
  lines_percent_config_spin: string; // JSON string
  lines_percent_config_bonus: string; // JSON string
  lines_percent_config_spin_bonus: string; // JSON string
  lines_percent_config_bonus_bonus: string; // JSON string
  jp_1?: number;
  jp_2?: number;
  jp_3?: number;
  jp_4?: number;
  jp_1_percent?: number;
  jp_2_percent?: number;
  jp_3_percent?: number;
  jp_4_percent?: number;
  slotViewState?: string;
  advanced?: string; // Serialized string
  stat_in: number;
  stat_out: number;
}

export interface IGameBank {
  slots: number;
  bonus: number;
  fish: number;
  table_bank: number;
  little: number;
}

export interface IContext {
  user: IUser;
  game: IGame;
  shop: IShop;
  bank: IGameBank;
  postData: any;
  jpgs: any[]; // Array of JPG objects
}
