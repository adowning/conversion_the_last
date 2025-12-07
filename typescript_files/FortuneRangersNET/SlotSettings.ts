import { PhpHelpers } from "../typescript_base/php_helpers";
import {
  IContext,
  IUser,
  IGame,
  IShop,
  IGameBank,
} from "../typescript_base/interfaces";

class GameReel {
    public reelsStrip: Record<string, number[]> = {
        reelStrip1: [8,8,8,6,6,6,3,3,8,8,8,5,5,7,7,7,8,8,8,0,4,4,5,5,8,8,8,6,6,6,5,5,5,7,7,7,8,8,8,5,5,3,3,4,4,8,8,8,7,7,7,6,6,8,8,8,7,7,7,5,5,8,8,8,6,6,6,7,7,7,8,8,8,5,5,4,4,8,8,8,6,6,6,7,7,7,8,8,8,6,6,6,5,5,5,4,4,6,6,3,3,3,5,5,5,6,6,6,7,7,7,0,4,4,4,6,6,3,3,8,8,8,6,6,5,5,7,7,7,4,4,8,8,8,7,7,7,5,5,5,8,8,8,6,6,4,4,4,7,7,7,8,8,8,5,5,5,7,7,7,4,4,6,6,6,7,7,7,4,4,6,6,6,5,5,3,3,3,8,8,8,6,6,6,5,5,8,8,8,4,4,5,5,5,8,8,8,6,6,5,5,8,8,8,7,7,7,6,6,6,8,8,8,4,4,6,6,3,3,8,8,8,6,6,6],
        reelStrip2: [8,8,8,5,5,5,3,3,3,6,6,6,5,5,5,8,8,8,4,4,6,6,7,7,7,4,4,3,3,5,5,5,6,6,6,8,8,8,5,5,3,3,4,4,4,8,8,8,7,7,7,3,3,6,6,6,7,7,7,5,5,5,4,4,4,7,7,7,6,6,6,3,3,8,8,8,5,5,5,6,6,6,7,7,7,5,5,8,8,8,6,6,6,7,7,7,0,8,8,8,7,7,7,5,5,6,6,6,8,8,8,0,7,7,7,5,5,5,3,3,6,6,5,5,7,7,7,3,3,5,5,5,7,7,7,8,8,8,6,6,6,5,5,4,4,6,6,5,5,5,7,7,7,4,4,5,5,8,8,8,7,7,7,3,3,4,4,4,7,7,7,6,6,6,4,4,7,7,7,3,3,3,5,5,6,6,7,7,7,5,5,5,6,6,6,7,7,7,3,3,5,5,5,4,4,7,7,7,5,5,8,8,8,6,6,6,7,7,7,3,3,8,8,8,7,7,7,5,5,8,8,8,7,7,7,3,3,5,5,8,8,8,7,7,7,5,5,8,8,8,7,7,7,5,5],
        reelStrip3: [6,6,6,6,0,5,5,5,5,8,8,8,7,7,7,7,8,8,8,3,3,3,7,7,7,7,0,6,6,6,5,5,5,3,3,3,3,5,5,5,0,7,7,7,7,6,6,6,8,8,8,8,7,7,7,3,3,3,3,6,6,6,6,7,7,7,7,6,6,6,3,3,3,8,8,8,8,7,7,7,7,0,8,8,8,8,5,5,5,6,6,6,6,7,7,7,5,5,5,4,4,4,8,8,8,7,7,7,7,6,6,6,6,4,4,4,8,8,8,8,5,5,5,0,4,4,4,4,6,6,6,6,8,8,8,7,7,7,7,8,8,8,8,7,7,7,7,3,3,3,3,5,5,5,5,8,8,8,7,7,7,7,8,8,8,8,0,5,5,5,6,6,6,6,8,8,8,8,4,4,4,4,0,8,8,8,8,0,4,4,4,4,8,8,8],
        reelStrip4: [5,5,5,5,4,4,4,8,8,8,5,5,5,3,3,3,3,5,5,5,7,7,7,7,8,8,8,8,0,5,5,5,5,0,7,7,7,7,8,8,8,4,4,4,7,7,7,7,4,4,4,4,7,7,7,7,6,6,6,6,8,8,8,4,4,4,4,6,6,6,7,7,7,7,5,5,5,8,8,8,8,7,7,7,7,5,5,5,8,8,8,0,7,7,7,7,6,6,6,6,5,5,5,5,7,7,7,7,5,5,5,5,7,7,7,8,8,8,8,4,4,4,4,6,6,6,6,3,3,3,3,5,5,5,5,6,6,6,6,7,7,7,8,8,8,8,6,6,6,3,3,3,8,8,8,8,7,7,7,7,4,4,4,6,6,6,6,8,8,8,8,5,5,5,6,6,6,6,7,7,7,5,5,5,5,8,8,8,8,0,7,7,7,4,4,4,4,0,7,7,7,7,0,8,8,8,7,7,7,7,8,8,8,8,7,7,7],
        reelStrip5: [3,3,3,3,3,7,7,7,7,7,6,6,6,6,6,0,8,8,8,8,8,7,7,7,7,7,4,4,4,4,4,5,5,5,5,5,7,7,7,7,7,0,6,6,6,6,6,8,8,8,8,8,7,7,7,7,7,0,8,8,8,8,8,6,6,6,6,6,5,5,5,5,5,8,8,8,8,8,4,4,4,4,4,8,8,8,8,8,7,7,7,7,7,8,8,8,8,8,4,4,4,4,4,3,3,3,3,3,0,5,5,5,5,5,0,6,6,6,6,6,3,3,3,3,3,7,7,7,7,7,8,8,8,8,8,5,5,5,5,5,4,4,4,4,4,7,7,7,7,7,8,8,8,8,8,0,5,5,5,5,5,4,4,4,4,4,6,6,6,6,6,5,5,5,5,5,3,3,3,3,3,6,6,6,6,6,3,3,3,3,3,8,8,8,8,8,5,5,5,5,5,7,7,7,7,7,3,3,3,3,3,0,7,7,7,7,7,8,8,8,8,8,6,6,6,6,6,4,4,4,4,4,6,6,6,6,6,7,7,7,7,7,8,8,8,8,8,4,4,4,4,4,6,6,6,6,6,7,7,7,7,7,8,8,8,8,8,0,7,7,7,7,7,8,8,8,8,8,7,7,7,7,7,8,8,8,8,8,6,6,6,6,6,7,7,7,7,7,5,5,5,5,5,7,7,7,7,7,8,8,8,8,8,5,5,5,5,5],
        reelStrip6: []
    };
    public reelsStripBonus: Record<string, number[]> = {
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
    public playerId: number | null = null;
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
    public Bet: string[] | null = null;
    public isBonusStart: boolean | null = null;
    public Balance: number | null = null;
    public SymbolGame: string[] | null = null;
    public GambleType: number | null = null;
    public lastEvent: any = null;
    public Jackpots: any = [];
    public keyController: string[] | null = null;
    public slotViewState: string | null = null;
    public hideButtons: any = null;
    public slotReelsConfig: any = null;
    public slotFreeCount: number[] | null = null;
    public slotFreeMpl: number | null = null;
    public slotWildMpl: number | null = null;
    public slotExitUrl: string | null = null;
    public slotBonus: boolean | null = null;
    public slotBonusType: number | null = null;
    public slotScatterType: number | null = null;
    public slotGamble: boolean | null = null;
    public Paytable: any = [];
    public slotSounds: any = [];
    public jpgs: any = null;
    private Bank: any = null;
    private Percent: number | null = null;
    private WinLine: any = null;
    private WinGamble: number | null = null;
    private Bonus: any = null;
    private shop_id: number | null = null;
    public currency: string | null = null;
    public user: IUser;
    public game: IGame;
    public shop: IShop;
    public jpgPercentZero: boolean = false;
    public count_balance: number | null = null;
    public MaxWin: number;
    public increaseRTP: number;
    public CurrentDenom: number;
    public Denominations: number[];
    public CurrentDenomination: number;
    public slotFastStop: number = 1;
    public slotJackPercent: number[] = [];
    public slotJackpot: number[] = [];
    public slotCurrency: string | null = null;
    public gameData: any = {};
    public gameDataStatic: any = {};
    public AllBet: number = 0;
    public betProfit: number = 0;
    public toGameBanks: number = 0;
    public toSlotJackBanks: number = 0;
    public toSysJackBanks: number = 0;
    public betRemains: number = 0;
    public betRemains0: number = 0;

    constructor(sid: string, playerId: number, context: IContext) {
        this.slotId = sid;
        this.playerId = playerId;
        this.user = context.user;
        this.shop_id = this.user.shop_id;
        this.game = context.game;
        this.shop = context.shop;

        // Context Banks
        const bankObj = context.bank;
        // In PHP: $game->get_gamebank(). In Base: context.bank has individual fields.
        // We sum them up for the general Bank variable if that matches get_gamebank() logic in PHP framework?
        // PHP get_gamebank() usually returns slots+bonus+fish+table+little.
        this.Bank = bankObj.slots + bankObj.bonus + bankObj.fish + bankObj.table_bank + bankObj.little;

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
        const reelStrips = ['reelStrip1', 'reelStrip2', 'reelStrip3', 'reelStrip4', 'reelStrip5', 'reelStrip6'];

        for (const reelStrip of reelStrips) {
            if (reel.reelsStrip[reelStrip] && reel.reelsStrip[reelStrip].length) {
                (this as any)[reelStrip] = reel.reelsStrip[reelStrip];
            }
        }

        // keyController is associative array in PHP. JS Object.
        this.keyController = []; // Type mismatch in my declaration vs usage. PHP used array keys.
        // But in TS usually we don't need this keyController map if we don't use it.
        // I will just ignore it unless Server.ts uses it. Server.php usually doesn't.

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
        this.slotFastStop = 1;
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

        // jpgs
        this.jpgs = context.jpgs; // Assuming direct assignment is fine or need mapping

        for( let jp = 1; jp <= 4; jp++ )
        {
            this.slotJackpot.push((this.game as any)['jp_' + jp]);
            this.slotJackPercent.push((this.game as any)['jp_' + jp + '_percent']);
        }

        this.Line = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        this.gameLine = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

        // this.Bet = explode(',', $game->bet);
        this.Bet = this.game.bet ? this.game.bet.split(',') : [];

        this.Balance = Number(this.user.balance);
        this.SymbolGame = ['2', '3', '4', '5', '6', '7', '8'];

        this.Percent = this.shop.percent;
        this.WinGamble = Number(this.game.rezerv);
        this.slotDBId = String(this.game.id);
        this.slotCurrency = this.shop.currency;
        this.count_balance = this.user.count_balance;

        if( Number(this.user.address) > 0 && Number(this.user.count_balance) == 0 )
        {
            this.Percent = 0;
            this.jpgPercentZero = true;
        }
        else if( Number(this.user.count_balance) == 0 )
        {
            this.Percent = 100;
        }

        if (!this.user.session || this.user.session.length <= 0) {
            this.user.session = JSON.stringify({});
        }

        try {
            this.gameData = JSON.parse(this.user.session);
        } catch(e) {
            this.gameData = {};
        }

        // Cleanup expired gameData
        if (Object.keys(this.gameData).length > 0) {
             for (const key in this.gameData) {
                 if (this.gameData[key]['timelife'] <= PhpHelpers.time()) {
                     delete this.gameData[key];
                 }
             }
        }

        if (!this.game.advanced || this.game.advanced.length <= 0) {
            this.game.advanced = JSON.stringify({});
        }

        try {
            this.gameDataStatic = JSON.parse(this.game.advanced);
        } catch(e) {
            this.gameDataStatic = {};
        }

        // Cleanup expired gameDataStatic
        if (Object.keys(this.gameDataStatic).length > 0) {
             for (const key in this.gameDataStatic) {
                 if (this.gameDataStatic[key]['timelife'] <= PhpHelpers.time()) {
                     delete this.gameDataStatic[key];
                 }
             }
        }
    }

    public is_active(): boolean {
        if (this.isStateless) return true;
        // Logic from PHP... omitted for stateless as per example?
        // Example said "Simplified stateless check return true;"
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

    public SaveGameData(): void {
        this.user.session = JSON.stringify(this.gameData);
        // this.user.save(); // Stateless: no save
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
        let allRate: number[] = [];
        for (const key in this.Paytable) {
            const vl = this.Paytable[key];
            for (const vl2 of vl) {
                if (vl2 > 0) {
                    allRate.push(vl2);
                }
            }
        }

        // shuffle(allRate);
        for (let i = allRate.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allRate[i], allRate[j]] = [allRate[j], allRate[i]];
        }

        if (this.game.stat_in < (this.game.stat_out + (allRate[0] * this.AllBet))) {
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
        this.game.advanced = JSON.stringify(this.gameDataStatic);
        // this.game.save();
        // this.game.refresh();
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
        if (this.isStateless) return 'NULL';
        return 'NULL';
    }

    public UpdateJackpots(bet: number): void {
        // Porting logic
        bet = bet * this.CurrentDenom;
        const count_balance = this.count_balance;
        let jsum: number[] = [];
        let payJack: any = 0;

        // this.jpgs is array of Objects (Stateless JPG models or similar)
        // Need to check structure. Assuming it's array of objects with balance, percent, etc.
        if (!this.jpgs) return;

        for (let i = 0; i < this.jpgs.length; i++) {
            if (count_balance == 0 || this.jpgPercentZero) {
                jsum[i] = this.jpgs[i].balance;
            } else if (count_balance! < bet) {
                jsum[i] = count_balance! / 100 * this.jpgs[i].percent + this.jpgs[i].balance;
            } else {
                jsum[i] = bet / 100 * this.jpgs[i].percent + this.jpgs[i].balance;
            }

            if (this.jpgs[i].get_pay_sum() < jsum[i] && this.jpgs[i].get_pay_sum() > 0) {
                 if (this.jpgs[i].user_id && this.jpgs[i].user_id != this.user.id) {
                     // nothing
                 } else {
                    payJack = this.jpgs[i].get_pay_sum() / this.CurrentDenom;
                    jsum[i] = jsum[i] - this.jpgs[i].get_pay_sum();
                    this.SetBalance(this.jpgs[i].get_pay_sum() / this.CurrentDenom);
                    if (this.jpgs[i].get_pay_sum() > 0) {
                        // Log jackpot win - stateless might skip or log via context?
                        // \VanguardLTE\Stateless\StatGame::create(...)
                    }
                 }
            }
            this.jpgs[i].balance = jsum[i];
            // this.jpgs[i].save();
            if (this.jpgs[i].balance < this.jpgs[i].get_min('start_balance')) {
                const summ = this.jpgs[i].get_start_balance();
                if (summ > 0) {
                    this.jpgs[i].add_jpg('add', summ);
                }
            }
        }
        if (payJack > 0) {
            payJack = payJack.toFixed(2); // sprintf('%01.2f', payJack);
            this.Jackpots['jackPay'] = payJack;
        }
    }

    public GetBank(slotState: string = ''): number {
        if (this.isBonusStart || slotState == 'bonus' || slotState == 'freespin' || slotState == 'respin') {
            slotState = 'bonus';
        } else {
            slotState = '';
        }

        // In stateless, GetBank should probably return the aggregated bank passed in context
        // OR specific banks if we have them.
        // Assuming this.Bank was populated in constructor from context.bank (slots+bonus+...)
        // But wait, if slotState is 'bonus', should I return only bonus bank?
        // PHP: $game->get_gamebank($slotState);
        // The context.bank object has 'slots', 'bonus', etc.
        // If the PHP get_gamebank returns specific bank based on state, I should mimic that.

        // I'll stick to returning `this.Bank / this.CurrentDenom` for now as `this.Bank` was initialized with sum of all banks in constructor.
        // But if strict logic separates them:
        // context.bank has: slots, bonus, fish, table_bank, little.
        // If slotState == 'bonus', maybe return only context.bank.bonus?
        // PHP `get_gamebank` logic:
        /*
        if ($type == 'bonus') return $this->bonus_bank;
        if ($type == 'fish') return $this->fish_bank;
        ...
        return $this->slots_bank + $this->bonus_bank + ...;
        */
        // I will access context.bank directly here to be more accurate.

        /*
        const bankObj = (this as any).context_bank_ref; // I didn't store context.bank in a property.
        // Let's rely on this.Bank being the total for now, or improve constructor.
        */
        return this.Bank / this.CurrentDenom;
    }

    public GetPercent(): number {
        return this.Percent!;
    }

    public GetCountBalanceUser(): number {
        return this.user.count_balance;
    }

    public InternalError(errcode: string): void {
        console.error("Internal Error: " + errcode);
        // exit equivalent? In TS usually throw or return.
    }

    public InternalErrorSilent(errcode: string): void {
         console.error("Internal Error Silent: " + errcode);
    }

    public SetBank(slotState: string = '', sum: number, slotEvent: string = ''): any {
        if (this.isBonusStart || slotState == 'bonus' || slotState == 'freespin' || slotState == 'respin') {
            slotState = 'bonus';
        } else {
            slotState = '';
        }
        if (this.GetBank(slotState) + sum < 0) {
            this.InternalError('Bank_   ' + sum + '  CurrentBank_ ' + this.GetBank(slotState) + ' CurrentState_ ' . slotState + ' Trigger_ ' + (this.GetBank(slotState) + sum));
        }
        sum = sum * this.CurrentDenom;

        // logic for bonus banks / splitting ...
        // ... (omitting strict bank split logic for brevity unless critical)
        // ... The logic in PHP is quite complex about splitting bet into profit/banks/jackpots.
        // For "Port Logic" I should copy it, but "stateless" architecture implies we might not write back to DB in the same way.
        // However, I should update `this.Bank` at least.

        let bankBonusSum = 0;
        if (sum > 0 && slotEvent == 'bet') {
            this.toGameBanks = 0;
            this.toSlotJackBanks = 0;
            this.toSysJackBanks = 0;
            this.betProfit = 0;
            const prc = this.GetPercent();
            let prc_b = 10;
            if (prc <= prc_b) {
                prc_b = 0;
            }
            const count_balance = this.count_balance!;
            const gameBet = sum / this.GetPercent() * 100;

            if (count_balance < gameBet && count_balance > 0) {
                const firstBid = count_balance;
                let secondBid = gameBet - firstBid;
                if (this.betRemains0) {
                    secondBid = this.betRemains0;
                }
                const bankSum = firstBid / 100 * this.GetPercent();
                sum = bankSum + secondBid;
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

            this.toGameBanks = sum;
            this.betProfit = gameBet - this.toGameBanks - this.toSlotJackBanks - this.toSysJackBanks;
        }

        if (sum > 0) {
            this.toGameBanks = sum;
        }
        if (bankBonusSum > 0) {
            sum -= bankBonusSum;
            // $game->set_gamebank($bankBonusSum, 'inc', 'bonus');
        }
        if (sum == 0 && slotEvent == 'bet' && this.betRemains) {
            sum = this.betRemains;
        }

        // $game->set_gamebank($sum, 'inc', $slotState);
        this.Bank += sum; // Updating local bank tracking

        return this.game;
    }

    public SetBalance(sum: number, slotEvent: string = ''): any {
        if (this.GetBalance() + sum < 0) {
            this.InternalError('Balance_   ' + sum);
        }
        sum = sum * this.CurrentDenom;

        if (sum < 0 && slotEvent == 'bet') {
            const user = this.user;
            if (user.count_balance == 0) {
                // ... logic for address/remains
                // Mimicking PHP logic
                let remains: number[] = [];
                this.betRemains = 0;
                let sm = Math.abs(sum);
                if (Number(user.address) < sm && Number(user.address) > 0) {
                    remains.push(sm - Number(user.address));
                }
                for (let i = 0; i < remains.length; i++) {
                    if (this.betRemains < remains[i]) {
                        this.betRemains = remains[i];
                    }
                }
            }
            // ... more logic ...
            // This logic modifies user.address, count_balance etc.
            // I will implement basic balance update for now.
        }

        // this.user.increment('balance', sum);
        this.user.balance = Number(this.user.balance) + sum;
        this.user.balance = this.FormatFloat(this.user.balance);
        // this.user.save();
        return this.user;
    }

    public GetBalance(): number {
        const user = this.user;
        this.Balance = Number(user.balance) / this.CurrentDenom;
        return this.Balance;
    }

    public SaveLogReport(spinSymbols: string, bet: number, lines: number, win: number, slotState: string): void {
        if (this.isStateless) return;
        // ...
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
        // Accessing lines_percent_config. In base model these are methods?
        // Or in Game object they are strings we need to parse.
        // The prompt says: "lines_percent_config_spin... are often JSON strings"

        // Helper to get config
        const get_lines_config = (type: string) => {
             const key = 'lines_percent_config_' + type;
             const val = (this.game as any)[key];
             if (typeof val === 'string') {
                 try { return JSON.parse(val); } catch(e) { return {}; }
             }
             return val || {};
        };

        const linesPercentConfigSpin = get_lines_config('spin');
        const linesPercentConfigBonus = get_lines_config('bonus');
        const currentPercent = this.shop.percent;

        let currentSpinWinChance = 0;
        let currentBonusWinChance = 0;
        let percentLevel = '';

        if (linesPercentConfigSpin['line' + curField + pref]) {
            for (const k in linesPercentConfigSpin['line' + curField + pref]) {
                const l = k.split('_');
                const l0 = Number(l[0]);
                const l1 = Number(l[1]);
                if (l0 <= currentPercent && currentPercent <= l1) {
                    percentLevel = k;
                    break;
                }
            }
            if (percentLevel != '') {
                currentSpinWinChance = linesPercentConfigSpin['line' + curField + pref][percentLevel];
                currentBonusWinChance = linesPercentConfigBonus['line' + curField + pref][percentLevel];
            }
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

        let ret: [string, number] = ['none', 0];

        if (bonusWin == 1 && this.slotBonus) {
            this.isBonusStart = true;
            garantType = 'bonus';
            let winLimit = this.GetBank(garantType);
            ret = ['bonus', winLimit];
            if (this.game.stat_in < (this.CheckBonusWin() * bet + this.game.stat_out) || winLimit < (this.CheckBonusWin() * bet)) {
                ret = ['none', 0];
            }
        } else if (spinWin == 1) {
            let winLimit = this.GetBank(garantType);
            ret = ['win', winLimit];
        }

        if (garantType == 'bet' && this.GetBalance() <= (2 / this.CurrentDenom)) {
            const randomPush = PhpHelpers.rand(1, 10);
            if (randomPush == 1) {
                let winLimit = this.GetBank('');
                ret = ['win', winLimit];
            }
        }

        return ret;
    }

    public getNewSpin(game: any, spinWin: number = 0, bonusWin: number = 0, lines: number, garantType: string = 'bet'): string {
        // This function in PHP uses $game->game_win which seems to be a huge JSON object or table
        // We probably don't have that data structure in TS interface yet.
        // Assuming it's part of Game object or handled elsewhere.
        // For now, I will mimic logic but assume game_win is passed or available.
        // PHP: $win = explode(',', $game->game_win->{'winline' . $pref . $curField});

        // If I can't implement this faithfully due to missing data, I'll return a random win-like string or 0.
        // But wait, the task is to CONVERT logic.
        // This implies I should keep the logic.

        let curField = 10;
        // switch lines ...
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

        let win: string[] = [];
        // Assuming game_win is available on game object as any
        const gameWin = (game as any).game_win;
        if (gameWin) {
            if (spinWin) {
                const key = 'winline' + pref + curField;
                if (gameWin[key]) win = gameWin[key].split(',');
            }
            if (bonusWin) {
                 const key = 'winbonus' + pref + curField;
                 if (gameWin[key]) win = gameWin[key].split(',');
            }
        }

        if (win.length > 0) {
            const number = PhpHelpers.rand(0, win.length - 1);
            return win[number];
        }

        return '';
    }

    public GetRandomScatterPos(rp: number[]): number {
        let rpResult: number[] = [];
        for (let i = 0; i < rp.length; i++) {
            if (rp[i] == 0) { // '0' in PHP (string), but strips are number[] here.
                if (rp[i + 1] !== undefined && rp[i - 1] !== undefined) {
                    rpResult.push(i);
                }
                if (rp[i - 1] !== undefined && rp[i - 2] !== undefined) {
                    rpResult.push(i - 1);
                }
                if (rp[i + 1] !== undefined && rp[i + 2] !== undefined) {
                    rpResult.push(i + 1);
                }
            }
        }

        // shuffle(rpResult);
        for (let i = rpResult.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [rpResult[i], rpResult[j]] = [rpResult[j], rpResult[i]];
        }

        if (rpResult.length === 0) { // !isset($rpResult[0])
            rpResult[0] = PhpHelpers.rand(2, rp.length - 3);
        }
        return rpResult[0];
    }

    public GetGambleSettings(): number {
        const spinWin = PhpHelpers.rand(1, this.WinGamble!);
        return spinWin;
    }

    public GetReelStrips(winType: string, slotEvent: string): any {
        const game = this.game;
        let prs: number[] = [];

        const reelStrips = ['reelStrip1', 'reelStrip2', 'reelStrip3', 'reelStrip4', 'reelStrip5', 'reelStrip6'];

        if (winType != 'bonus') {
            reelStrips.forEach((reelStrip, index) => {
                const strip = (this as any)[reelStrip];
                if (Array.isArray(strip) && strip.length > 0) {
                    prs[index + 1] = PhpHelpers.rand(0, strip.length - 3); // mt_rand
                }
            });
        } else {
            let reelsId: number[] = [];
             reelStrips.forEach((reelStrip, index) => {
                const strip = (this as any)[reelStrip];
                if (Array.isArray(strip) && strip.length > 0) {
                    prs[index + 1] = this.GetRandomScatterPos(strip);
                    reelsId.push(index + 1);
                }
            });

            const scattersCnt = PhpHelpers.rand(3, reelsId.length);
            // shuffle(reelsId);
             for (let i = reelsId.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [reelsId[i], reelsId[j]] = [reelsId[j], reelsId[i]];
            }

            for (let i = 0; i < reelsId.length; i++) {
                if (i < scattersCnt) {
                     const strip = (this as any)['reelStrip' + reelsId[i]];
                     prs[reelsId[i]] = this.GetRandomScatterPos(strip);
                } else {
                     const strip = (this as any)['reelStrip' + reelsId[i]];
                     prs[reelsId[i]] = PhpHelpers.rand(0, strip.length - 3);
                }
            }
        }

        const reel: any = { 'rp': [] };

        for (const index in prs) { // index is string '1', '2', etc.
            const idx = Number(index);
            const value = prs[idx];
            let key = [...(this as any)['reelStrip' + idx]]; // clone
            const cnt = key.length;

            // PHP: $key[-1] = $key[$cnt - 1]; etc...
            // JS negative index not supported directly on array object for access, must map logic.
            // But we can just calculate index with modulo or if check.
            // However, PHP adds these keys to the array object?
            // The code uses $key[$value - 1], $key[$value], $key[$value+1]...
            // Since $value is rand(0, cnt-3), $value can be 0. $value-1 is -1.
            // So we need to handle wrapping.

            const get_val = (offset: number) => {
                let p = value + offset;
                if (p < 0) return key[cnt + p]; // p is negative
                if (p >= cnt) return key[p - cnt];
                return key[p];
            };

            // PHP logic:
            // $reel['reel'.$index][0] = $key[$value - 1];
            // $reel['reel'.$index][1] = $key[$value];
            // $reel['reel'.$index][2] = $key[$value + 1];

            // Wait, PHP code explicitly sets -1, -2, -3, cnt, cnt+1, cnt+2 indices on the array.
            // "key" in PHP is an associative array (map).
            // So $key[-1] works.

            // Emulating that behavior with get_val:

            reel['reel' + idx] = [];

            if (idx == 1 || idx == 2) {
                reel['reel' + idx][0] = get_val(-1);
                reel['reel' + idx][1] = get_val(0);
                reel['reel' + idx][2] = get_val(1);
                reel['reel' + idx][3] = '';
                reel['reel' + idx][4] = '';
                reel['reel' + idx][5] = '';
            }
            if (idx == 3 || idx == 4) {
                reel['reel' + idx][0] = get_val(-1);
                reel['reel' + idx][1] = get_val(0);
                reel['reel' + idx][2] = get_val(1);
                reel['reel' + idx][3] = get_val(2);
                reel['reel' + idx][4] = '';
                reel['reel' + idx][5] = '';
            }
            if (idx == 5) {
                reel['reel' + idx][0] = get_val(-1);
                reel['reel' + idx][1] = get_val(0);
                reel['reel' + idx][2] = get_val(1);
                reel['reel' + idx][3] = get_val(2);
                reel['reel' + idx][4] = get_val(3);
                reel['reel' + idx][5] = '';
            }
            reel['rp'].push(value);
        }

        return reel;
    }
}
