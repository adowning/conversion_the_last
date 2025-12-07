
import { PhpHelpers } from "../typescript_base/php_helpers";
import {
  IContext,
  IUser,
  IGame,
  IShop,
} from "../typescript_base/interfaces";
import { User } from "../typescript_base/user";
import { Game } from "../typescript_base/game";
import { Shop } from "../typescript_base/shop";
import { JPG } from "../typescript_base/jpg";

class GameReel {
  public reelsStrip: { [key: string]: number[] } = {
    reelStrip1: [10,9,6,5,4,8,7,6,5,4,3,10,9,8,7,6,5,4,3,9,8,10,9,6,0,5,4,10,9,7,4,3,9,8,10,8,7,6,4,8,7,6,5,4,3,10,9,8,7,6,5,4,3,9,10,9,6,5,4,8,7,6,6,5,4,3,9,8,10,9,6,5,4,10,9,7,4,3,9,8,10,8,7,6,4,8,7,6,5,4,3,10,9,8,5,4,3,10,9,6,5,4,8,7,6,5,4,3,6,5,4,3,9,8,10,9,6,5,4,10,9,7,4,3,9,8,10,8,7,6,4,8,7,6,5,4,3,10,9,8],
    reelStrip2: [10,9,6,5,4,8,7,6,5,10,9,6,5,4,8,7,6,5,4,6,5,4,3,9,8,10,9,6,5,4,10,9,7,4,3,9,8,10,8,7,6,4,8,7,6,5,4,3,10,9,8,3,4,3,10,9,8,7,13,13,13,13,6,5,4,3,9,8,10,9,6,5,4,10,9,7,4,3,9,8,10,8,7,6,4,8,7,6,5,4,3,10,9,8,7,6,5,4,3,9,10,9,6,5,4,8,7,6,5,4,3,6,5,4,3,9,8,10,9,6,5,4,10,9,7,4,3,9,8,10,8,7,6,4,8,7,6,5,4,3,10,9,8],
    reelStrip3: [10,9,6,5,4,8,7,6,5,4,10,9,8,7,6,5,4,9,8,10,9,3,6,5,4,10,9,7,4,9,8,10,8,13,13,13,13,0,7,6,4,8,7,6,5,4,10,9,8,13,7,6,5,4,9,10,9,6,5,4,3,8,7,6,5,4,6,5,4,3,9,8,10,9,6,5,4,10,9,7,4,3,9,8,10,8,7,6,4,8,7,6,5,4,3,10,9,8],
    reelStrip4: [10,9,6,5,4,8,7,6,5,13,4,3,10,9,6,5,4,8,7,6,5,4,3,9,8,10,9,6,5,4,10,9,7,4,3,9,8,10,8,7,6,4,8,7,6,5,4,3,10,9,8,6,5,4,3,10,9,8,7,6,5,4,10,9,6,5,4,8,7,6,5,4,3,3,9,8,10,9,6,5,4,10,9,7,4,3,9,8,10,8,7,6,4,8,7,6,5,4,3,10,9,8,13,13,13,7,6,5,4,3,9,6,5,4,3,9,8,10,9,6,5,4,10,9,7,4,3,9,8,10,8,7,6,4,8,7,6,5,4,3,10,9,8],
    reelStrip5: [10,9,6,5,4,8,7,6,5,4,3,0,10,9,8,7,6,5,4,3,9,8,10,9,6,5,4,10,9,7,4,3,9,8,10,8,7,6,4,8,7,6,5,4,3,13,10,9,8,7,6,5,10,9,6,5,4,8,7,6,5,4,3,6,5,4,10,9,7,4,3,9,8,10,4,3,9,6,5,4,3,9,8,10,9,6,5,4,10,9,7,4,3,9,8,10,8,7,6,4,8,7,6,5,4,3,10,9,8],
    reelStrip6: []
  };
  public reelsStripBonus: { [key: string]: number[] } = {
      reelStripBonus1: [10,9,6,5,4,8,7,6,5,4,3,10,9,8,7,6,5,4,3,6,5,4,3,9,8,10,9,6,5,4,10,9,7,4,3,9,8,10,8,7,6,4,8,7,6,5,4,3,10,9,8,9,8,10,9,6,0,5,4,10,9,7,4,3,9,8,10,8,7,6,4,8,7,6,5,4,3,10,9,8,7,6,5,4,3,9,10,9,6,5,4,8,7,6,5,4,3,10,9,6,5,4,8,7,6,5,4,3,6,5,4,3,9,8,10,9,6,5,4,10,9,7,4,3,9,8,10,8,7,6,4,8,7,6,5,4,3,10,9,8],
      reelStripBonus2: [10,9,6,5,4,8,7,6,5,10,9,6,5,4,8,7,6,5,4,3,4,3,10,9,8,7,13,13,13,13,6,5,4,3,9,8,10,9,6,5,4,10,9,7,4,3,9,8,10,8,7,6,4,8,7,6,5,4,3,10,9,8,7,6,5,4,3,9,10,9,6,5,4,8,7,6,5,4,3,6,5,4,3,9,8,10,9,6,5,4,10,9,7,4,3,9,8,10,8,7,6,4,8,7,6,5,4,3,10,9,8],
      reelStripBonus3: [10,9,6,5,3,4,8,7,6,5,4,10,9,8,7,6,5,4,9,3,8,10,9,6,5,4,10,9,7,4,9,8,10,8,13,13,13,13,0,7,6,4,8,7,6,5,4,10,9,8,13,7,6,5,4,9,10,9,6,5,4,8,7,6,3,5,4,6,5,4,3,9,8,10,9,6,5,4,10,9,7,4,3,9,8,10,8,3,7,6,4,8,7,6,5,4,3,10,9,8],
      reelStripBonus4: [10,9,6,5,4,8,7,6,5,13,4,3,10,9,6,5,4,8,7,6,5,4,6,5,4,3,9,8,10,9,6,5,4,10,9,7,4,3,9,8,10,8,7,6,4,8,7,6,5,4,3,10,9,8,3,10,9,8,7,6,5,4,10,9,6,5,4,8,7,6,5,4,3,3,9,8,10,9,6,5,4,10,9,7,4,3,9,8,10,8,7,6,4,8,7,6,5,4,3,10,9,8,13,13,13,7,6,5,4,3,9,6,5,4,3,9,8,10,9,6,5,4,10,9,7,4,3,9,8,10,8,7,6,4,8,7,6,5,4,3,10,9,8],
      reelStripBonus5: [10,9,6,5,4,8,7,6,5,4,3,0,10,9,8,7,6,5,4,3,9,8,10,9,6,5,4,6,5,4,3,9,8,10,9,6,5,4,10,9,7,4,3,9,8,10,8,7,6,4,8,7,6,5,4,3,10,9,8,10,9,7,4,3,9,8,10,8,7,6,4,8,7,6,5,4,3,13,10,9,8,7,6,5,10,9,6,5,4,8,7,6,5,4,3,6,5,4,10,9,7,4,3,9,8,10,4,3,9,6,5,4,3,9,8,10,9,6,5,4,10,9,7,4,3,9,8,10,8,7,6,4,8,7,6,5,4,3,10,9,8],
      reelStripBonus6: []
  };
}

export class SlotSettings {
  public isStateless = true;
  public playerId: number;
  public splitScreen: any = null;
  public reelStrip1: number[] = [];
  public reelStrip2: number[] = [];
  public reelStrip3: number[] = [];
  public reelStrip4: number[] = [];
  public reelStrip5: number[] = [];
  public reelStrip6: number[] = [];
  public reelStripBonus1: number[] = [];
  public reelStripBonus2: number[] = [];
  public reelStripBonus3: number[] = [];
  public reelStripBonus4: number[] = [];
  public reelStripBonus5: number[] = [];
  public reelStripBonus6: number[] = [];
  public slotId: string = '';
  public slotDBId: string = '';
  public Line: number[] | null = null;
  public scaleMode: any = null;
  public numFloat: any = null;
  public gameLine: number[] | null = null;
  public Bet: any = null;
  public isBonusStart: any = null;
  public Balance: any = null;
  public SymbolGame: string[] | null = null;
  public GambleType: any = null;
  public lastEvent: any = null;
  public Jackpots: any = [];
  public keyController: any = null;
  public slotViewState: any = null;
  public hideButtons: any = null;
  public slotReelsConfig: any = null;
  public slotFreeCount: any = null;
  public slotFreeMpl: any = null;
  public slotWildMpl: any = null;
  public slotExitUrl: any = null;
  public slotBonus: any = null;
  public slotBonusType: any = null;
  public slotScatterType: any = null;
  public slotGamble: any = null;
  public Paytable: { [key: string]: number[] } = {};
  public slotSounds: any = [];
  public jpgs: any = null;
  private Bank: any = null;
  private Percent: any = null;
  private WinLine: any = null;
  private WinGamble: any = null;
  private Bonus: any = null;
  private shop_id: any = null;
  public currency: any = null;
  public user: User;
  public game: Game;
  public shop: Shop;
  public jpgPercentZero: boolean = false;
  public count_balance: any = null;

  public MaxWin: any = null;
  public increaseRTP: number = 1;
  public CurrentDenom: number = 1;
  public CurrentDenomination: number = 1;
  public Denominations: number[] = [];
  public slotJackPercent: any = [];
  public slotJackpot: any = [];
  public slotCurrency: any = null;
  public gameData: any = {};
  public gameDataStatic: any = {};
  public AllBet: number = 0;

  public toGameBanks: number = 0;
  public toSlotJackBanks: number = 0;
  public toSysJackBanks: number = 0;
  public betProfit: number = 0;
  public betRemains: number = 0;
  public betRemains0: number = 0;

  constructor(sid: string, playerId: number, context: IContext) {
    this.slotId = sid;
    this.playerId = playerId;

    this.user = new User(context.user);
    this.shop_id = this.user.shop_id;
    this.game = new Game(context.game);
    this.shop = new Shop(context.shop);

    this.MaxWin = this.shop.max_win;
    this.increaseRTP = 1;
    this.CurrentDenom = Number(this.game.getAttribute('denomination'));
    this.scaleMode = 0;
    this.numFloat = 0;

    this.Paytable['SYM_3'] = [0, 0, 0, 10, 30, 100];
    this.Paytable['SYM_4'] = [0, 0, 0, 8, 25, 75];
    this.Paytable['SYM_5'] = [0, 0, 0, 5, 20, 40];
    this.Paytable['SYM_6'] = [0, 0, 0, 5, 15, 30];
    this.Paytable['SYM_7'] = [0, 0, 0, 4, 10, 20];
    this.Paytable['SYM_8'] = [0, 0, 0, 4, 10, 20];
    this.Paytable['SYM_9'] = [0, 0, 0, 3, 8, 15];
    this.Paytable['SYM_10'] = [0, 0, 0, 3, 8, 15];

    const reel = new GameReel();
    const reelStrips = [
        'reelStrip1',
        'reelStrip2',
        'reelStrip3',
        'reelStrip4',
        'reelStrip5',
        'reelStrip6'
    ];
    for (const reelStrip of reelStrips) {
        if (reel.reelsStrip[reelStrip] && reel.reelsStrip[reelStrip].length > 0) {
            (this as any)[reelStrip] = reel.reelsStrip[reelStrip];
        }
    }

    this.keyController = {
        '13': 'uiButtonSpin,uiButtonSkip',
        '49': 'uiButtonInfo',
        '50': 'uiButtonCollect',
        '51': 'uiButtonExit2',
        '52': 'uiButtonLinesMinus',
        '53': 'uiButtonLinesPlus',
        '54': 'uiButtonBetMinus',
        '55': 'uiButtonBetPlus',
        '56': 'uiButtonGamble',
        '57': 'uiButtonRed',
        '48': 'uiButtonBlack',
        '189': 'uiButtonAuto',
        '187': 'uiButtonSpin'
    };

    this.slotReelsConfig = [
        [425, 142, 3],
        [669, 142, 3],
        [913, 142, 3],
        [1157, 142, 3],
        [1401, 142, 3]
    ];

    this.slotBonusType = 1;
    this.slotScatterType = 0;
    this.splitScreen = false;
    this.slotBonus = true;
    this.slotGamble = true;
    this.slotExitUrl = '/';
    this.slotWildMpl = 1;
    this.GambleType = 1;
    this.Denominations = [0.01, 0.02, 0.05, 0.10, 0.20, 0.50, 1.00, 2.00, 5.00, 10.00, 20.00, 50.00, 100.00];
    this.CurrentDenom = this.Denominations[0];
    this.CurrentDenomination = this.Denominations[0];
    this.slotFreeCount = [0, 0, 0, 8, 8, 8];
    this.slotFreeMpl = 1;
    this.slotViewState = (this.game.getAttribute('slotViewState') == '' ? 'Normal' : this.game.getAttribute('slotViewState'));
    this.hideButtons = [];

    this.jpgs = [];
    if (context.jpgs) {
        context.jpgs.forEach((j) => {
            this.jpgs.push(new JPG(j));
        });
    }

    this.slotJackPercent = [];
    this.slotJackpot = [];
    for( let jp = 1; jp <= 4; jp++ )
    {
        this.slotJackpot.push(this.game.getAttribute('jp_' + jp));
        this.slotJackPercent.push(this.game.getAttribute('jp_' + jp + '_percent'));
    }

    this.Line = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    this.gameLine = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    const betStr = this.game.getAttribute('bet');
    this.Bet = betStr ? betStr.split(',') : [];
    this.Balance = this.user.balance;
    this.SymbolGame = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    this.Bank = (this.game as any).get_gamebank();
    const bankObj = context.bank;
    this.Bank = bankObj.slots + bankObj.bonus + bankObj.fish + bankObj.table_bank + bankObj.little;

    this.Percent = this.shop.percent;
    this.WinGamble = this.game.getAttribute('rezerv');
    this.slotDBId = this.game.getAttribute('id').toString();
    this.slotCurrency = this.shop.currency;
    this.count_balance = this.user.count_balance;

    if( this.user.address > 0 && this.user.count_balance == 0 )
    {
        this.Percent = 0;
        this.jpgPercentZero = true;
    }
    else if( this.user.count_balance == 0 )
    {
        this.Percent = 100;
    }

    if( !this.user.session || this.user.session.length <= 0 )
    {
        this.user.session = JSON.stringify({});
    }
    try {
        this.gameData = JSON.parse(this.user.session);
    } catch(e) {
        this.gameData = {};
    }

    if( Object.keys(this.gameData).length > 0 )
    {
        for( const key in this.gameData )
        {
            if( this.gameData[key]['timelife'] <= PhpHelpers.time() )
            {
                delete this.gameData[key];
            }
        }
    }

    let advanced = this.game.getAttribute('advanced');
    if( !advanced || advanced.length <= 0 )
    {
        advanced = JSON.stringify({});
        this.game.setAttribute('advanced', advanced);
    }
    try {
        this.gameDataStatic = JSON.parse(advanced);
    } catch(e) {
        this.gameDataStatic = {};
    }

    if( Object.keys(this.gameDataStatic).length > 0 )
    {
        for( const key in this.gameDataStatic )
        {
            if( this.gameDataStatic[key]['timelife'] <= PhpHelpers.time() )
            {
                delete this.gameDataStatic[key];
            }
        }
    }
  }

  public is_active(): boolean {
      if (this.isStateless) return true;
      if (this.game && this.shop && this.user && (!this.game.getAttribute('view') || this.shop.is_blocked || this.user.is_blocked || this.user.status == 'Banned')) {
          return false;
      }
      if (!this.game.getAttribute('view')) return false;
      if (this.shop.is_blocked) return false;
      if (this.user.is_blocked) return false;
      if (this.user.status == 'Banned') return false;
      return true;
  }

  public SetGameData(key: string, value: any): void {
      const timeLife = 86400;
      this.gameData[key] = {
          'timelife': PhpHelpers.time() + timeLife,
          'payload': value
      };
  }

  public GetGameData(key: string): any {
      if (this.gameData[key]) {
          return this.gameData[key]['payload'];
      } else {
          return 0;
      }
  }

  public FormatFloat(num: any): any {
      const str0 = num.toString().split('.');
      if (str0[1]) {
          if (str0[1].length > 4) {
              return Math.round(num * 100) / 100;
          } else if (str0[1].length > 2) {
              return Math.floor(num * 100) / 100;
          } else {
              return num;
          }
      } else {
          return num;
      }
  }

  public SaveGameData(): void {
      this.user.session = JSON.stringify(this.gameData);
  }

  public CheckBonusWin(): number {
      let allRateCnt = 0;
      let allRate = 0;
      for (const key in this.Paytable) {
          const vl = this.Paytable[key];
          for (const vl2 of vl) {
              if (vl2 > 0) {
                  allRateCnt++;
                  allRate += vl2;
                  break;
              }
          }
      }
      return allRate / allRateCnt;
  }

  public GetRandomPay(): number {
      const allRate: number[] = [];
      for (const key in this.Paytable) {
          const vl = this.Paytable[key];
          for (const vl2 of vl) {
              if (vl2 > 0) {
                  allRate.push(vl2);
              }
          }
      }
      this.shuffle(allRate);
      if (Number(this.game.getAttribute('stat_in')) < (Number(this.game.getAttribute('stat_out')) + (allRate[0] * this.AllBet))) {
          allRate[0] = 0;
      }
      return allRate[0];
  }

  public HasGameDataStatic(key: string): boolean {
      if (this.gameDataStatic[key]) {
          return true;
      } else {
          return false;
      }
  }

  public SaveGameDataStatic(): void {
      this.game.setAttribute('advanced', JSON.stringify(this.gameDataStatic));
  }

  public SetGameDataStatic(key: string, value: any): void {
      const timeLife = 86400;
      this.gameDataStatic[key] = {
          'timelife': PhpHelpers.time() + timeLife,
          'payload': value
      };
  }

  public GetGameDataStatic(key: string): any {
      if (this.gameDataStatic[key]) {
          return this.gameDataStatic[key]['payload'];
      } else {
          return 0;
      }
  }

  public HasGameData(key: string): boolean {
      if (this.gameData[key]) {
          return true;
      } else {
          return false;
      }
  }

  public GetHistory(): any {
      return 'NULL';
  }

  public UpdateJackpots(bet: number): void {
      // Stateless impl
  }

  public GetBank(slotState: string = ''): number {
      if (this.isBonusStart || slotState == 'bonus' || slotState == 'freespin' || slotState == 'respin') {
          slotState = 'bonus';
      } else {
          slotState = '';
      }
      return this.Bank / this.CurrentDenom;
  }

  public GetPercent(): number {
      return this.Percent;
  }

  public GetCountBalanceUser(): number {
      return this.user.count_balance;
  }

  public InternalError(errcode: any): void {
      console.error(errcode);
  }

  public InternalErrorSilent(errcode: any): void {
      console.error(errcode);
  }

  public SetBank(slotState: string = '', sum: number, slotEvent: string = ''): any {
      if (this.isBonusStart || slotState == 'bonus' || slotState == 'freespin' || slotState == 'respin') {
          slotState = 'bonus';
      } else {
          slotState = '';
      }
      if (this.GetBank(slotState) + sum < 0) {
          this.InternalError('Bank_   ' + sum + '  CurrentBank_ ' + this.GetBank(slotState) + ' CurrentState_ ' + slotState + ' Trigger_ ' + (this.GetBank(slotState) + sum));
      }

      let sumOrig = sum * this.CurrentDenom;
      const game = this.game;
      let bankBonusSum = 0;

      if (sumOrig > 0 && slotEvent == 'bet') {
          this.toGameBanks = 0;
          this.toSlotJackBanks = 0;
          this.toSysJackBanks = 0;
          this.betProfit = 0;

          const prc = this.GetPercent();
          let prc_b = 10;
          if (prc <= prc_b) {
              prc_b = 0;
          }

          const count_balance = this.count_balance;
          const gameBet = sumOrig / this.GetPercent() * 100;

          if (count_balance < gameBet && count_balance > 0) {
              const firstBid = count_balance;
              let secondBid = gameBet - firstBid;
              if (this.betRemains0 !== undefined) {
                  secondBid = this.betRemains0;
              }
              const bankSum = firstBid / 100 * this.GetPercent();
              sumOrig = bankSum + secondBid;
              bankBonusSum = firstBid / 100 * prc_b;
          } else if (count_balance > 0) {
              bankBonusSum = gameBet / 100 * prc_b;
          }

          for (let i = 0; i < this.jpgs.length; i++) {
              if (!this.jpgPercentZero) {
                  if (count_balance < gameBet && count_balance > 0) {
                      this.toSlotJackBanks += (count_balance / 100 * this.jpgs[i].percent);
                  } else if (count_balance > 0) {
                      this.toSlotJackBanks += (gameBet / 100 * this.jpgs[i].percent);
                  }
              }
          }

          this.toGameBanks = sumOrig;
          this.betProfit = gameBet - this.toGameBanks - this.toSlotJackBanks - this.toSysJackBanks;
      }

      if (sumOrig > 0) {
          this.toGameBanks = sumOrig;
      }

      if (bankBonusSum > 0) {
          sumOrig -= bankBonusSum;
          (this.game as any).set_gamebank(bankBonusSum, 'inc', 'bonus');
      }

      if (sumOrig == 0 && slotEvent == 'bet' && this.betRemains !== undefined) {
          sumOrig = this.betRemains;
      }

      (this.game as any).set_gamebank(sumOrig, 'inc', slotState);
      return this.game;
  }

  public SetBalance(sum: number, slotEvent: string = ''): any {
      if (this.GetBalance() + sum < 0) {
           this.InternalError('Balance_   ' + sum);
      }
      const sumOrig = sum * this.CurrentDenom;

      if (sumOrig < 0 && slotEvent == 'bet') {
          const user = this.user;
          if (user.count_balance == 0) {
              const remains: number[] = [];
              this.betRemains = 0;
              const sm = Math.abs(sumOrig);
              if (user.address < sm && user.address > 0) {
                  remains.push(sm - user.address);
              }
              for (let i = 0; i < remains.length; i++) {
                  if (this.betRemains < remains[i]) {
                      this.betRemains = remains[i];
                  }
              }
          }

          if (user.count_balance > 0 && user.count_balance < Math.abs(sumOrig)) {
              const remains0: number[] = [];
              const sm = Math.abs(sumOrig);
              const tmpSum = sm - user.count_balance;
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

          const sum0 = Math.abs(sumOrig);
          if (user.count_balance == 0) {
              const sm = Math.abs(sumOrig);
              if (user.address < sm && user.address > 0) {
                  user.address = 0;
              } else if (user.address > 0) {
                  user.address -= sm;
              }
          } else if (user.count_balance > 0 && user.count_balance < sum0) {
              const sm = sum0 - user.count_balance;
              if (user.address < sm && user.address > 0) {
                  user.address = 0;
              } else if (user.address > 0) {
                  user.address -= sm;
              }
          }

          this.user.count_balance = this.user.updateCountBalance(sumOrig, this.count_balance);
          this.user.count_balance = this.FormatFloat(this.user.count_balance);
      }

      this.user.increment('balance', sumOrig);
      this.user.balance = this.FormatFloat(this.user.balance);
      return this.user;
  }

  public GetBalance(): number {
      this.Balance = Number(this.user.balance) / this.CurrentDenom;
      return this.Balance;
  }

  public SaveLogReport(spinSymbols: any, bet: any, lines: any, win: any, slotState: any): void {
      if (this.isStateless) return;
  }

  public GetSpinSettings(garantType: string = 'bet', bet: number, lines: number): any[] {
      let curField = 10;
      switch(lines) {
          case 10: curField = 10; break;
          case 9: case 8: curField = 9; break;
          case 7: case 6: curField = 7; break;
          case 5: case 4: curField = 5; break;
          case 3: case 2: curField = 3; break;
          case 1: curField = 1; break;
          default: curField = 10; break;
      }

      let pref = '';
      if( garantType != 'bet' ) {
          pref = '_bonus';
      } else {
          pref = '';
      }

      this.AllBet = bet * lines;

      const linesPercentConfigSpin = this.game.get_lines_percent_config('spin');
      const linesPercentConfigBonus = this.game.get_lines_percent_config('bonus');
      const currentPercent = this.shop.percent;

      let currentSpinWinChance = 0;
      let currentBonusWinChance = 0;
      let percentLevel = '';

      const spinConfig = linesPercentConfigSpin['line' + curField + pref];
      if (spinConfig) {
          for (const k in spinConfig) {
              const v = spinConfig[k];
              const l = k.split('_');
              const l0 = parseInt(l[0]);
              const l1 = parseInt(l[1]);
              if (l0 <= currentPercent && currentPercent <= l1) {
                  percentLevel = k;
                  break;
              }
          }
      }

      if (percentLevel != '' && linesPercentConfigSpin['line' + curField + pref]) {
          currentSpinWinChance = linesPercentConfigSpin['line' + curField + pref][percentLevel];
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
      const statIn = Number(this.game.getAttribute('stat_in'));
      const statOut = Number(this.game.getAttribute('stat_out'));

      if (statIn > 0) {
          rtpRange = statOut / statIn * 100;
      } else {
          rtpRange = 0;
      }

      if (this.GetGameDataStatic('RtpControlCount') == 0) {
          if (currentPercent + PhpHelpers.rand(1, 2) < rtpRange && this.GetGameDataStatic('SpinWinLimit') <= 0) {
              this.SetGameDataStatic('SpinWinLimit', PhpHelpers.rand(25, 50));
          }
          if (pref == '' && this.GetGameDataStatic('SpinWinLimit') > 0) {
              currentBonusWinChance = 5000;
              currentSpinWinChance = 20;
              this.MaxWin = PhpHelpers.rand(1, 5);
              if (rtpRange < (currentPercent - 1)) {
                  this.SetGameDataStatic('SpinWinLimit', 0);
                  this.SetGameDataStatic('RtpControlCount', this.GetGameDataStatic('RtpControlCount') - 1);
              }
          }
      } else if (this.GetGameDataStatic('RtpControlCount') < 0) {
          if (currentPercent + PhpHelpers.rand(1, 2) < rtpRange && this.GetGameDataStatic('SpinWinLimit') <= 0) {
              this.SetGameDataStatic('SpinWinLimit', PhpHelpers.rand(25, 50));
          }
          this.SetGameDataStatic('RtpControlCount', this.GetGameDataStatic('RtpControlCount') - 1);
          if (pref == '' && this.GetGameDataStatic('SpinWinLimit') > 0) {
              currentBonusWinChance = 5000;
              currentSpinWinChance = 20;
              this.MaxWin = PhpHelpers.rand(1, 5);
              if (rtpRange < (currentPercent - 1)) {
                  this.SetGameDataStatic('SpinWinLimit', 0);
              }
          }
          if (this.GetGameDataStatic('RtpControlCount') < (-1 * RtpControlCount) && currentPercent - 1 <= rtpRange && rtpRange <= (currentPercent + 2)) {
              this.SetGameDataStatic('RtpControlCount', RtpControlCount);
          }
      } else {
          this.SetGameDataStatic('RtpControlCount', this.GetGameDataStatic('RtpControlCount') - 1);
      }

      const bonusWin = PhpHelpers.rand(1, currentBonusWinChance);
      const spinWin = PhpHelpers.rand(1, currentSpinWinChance);

      let returnVal: any[] = ['none', 0];

      if (bonusWin == 1 && this.slotBonus) {
          this.isBonusStart = true;
          garantType = 'bonus';
          let winLimit = this.GetBank(garantType);
          returnVal = ['bonus', winLimit];
          if (statIn < (this.CheckBonusWin() * bet + statOut) || winLimit < (this.CheckBonusWin() * bet)) {
              returnVal = ['none', 0];
          }
      } else if (spinWin == 1) {
          let winLimit = this.GetBank(garantType);
          returnVal = ['win', winLimit];
      }

      if (garantType == 'bet' && this.GetBalance() <= (2 / this.CurrentDenom)) {
          const randomPush = PhpHelpers.rand(1, 10);
          if (randomPush == 1) {
              let winLimit = this.GetBank('');
              returnVal = ['win', winLimit];
          }
      }

      return returnVal;
  }

  public getNewSpin(game: any, spinWin: number = 0, bonusWin: number = 0, lines: number, garantType: string = 'bet'): any {
      let curField = 10;
      switch( lines )
      {
          case 10: curField = 10; break;
          case 9: case 8: curField = 9; break;
          case 7: case 6: curField = 7; break;
          case 5: case 4: curField = 5; break;
          case 3: case 2: curField = 3; break;
          case 1: curField = 1; break;
          default: curField = 10; break;
      }

      let pref = '';
      if( garantType != 'bet' )
      {
          pref = '_bonus';
      }
      else
      {
          pref = '';
      }

      let win: any[] = [];

      if( spinWin )
      {
          if (game.game_win && game.game_win['winline' + pref + curField]) {
              win = (game.game_win['winline' + pref + curField] as string).split(',');
          }
      }
      if( bonusWin )
      {
          if (game.game_win && game.game_win['winbonus' + pref + curField]) {
              win = (game.game_win['winbonus' + pref + curField] as string).split(',');
          }
      }

      if (win.length > 0) {
          const number = PhpHelpers.rand(0, win.length - 1);
          return win[number];
      }
      return 0;
  }

  public GetRandomScatterPos(rp: any[]): number {
      const rpResult: number[] = [];
      for( let i = 0; i < rp.length; i++ )
      {
          if( rp[i] == 0 )
          {
              if( rp[i + 1] !== undefined && rp[i - 1] !== undefined )
              {
                  rpResult.push(i);
              }
              if( rp[i - 1] !== undefined && rp[i - 2] !== undefined )
              {
                  rpResult.push(i - 1);
              }
              if( rp[i + 1] !== undefined && rp[i + 2] !== undefined )
              {
                  rpResult.push(i + 1);
              }
          }
      }
      this.shuffle(rpResult);
      if( rpResult.length === 0 )
      {
          rpResult[0] = PhpHelpers.rand(2, rp.length - 4);
      }
      return rpResult[0];
  }

  public GetGambleSettings(): number {
      const spinWin = PhpHelpers.rand(1, this.WinGamble);
      return spinWin;
  }

  public GetReelStrips(winType: string, slotEvent: string): any {
      const game = this.game;
      let prs: number[] = [];

      if( winType != 'bonus' )
      {
          const reelStrips = [
              'reelStrip1',
              'reelStrip2',
              'reelStrip3',
              'reelStrip4',
              'reelStrip5',
              'reelStrip6'
          ];
          reelStrips.forEach((reelStrip, index) => {
               if( (this as any)[reelStrip] && (this as any)[reelStrip].length > 0 ) {
                   prs[index + 1] = PhpHelpers.rand(0, (this as any)[reelStrip].length - 4);
               }
          });
      }
      else
      {
          const reelsId = [1, 2, 3, 4, 5];
          const scattersCnt = 5;
          // In PHP this loop uses GetRandomScatterPos for all 5 reels.
          for( let i = 0; i < reelsId.length; i++ )
          {
              prs[reelsId[i]] = this.GetRandomScatterPos((this as any)['reelStrip' + reelsId[i]]);
          }
      }

      const reel: any = {
          'rp': []
      };

      for( const indexStr in prs )
      {
          const index = parseInt(indexStr);
          const keyOrig = (this as any)['reelStrip' + index];
          const key = [...keyOrig];
          const cnt = key.length;

          const keyMinus1 = key[cnt - 1];
          const keyCnt = key[0]; // PHP $key[$cnt] = $key[0]

          const value = prs[index];

          const getVal = (idx: number) => {
              if (idx === -1) return keyMinus1;
              if (idx === cnt) return keyCnt;
              return key[idx];
          };

          if (!reel['reel' + index]) reel['reel' + index] = [];

          // reel index 1 to 5, all 4 rows (0,1,2,3).
          // PHP: $reel['reel' . $index][0] = $key[$value - 1];
          // $reel['reel' . $index][1] = $key[$value];
          // $reel['reel' . $index][2] = $key[$value + 1];
          // $reel['reel' . $index][3] = $key[$value + 2];
          // $reel['reel' . $index][4] = '';

          reel['reel' + index][0] = getVal(value - 1);
          reel['reel' + index][1] = getVal(value);
          reel['reel' + index][2] = getVal(value + 1);
          reel['reel' + index][3] = getVal(value + 2);
          reel['reel' + index][4] = '';

          reel['rp'].push(value);
      }
      return reel;
  }

  private shuffle(array: any[]) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = PhpHelpers.rand(0, i);
          [array[i], array[j]] = [array[j], array[i]];
      }
  }
}
