import { PhpHelpers } from "../typescript_base/php_helpers";
import { IContext } from "../typescript_base/interfaces";
import { User } from "../typescript_base/user";
import { Game } from "../typescript_base/game";
import { Shop } from "../typescript_base/shop";
import { JPG } from "../typescript_base/jpg";
import { GameBank } from "../typescript_base/game-bank";
import { GameLog } from "../typescript_base/game-log";
import { StatGame } from "../typescript_base/stat-game";

class GameReel {
  reelsStrip: Record<string, number[]> = {
    reelStrip1: [12,12,12,8,8,8,11,11,11,8,8,8,10,10,10,7,7,7,11,11,11,8,8,8,9,9,9,11,11,11,4,4,4,8,8,8,11,11,11,5,5,5,10,10,10,11,11,11,5,5,5,12,12,12,0,12,11,12,5,5,5,11,11,11,8,8,8,10,10,10,7,7,7,8,8,8,11,11,11,3,3,3,8,8,8,9,9,9,11,11,11,4,4,4,8,8,8,10,10,10,6,6,6,11,11,11,5,5,5,12,12,12,0,12,12,12,8,8,8,11,11,11,8,8,8,10,10,10,7,7,7,11,4,11,8,8,8,11,11,11,4,4,4,8,12,8,5,5,5,10,10,10,11,11,11,8,8,8,5,5,5,12,12,12,0,11,11,11,12,12,12,8,8,8,11,11,11,8,8,8,10,10,10,7,7,7,11,11,11,8,8,8,5,5,5,9,9,9,11,11,11,4,4,4,8,8,8,10,10,10,6,6,6,11,11,11,5,5,5,12,12,12,0,12,12,12,8,8,8,11,11,11,8,8,8,10,10,3,7,7,7,11,11,11,8,8,8,9,9,9,11,11,11,4,4,4,8,8,8,5,5,5,10,10,10,11,11,11,5,5,5,12,12,12,5,5,5,0,12,12,12,7,8,8,11,11,11,8,8,8,10,10,10,7,7,7,11,11,11,3,3,3,8,8,8,9,9,9,11,11,11,4,8,4,8,8,8,10,10,10,6,6,6,11,11,11,5,5,5,12,12,12],
    reelStrip2: [3,3,3,9,9,9,0,8,8,8,12,12,12,10,10,10,3,3,3,9,9,9,12,12,12,8,8,8,9,9,9,6,6,6,12,12,12,9,9,9,6,6,6,11,11,11,5,5,5,12,12,12,0,6,6,6,3,3,3,9,9,9,0,8,8,8,9,9,9,12,12,12,10,10,10,6,6,6,12,12,12,8,8,8,9,9,9,6,7,7,12,12,12,9,9,9,6,6,6,11,11,11,5,5,5,12,12,12,0,3,3,3,9,9,9,0,8,8,8,12,12,12,3,3,3,9,9,9,12,12,12,8,8,8,9,9,9,12,12,12,9,9,9,6,6,6,5,5,5,12,12,12,0,6,6,6,3,3,3,9,9,9,0,8,8,8,12,12,12,10,10,10,9,9,9,11,12,12,6,6,6,9,9,9,12,12,12,4,4,4,8,5,8,9,9,9,7,7,7,12,12,12,9,9,10,12,12,12,6,6,6,11,11,11,5,5,5,12,12,12,3,3,3,9,9,9,0,8,8,8,12,12,12,10,10,10,3,3,3,9,9,9,12,12,12,8,8,8,9,9,9,12,12,12,9,9,9,6,6,6,11,11,12,5,5,5,12,12,12,0,6,6,6,3,3,3,8,9,9,0,8,8,8,12,12,12,10,10,10,9,9,9,12,12,12,4,4,4,8,8,8,9,9,9,7,7,7,12,12,12,9,9,9,6,6,6,11,11,11,5,5,5,12,12,12],
    reelStrip3: [3,3,3,6,6,6,10,10,10,5,5,5,10,10,10,7,7,7,9,9,9,4,4,4,11,11,11,7,7,7,4,4,4,10,10,10,9,9,9,10,10,10,0,11,11,11,0,3,3,3,8,8,8,6,6,6,10,10,10,7,7,7,0,10,10,10,9,9,9,4,4,4,11,11,11,10,10,10,0,9,9,9,10,10,10,11,11,11,12,12,12,3,3,3,10,10,10,8,8,8,6,6,6,10,10,10,7,8,7,10,10,10,9,9,9,4,4,4,11,11,11,0,7,7,7,4,4,4,10,10,10,7,7,7,9,9,9,10,10,10,11,9,11,7,7,7,12,10,12,10,10,10,0,3,3,3,8,8,8,6,6,6,10,10,10,7,7,7,0,10,10,10,9,11,9,4,4,4,11,11,11,7,7,7,9,9,9,10,10,10,11,11,11,12,12,12,3,3,3,8,8,5,6,6,6,10,10,10,5,5,5,10,10,10,7,7,7,9,9,9,0,4,4,4,11,11,12,7,7,7,4,4,4,10,10,10,7,9,9,10,10,10,11,11,11,12,12,12,0,3,3,3,8,8,8,6,6,6,10,10,10,10,10,10,7,7,7,9,9,9,4,4,4,11,11,11,10,10,10,9,9,9,10,10,10,11,11,11,12,12,12],
    reelStrip4: [3,3,3,0,8,8,8,10,10,10,7,7,7,10,10,10,8,8,8,0,9,9,9,4,4,4,8,8,8,9,9,9,6,6,6,11,11,11,5,5,5,10,10,10,12,12,12,0,7,7,7,0,8,8,8,10,10,10,7,7,7,10,10,10,8,8,8,9,9,9,6,6,6,8,8,8,9,9,9,6,6,6,11,11,11,5,5,5,10,10,10,12,12,12,3,3,3,8,8,8,10,10,10,7,7,5,10,10,10,8,8,8,9,9,9,6,4,4,8,8,8,7,9,9,6,6,6,11,11,11,5,5,5,10,10,10,12,12,12,0,7,7,7,0,8,8,8,10,10,10,7,7,7,10,10,11,8,4,8,9,9,9,6,6,6,8,8,8,9,7,9,6,6,6,11,11,11,5,5,5,10,10,10,12,12,12,0,8,8,8,10,10,10,7,7,7,10,10,10,8,8,8,9,9,9,4,4,4,8,8,8,9,9,9,6,6,6,11,11,11,5,5,5,10,10,10,12,10,12,0,7,7,7,0,8,8,8,10,10,10,7,7,7,10,10,10,8,8,8,9,9,9,6,6,6,8,8,8,9,9,9,6,6,6,11,11,11,5,5,5,10,10,10,12,12,12],
    reelStrip5: [11,11,11,8,8,8,4,4,4,10,10,10,7,7,7,9,9,9,5,5,5,9,9,9,0,7,7,7,9,9,9,10,10,10,6,6,6,12,12,12,11,11,11,12,12,12,0,11,11,11,8,8,8,0,4,4,4,11,11,11,10,10,10,9,9,9,5,5,5,11,11,11,9,9,9,4,4,4,7,7,7,9,9,9,3,3,3,0,10,10,10,6,6,6,12,12,12,11,11,11,0,5,5,5,6,6,6,12,12,12,11,11,11,8,8,8,4,4,4,10,10,10,7,7,7,9,9,9,5,5,5,9,9,9,11,7,7,9,9,9,10,10,10,6,6,6,12,12,12,11,11,11,12,12,12,0,11,11,11,8,8,8,4,4,4,11,11,11,10,10,10,9,9,9,6,5,5,9,9,9,4,4,4,7,7,7,0,9,9,9,3,3,3,10,7,10,6,6,6,12,12,12,0,11,11,11,5,5,5,6,6,6,12,12,12,0,11,11,11,8,8,8,4,4,4,10,10,10,9,7,7,9,9,9,5,5,5,9,9,8,7,7,7,12,9,9,10,10,10,6,6,6,12,12,12,11,11,11,12,12,12,0,11,11,11,8,8,8,10,4,4,11,11,11,10,10,10,9,9,9,5,5,5,9,9,9,4,4,4,7,7,7,9,9,9,3,3,3,10,10,10,6,6,6,12,12,12,11,11,11,5,5,5,6,6,6,0,12,12,12],
    reelStrip6: [],
  };
  reelsStripBonus: number[][] = [
    [],
    [],
    [],
    [],
    [],
    [],
  ];
}

export class SlotSettings {
  public isStateless = true;
  public playerId: number;
  public slotId: string;
  public slotCurrency: string;
  public user: User;
  public game: Game;
  public shop: Shop;
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

  public slotFreeCount: number[] = [0, 0, 0, 10, 20, 30];
  public slotFreeMpl: number = 1;
  public slotWildMpl: number = 1;
  public slotBonus: boolean = true;
  public slotGamble: boolean = true;
  public Jackpots: Record<string, any> = {};
  public Denominations: number[] = [
    0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1.0, 2.0, 5.0, 10.0, 20.0, 50.0, 100.0,
  ];

  public gameData: any = {};
  public gameDataStatic: any = {};

  private Bank: number = 0;
  private Percent: number = 0;
  private WinGamble: number = 0;
  public MaxWin: number = 0;
  public increaseRTP: number = 1;
  public AllBet: number = 0;

  public toGameBanks: number = 0;
  public toSlotJackBanks: number = 0;
  public toSysJackBanks: number = 0;
  public betProfit: number = 0;
  public betRemains: number = 0;
  public betRemains0: number = 0;
  public jpgs: JPG[] = [];
  public jpgPercentZero: boolean = false;
  public count_balance: number = 0;
  public isBonusStart: boolean = false;
  public slotDBId: string | number = '';

  constructor(sid: string, playerId: number, context: IContext) {
    this.slotId = sid;
    this.playerId = playerId;
    this.user = new User(context.user);
    this.game = new Game(context.game);
    this.shop = new Shop(context.shop);
    this.slotCurrency = context.shop.currency || "USD";
    this.jpgs = context.jpgs.map(j => new JPG(j));
    this.slotDBId = this.game.id;

    const bankObj = context.bank;
    this.Bank =
      bankObj.slots +
      bankObj.bonus +
      bankObj.fish +
      bankObj.table_bank +
      bankObj.little;

    this.MaxWin = this.shop.max_win;
    this.CurrentDenom = this.game.denomination;
    this.WinGamble = Number(this.game.rezerv) || 0;

    this.Paytable['SYM_0'] = [0, 0, 0, 0, 0, 0];
    this.Paytable['SYM_1'] = [0, 0, 0, 0, 0, 0];
    this.Paytable['SYM_2'] = [0, 0, 0, 0, 0, 0];
    this.Paytable['SYM_3'] = [0, 0, 0, 15, 200, 100];
    this.Paytable['SYM_4'] = [0, 0, 0, 15, 150, 750];
    this.Paytable['SYM_5'] = [0, 0, 0, 9, 100, 500];
    this.Paytable['SYM_6'] = [0, 0, 0, 9, 75, 400];
    this.Paytable['SYM_7'] = [0, 0, 0, 9, 50, 300];
    this.Paytable['SYM_8'] = [0, 0, 0, 3, 15, 100];
    this.Paytable['SYM_9'] = [0, 0, 0, 3, 15, 75];
    this.Paytable['SYM_10'] = [0, 0, 0, 3, 15, 50];
    this.Paytable['SYM_11'] = [0, 0, 0, 3, 15, 40];
    this.Paytable['SYM_12'] = [0, 0, 0, 3, 15, 30];

    const reel = new GameReel();
    this.reelStrip1 = reel.reelsStrip['reelStrip1'] || [];
    this.reelStrip2 = reel.reelsStrip['reelStrip2'] || [];
    this.reelStrip3 = reel.reelsStrip['reelStrip3'] || [];
    this.reelStrip4 = reel.reelsStrip['reelStrip4'] || [];
    this.reelStrip5 = reel.reelsStrip['reelStrip5'] || [];
    this.reelStrip6 = reel.reelsStrip['reelStrip6'] || [];

    this.SymbolGame = ['0', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

    this.Percent = Number(this.shop.percent);
    this.count_balance = Number(this.user.count_balance);

    if (this.user.address > 0 && this.count_balance == 0) {
        this.Percent = 0;
        this.jpgPercentZero = true;
    } else if (this.count_balance == 0) {
        this.Percent = 100;
    }

    if (this.user.session) {
      try {
        this.gameData = JSON.parse(this.user.session);
        for (let key in this.gameData) {
            if (this.gameData[key]['timelife'] <= PhpHelpers.time()) {
                delete this.gameData[key];
            }
        }
      } catch (e) {
        this.gameData = {};
      }
    }

    if (this.game.advanced) {
      try {
        this.gameDataStatic = JSON.parse(this.game.advanced);
        for (let key in this.gameDataStatic) {
            if (this.gameDataStatic[key]['timelife'] <= PhpHelpers.time()) {
                delete this.gameDataStatic[key];
            }
        }
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

  public HasGameData(key: string): boolean {
      return !!this.gameData[key];
  }

  public HasGameDataStatic(key: string): boolean {
      return !!this.gameDataStatic[key];
  }

  public SetGameDataStatic(key: string, value: any): void {
      this.gameDataStatic[key] = {
          timelife: PhpHelpers.time() + 86400,
          payload: value
      };
  }

  public GetGameDataStatic(key: string): any {
      if (this.gameDataStatic[key]) {
          return this.gameDataStatic[key]["payload"];
      }
      return 0;
  }

  public SaveGameDataStatic(): void {
      this.game.advanced = JSON.stringify(this.gameDataStatic);
      this.game.save();
  }

  public FormatFloat(num: number | string): any {
      // Logic from PHP
      const str0 = String(num).split('.');
      if (str0[1]) {
          if (str0[1].length > 4) {
              return Math.round(Number(num) * 100) / 100;
          } else if (str0[1].length > 2) {
              return Math.floor(Number(num) * 100) / 100;
          } else {
              return num;
          }
      } else {
          return num;
      }
  }

  public GetBalance(): number {
    return Number(this.user.balance) / this.CurrentDenom;
  }

  public SetBalance(sum: number, slotEvent: string = ""): any {
    if (this.GetBalance() + sum < 0) {
        this.InternalError("Balance_ " + sum);
    }
    sum = sum * this.CurrentDenom;
    if (sum < 0 && slotEvent == "bet") {
        let user = this.user;
        if (user.count_balance == 0) {
            let remains: number[] = [];
            this.betRemains = 0;
            let sm = Math.abs(sum);
            if (user.address < sm && user.address > 0) {
                remains.push(sm - user.address);
            }
            for (let i = 0; i < remains.length; i++) {
                if (this.betRemains < remains[i]) {
                    this.betRemains = remains[i];
                }
            }
        }
        if (user.count_balance > 0 && user.count_balance < Math.abs(sum)) {
            let remains0: number[] = [];
            let sm = Math.abs(sum);
            let tmpSum = sm - user.count_balance;
            this.betRemains0 = tmpSum;
            if (user.address > 0) {
                this.betRemains0 = 0;
                if (user.address < tmpSum && user.address > 0) {
                    remains0.push(tmpSum - user.address);
                }
                for (let i = 0; i < remains0.length; i++) {
                    if (this.betRemains0 < remains0[i]) {
                        this.betRemains0 = remains0[i];
                    }
                }
            }
        }
        let sum0 = Math.abs(sum);
        if (user.count_balance == 0) {
            let sm = Math.abs(sum);
            if (user.address < sm && user.address > 0) {
                user.address = 0;
            } else if (user.address > 0) {
                user.address -= sm;
            }
        } else if (user.count_balance > 0 && user.count_balance < sum0) {
            let sm = sum0 - user.count_balance;
            if (user.address < sm && user.address > 0) {
                user.address = 0;
            } else if (user.address > 0) {
                user.address -= sm;
            }
        }
        this.user.count_balance = this.user.updateCountBalance(sum, this.count_balance);
        this.user.count_balance = this.FormatFloat(this.user.count_balance);
    }
    this.user.balance = Number(this.user.balance) + sum;
    this.user.balance = this.FormatFloat(this.user.balance);
    this.user.save();
    return this.user;
  }

  public GetBank(slotState: string = ""): number {
    if (this.isBonusStart || slotState == "bonus" || slotState == "freespin" || slotState == "respin") {
        slotState = "bonus";
    } else {
        slotState = "";
    }
    const bank = this.game.get_gamebank(slotState);
    return bank / this.CurrentDenom;
  }

  public SetBank(slotState: string = "", sum: number, slotEvent: string = ""): any {
    if (this.isBonusStart || slotState == "bonus" || slotState == "freespin" || slotState == "respin") {
        slotState = "bonus";
    } else {
        slotState = "";
    }
    if (this.GetBank(slotState) + sum < 0) {
        this.InternalError("Bank_ " + sum + " CurrentBank_ " + this.GetBank(slotState) + " CurrentState_ " + slotState + " Trigger_ " + (this.GetBank(slotState) + sum));
    }
    sum = sum * this.CurrentDenom;
    const game = this.game;
    let bankBonusSum = 0;

    if (sum > 0 && slotEvent == "bet") {
        this.toGameBanks = 0;
        this.toSlotJackBanks = 0;
        this.toSysJackBanks = 0;
        this.betProfit = 0;
        let prc = this.GetPercent();
        let prc_b = 10;
        if (prc <= prc_b) {
            prc_b = 0;
        }
        let count_balance = this.count_balance;
        let gameBet = sum / this.GetPercent() * 100;

        if (count_balance < gameBet && count_balance > 0) {
            let firstBid = count_balance;
            let secondBid = gameBet - firstBid;
            if (this.betRemains0 !== undefined) {
                secondBid = this.betRemains0;
            }
            let bankSum = firstBid / 100 * this.GetPercent();
            sum = bankSum + secondBid;
            bankBonusSum = firstBid / 100 * prc_b;
        } else if (count_balance > 0) {
            bankBonusSum = gameBet / 100 * prc_b;
        }

        for (let i = 0; i < this.jpgs.length; i++) {
            if (!this.jpgPercentZero) {
                if (count_balance < gameBet && count_balance > 0) {
                    this.toSlotJackBanks += (count_balance / 100 * Number(this.jpgs[i].getAttribute('percent')));
                } else if (count_balance > 0) {
                    this.toSlotJackBanks += (gameBet / 100 * Number(this.jpgs[i].getAttribute('percent')));
                }
            }
        }

        this.toGameBanks = sum;
        this.betProfit = gameBet - this.toGameBanks - this.toSlotJackBanks - this.toSysJackBanks;
    }

    if (sum > 0) {
        this.toGameBanks = sum;
    }
    if (bankBonusSum > 0) {
        sum -= bankBonusSum;
        game.set_gamebank(bankBonusSum, "inc", "bonus");
    }
    if (sum == 0 && slotEvent == "bet" && this.betRemains !== undefined) {
        sum = this.betRemains;
    }
    game.set_gamebank(sum, "inc", slotState);
    game.save();
    return game;
  }

  public SaveGameData(): void {
    this.user.session = JSON.stringify(this.gameData);
    this.user.save();
  }

  public CheckBonusWin(): number {
      let allRateCnt = 0;
      let allRate = 0;
      for (let key in this.Paytable) {
          this.Paytable[key].forEach(val => {
              if (val > 0) {
                  allRateCnt++;
                  allRate += val;
              }
          });
      }
      return allRate / allRateCnt;
  }

  public GetSpinSettings(garantType: string = 'bet', bet: number, lines: number): [string, number] {
    let curField = 10;
    switch (lines) {
        case 10: curField = 10; break;
        case 9: case 8: curField = 9; break;
        case 7: case 6: curField = 7; break;
        case 5: case 4: curField = 5; break;
        case 3: case 2: curField = 3; break;
        case 1: curField = 1; break;
        default: curField = 10; break;
    }
    let pref = '';
    if (garantType != 'bet') {
        pref = '_bonus';
    }
    this.AllBet = bet * lines;
    const linesPercentConfigSpin = this.game.get_lines_percent_config('spin');
    const linesPercentConfigBonus = this.game.get_lines_percent_config('bonus');
    const currentPercent = this.shop.percent;
    let currentSpinWinChance = 0;
    let currentBonusWinChance = 0;
    let percentLevel = '';

    let config = linesPercentConfigSpin['line' + curField + pref];
    if (config) {
        for (let k in config) {
            let l = k.split('_');
            let l0 = Number(l[0]);
            let l1 = Number(l[1]);
            if (l0 <= Number(currentPercent) && Number(currentPercent) <= l1) {
                percentLevel = k;
                break;
            }
        }
        currentSpinWinChance = config[percentLevel];
        currentBonusWinChance = linesPercentConfigBonus['line' + curField + pref][percentLevel];
    }

    const RtpControlCount = 200;
    if (!this.HasGameDataStatic('SpinWinLimit')) {
        this.SetGameDataStatic('SpinWinLimit', 0);
    }
    if (!this.HasGameDataStatic('RtpControlCount')) {
        this.SetGameDataStatic('RtpControlCount', RtpControlCount);
    }

    let rtpRange = 0;
    if (this.game.stat_in > 0) {
        rtpRange = this.game.stat_out / this.game.stat_in * 100;
    }

    if (this.GetGameDataStatic('RtpControlCount') == 0) {
        if (Number(currentPercent) + PhpHelpers.rand(1, 2) < rtpRange && this.GetGameDataStatic('SpinWinLimit') <= 0) {
            this.SetGameDataStatic('SpinWinLimit', PhpHelpers.rand(25, 50));
        }
        if (pref == '' && this.GetGameDataStatic('SpinWinLimit') > 0) {
            currentBonusWinChance = 5000;
            currentSpinWinChance = 20;
            this.MaxWin = PhpHelpers.rand(1, 5);
            if (rtpRange < (Number(currentPercent) - 1)) {
                this.SetGameDataStatic('SpinWinLimit', 0);
                this.SetGameDataStatic('RtpControlCount', this.GetGameDataStatic('RtpControlCount') - 1);
            }
        }
    } else if (this.GetGameDataStatic('RtpControlCount') < 0) {
        if (Number(currentPercent) + PhpHelpers.rand(1, 2) < rtpRange && this.GetGameDataStatic('SpinWinLimit') <= 0) {
            this.SetGameDataStatic('SpinWinLimit', PhpHelpers.rand(25, 50));
        }
        this.SetGameDataStatic('RtpControlCount', this.GetGameDataStatic('RtpControlCount') - 1);
        if (pref == '' && this.GetGameDataStatic('SpinWinLimit') > 0) {
            currentBonusWinChance = 5000;
            currentSpinWinChance = 20;
            this.MaxWin = PhpHelpers.rand(1, 5);
            if (rtpRange < (Number(currentPercent) - 1)) {
                this.SetGameDataStatic('SpinWinLimit', 0);
            }
        }
        if (this.GetGameDataStatic('RtpControlCount') < (-1 * RtpControlCount) && Number(currentPercent) - 1 <= rtpRange && rtpRange <= (Number(currentPercent) + 2)) {
            this.SetGameDataStatic('RtpControlCount', RtpControlCount);
        }
    } else {
        this.SetGameDataStatic('RtpControlCount', this.GetGameDataStatic('RtpControlCount') - 1);
    }

    let bonusWin = PhpHelpers.rand(1, currentBonusWinChance);
    let spinWin = PhpHelpers.rand(1, currentSpinWinChance);

    let returnVal: [string, number] = ['none', 0];

    if (bonusWin == 1 && this.slotBonus) {
        this.isBonusStart = true;
        garantType = 'bonus';
        let winLimit = this.GetBank(garantType);
        returnVal = ['bonus', winLimit];
        if (this.game.stat_in < (this.CheckBonusWin() * bet + this.game.stat_out) || winLimit < (this.CheckBonusWin() * bet)) {
            returnVal = ['none', 0];
        }
    } else if (spinWin == 1) {
        let winLimit = this.GetBank(garantType);
        returnVal = ['win', winLimit];
    }

    if (garantType == 'bet' && this.GetBalance() <= (2 / this.CurrentDenom)) {
        let randomPush = PhpHelpers.rand(1, 10);
        if (randomPush == 1) {
            let winLimit = this.GetBank('');
            returnVal = ['win', winLimit];
        }
    }
    return returnVal;
  }

  public getNewSpin(game: any, spinWin: number = 0, bonusWin: number = 0, lines: number, garantType: string = 'bet'): any {
    let curField = 10;
    switch (lines) {
        case 10: curField = 10; break;
        case 9: case 8: curField = 9; break;
        case 7: case 6: curField = 7; break;
        case 5: case 4: curField = 5; break;
        case 3: case 2: curField = 3; break;
        case 1: curField = 1; break;
        default: curField = 10; break;
    }
    let pref = '';
    if (garantType != 'bet') {
        pref = '_bonus';
    }
    let win: any[] = [];
    if (spinWin) {
        let val = game.game_win['winline' + pref + curField];
        if (val) {
            win = String(val).split(',');
        }
    }
    if (bonusWin) {
        let val = game.game_win['winbonus' + pref + curField];
        if (val) {
            win = String(val).split(',');
        }
    }
    if (win.length == 0) return 0;

    let number = PhpHelpers.rand(0, win.length - 1);
    return win[number];
  }

  public GetRandomPay(): number {
    let allRate: number[] = [];
    for (let key in this.Paytable) {
      this.Paytable[key].forEach((val) => {
        if (val > 0) allRate.push(val);
      });
    }
    for (let i = allRate.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allRate[i], allRate[j]] = [allRate[j], allRate[i]];
    }

    if (this.game.stat_in < (this.game.stat_out + (allRate[0] * this.AllBet))) {
        allRate[0] = 0;
    }
    return allRate[0] || 0;
  }

  public GetRandomScatterPos(rp: number[]): number {
      let rpResult: number[] = [];
      for(let i=0; i<rp.length; i++) {
          if (rp[i] == 0) {
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
      for (let i = rpResult.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rpResult[i], rpResult[j]] = [rpResult[j], rpResult[i]];
      }

      if (rpResult.length === 0) {
          return PhpHelpers.rand(2, rp.length - 3);
      }
      return rpResult[0];
  }

  public GetReelStrips(winType: string, slotEvent: string): any {
    // LightsNET logic
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
        const scattersCnt = PhpHelpers.rand(3, 5);
        let reelsId = [1, 2, 3, 4, 5];
        // No shuffle in LightsNET SlotSettings.php
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

    for (let index = 1; index <= 6; index++) {
        if (prs[index] === undefined) continue;
        const value = prs[index];
        const key = [...(this as any)['reelStrip' + index] as number[]];
        const cnt = key.length;

        let val0: number;
        if (value - 1 < 0) {
            val0 = key[cnt - 1];
        } else {
            val0 = key[value - 1];
        }

        let val1 = key[value];

        let val2: number;
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
      bet = bet * this.CurrentDenom;
      const count_balance = this.count_balance;
      let jsum: number[] = [];
      let payJack = 0;

      for(let i = 0; i < this.jpgs.length; i++) {
          if (count_balance == 0 || this.jpgPercentZero) {
              jsum[i] = Number(this.jpgs[i].getAttribute('balance'));
          } else if (count_balance < bet) {
              jsum[i] = count_balance / 100 * Number(this.jpgs[i].getAttribute('percent')) + Number(this.jpgs[i].getAttribute('balance'));
          } else {
              jsum[i] = bet / 100 * Number(this.jpgs[i].getAttribute('percent')) + Number(this.jpgs[i].getAttribute('balance'));
          }

          if (this.jpgs[i].get_pay_sum() < jsum[i] && this.jpgs[i].get_pay_sum() > 0) {
              if (this.jpgs[i].getAttribute('user_id') && this.jpgs[i].getAttribute('user_id') != this.user.id) {
                  // do nothing
              } else {
                  payJack = this.jpgs[i].get_pay_sum() / this.CurrentDenom;
                  jsum[i] = jsum[i] - this.jpgs[i].get_pay_sum();
                  this.SetBalance(this.jpgs[i].get_pay_sum() / this.CurrentDenom);
                  if (this.jpgs[i].get_pay_sum() > 0) {
                      StatGame.create({
                          user_id: this.playerId,
                          balance: this.GetBalance() * this.CurrentDenom,
                          bet: 0,
                          win: this.jpgs[i].get_pay_sum(),
                          game: this.game.name + ' JPG ' + this.jpgs[i].getAttribute('id'),
                          in_game: 0,
                          in_jpg: 0,
                          in_profit: 0,
                          shop_id: this.shop_id(),
                          date_time: PhpHelpers.date('Y-m-d H:i:s')
                      });
                  }
              }
          }
          this.jpgs[i].setAttribute('balance', jsum[i]);
          this.jpgs[i].save();
          if (Number(this.jpgs[i].getAttribute('balance')) < this.jpgs[i].get_min('start_balance')) {
              let summ = this.jpgs[i].get_start_balance();
              if (summ > 0) {
                  this.jpgs[i].add_jpg('add', summ);
              }
          }
      }
      if (payJack > 0) {
          this.Jackpots['jackPay'] = payJack.toFixed(2);
      }
  }

  public shop_id(): number {
      return this.user.shop_id;
  }

  public GetHistory(): any {
    return 'NULL';
  }

  public SaveLogReport(
    spinSymbols: string,
    bet: number,
    lines: number,
    win: number,
    slotState: string
  ): void {
    if (this.isStateless) return;

    let reportName = this.slotId + ' ' + slotState;
    if (slotState == 'freespin') {
        reportName = this.slotId + ' FG';
    } else if (slotState == 'bet') {
        reportName = this.slotId + '';
    } else if (slotState == 'slotGamble') {
        reportName = this.slotId + ' DG';
    }

    const game = this.game;
    if (slotState == 'bet') {
        this.user.update_level('bet', bet * this.CurrentDenom);
    }
    if (slotState != 'freespin') {
        game.increment('stat_in', bet * this.CurrentDenom);
    }
    game.increment('stat_out', win * this.CurrentDenom);
    game.tournament_stat(slotState, this.user.id, bet * this.CurrentDenom, win * this.CurrentDenom);

    if (this.betProfit === undefined) {
        this.betProfit = 0;
        this.toGameBanks = 0;
        this.toSlotJackBanks = 0;
        this.toSysJackBanks = 0;
    }
    if (this.toGameBanks === undefined) {
        this.toGameBanks = 0;
    }

    game.increment('bids');

    GameLog.create({
        game_id: this.slotDBId,
        user_id: this.playerId,
        ip: "0.0.0.0", // Mock
        str: spinSymbols,
        shop_id: this.shop_id()
    });

    StatGame.create({
        user_id: this.playerId,
        balance: this.GetBalance() * this.CurrentDenom,
        bet: bet * this.CurrentDenom,
        win: win * this.CurrentDenom,
        game: reportName,
        in_game: this.toGameBanks,
        in_jpg: this.toSlotJackBanks,
        in_profit: this.betProfit,
        denomination: this.CurrentDenom,
        shop_id: this.shop_id(),
        slots_bank: 0,
        bonus_bank: 0,
        fish_bank: 0,
        table_bank: 0,
        little_bank: 0,
        total_bank: this.Bank,
        date_time: PhpHelpers.date('Y-m-d H:i:s')
    });
  }

  public InternalError(errcode: string): void {
      console.error(errcode);
  }

  public InternalErrorSilent(e: any): void {
    console.error("Internal Error", e);
  }
}
