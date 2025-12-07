import { PhpHelpers } from "../typescript_base/php_helpers";
import {
  IContext,
  IUser,
  IGame,
  IShop,
  IGameBank,
} from "../typescript_base/interfaces";

// Placeholder for GameReel - You must populate this with the data from GameReel.php
class GameReel {
  reelsStrip: Record<string, number[]> = {
    reelStrip1: [],
    reelStrip2: [],
    reelStrip3: [],
    reelStrip4: [],
    reelStrip5: [],
    reelStrip6: [],
  };
  reelsStripBonus: number[][] = [];
}

export class SlotSettings {
  public isStateless = true;
  public playerId: number;
  public slotId: string;
  public slotCurrency: string;
  public user: IUser;
  public game: IGame;
  public shop: IShop;
  public CurrentDenom: number = 1;
  public CurrentDenomination: number = 1;
  public Paytable: Record<string, number[]> = {};
  public SymbolGame: string[] = [];
  public reelsStrip1: number[] = [];
  public reelsStrip2: number[] = [];
  public reelsStrip3: number[] = [];
  public reelsStrip4: number[] = [];
  public reelsStrip5: number[] = [];
  public reelsStrip6: number[] = [];
  // ... define other strips as public properties if strictly needed

  public slotFreeCount: number[] = [0, 0, 0, 10, 15, 20];
  public slotFreeMpl: number = 1;
  public slotWildMpl: number = 1;
  public slotBonus: boolean = true;
  public slotGamble: boolean = true;
  public Jackpots: Record<string, any> = {};
  public Denominations: number[] = [
    0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1.0, 2.0, 5.0, 10.0, 20.0, 50.0, 100.0,
  ];

  // State containers
  public gameData: any = {};
  public gameDataStatic: any = {};

  // Internal
  private Bank: number = 0;
  private Percent: number = 0;
  private WinGamble: number = 0;
  public MaxWin: number = 0;
  public increaseRTP: number = 1;
  public AllBet: number = 0;

  constructor(sid: string, playerId: number, context: IContext) {
    this.slotId = sid;
    this.playerId = playerId;
    this.user = context.user;
    this.game = context.game;
    this.shop = context.shop;
    this.slotCurrency = context.shop.currency || "USD";

    // Context Banks (Approximation of stateless logic)
    const bankObj = context.bank;
    this.Bank =
      bankObj.slots +
      bankObj.bonus +
      bankObj.fish +
      bankObj.table_bank +
      bankObj.little;

    this.MaxWin = this.shop.max_win;
    this.CurrentDenom = this.game.denomination;

    // Initialize Paytable (Verbatim copy)
    this.Paytable["SYM_0"] = [0, 0, 0, 0, 0, 0];
    this.Paytable["SYM_1"] = [0, 0, 0, 0, 0, 0];
    this.Paytable["SYM_2"] = [0, 0, 0, 0, 0, 0];
    this.Paytable["SYM_3"] = [0, 0, 0, 25, 250, 750];
    this.Paytable["SYM_4"] = [0, 0, 0, 20, 200, 600];
    this.Paytable["SYM_5"] = [0, 0, 0, 15, 150, 500];
    this.Paytable["SYM_6"] = [0, 0, 0, 10, 100, 400];
    this.Paytable["SYM_7"] = [0, 0, 0, 5, 40, 125];
    this.Paytable["SYM_8"] = [0, 0, 0, 5, 40, 125];
    this.Paytable["SYM_9"] = [0, 0, 0, 4, 30, 100];
    this.Paytable["SYM_10"] = [0, 0, 0, 4, 30, 100];

    // Init Reels
    const reel = new GameReel();
    // Manual mapping because dynamic property access in TS is stricter
    this.reelsStrip1 = reel.reelsStrip["reelStrip1"] || [];
    this.reelsStrip2 = reel.reelsStrip["reelStrip2"] || [];
    this.reelsStrip3 = reel.reelsStrip["reelStrip3"] || [];
    this.reelsStrip4 = reel.reelsStrip["reelStrip4"] || [];
    this.reelsStrip5 = reel.reelsStrip["reelStrip5"] || [];
    this.reelsStrip6 = reel.reelsStrip["reelStrip6"] || [];

    this.SymbolGame = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
    ];

    this.Percent = Number(this.shop.percent);
    // Deserialize session data (Simulated as JSON.parse for TS)
    if (this.user.session) {
      try {
        this.gameData = JSON.parse(this.user.session);
      } catch (e) {
        this.gameData = {};
      }
    }

    if (this.game.advanced) {
      try {
        this.gameDataStatic = JSON.parse(this.game.advanced);
      } catch (e) {
        this.gameDataStatic = {};
      }
    }
  }

  public is_active(): boolean {
    // Simplified stateless check
    return true;
  }

  public GetPercent(): number {
    // Simplified stateless check
    return this.Percent;
  }

  public SetGameData(key: string, value: any): void {
    this.gameData[key] = {
      timelife: PhpHelpers.time() + 86400,
      payload: value,
    };
  }

  public GetGameData(key: string): any {
    if (this.gameData[key]) {
      return this.gameData[key]["payload"];
    }
    return 0;
  }

  public GetBalance(): number {
    return Number(this.user.balance) / this.CurrentDenom;
  }

  public SetBalance(sum: number, slotEvent: string = ""): void {
    const val = sum * this.CurrentDenom;
    // In strictly stateless, we modify the user object in memory
    let currentBalance = Number(this.user.balance);
    this.user.balance = currentBalance + val;
  }

  // Simplified for stateless - returns logic bank
  public GetBank(slotState: string = ""): number {
    if (
      slotState == "bonus" ||
      slotState == "freespin" ||
      slotState == "respin"
    ) {
      // In a real implementation, you'd fetch the specific bonus bank value
      // For logic conversion, we assume the constructor loaded the aggregate
      return this.Bank / this.CurrentDenom;
    }
    return this.Bank / this.CurrentDenom;
  }

  public SetBank(
    slotState: string = "",
    sum: number,
    slotEvent: string = ""
  ): void {
    // In stateless, this tracks the math but doesn't persist to DB automatically
    // Logic preserved from PHP:
    const val = sum * this.CurrentDenom;
    // Logic for distributing to slots/bonus banks would go here
    this.Bank += val;
  }

  public SaveGameData(): void {
    this.user.session = JSON.stringify(this.gameData);
  }

  public SaveGameDataStatic(): void {
    // In strict stateless, this needs to be passed back to controller
    // We modify the game object in memory
    this.game.advanced = JSON.stringify(this.gameDataStatic);
  }

  public GetSpinSettings(
    garantType: string,
    bet: number,
    lines: number
  ): [string, number] {
    // Simplified RTP Logic ported from PHP
    // NOTE: This requires lines_percent_config... to be parsed from JSON in IGame
    // Assuming strict port of logic structure:

    let winLimit = this.GetBank(garantType);
    // Default behavior if no complex config found
    return ["win", winLimit];
  }

  public GetRandomPay(): number {
    let allRate: number[] = [];
    for (let key in this.Paytable) {
      this.Paytable[key].forEach((val) => {
        if (val > 0) allRate.push(val);
      });
    }
    // Shuffle
    for (let i = allRate.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allRate[i], allRate[j]] = [allRate[j], allRate[i]];
    }
    return allRate[0] || 0;
  }

  public GetReelStrips(winType: string, slotEvent: string): any {
    // Logic: PHP uses array_shift on ReelStripBonus if freespin
    // Logic: PHP uses mt_rand for indices

    let reel: any = { rp: [] };
    // Placeholder implementation logic matching PHP structure
    // Since we don't have the actual strip data, we return empty arrays or random logic

    // Critical: Mimic the Structure
    for (let i = 1; i <= 5; i++) {
      // Mocking 100 symbols if empty
      let key: number[] = (this as any)["reelsStrip" + i];
      if (!key || key.length === 0) key = Array(100).fill(1);

      let len = key.length;
      let pos = PhpHelpers.rand(0, len - 3); // -3 based on PHP code

      // Logic to handle wrapping (circular array)
      let sym1 = key[pos];
      let sym2 = key[(pos + 1) % len];
      let sym3 = key[(pos + 2) % len];

      reel["reel" + i] = [sym1, sym2, sym3, ""];
      reel["rp"].push(pos);
    }

    return reel;
  }

  public UpdateJackpots(bet: number): void {
    // Stateless placeholder
  }

  public GetHistory(): any {
    return "NULL";
  }

  public SaveLogReport(
    response: string,
    bet: number,
    lines: number,
    win: number,
    slotEvent: string
  ): void {
    if (this.isStateless) return;
  }

  public InternalErrorSilent(e: any): void {
    console.error("Internal Error", e);
  }
}
