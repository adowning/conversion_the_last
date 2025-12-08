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
        reelStrip1: [3,3,3,50,5,5,5,99,3,3,3,50,4,4,4,100,5,5,5,101,6,6,6,50,7,7,7,102,8,8,8,50],
        reelStrip2: [3,3,3,50,5,5,5,99,3,3,3,50,4,4,4,100,5,5,5,101,6,6,6,50,7,7,7,102,8,8,8,50],
        reelStrip3: [3,3,3,50,5,5,5,99,3,3,3,50,4,4,4,100,5,5,5,101,6,6,6,50,7,7,7,102,8,8,8,50],
        reelStrip4: [3,3,3,50,5,5,5,99,3,3,3,50,4,4,4,100,5,5,5,101,6,6,6,50,7,7,7,102,8,8,8,50],
        reelStrip5: [3,3,3,50,5,5,5,99,3,3,3,50,4,4,4,100,5,5,5,101,6,6,6,50,7,7,7,102,8,8,8,50],
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
    public slotJackpot: number[] = [0];
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

        const bankObj = context.bank;
        this.Bank = bankObj.slots + bankObj.bonus + bankObj.fish + bankObj.table_bank + bankObj.little;

        this.MaxWin = this.shop.max_win;
        this.increaseRTP = 1;
        this.CurrentDenom = this.game.denomination;
        this.scaleMode = 0;
        this.numFloat = 0;

        this.Paytable['SYM_0'] = [0, 0, 0, 0, 0, 0];
        this.Paytable['SYM_1'] = [0, 0, 0, 0, 0, 0];
        this.Paytable['SYM_2'] = [0, 0, 0, 0, 0, 0];
        this.Paytable['SYM_3'] = [0, 0, 0, 20, 0, 0];
        this.Paytable['SYM_4'] = [0, 0, 0, 10, 0, 0];
        this.Paytable['SYM_5'] = [0, 0, 0, 5, 0, 0];
        this.Paytable['SYM_6'] = [0, 0, 0, 3, 0, 0];
        this.Paytable['SYM_7'] = [0, 0, 0, 2, 0, 0];
        this.Paytable['SYM_8'] = [0, 0, 0, 1, 0, 0];
        this.Paytable['SYM_100'] = [0, 0, 0, 40, 0, 0];
        this.Paytable['SYM_101'] = [0, 0, 0, 200, 0, 0];
        this.Paytable['SYM_102'] = [0, 0, 0, 0, 0, 0];
        this.Paytable['SYM_50'] = [0, 0, 0, 0, 0, 0];
        this.Paytable['SYM_99'] = [0, 0, 0, 0, 0, 0];

        const reel = new GameReel();
        const reelStrips = ['reelStrip1', 'reelStrip2', 'reelStrip3', 'reelStrip4', 'reelStrip5', 'reelStrip6'];

        for (const reelStrip of reelStrips) {
            if (reel.reelsStrip[reelStrip] && reel.reelsStrip[reelStrip].length) {
                (this as any)[reelStrip] = reel.reelsStrip[reelStrip];
            }
        }

        this.keyController = [];

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
        this.slotBonus = false;
        this.slotGamble = true;
        this.slotFastStop = 1;
        this.slotExitUrl = '/';
        this.slotWildMpl = 1;
        this.GambleType = 1;
        this.Denominations = [0.01, 0.02, 0.05, 0.10, 0.20, 0.50, 1.00, 2.00, 5.00, 10.00, 20.00, 50.00, 100.00];
        this.CurrentDenom = this.Denominations[0];
        this.CurrentDenomination = this.Denominations[0];
        this.slotFreeCount = [0, 0, 0, 15, 30, 60];
        this.slotFreeMpl = 1;

        this.slotViewState = (this.game.slotViewState == '' ? 'Normal' : this.game.slotViewState);
        this.hideButtons = [];

        this.jpgs = context.jpgs;

        // JP logic in PHP loops 0 to 1?
        // for( $jp = 0; $jp < 1; $jp++ )
        // This means only 1 jackpot?
        for( let jp = 0; jp < 1; jp++ )
        {
            if (this.jpgs[jp].balance != '') {
                // PHP: sprintf('%01.4f', ...). substr(..., -2).
                // JS: toFixed(4). slice(0, -2).
                let val = parseFloat(this.jpgs[jp].balance).toFixed(4);
                val = val.slice(0, val.length - 2);
                this.slotJackpot[jp] = Number(val); // storing as number? PHP stores as string?
                // PHP uses it later in response with round(jackpot * 100).
                // So it's a number.
                this.slotJackPercent.push(this.jpgs[jp].percent);
            }
        }

        this.Line = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        this.gameLine = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

        this.Bet = this.game.bet ? this.game.bet.split(',') : [];

        this.Balance = Number(this.user.balance);
        this.SymbolGame = ['1', '2', '3', '4', '5', '6', '7', '8'];

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

    public ClearJackpot(jid: number): void {
        this.jpgs[jid].balance = 0; // sprintf 01.4f 0
        // this.jpgs[jid].save();
    }

    public is_active(): boolean {
        if (this.isStateless) return true;
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
        bet = bet * this.CurrentDenom;
        const count_balance = this.count_balance;
        let jsum: number[] = [];
        let payJack: any = 0;

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
                 } else {
                    payJack = this.jpgs[i].get_pay_sum() / this.CurrentDenom;
                    jsum[i] = jsum[i] - this.jpgs[i].get_pay_sum();
                    this.SetBalance(this.jpgs[i].get_pay_sum() / this.CurrentDenom);
                 }
            }
            this.jpgs[i].balance = jsum[i];
            if (this.jpgs[i].balance < this.jpgs[i].get_min('start_balance')) {
                const summ = this.jpgs[i].get_start_balance();
                if (summ > 0) {
                    this.jpgs[i].add_jpg('add', summ);
                }
            }
        }
        if (payJack > 0) {
            payJack = payJack.toFixed(2);
            this.Jackpots['jackPay'] = payJack;
        }
        // In this game, UpdateJackpots returns jackState if win
        if (payJack > 0) {
            return { isJackPay: true } as any;
        }
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
        return this.Percent!;
    }

    public GetCountBalanceUser(): number {
        return this.user.count_balance;
    }

    public InternalError(errcode: string): void {
        console.error("Internal Error: " + errcode);
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
        }
        if (sum == 0 && slotEvent == 'bet' && this.betRemains) {
            sum = this.betRemains;
        }

        this.Bank += sum;

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
        }

        this.user.balance = Number(this.user.balance) + sum;
        this.user.balance = this.FormatFloat(this.user.balance);
        return this.user;
    }

    public GetBalance(): number {
        const user = this.user;
        this.Balance = Number(user.balance) / this.CurrentDenom;
        return this.Balance;
    }

    public SaveLogReport(spinSymbols: string, bet: number, lines: number, win: number, slotState: string): void {
        if (this.isStateless) return;
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
        return '';
    }

    public GetRandomScatterPos(rp: number[]): number {
        let rpResult: number[] = [];
        for (let i = 0; i < rp.length; i++) {
            if (rp[i] == 0) {
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

        for (let i = rpResult.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [rpResult[i], rpResult[j]] = [rpResult[j], rpResult[i]];
        }

        if (rpResult.length === 0) {
            rpResult[0] = PhpHelpers.rand(2, rp.length - 3);
        }
        return rpResult[0];
    }

    public GetGambleSettings(): number {
        const spinWin = PhpHelpers.rand(1, this.WinGamble!);
        return spinWin;
    }

    public OffsetReelStrips(reels: any, rr: number): any {
        for (let r = 1; r <= 5; r++) {
            if (r == rr) {
                reels['rp'][r - 1] = reels['rp'][r - 1] - 1;
                const key = (this as any)['reelStrip' + r];
                const value = reels['rp'][r - 1];
                const cnt = key.length;

                const get_val = (offset: number) => {
                    let p = value + offset;
                    // wrapping logic similar to PHP $key[-1] = $key[$cnt - 1]
                    while (p < 0) p += cnt;
                    while (p >= cnt) p -= cnt;
                    return key[p];
                };

                reels['reel' + r][0] = get_val(-1); // PHP: $key[$value - 1]
                reels['reel' + r][1] = get_val(0); // $key[$value]
                reels['reel' + r][2] = get_val(1); // $key[$value + 1]
                reels['reel' + r][3] = '';
                reels['rps'][r - 1] = [
                    value - 1,
                    value,
                    value + 1
                ];
            }
        }
        return reels;
    }

    public GetReelStrips(winType: string, slotEvent: string): any {
        const game = this.game;
        let prs: number[] = [];

        const reelStrips = ['reelStrip1', 'reelStrip2', 'reelStrip3', 'reelStrip4', 'reelStrip5', 'reelStrip6'];

        if (winType != 'bonus') {
            reelStrips.forEach((reelStrip, index) => {
                const strip = (this as any)[reelStrip];
                if (Array.isArray(strip) && strip.length > 0) {
                    prs[index + 1] = PhpHelpers.rand(3, strip.length - 3); // mt_rand(3, ... -3) in PHP
                }
            });
        } else {
            // Bonus logic
            let reelsId: number[] = [];
             reelStrips.forEach((reelStrip, index) => {
                const strip = (this as any)[reelStrip];
                if (Array.isArray(strip) && strip.length > 0) {
                    prs[index + 1] = this.GetRandomScatterPos(strip);
                    reelsId.push(index + 1);
                }
            });

            const scattersCnt = PhpHelpers.rand(3, reelsId.length);
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

        const reel: any = {
            'rp': [],
            'rps': [[], [], []]
        };

        for (const index in prs) {
            const idx = Number(index);
            const value = prs[idx];
            let key = [...(this as any)['reelStrip' + idx]];
            const cnt = key.length;

            const get_val = (offset: number) => {
                let p = value + offset;
                while (p < 0) p += cnt;
                while (p >= cnt) p -= cnt;
                return key[p];
            };

            reel['reel' + idx] = [];
            // PHP logic:
            // $reel['reel' . $index][0] = $key[$value];
            // $reel['reel' . $index][1] = $key[$value + 1];
            // $reel['reel' . $index][2] = $key[$value + 2];

            reel['reel' + idx][0] = get_val(0);
            reel['reel' + idx][1] = get_val(1);
            reel['reel' + idx][2] = get_val(2);
            reel['reel' + idx][3] = '';

            reel['rp'].push(value);
            // $reel['rps'][$index - 1] = [$value, $value + 1, $value + 2];
            reel['rps'][idx - 1] = [value, value + 1, value + 2];
        }

        return reel;
    }

    public FormatResponse(data: any): string {
        // http_build_query replacement
        // Handles nested arrays/objects recursively
        const buildQuery = (obj: any, prefix?: string): string => {
            let str: string[] = [];
            for (let p in obj) {
                if (obj.hasOwnProperty(p)) {
                    let k = prefix ? prefix + "[" + p + "]" : p;
                    let v = obj[p];
                    if (v !== null && typeof v === "object") {
                        str.push(buildQuery(v, k));
                    } else {
                        str.push(encodeURIComponent(k) + "=" + encodeURIComponent(v));
                    }
                }
            }
            return str.join("&");
        };

        let str = buildQuery(data);
        // $str = str_replace('%5D%5B', '.', $str);
        // $str = str_replace('%5B', '.', $str);
        // $str = str_replace('%5D', '', $str);
        // $str = str_replace('%252', '%2', $str);

        str = str.replace(/%5D%5B/g, '.');
        str = str.replace(/%5B/g, '.');
        str = str.replace(/%5D/g, '');
        str = str.replace(/%252/g, '%2');
        return str;
    }

    public DecodeData(astr: string): any {
        let aJson: any = {};
        const ajT0 = astr.split('&');
        for (const rootNode of ajT0) {
            const nodes = rootNode.split('=');
            const nodes0 = nodes[0].split('.');
            let laJson = aJson;
            for (let i = 0; i < nodes0.length; i++) {
                if (!laJson[nodes0[i]]) {
                    laJson[nodes0[i]] = {};
                }
                if (nodes0.length - 1 == i) {
                    laJson[nodes0[i]] = nodes[1]; // Value
                }
                laJson = laJson[nodes0[i]];
            }
        }
        return aJson;
    }
}
