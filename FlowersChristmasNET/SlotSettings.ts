import { IContext } from '../typescript_base/interfaces';
import { PhpHelpers } from '../typescript_base/php_helpers';
import { User } from '../typescript_base/user';
import { Game } from '../typescript_base/game';
import { Shop } from '../typescript_base/shop';
import { GameBank } from '../typescript_base/game-bank';
import { JPG } from '../typescript_base/jpg';
import { GameLog } from '../typescript_base/game-log';
import { StatGame } from '../typescript_base/stat-game';

class GameReel {
    public reelsStrip: { [key: string]: number[] } = {
        'reelStrip1': [6, 10, 11, 17, 9, 16, 11, 9, 10, 11, 9, 15, 7, 9, 10, 11, 10, 13, 9, 7, 9, 14, 11, 17, 11, 5, 8, 9, 11, 3, 9, 3, 4, 9, 11, 8, 1, 10, 9, 11, 16, 8, 9, 11, 10, 9, 11, 8, 3, 11, 5, 9, 6, 11, 9, 15, 11, 7, 11, 9, 9, 0, 6, 11, 8, 9, 11, 10, 4, 14, 8, 9],
        'reelStrip2': [9, 5, 17, 11, 10, 9, 11, 10, 3, 8, 12, 9, 8, 4, 17, 8, 10, 11, 9, 11, 1, 10, 11, 8, 10, 13, 8, 10, 9, 8, 11, 15, 9, 8, 11, 10, 9, 8, 10, 11, 9, 4, 8, 7, 6, 9, 11, 10, 9, 14, 11, 9, 0, 10, 16, 8, 11, 11, 10, 9, 11, 0, 10, 8, 5, 8, 9, 10, 9, 3, 11, 15, 7, 8, 9, 11],
        'reelStrip3': [8, 13, 16, 15, 10, 16, 10, 8, 17, 11, 15, 8, 15, 10, 12, 3, 16, 8, 14, 8, 3, 1, 13, 9, 16, 0, 14, 13, 8, 15, 11, 9, 10, 14, 17, 10, 14, 17, 13, 10, 11, 17, 1, 10, 0, 5, 13, 10, 8, 4, 11, 15, 16, 8, 17, 14, 8, 7, 6, 10, 16, 13, 9, 8, 14, 9, 17, 10],
        'reelStrip4': [4, 8, 14, 9, 5, 16, 17, 8, 1, 15, 3, 11, 15, 14, 9, 10, 8, 17, 16, 4, 3, 10, 9, 11, 16, 8, 6, 9, 3, 6, 17, 0, 7, 15, 14, 10, 17, 16, 7, 8, 4, 13, 11, 7, 3, 12, 14, 1, 10, 15, 14, 10, 4, 15, 13, 6, 1, 16, 14, 16, 3, 9, 0, 11, 6, 4, 15, 17, 8, 6, 5, 10, 8, 17, 11, 17, 8, 13, 7, 10, 5, 1, 13, 5, 13, 7, 5, 13, 10],
        'reelStrip5': [1, 5, 9, 6, 3, 14, 1, 11, 15, 11, 3, 1, 7, 11, 10, 1, 15, 16, 3, 1, 9, 8, 4, 13, 17, 1, 13, 17, 1, 4, 6, 9, 1, 11, 15, 10, 1, 8, 17, 13, 1, 8, 14, 1, 4, 7, 1, 9, 6, 15, 1, 10, 17, 1, 16, 1, 16, 5, 4, 1, 4, 5, 14, 0, 14, 3, 16, 1, 10, 7, 1, 6, 9, 13, 7, 1, 8, 5],
        'reelStrip6': []
    };
    public reelsStripBonus: { [key: string]: number[] } = {
        'reelStripBonus1': [6, 8, 11, 10, 4, 9, 16, 11, 8, 10, 11, 9, 14, 8, 9, 15, 7, 10, 13, 10, 5, 8, 14, 17, 11, 5, 8, 9, 10, 3, 11, 3, 4, 9, 11, 16, 11, 8, 1, 1, 1, 10, 9, 9, 10, 8, 9, 11, 10, 11, 8, 3, 6, 11, 9, 15, 11, 8, 10, 7, 11, 9, 9, 0, 6, 9, 8, 9, 11, 10, 17, 7, 9, 11],
        'reelStripBonus2': [9, 8, 17, 7, 10, 10, 11, 15, 9, 11, 12, 9, 8, 4, 10, 11, 17, 8, 9, 10, 11, 1, 1, 1, 10, 11, 8, 15, 9, 8, 13, 10, 9, 8, 11, 11, 10, 8, 7, 6, 9, 4, 8, 11, 10, 9, 14, 11, 9, 0, 10, 11, 3, 16, 8, 8, 10, 9, 11, 11, 0, 10, 8, 9, 10, 8, 9, 8, 5, 10, 3, 11, 8, 9, 8, 5, 10, 10],
        'reelStripBonus3': [8, 16, 13, 11, 0, 10, 9, 9, 15, 17, 11, 11, 12, 3, 7, 14, 6, 10, 16, 8, 8, 3, 1, 1, 1, 13, 9, 16, 0, 15, 11, 15, 11, 14, 17, 13, 10, 10, 14, 9, 10, 17, 11, 17, 1, 1, 1, 14, 13, 15, 9, 17, 5, 9, 4, 11, 8, 10, 14, 8, 9, 13, 10, 17, 16, 13, 9, 14, 8, 8, 16, 15],
        'reelStripBonus4': [8, 10, 8, 6, 5, 5, 11, 9, 17, 14, 16, 4, 8, 17, 8, 1, 1, 1, 15, 14, 8, 17, 9, 10, 16, 4, 16, 17, 9, 6, 9, 3, 11, 8, 6, 3, 10, 15, 17, 0, 3, 11, 7, 16, 7, 15, 14, 8, 4, 11, 13, 7, 3, 12, 15, 14, 4, 15, 10, 10, 13, 6, 1, 1, 1, 10, 17, 16, 16, 14, 9, 0, 11, 6, 17, 8, 4, 15, 13, 7, 5, 1, 1, 1, 3, 13, 14, 1, 1, 1, 10, 5, 7, 13, 5, 13, 10],
        'reelStripBonus5': [1, 1, 1, 3, 14, 15, 16, 7, 11, 11, 10, 1, 1, 1, 13, 15, 8, 7, 5, 3, 1, 1, 1, 9, 8, 17, 4, 13, 4, 13, 17, 3, 1, 1, 1, 11, 10, 17, 13, 8, 8, 14, 1, 1, 1, 16, 4, 7, 1, 1, 1, 9, 6, 9, 15, 10, 17, 1, 1, 1, 15, 16, 4, 5, 16, 1, 1, 1, 4, 5, 14, 0, 3, 14, 11, 9, 6, 10, 7, 1, 1, 1, 6, 5, 6, 9],
        'reelStripBonus6': []
    };
}

export class SlotSettings {
    public isStateless: boolean = true;
    public playerId: number | null = null;
    public splitScreen: boolean | null = null;
    public reelStrip1: number[] | null = null;
    public reelStrip2: number[] | null = null;
    public reelStrip3: number[] | null = null;
    public reelStrip4: number[] | null = null;
    public reelStrip5: number[] | null = null;
    public reelStrip6: number[] | null = null;
    public reelStripBonus1: number[] | null = null;
    public reelStripBonus2: number[] | null = null;
    public reelStripBonus3: number[] | null = null;
    public reelStripBonus4: number[] | null = null;
    public reelStripBonus5: number[] | null = null;
    public reelStripBonus6: number[] | null = null;
    public slotId: string = '';
    public slotDBId: string = '';
    public Line: number[] | null = null;
    public scaleMode: number | null = null;
    public numFloat: number | null = null;
    public gameLine: number[] | null = null;
    public Bet: number[] | null = null;
    public isBonusStart: boolean | null = null;
    public Balance: number | null = null;
    public SymbolGame: string[] | null = null;
    public GambleType: number | null = null;
    public lastEvent: any = null;
    public Jackpots: any = [];
    public keyController: any = null;
    public slotViewState: string | null = null;
    public hideButtons: any[] | null = null;
    public slotReelsConfig: any[] | null = null;
    public slotFreeCount: number[] | null = null;
    public slotFreeMpl: number | null = null;
    public slotWildMpl: number | null = null;
    public slotExitUrl: string | null = null;
    public slotBonus: boolean | null = null;
    public slotBonusType: number | null = null;
    public slotScatterType: number | null = null;
    public slotGamble: boolean | null = null;
    public Paytable: { [key: string]: number[] } = {};
    public slotSounds: any[] = [];
    public jpgs: JPG[] | null = null;
    private Bank: number | null = null;
    private Percent: number | null = null;
    private WinLine: any = null;
    private WinGamble: number | null = null;
    private Bonus: any = null;
    private shop_id: number | null = null;
    public currency: string | null = null;
    public user: User;
    public game: Game;
    public shop: Shop;
    public jpgPercentZero: boolean = false;
    public count_balance: number | null = null;
    public MaxWin: number | null = null;
    public increaseRTP: number = 1;
    public CurrentDenom: number = 1;
    public AllBet: number = 0;
    public gameData: any = {};
    public gameDataStatic: any = {};
    public slotJackPercent: any[] = [];
    public slotJackpot: any[] = [];
    public Denominations: number[] = [];
    public CurrentDenomination: number = 1;
    public slotFastStop: number = 1;
    public slotCurrency: string | null = null;
    public betProfit: number = 0;
    public toGameBanks: number = 0;
    public toSlotJackBanks: number = 0;
    public toSysJackBanks: number = 0;
    public betRemains: number = 0;
    public betRemains0: number = 0;

    constructor(sid: string, playerId: number, context: IContext) {
        this.slotId = sid;
        this.isStateless = true; // context check in PHP, but always true here
        this.playerId = playerId;
        this.user = new User(context.user);
        this.shop_id = this.user.shop_id;
        // GameBank is handled via Game
        const gamebank = new GameBank(context.bank);
        this.game = new Game(context.game);
        this.shop = new Shop(context.shop);
        this.game.gamebank_instance = gamebank;

        this.MaxWin = this.shop.max_win;
        this.increaseRTP = 1;
        this.CurrentDenom = this.game.denomination;
        this.scaleMode = 0;
        this.numFloat = 0;

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
        const reelStrips = ['reelStrip1', 'reelStrip2', 'reelStrip3', 'reelStrip4', 'reelStrip5', 'reelStrip6'];
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
        this.slotFastStop = 1;
        this.slotExitUrl = '/';
        this.slotWildMpl = 1;
        this.GambleType = 1;
        this.Denominations = [0.01, 0.02, 0.05, 0.10, 0.20, 0.50, 1.00, 2.00, 5.00, 10.00, 20.00, 50.00, 100.00];
        this.CurrentDenom = this.Denominations[0];
        this.CurrentDenomination = this.Denominations[0];
        this.slotFreeCount = [0, 0, 0, 0, 10, 15, 20, 25, 30];
        this.slotFreeMpl = 3;
        this.slotViewState = (this.game.slotViewState == '' ? 'Normal' : this.game.slotViewState);
        this.hideButtons = [];

        this.jpgs = [];
        if (context.jpgs) {
            this.jpgs = context.jpgs.map((j) => new JPG(j));
        }

        this.slotJackPercent = [];
        this.slotJackpot = [];
        for (let jp = 1; jp <= 4; jp++) {
            this.slotJackpot.push((this.game as any)['jp_' + jp]);
            this.slotJackPercent.push((this.game as any)['jp_' + jp + '_percent']);
        }

        this.Line = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        this.gameLine = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        this.Bet = (this.game.bet || '').split(',').map(Number);
        this.Balance = this.user.balance;
        this.SymbolGame = ['1', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
        this.Bank = this.game.get_gamebank();
        this.Percent = this.shop.percent;
        this.WinGamble = this.game.rezerv;
        this.slotDBId = String(this.game.id);
        this.slotCurrency = this.shop.currency;
        this.count_balance = this.user.count_balance;

        if (this.user.address > 0 && this.user.count_balance == 0) {
            this.Percent = 0;
            this.jpgPercentZero = true;
        } else if (this.user.count_balance == 0) {
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

        if (Object.keys(this.gameDataStatic).length > 0) {
            for (const key in this.gameDataStatic) {
                if (this.gameDataStatic[key]['timelife'] <= PhpHelpers.time()) {
                    delete this.gameDataStatic[key];
                }
            }
        }
    }

    public static shuffle(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
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
        const str0 = String(num).split('.');
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
        this.user.save();
    }

    public CheckBonusWin(): number {
        let allRateCnt = 0;
        let allRate = 0;
        for (const key in this.Paytable) {
            for (const vl2 of this.Paytable[key]) {
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
            for (const vl2 of this.Paytable[key]) {
                if (vl2 > 0) {
                    allRate.push(vl2);
                }
            }
        }
        SlotSettings.shuffle(allRate);
        if (this.game.stat_in < (this.game.stat_out + (allRate[0] * this.AllBet))) {
            allRate[0] = 0;
        }
        return allRate[0];
    }

    public HasGameDataStatic(key: string): boolean {
        return !!this.gameDataStatic[key];
    }

    public SaveGameDataStatic(): void {
        this.game.advanced = JSON.stringify(this.gameDataStatic);
        this.game.save();
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
        return !!this.gameData[key];
    }

    public GetHistory(): any {
        return 'NULL';
    }

    public UpdateJackpots(bet: number): void {
        bet = bet * this.CurrentDenom;
        const count_balance = this.count_balance || 0;
        let jsum: number[] = [];
        let payJack = 0;
        if (!this.jpgs) return;

        for (let i = 0; i < this.jpgs.length; i++) {
            if (count_balance == 0 || this.jpgPercentZero) {
                jsum[i] = this.jpgs[i].balance;
            } else if (count_balance < bet) {
                jsum[i] = count_balance / 100 * this.jpgs[i].percent + this.jpgs[i].balance;
            } else {
                jsum[i] = bet / 100 * this.jpgs[i].percent + this.jpgs[i].balance;
            }
            if (this.jpgs[i].get_pay_sum() < jsum[i] && this.jpgs[i].get_pay_sum() > 0) {
                if (this.jpgs[i].user_id && this.jpgs[i].user_id != this.user.id) {
                    // pass
                } else {
                    payJack = this.jpgs[i].get_pay_sum() / this.CurrentDenom;
                    jsum[i] = jsum[i] - this.jpgs[i].get_pay_sum();
                    this.SetBalance(this.jpgs[i].get_pay_sum() / this.CurrentDenom);
                    if (this.jpgs[i].get_pay_sum() > 0) {
                         StatGame.create({
                            'user_id': this.playerId,
                            'balance': this.Balance! * this.CurrentDenom,
                            'bet': 0,
                            'win': this.jpgs[i].get_pay_sum(),
                            'game': this.game.name + ' JPG ' + this.jpgs[i].id,
                            'in_game': 0,
                            'in_jpg': 0,
                            'in_profit': 0,
                            'shop_id': this.shop_id,
                            'date_time': new Date()
                        });
                    }
                }
            }
            this.jpgs[i].balance = jsum[i];
            this.jpgs[i].save();
            if (this.jpgs[i].balance < this.jpgs[i].get_min('start_balance')) {
                const summ = this.jpgs[i].get_start_balance();
                if (summ > 0) {
                    this.jpgs[i].add_jpg('add', summ);
                }
            }
        }
        if (payJack > 0) {
            this.Jackpots['jackPay'] = payJack.toFixed(2);
        }
    }

    public GetBank(slotState: string = ''): number {
        if (this.isBonusStart || slotState == 'bonus' || slotState == 'freespin' || slotState == 'respin') {
            slotState = 'bonus';
        } else {
            slotState = '';
        }
        const game = this.game;
        this.Bank = game.get_gamebank(slotState);
        return this.Bank / this.CurrentDenom;
    }

    public GetPercent(): number {
        return this.Percent!;
    }

    public GetCountBalanceUser(): number {
        return this.user.count_balance;
    }

    public InternalError(errcode: string): void {
        console.error('Internal Error', errcode);
    }

    public InternalErrorSilent(errcode: any): void {
         console.error('Internal Error Silent', errcode);
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
        sum = sum * this.CurrentDenom;
        const game = this.game;
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
            const count_balance = this.count_balance || 0;
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
            if (this.jpgs) {
                for (let i = 0; i < this.jpgs.length; i++) {
                    if (!this.jpgPercentZero) {
                        if (count_balance < gameBet && count_balance > 0) {
                            this.toSlotJackBanks += (count_balance / 100 * this.jpgs[i].percent);
                        } else if (count_balance > 0) {
                            this.toSlotJackBanks += (gameBet / 100 * this.jpgs[i].percent);
                        }
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
            game.set_gamebank(bankBonusSum, 'inc', 'bonus');
        }
        if (sum == 0 && slotEvent == 'bet' && this.betRemains) {
            sum = this.betRemains;
        }
        game.set_gamebank(sum, 'inc', slotState);
        game.save();
        return game;
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
                const sm = Math.abs(sum);
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
                const sm = Math.abs(sum);
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
            const sum0 = Math.abs(sum);
            if (user.count_balance == 0) {
                const sm = Math.abs(sum);
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
            this.user.count_balance = this.user.updateCountBalance(sum, this.count_balance!);
            this.user.count_balance = this.FormatFloat(this.user.count_balance);
        }
        this.user.balance = this.FormatFloat(this.user.balance + sum);
        this.user.save();
        return this.user;
    }

    public GetBalance(): number {
        const user = this.user;
        this.Balance = user.balance / this.CurrentDenom;
        return this.Balance;
    }

    public SaveLogReport(spinSymbols: string, bet: number, lines: number, win: number, slotState: string): void {
        if (this.isStateless) return;
        // Logic kept for parity but skipped due to stateless check
    }

    public GetSpinSettings(garantType: string = 'bet', bet: number, lines: number): any[] {
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
            if (percentLevel) {
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
        let returnRet: any[] = ['none', 0];

        if (bonusWin == 1 && this.slotBonus) {
            this.isBonusStart = true;
            garantType = 'bonus';
            let winLimit = this.GetBank(garantType);
            returnRet = ['bonus', winLimit];
            if (this.game.stat_in < (this.CheckBonusWin() * bet + this.game.stat_out) || winLimit < (this.CheckBonusWin() * bet)) {
                returnRet = ['none', 0];
            }
        } else if (spinWin == 1) {
            let winLimit = this.GetBank(garantType);
            returnRet = ['win', winLimit];
        }
        if (garantType == 'bet' && this.GetBalance() <= (2 / this.CurrentDenom)) {
            const randomPush = PhpHelpers.rand(1, 10);
            if (randomPush == 1) {
                let winLimit = this.GetBank('');
                returnRet = ['win', winLimit];
            }
        }
        return returnRet;
    }

    public getNewSpin(game: any, spinWin: number = 0, bonusWin: number = 0, lines: number, garantType: string = 'bet'): string {
        // Ported but not used in Server.php
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
        if (garantType != 'bet') {
            pref = '_bonus';
        } else {
            pref = '';
        }
        let win: any[] = [];
        if (spinWin) {
            if (game.game_win && game.game_win['winline' + pref + curField]) {
                win = game.game_win['winline' + pref + curField].split(',');
            }
        }
        if (bonusWin) {
             if (game.game_win && game.game_win['winbonus' + pref + curField]) {
                win = game.game_win['winbonus' + pref + curField].split(',');
            }
        }
        const number = PhpHelpers.rand(0, win.length - 1);
        return win[number];
    }

    public GetRandomScatterPos(rp: any[]): number {
        let rpResult: number[] = [];
        for (let i = 0; i < rp.length; i++) {
            if (rp[i] == '0') {
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
        SlotSettings.shuffle(rpResult);
        if (rpResult[0] === undefined) {
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
        if (slotEvent == 'freespin') {
            const reel = new GameReel();
            const fArr = reel.reelsStripBonus;
            const reelStrips = ['reelStrip1', 'reelStrip2', 'reelStrip3', 'reelStrip4', 'reelStrip5', 'reelStrip6'];
            // Mimic PHP array_shift logic. fArr is an object in TS.
            // In PHP array_shift shifts the first value. The keys are 'reelStripBonus1' etc.
            const keys = Object.keys(fArr);
            let i = 0;
            for (const reelStrip of reelStrips) {
                if (i < keys.length) {
                    const curReelKey = keys[i];
                    const curReel = fArr[curReelKey];
                    i++;
                    if (curReel && curReel.length > 0) {
                        (this as any)[reelStrip] = curReel;
                    }
                }
            }
        }

        let prs: { [key: number]: number } = {};
        const reelStripsAll = ['reelStrip1', 'reelStrip2', 'reelStrip3', 'reelStrip4', 'reelStrip5', 'reelStrip6'];

        if (winType != 'bonus') {
            reelStripsAll.forEach((reelStrip, index) => {
                if (this[reelStrip as keyof SlotSettings] && (this[reelStrip as keyof SlotSettings] as number[]).length > 0) {
                    prs[index + 1] = PhpHelpers.rand(0, (this[reelStrip as keyof SlotSettings] as number[]).length - 3);
                }
            });
        } else {
            let reelsId: number[] = [];
            reelStripsAll.forEach((reelStrip, index) => {
                if (this[reelStrip as keyof SlotSettings] && (this[reelStrip as keyof SlotSettings] as number[]).length > 0) {
                    prs[index + 1] = this.GetRandomScatterPos(this[reelStrip as keyof SlotSettings] as number[]);
                    reelsId.push(index + 1);
                }
            });
            const scattersCnt = PhpHelpers.rand(4, reelsId.length);
            SlotSettings.shuffle(reelsId);
            for (let i = 0; i < reelsId.length; i++) {
                if (i < scattersCnt) {
                    prs[reelsId[i]] = this.GetRandomScatterPos((this as any)['reelStrip' + reelsId[i]]);
                } else {
                    prs[reelsId[i]] = PhpHelpers.rand(0, (this as any)['reelStrip' + reelsId[i]].length - 3);
                }
            }
        }

        let reel: any = { 'rp': [] };
        for (const index in prs) {
            const value = prs[index];
            const key = (this as any)['reelStrip' + index];
            const cnt = key.length;
            // In PHP: $key[-1] = $key[$cnt - 1]; $key[$cnt] = $key[0];
            // JS arrays don't support negative indices for access like that easily without proxy,
            // but we can just handle the wrapping manually in logic below.

            // PHP Logic:
            // $reel['reel' . $index][0] = $key[$value - 1];
            // $reel['reel' . $index][1] = $key[$value];
            // $reel['reel' . $index][2] = $key[$value + 1];

            // Accessing -1 or wrapped indices:
            const valMinus1 = (value - 1 < 0) ? key[cnt - 1] : key[value - 1];
            const val0 = key[value];
            const valPlus1 = (value + 1 >= cnt) ? key[0] : key[value + 1];

            if (!reel['reel' + index]) reel['reel' + index] = [];
            reel['reel' + index][0] = valMinus1;
            reel['reel' + index][1] = val0;
            reel['reel' + index][2] = valPlus1;
            reel['reel' + index][3] = '';
            reel['rp'].push(value);
        }

        return reel;
    }
}
