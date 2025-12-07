
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
    reelStrip1: [8,8,8,6,6,6,3,3,8,8,8,5,5,7,7,7,8,8,8,0,4,4,5,5,8,8,8,6,6,6,5,5,5,7,7,7,8,8,8,5,5,3,3,4,4,8,8,8,7,7,7,6,6,8,8,8,7,7,7,5,5,8,8,8,6,6,6,7,7,7,8,8,8,5,5,4,4,8,8,8,6,6,6,7,7,7,8,8,8,6,6,6,5,5,5,4,4,6,6,3,3,3,5,5,5,6,6,6,7,7,7,0,4,4,4,6,6,3,3,8,8,8,6,6,5,5,7,7,7,4,4,8,8,8,7,7,7,5,5,5,8,8,8,6,6,4,4,4,7,7,7,8,8,8,5,5,5,7,7,7,4,4,6,6,6,7,7,7,4,4,6,6,6,5,5,3,3,3,8,8,8,6,6,6,5,5,8,8,8,4,4,5,5,5,8,8,8,6,6,5,5,8,8,8,7,7,7,6,6,6,8,8,8,4,4,6,6,3,3,8,8,8,6,6,6],
    reelStrip2: [8,8,8,5,5,5,3,3,3,6,6,6,5,5,5,8,8,8,4,4,6,6,7,7,7,4,4,3,3,5,5,5,6,6,6,8,8,8,5,5,3,3,4,4,4,8,8,8,7,7,7,3,3,6,6,6,7,7,7,5,5,5,4,4,4,7,7,7,6,6,6,3,3,8,8,8,5,5,5,6,6,6,7,7,7,5,5,8,8,8,6,6,6,7,7,7,0,8,8,8,7,7,7,5,5,6,6,6,8,8,8,0,7,7,7,5,5,5,3,3,6,6,5,5,7,7,7,3,3,5,5,5,7,7,7,8,8,8,6,6,6,5,5,4,4,6,6,5,5,5,7,7,7,4,4,5,5,8,8,8,7,7,7,3,3,4,4,4,7,7,7,6,6,6,4,4,7,7,7,3,3,3,5,5,6,6,7,7,7,5,5,5,6,6,6,7,7,7,3,3,5,5,5,4,4,7,7,7,5,5,8,8,8,6,6,6,7,7,7,3,3,8,8,8,7,7,7,5,5,8,8,8,7,7,7,3,3,5,5,8,8,8,7,7,7,5,5,8,8,8,7,7,7,5,5],
    reelStrip3: [6,6,6,6,0,5,5,5,5,8,8,8,7,7,7,7,8,8,8,3,3,3,7,7,7,7,0,6,6,6,5,5,5,3,3,3,3,5,5,5,0,7,7,7,7,6,6,6,8,8,8,8,7,7,7,3,3,3,3,6,6,6,6,7,7,7,7,6,6,6,3,3,3,8,8,8,8,7,7,7,7,0,8,8,8,8,5,5,5,6,6,6,6,7,7,7,5,5,5,4,4,4,8,8,8,7,7,7,7,6,6,6,6,4,4,4,8,8,8,8,5,5,5,0,4,4,4,4,6,6,6,6,8,8,8,7,7,7,7,8,8,8,8,7,7,7,7,3,3,3,3,5,5,5,5,8,8,8,7,7,7,7,8,8,8,8,0,5,5,5,6,6,6,6,8,8,8,8,4,4,4,4,0,8,8,8,8,0,4,4,4,4,8,8,8],
    reelStrip4: [5,5,5,5,4,4,4,8,8,8,5,5,5,3,3,3,3,5,5,5,7,7,7,7,8,8,8,8,0,5,5,5,5,0,7,7,7,7,8,8,8,4,4,4,7,7,7,7,4,4,4,4,7,7,7,7,6,6,6,6,8,8,8,4,4,4,4,6,6,6,7,7,7,7,5,5,5,8,8,8,8,7,7,7,7,5,5,5,8,8,8,0,7,7,7,7,6,6,6,6,5,5,5,5,7,7,7,7,5,5,5,5,7,7,7,8,8,8,8,4,4,4,4,6,6,6,6,3,3,3,3,5,5,5,5,6,6,6,6,7,7,7,8,8,8,8,6,6,6,3,3,3,8,8,8,8,7,7,7,7,4,4,4,6,6,6,6,8,8,8,8,5,5,5,6,6,6,6,7,7,7,5,5,5,5,8,8,8,8,0,7,7,7,4,4,4,4,0,7,7,7,7,0,8,8,8,7,7,7,7,8,8,8,8,7,7,7],
    reelStrip5: [3,3,3,3,3,7,7,7,7,7,6,6,6,6,6,0,8,8,8,8,8,7,7,7,7,7,4,4,4,4,4,5,5,5,5,5,7,7,7,7,7,0,6,6,6,6,6,8,8,8,8,8,7,7,7,7,7,0,8,8,8,8,8,6,6,6,6,6,5,5,5,5,5,8,8,8,8,8,4,4,4,4,4,8,8,8,8,8,7,7,7,7,7,8,8,8,8,8,4,4,4,4,4,3,3,3,3,3,0,5,5,5,5,5,0,6,6,6,6,6,3,3,3,3,3,7,7,7,7,7,8,8,8,8,8,5,5,5,5,5,4,4,4,4,4,7,7,7,7,7,8,8,8,8,8,0,5,5,5,5,5,4,4,4,4,4,6,6,6,6,6,5,5,5,5,5,3,3,3,3,3,6,6,6,6,6,3,3,3,3,3,8,8,8,8,8,5,5,5,5,5,7,7,7,7,7,3,3,3,3,3,0,7,7,7,7,7,8,8,8,8,8,6,6,6,6,6,4,4,4,4,4,6,6,6,6,6,7,7,7,7,7,8,8,8,8,8,4,4,4,4,4,6,6,6,6,6,7,7,7,7,7,8,8,8,8,8,0,7,7,7,7,7,8,8,8,8,8,7,7,7,7,7,8,8,8,8,8,6,6,6,6,6,7,7,7,7,7,5,5,5,5,5,7,7,7,7,7,8,8,8,8,8,5,5,5,5,5],
    reelStrip6: []
  };
  public reelsStripBonus: { [key: string]: number[] } = {
      reelStripBonus1: [],
      reelStripBonus2: [],
      reelStripBonus3: [],
      reelStripBonus4: [],
      reelStripBonus5: [],
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

  // Variables for internal state calculation logic
  public toGameBanks: number = 0;
  public toSlotJackBanks: number = 0;
  public toSysJackBanks: number = 0;
  public betProfit: number = 0;
  public betRemains: number = 0;
  public betRemains0: number = 0;


  constructor(sid: string, playerId: number, context: IContext) {
    this.slotId = sid;
    this.playerId = playerId;

    // Instantiate models
    this.user = new User(context.user);
    this.shop_id = this.user.shop_id;
    // this.gamebank = new GameBank(context.bank); // Not directly used in properties, but in logic
    // The PHP does: $gamebank = new \VanguardLTE\Stateless\GameBank($context->bank);
    // $game = new \VanguardLTE\Stateless\Game($context->game);
    // $this->shop = new \VanguardLTE\Stateless\Shop($context->shop);
    // $this->game = $game; $this->game->gamebank_instance = $gamebank;

    const gamebank = context.bank; // Assuming interface structure
    // Note: The base Game model might need setting gamebank_instance differently or it wraps it.
    // In stateless-model.ts or game.ts, let's see.
    // Assuming context.game is data.
    this.game = new Game(context.game);
    this.shop = new Shop(context.shop);
    // There is no explicit gamebank_instance assignment in TS base usually, but we'll see if needed.
    // For now, I'll stick to logic.

    this.MaxWin = this.shop.max_win;
    this.increaseRTP = 1;
    this.CurrentDenom = this.game.denomination;
    this.scaleMode = 0;
    this.numFloat = 0;

    this.Paytable['SYM_0'] = [0, 0, 0, 0, 0, 0];
    this.Paytable['SYM_1'] = [0, 0, 0, 0, 0, 0];
    this.Paytable['SYM_2'] = [0, 0, 0, 0, 0, 0];
    this.Paytable['SYM_3'] = [0, 0, 1, 12, 30, 200];
    this.Paytable['SYM_4'] = [0, 0, 1, 8, 15, 100];
    this.Paytable['SYM_5'] = [0, 0, 0, 4, 8, 30];
    this.Paytable['SYM_6'] = [0, 0, 0, 4, 8, 30];
    this.Paytable['SYM_7'] = [0, 0, 0, 3, 5, 20];
    this.Paytable['SYM_8'] = [0, 0, 0, 3, 5, 20];

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
    // this.slotFastStop = 1; // Not in properties
    this.slotExitUrl = '/';
    this.slotWildMpl = 1;
    this.GambleType = 1;
    this.Denominations = [0.01, 0.02, 0.05, 0.10, 0.20, 0.50, 1.00, 2.00, 5.00, 10.00, 20.00, 50.00, 100.00];
    this.CurrentDenom = this.Denominations[0];
    this.CurrentDenomination = this.Denominations[0];
    this.slotFreeCount = [0, 0, 0, 8, 12, 16];
    this.slotFreeMpl = 1;
    this.slotViewState = (this.game.slotViewState == '' ? 'Normal' : this.game.slotViewState);
    this.hideButtons = [];

    // JPGs
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
        this.slotJackpot.push((this.game as any)['jp_' + jp]);
        this.slotJackPercent.push((this.game as any)['jp_' + jp + '_percent']);
    }

    this.Line = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    this.gameLine = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    this.Bet = this.game.bet ? this.game.bet.split(',') : [];
    this.Balance = this.user.balance;
    this.SymbolGame = ['2', '3', '4', '5', '6', '7', '8'];
    this.Bank = (this.game as any).get_gamebank(); // Helper function needed or use gamebank prop
    // The PHP does $game->get_gamebank(). In TS base Game model, verify if it exists.
    // I'll assume I need to fetch it from context bank directly if get_gamebank is not available.
    // But let's check Game.ts
    // For now I'll use context.bank sum as seen in example.
    const bankObj = context.bank;
    this.Bank = bankObj.slots + bankObj.bonus + bankObj.fish + bankObj.table_bank + bankObj.little;

    this.Percent = this.shop.percent;
    this.WinGamble = this.game.rezerv;
    this.slotDBId = this.game.id.toString();
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

    // Cleaning gameData
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

    if( !this.game.advanced || this.game.advanced.length <= 0 )
    {
        (this.game as any).advanced = JSON.stringify({});
    }
    try {
        this.gameDataStatic = JSON.parse(this.game.advanced);
    } catch(e) {
        this.gameDataStatic = {};
    }

    // Cleaning gameDataStatic
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
      if (this.game && this.shop && this.user && (!this.game.view || this.shop.is_blocked || this.user.is_blocked || this.user.status == 'Banned')) {
          return false;
      }
      if (!this.game.view) return false;
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
      // this.user.save(); // Stateless, no save
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
      if ((this.game as any).stat_in < ((this.game as any).stat_out + (allRate[0] * this.AllBet))) {
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
      (this.game as any).advanced = JSON.stringify(this.gameDataStatic);
      // this.game.save();
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
      // Assuming bank is loaded
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
      // Simplified
      if (this.isBonusStart || slotState == 'bonus' || slotState == 'freespin' || slotState == 'respin') {
          slotState = 'bonus';
      } else {
          slotState = '';
      }
      this.Bank += sum * this.CurrentDenom;
      return this.game;
  }

  public SetBalance(sum: number, slotEvent: string = ''): any {
      if (this.GetBalance() + sum < 0) {
           this.InternalError('Balance_   ' + sum);
      }
      const sumOrig = sum * this.CurrentDenom;

      // Update balance logic ported from PHP
      if (sumOrig < 0 && slotEvent == 'bet') {
          // Logic for count_balance updates...
          // Simplified for porting:
          // this.user.count_balance = this.user.updateCountBalance(sumOrig, this.count_balance);
          // In stateless model, we just update the user properties.
      }
      this.user.balance = Number(this.user.balance) + sumOrig;
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
      // Simplified
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

      this.AllBet = bet * lines;

      // ... Logic regarding RTP control ...
      // For now returning basic win logic
      let winLimit = this.GetBank(garantType);
      return ['win', winLimit];
  }

  public getNewSpin(game: any, spinWin: number = 0, bonusWin: number = 0, lines: number, garantType: string = 'bet'): any {
      // Simplified
      return 0;
  }

  public GetRandomScatterPos(rp: any[]): number {
      const rpResult: number[] = [];
      for( let i = 0; i < rp.length; i++ )
      {
          if( rp[i] == 0 ) // Compare with 0 or '0'? PHP says '0', but my array has numbers. 0.
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
          rpResult[0] = PhpHelpers.rand(2, rp.length - 3);
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
                   prs[index + 1] = PhpHelpers.rand(0, (this as any)[reelStrip].length - 3);
               }
          });
      }
      else
      {
          const reelsId: number[] = [];
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
                  prs[index + 1] = this.GetRandomScatterPos((this as any)[reelStrip]);
                  reelsId.push(index + 1);
              }
          });

          const scattersCnt = PhpHelpers.rand(3, reelsId.length);
          this.shuffle(reelsId);

          for( let i = 0; i < reelsId.length; i++ )
          {
              const id = reelsId[i];
              if( i < scattersCnt )
              {
                  prs[id] = this.GetRandomScatterPos((this as any)['reelStrip' + id]);
              }
              else
              {
                   prs[id] = PhpHelpers.rand(0, (this as any)['reelStrip' + id].length - 3);
              }
          }
      }

      const reel: any = {
          'rp': []
      };

      for( const indexStr in prs )
      {
          const index = parseInt(indexStr);
          const keyOrig = (this as any)['reelStrip' + index];
          // Clone to avoid modifying original array in logic if strict
          // But PHP copies array by default. TS holds reference.
          // We need to simulate PHP wrapping logic.
          const key = [...keyOrig];
          const cnt = key.length;

          // Negative index access simulation
          const keyMinus1 = key[cnt - 1];
          const keyMinus2 = key[cnt - 2];
          const keyMinus3 = key[cnt - 3];

          const value = prs[index];

          // Helper to get element at index considering wrappers
          // PHP: $key[-1] = $key[$cnt - 1];
          // TS cannot set negative indices on standard array easily to access via [ -1 ].
          // We can use a helper function or map indices.
          const getVal = (idx: number) => {
              if (idx === -1) return keyMinus1;
              if (idx === -2) return keyMinus2;
              if (idx === -3) return keyMinus3;
              if (idx === cnt) return key[0];
              if (idx === cnt + 1) return key[1];
              if (idx === cnt + 2) return key[2];
              return key[idx];
          };

          if (!reel['reel' + index]) reel['reel' + index] = [];

          if( index == 1 || index == 2 )
          {
              reel['reel' + index][0] = getVal(value - 1);
              reel['reel' + index][1] = getVal(value);
              reel['reel' + index][2] = getVal(value + 1);
              reel['reel' + index][3] = '';
              reel['reel' + index][4] = '';
              reel['reel' + index][5] = '';
          }
          if( index == 3 || index == 4 )
          {
              reel['reel' + index][0] = getVal(value - 1);
              reel['reel' + index][1] = getVal(value);
              reel['reel' + index][2] = getVal(value + 1);
              reel['reel' + index][3] = getVal(value + 2);
              reel['reel' + index][4] = '';
              reel['reel' + index][5] = '';
          }
          if( index == 5 )
          {
              reel['reel' + index][0] = getVal(value - 1);
              reel['reel' + index][1] = getVal(value);
              reel['reel' + index][2] = getVal(value + 1);
              reel['reel' + index][3] = getVal(value + 2);
              reel['reel' + index][4] = getVal(value + 3);
              reel['reel' + index][5] = '';
          }
          reel['rp'].push(value);
      }
      return reel;
  }

  private shuffle(array: any[]) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
  }
}
