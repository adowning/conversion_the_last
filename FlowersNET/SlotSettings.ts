import { PhpHelpers } from "../typescript_base/php_helpers";
import {
  IContext,
  IUser,
  IGame,
  IShop,
  IGameBank,
} from "../typescript_base/interfaces";

class GameReel {
  reelsStrip: Record<string, number[]> = {
    reelStrip1: [6, 10, 11, 17, 9, 16, 11, 9, 10, 11, 9, 15, 7, 9, 10, 11, 10, 13, 9, 7, 9, 14, 11, 17, 11, 5, 8, 9, 11, 3, 9, 3, 4, 9, 11, 8, 1, 10, 9, 11, 16, 8, 9, 11, 10, 9, 11, 8, 3, 11, 5, 9, 6, 11, 9, 15, 11, 7, 11, 9, 9, 0, 6, 11, 8, 9, 11, 10,4, 14, 8, 9],
    reelStrip2: [9, 5, 17, 11, 10, 9, 11, 10, 3, 8, 12, 9, 8, 4, 17, 8, 10, 11, 9, 11, 1, 10, 11, 8, 10, 13, 8, 10, 9, 8, 11, 15, 9, 8, 11, 10, 9, 8, 10, 11, 9, 4, 8, 7, 6, 9, 11, 10, 9, 14, 11, 9, 0, 10, 16, 8, 11, 11, 10, 9, 11, 0, 10, 8, 5, 8, 9, 10, 9, 3, 11, 15, 7, 8, 9, 11],
    reelStrip3: [8, 13, 16, 15, 10, 16, 10, 8, 17, 11, 15, 8, 15, 10, 12, 3, 16, 8, 14, 8, 3, 1, 13, 9, 16, 0, 14, 13, 8, 15, 11, 9, 10, 14, 17, 10, 14, 17, 13, 10, 11, 17, 1, 10, 0, 5, 13, 10, 8, 4, 11, 15, 16, 8, 17, 14, 8, 7, 6, 10, 16, 13, 9, 8, 14, 9, 17, 10],
    reelStrip4: [4, 8, 14, 9, 5, 16, 17, 8, 1, 15, 3, 11, 15, 14, 9, 10, 8, 17, 16, 4, 3, 10, 9, 11, 16, 8, 6, 9, 3, 6, 17, 0, 7, 15, 14, 10, 17, 16, 7, 8, 4, 13, 11, 7, 3, 12, 14, 1, 10, 15, 14, 10, 4, 15, 13, 6, 1, 16, 14, 16, 3, 9, 0, 11, 6, 4, 15, 17,8, 6, 5, 10, 8, 17, 11, 17, 8, 13, 7, 10, 5, 1, 13, 5, 13, 7, 5, 13, 10],
    reelStrip5: [1, 5, 9, 6, 3, 14, 1, 11, 15, 11, 3, 1, 7, 11, 10, 1, 15, 16, 3, 1, 9, 8, 4, 13, 17, 1, 13, 17, 1, 4, 6, 9, 1, 11, 15, 10, 1, 8, 17, 13, 1, 8, 14, 1, 4, 7, 1, 9, 6, 15, 1, 10, 17, 1, 16, 1, 16, 5, 4, 1, 4, 5, 14, 0, 14, 3, 16, 1, 10, 7, 1, 6, 9, 13, 7, 1, 8, 5],
    reelStrip6: [],
  };
  reelsStripBonus: number[][] = [
    [6, 8, 11, 10, 4, 9, 16, 11, 8, 10, 11, 9, 14, 8, 9, 15, 7, 10, 13, 10, 5, 8, 14, 17, 11, 5, 8, 9, 10, 3, 11, 3, 4, 9, 11, 16, 11, 8, 1, 1, 1, 10, 9, 9, 10, 8, 9, 11, 10, 11, 8, 3, 6, 11, 9, 15, 11, 8, 10, 7, 11, 9, 9, 0, 6, 9, 8, 9, 11, 10, 17, 7, 9, 11],
    [9, 8, 17, 7, 10, 10, 11, 15, 9, 11, 12, 9, 8, 4, 10, 11, 17, 8, 9, 10, 11, 1, 1, 1, 10, 11, 8, 15, 9, 8, 13, 10, 9, 8, 11, 11, 10, 8, 7, 6, 9, 4, 8, 11, 10, 9, 14, 11, 9, 0, 10, 11, 3, 16, 8, 8, 10, 9, 11, 11, 0, 10, 8, 9, 10, 8, 9, 8, 5, 10, 3, 11, 8, 9, 8, 5, 10, 10],
    [8, 16, 13, 11, 0, 10, 9, 9, 15, 17, 11, 11, 12, 3, 7, 14, 6, 10, 16, 8, 8, 3, 1, 1, 1, 13, 9, 16, 0, 15, 11, 15, 11, 14, 17, 13, 10, 10, 14, 9, 10, 17, 11, 17, 1, 1, 1, 14, 13, 15, 9, 17, 5, 9, 4, 11, 8, 10, 14, 8, 9, 13, 10, 17, 16, 13, 9, 14, 8, 8, 16, 15],
    [8, 10, 8, 6, 5, 5, 11, 9, 17, 14, 16, 4, 8, 17, 8, 1, 1, 1, 15, 14, 8, 17, 9, 10, 16, 4, 16, 17, 9, 6, 9, 3, 11, 8, 6, 3, 10, 15, 17, 0, 3, 11, 7, 16, 7, 15, 14, 8, 4, 11, 13, 7, 3, 12, 15, 14, 4, 15, 10, 10, 13, 6, 1, 1, 1, 10, 17, 16, 16, 14, 9, 0, 11, 6, 17, 8, 4, 15, 13, 7, 5, 1, 1, 1, 3, 13, 14, 1, 1, 1, 10, 5, 7, 13, 5, 13, 10],
    [1, 1, 1, 3, 14, 15, 16, 7, 11, 11, 10, 1, 1, 1, 13, 15, 8, 7, 5, 3, 1, 1, 1, 9, 8, 17, 4, 13, 4, 13, 17, 3, 1, 1, 1, 11, 10, 17, 13, 8, 8, 14, 1, 1, 1, 16, 4, 7, 1, 1, 1, 9, 6, 9, 15, 10, 17, 1, 1, 1, 15, 16, 4, 5, 16, 1, 1, 1, 4, 5, 14, 0, 3, 14, 11, 9, 6, 10, 7, 1, 1, 1, 6, 5, 6, 9],
    [],
  ];
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
  public reelStrip1: number[] = [];
  public reelStrip2: number[] = [];
  public reelStrip3: number[] = [];
  public reelStrip4: number[] = [];
  public reelStrip5: number[] = [];
  public reelStrip6: number[] = [];

  public slotFreeCount: number[] = [0, 0, 0, 0, 10, 15, 20, 25, 30];
  public slotFreeMpl: number = 3;
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
  private WinGamble: number = 4; // Default from Rezerv which is "4" in example context
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

    // Context Banks
    const bankObj = context.bank;
    this.Bank =
      bankObj.slots +
      bankObj.bonus +
      bankObj.fish +
      bankObj.table_bank +
      bankObj.little;

    this.MaxWin = this.shop.max_win;
    this.CurrentDenom = this.game.denomination;
    // this.scaleMode = 0;
    // this.numFloat = 0;

    // Initialize Paytable
    this.Paytable['SYM_0'] = [0, 0, 0, 0, 2, 2, 2, 2, 4, 10];
    this.Paytable['SYM_1'] = [0, 0, 0, 250, 1000, 5000, 0, 0, 0, 0, 0];
    this.Paytable['SYM_2'] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.Paytable['SYM_3'] = [0, 0, 0, 20, 40, 160, 250, 400, 600, 1000, 2000];
    this.Paytable['SYM_4'] = [0, 0, 0, 15, 35, 140, 225, 350, 550, 900, 1800];
    this.Paytable['SYM_5'] = [0, 0, 0, 15, 30, 120, 200, 300, 500, 800, 1600];
    this.Paytable['SYM_6'] = [0, 0, 0, 10, 25, 100, 175, 250, 450, 700, 1400];
    this.Paytable['SYM_7'] = [0, 0, 0, 10, 20, 80, 150, 200, 400, 600, 1200];
    this.Paytable['SYM_8'] = [0, 0, 0, 5, 20, 200, 0, 0, 0, 0, 0];
    this.Paytable['SYM_9'] = [0, 0, 0, 5, 20, 150, 0, 0, 0, 0, 0];
    this.Paytable['SYM_10'] = [0, 0, 0, 5, 15, 125, 0, 0, 0, 0, 0];
    this.Paytable['SYM_11'] = [0, 0, 0, 5, 15, 100, 0, 0, 0, 0, 0];
    this.Paytable['SYM_12'] = [0, 0, 0, 0, 2, 2, 2, 2, 4, 10];
    this.Paytable['SYM_13'] = [0, 0, 0, 20, 40, 160, 250, 400, 600, 1000, 2000];
    this.Paytable['SYM_14'] = [0, 0, 0, 15, 35, 140, 225, 350, 550, 900, 1800];
    this.Paytable['SYM_15'] = [0, 0, 0, 15, 30, 120, 200, 300, 500, 800, 1600];
    this.Paytable['SYM_16'] = [0, 0, 0, 10, 25, 100, 175, 250, 450, 700, 1400];
    this.Paytable['SYM_17'] = [0, 0, 0, 10, 20, 80, 150, 200, 400, 600, 1200];

    const reel = new GameReel();
    this.reelStrip1 = reel.reelsStrip['reelStrip1'] || [];
    this.reelStrip2 = reel.reelsStrip['reelStrip2'] || [];
    this.reelStrip3 = reel.reelsStrip['reelStrip3'] || [];
    this.reelStrip4 = reel.reelsStrip['reelStrip4'] || [];
    this.reelStrip5 = reel.reelsStrip['reelStrip5'] || [];
    this.reelStrip6 = reel.reelsStrip['reelStrip6'] || [];

    this.SymbolGame = [
        '1',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11'
    ];

    this.Percent = Number(this.shop.percent);
    this.WinGamble = Number(this.game.rezerv) || 0; // "rezerv" holds WinGamble param

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
    return true;
  }

  public GetPercent(): number {
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
    let currentBalance = Number(this.user.balance);
    this.user.balance = currentBalance + val;
  }

  public GetBank(slotState: string = ""): number {
    if (
      slotState == "bonus" ||
      slotState == "freespin" ||
      slotState == "respin"
    ) {
        // Assume aggregate bank is used
        return this.Bank / this.CurrentDenom;
    }
    return this.Bank / this.CurrentDenom;
  }

  public SetBank(
    slotState: string = "",
    sum: number,
    slotEvent: string = ""
  ): void {
    const val = sum * this.CurrentDenom;
    this.Bank += val;
  }

  public SaveGameData(): void {
    this.user.session = JSON.stringify(this.gameData);
  }

  public SaveGameDataStatic(): void {
    this.game.advanced = JSON.stringify(this.gameDataStatic);
  }

  public GetSpinSettings(
    garantType: string,
    bet: number,
    lines: number
  ): [string, number] {
    let winLimit = this.GetBank(garantType);
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

  public GetRandomScatterPos(rp: number[]): number {
      let rpResult: number[] = [];
      for(let i=0; i<rp.length; i++) {
          if (rp[i] == 0) { // '0' is scatter? In PHP: $rp[$i] == '0'
             if (rp[i+1] !== undefined && rp[i-1] !== undefined) {
                 rpResult.push(i);
             }
             if (rp[i-1] !== undefined && rp[i-2] !== undefined) {
                 rpResult.push(i-1);
             }
             if (rp[i+1] !== undefined && rp[i+2] !== undefined) {
                 rpResult.push(i+1);
             }
          }
      }
      // Shuffle
      for (let i = rpResult.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rpResult[i], rpResult[j]] = [rpResult[j], rpResult[i]];
      }

      if (rpResult.length === 0) { // !isset($rpResult[0])
          return PhpHelpers.rand(2, rp.length - 3);
      }
      return rpResult[0];
  }

  public GetReelStrips(winType: string, slotEvent: string): any {
    if (slotEvent == 'freespin') {
        const reel = new GameReel();
        const fArr = reel.reelsStripBonus;
        // reelStrip1 to 6
        const strips = ['reelStrip1', 'reelStrip2', 'reelStrip3', 'reelStrip4', 'reelStrip5', 'reelStrip6'];
        for (const reelStrip of strips) {
            const curReel = fArr.shift();
            if (curReel && curReel.length) {
                (this as any)[reelStrip] = curReel;
            }
        }
    }

    let prs: Record<number, number> = {};
    const strips = ['reelStrip1', 'reelStrip2', 'reelStrip3', 'reelStrip4', 'reelStrip5', 'reelStrip6'];

    if (winType != 'bonus') {
        strips.forEach((reelStrip, index) => {
             const stripData = (this as any)[reelStrip] as number[];
             if (stripData && stripData.length > 0) {
                 prs[index + 1] = PhpHelpers.rand(0, stripData.length - 3);
             }
        });
    } else {
        let reelsId: number[] = [];
        strips.forEach((reelStrip, index) => {
            const stripData = (this as any)[reelStrip] as number[];
            if (stripData && stripData.length > 0) {
                prs[index + 1] = this.GetRandomScatterPos(stripData);
                reelsId.push(index + 1);
            }
        });
        const scattersCnt = PhpHelpers.rand(4, reelsId.length);
        // Shuffle reelsId
        for (let i = reelsId.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [reelsId[i], reelsId[j]] = [reelsId[j], reelsId[i]];
        }
        for(let i = 0; i < reelsId.length; i++) {
            const rid = reelsId[i];
            const stripData = (this as any)['reelStrip' + rid] as number[];
            if (i < scattersCnt) {
                prs[rid] = this.GetRandomScatterPos(stripData);
            } else {
                prs[rid] = PhpHelpers.rand(0, stripData.length - 3);
            }
        }
    }

    let reel: any = { rp: [] };

    // Iterate over strips to build reel object
    // PHP: foreach( $prs as $index => $value ) where index is 1..6
    for (let index = 1; index <= 6; index++) {
        if (prs[index] === undefined) continue;
        const value = prs[index];
        const key = [...(this as any)['reelStrip' + index] as number[]]; // copy array
        const cnt = key.length;

        // Emulate key[-1] = key[cnt-1] and key[cnt] = key[0] access
        // We need key[value-1], key[value], key[value+1]

        let val0: number; // key[value-1]
        if (value - 1 < 0) {
            val0 = key[cnt - 1];
        } else {
            val0 = key[value - 1];
        }

        let val1 = key[value]; // key[value]

        let val2: number; // key[value+1]
        if (value + 1 >= cnt) {
            val2 = key[0];
        } else {
            val2 = key[value + 1];
        }

        reel['reel' + index] = [val0, val1, val2, ''];
        reel['rp'].push(value);
    }

    return reel;
  }

  public UpdateJackpots(bet: number): void {
      // Placeholder
  }

  public GetHistory(): any {
    return 'NULL';
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
