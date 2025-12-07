import { PhpHelpers } from '../typescript_base/php_helpers';
import { IContext } from '../typescript_base/interfaces';
import { User } from '../typescript_base/user';
import { Game } from '../typescript_base/game';
import { Shop } from '../typescript_base/shop';
import { JPG } from '../typescript_base/jpg';
import { GameBank } from '../typescript_base/game-bank';
import { GameLog } from '../typescript_base/game-log';
import { StatGame } from '../typescript_base/stat-game';

export class SlotSettings {
    public isStateless: boolean = true;
    public playerId: any = null;
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
    public Line: any = null;
    public scaleMode: any = null;
    public numFloat: any = null;
    public gameLine: any = null;
    public Bet: any = null;
    public isBonusStart: any = null;
    public Balance: any = null;
    public SymbolGame: any = null;
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
    public Paytable: any = [];
    public slotSounds: any = [];
    public jpgs: any = null;
    private Bank: any = null;
    private Percent: any = null;
    private WinLine: any = null;
    private WinGamble: any = null;
    private Bonus: any = null;
    private shop_id: any = null;
    public currency: any = null;
    public user: User = null as any;
    public game: Game = null as any;
    public shop: Shop = null as any;
    public jpgPercentZero: boolean = false;
    public count_balance: any = null;
    public MaxWin: any;
    public increaseRTP: number = 1;
    public CurrentDenom: any;
    public Denominations: any;
    public CurrentDenomination: any;
    public slotFreeAddCount: any;
    public slotJackPercent: any;
    public slotJackpot: any;
    public slotCurrency: any;
    public gameData: any = {};
    public gameDataStatic: any = {};
    public AllBet: any;
    public toGameBanks: number = 0;
    public toSlotJackBanks: number = 0;
    public toSysJackBanks: number = 0;
    public betProfit: number = 0;
    public betRemains: number = 0;
    public betRemains0: number = 0;
    public slotFastStop: number = 1;

    constructor(sid: string, playerId: number, context: IContext) {
        this.slotId = sid;
        this.isStateless = !!context;
        this.playerId = playerId;
        const user = new User(context.user);
        this.user = user;
        this.shop_id = user.shop_id;
        const gamebank = new GameBank(context.bank);
        const game = new Game(context.game);
        this.shop = new Shop(context.shop);
        this.game = game;
        (this.game as any).gamebank_instance = gamebank;
        this.MaxWin = this.shop.max_win;
        this.increaseRTP = 1;
        this.CurrentDenom = this.game.denomination;
        this.scaleMode = 0;
        this.numFloat = 0;
        this.Paytable['SYM_0'] = [
            0,
            0,
            0,
            0,
            0,
            0
        ];
        this.Paytable['SYM_1'] = [
            0,
            0,
            0,
            0,
            0,
            0
        ];
        this.Paytable['SYM_2'] = [
            0,
            0,
            0,
            0,
            0,
            0
        ];
        this.Paytable['SYM_3'] = [
            0,
            0,
            0,
            15,
            200,
            100
        ];
        this.Paytable['SYM_4'] = [
            0,
            0,
            0,
            15,
            150,
            750
        ];
        this.Paytable['SYM_5'] = [
            0,
            0,
            0,
            9,
            100,
            500
        ];
        this.Paytable['SYM_6'] = [
            0,
            0,
            0,
            9,
            75,
            400
        ];
        this.Paytable['SYM_7'] = [
            0,
            0,
            0,
            9,
            50,
            300
        ];
        this.Paytable['SYM_8'] = [
            0,
            0,
            0,
            3,
            15,
            100
        ];
        this.Paytable['SYM_9'] = [
            0,
            0,
            0,
            3,
            15,
            75
        ];
        this.Paytable['SYM_10'] = [
            0,
            0,
            0,
            3,
            15,
            50
        ];
        this.Paytable['SYM_11'] = [
            0,
            0,
            0,
            3,
            15,
            40
        ];
        this.Paytable['SYM_12'] = [
            0,
            0,
            0,
            3,
            15,
            30
        ];

        this.reelStrip1 = [12,12,12,8,8,8,11,11,11,8,8,8,10,10,10,7,7,7,11,11,11,8,8,8,9,9,9,11,11,11,4,4,4,8,8,8,11,11,11,5,5,5,10,10,10,11,11,11,5,5,5,12,12,12,0,12,11,12,5,5,5,11,11,11,8,8,8,10,10,10,7,7,7,8,8,8,11,11,11,3,3,3,8,8,8,9,9,9,11,11,11,4,4,4,8,8,8,10,10,10,6,6,6,11,11,11,5,5,5,12,12,12,0,12,12,12,8,8,8,11,11,11,8,8,8,10,10,10,7,7,7,11,4,11,8,8,8,11,11,11,4,4,4,8,12,8,5,5,5,10,10,10,11,11,11,8,8,8,5,5,5,12,12,12,0,11,11,11,12,12,12,8,8,8,11,11,11,8,8,8,10,10,10,7,7,7,11,11,11,8,8,8,5,5,5,9,9,9,11,11,11,4,4,4,8,8,8,10,10,10,6,6,6,11,11,11,5,5,5,12,12,12,0,12,12,12,8,8,8,11,11,11,8,8,8,10,10,3,7,7,7,11,11,11,8,8,8,9,9,9,11,11,11,4,4,4,8,8,8,5,5,5,10,10,10,11,11,11,5,5,5,12,12,12,5,5,5,0,12,12,12,7,8,8,11,11,11,8,8,8,10,10,10,7,7,7,11,11,11,3,3,3,8,8,8,9,9,9,11,11,11,4,8,4,8,8,8,10,10,10,6,6,6,11,11,11,5,5,5,12,12,12];
        this.reelStrip2 = [3,3,3,9,9,9,0,8,8,8,12,12,12,10,10,10,3,3,3,9,9,9,12,12,12,8,8,8,9,9,9,6,6,6,12,12,12,9,9,9,6,6,6,11,11,11,5,5,5,12,12,12,0,6,6,6,3,3,3,9,9,9,0,8,8,8,9,9,9,12,12,12,10,10,10,6,6,6,12,12,12,8,8,8,9,9,9,6,7,7,12,12,12,9,9,9,6,6,6,11,11,11,5,5,5,12,12,12,0,3,3,3,9,9,9,0,8,8,8,12,12,12,3,3,3,9,9,9,12,12,12,8,8,8,9,9,9,12,12,12,9,9,9,6,6,6,5,5,5,12,12,12,0,6,6,6,3,3,3,9,9,9,0,8,8,8,12,12,12,10,10,10,9,9,9,11,12,12,6,6,6,9,9,9,12,12,12,4,4,4,8,5,8,9,9,9,7,7,7,12,12,12,9,9,10,12,12,12,6,6,6,11,11,11,5,5,5,12,12,12,3,3,3,9,9,9,0,8,8,8,12,12,12,10,10,10,3,3,3,9,9,9,12,12,12,8,8,8,9,9,9,12,12,12,9,9,9,6,6,6,11,11,12,5,5,5,12,12,12,0,6,6,6,3,3,3,8,9,9,0,8,8,8,12,12,12,10,10,10,9,9,9,12,12,12,4,4,4,8,8,8,9,9,9,7,7,7,12,12,12,9,9,9,6,6,6,11,11,11,5,5,5,12,12,12];
        this.reelStrip3 = [3,3,3,6,6,6,10,10,10,5,5,5,10,10,10,7,7,7,9,9,9,4,4,4,11,11,11,7,7,7,4,4,4,10,10,10,9,9,9,10,10,10,0,11,11,11,0,3,3,3,8,8,8,6,6,6,10,10,10,7,7,7,0,10,10,10,9,9,9,4,4,4,11,11,11,10,10,10,0,9,9,9,10,10,10,11,11,11,12,12,12,3,3,3,10,10,10,8,8,8,6,6,6,10,10,10,7,8,7,10,10,10,9,9,9,4,4,4,11,11,11,0,7,7,7,4,4,4,10,10,10,7,7,7,9,9,9,10,10,10,11,9,11,7,7,7,12,10,12,10,10,10,0,3,3,3,8,8,8,6,6,6,10,10,10,7,7,7,0,10,10,10,9,11,9,4,4,4,11,11,11,7,7,7,9,9,9,10,10,10,11,11,11,12,12,12,3,3,3,8,8,5,6,6,6,10,10,10,5,5,5,10,10,10,7,7,7,9,9,9,0,4,4,4,11,11,12,7,7,7,4,4,4,10,10,10,7,9,9,10,10,10,11,11,11,12,12,12,0,3,3,3,8,8,8,6,6,6,10,10,10,10,10,10,7,7,7,9,9,9,4,4,4,11,11,11,10,10,10,9,9,9,10,10,10,11,11,11,12,12,12];
        this.reelStrip4 = [3,3,3,0,8,8,8,10,10,10,7,7,7,10,10,10,8,8,8,0,9,9,9,4,4,4,8,8,8,9,9,9,6,6,6,11,11,11,5,5,5,10,10,10,12,12,12,0,7,7,7,0,8,8,8,10,10,10,7,7,7,10,10,10,8,8,8,9,9,9,6,6,6,8,8,8,9,9,9,6,6,6,11,11,11,5,5,5,10,10,10,12,12,12,3,3,3,8,8,8,10,10,10,7,7,5,10,10,10,8,8,8,9,9,9,6,4,4,8,8,8,7,9,9,6,6,6,11,11,11,5,5,5,10,10,10,12,12,12,0,7,7,7,0,8,8,8,10,10,10,7,7,7,10,10,11,8,4,8,9,9,9,6,6,6,8,8,8,9,7,9,6,6,6,11,11,11,5,5,5,10,10,10,12,12,12,0,8,8,8,10,10,10,7,7,7,10,10,10,8,8,8,9,9,9,4,4,4,8,8,8,9,9,9,6,6,6,11,11,11,5,5,5,10,10,10,12,10,12,0,7,7,7,0,8,8,8,10,10,10,7,7,7,10,10,10,8,8,8,9,9,9,6,6,6,8,8,8,9,9,9,6,6,6,11,11,11,5,5,5,10,10,10,12,12,12];
        this.reelStrip5 = [11,11,11,8,8,8,4,4,4,10,10,10,7,7,7,9,9,9,5,5,5,9,9,9,0,7,7,7,9,9,9,10,10,10,6,6,6,12,12,12,11,11,11,12,12,12,0,11,11,11,8,8,8,0,4,4,4,11,11,11,10,10,10,9,9,9,5,5,5,11,11,11,9,9,9,4,4,4,7,7,7,9,9,9,3,3,3,0,10,10,10,6,6,6,12,12,12,11,11,11,0,5,5,5,6,6,6,12,12,12,11,11,11,8,8,8,4,4,4,10,10,10,7,7,7,9,9,9,5,5,5,9,9,9,11,7,7,9,9,9,10,10,10,6,6,6,12,12,12,11,11,11,12,12,12,0,11,11,11,8,8,8,4,4,4,11,11,11,10,10,10,9,9,9,6,5,5,9,9,9,4,4,4,7,7,7,0,9,9,9,3,3,3,10,7,10,6,6,6,12,12,12,0,11,11,11,5,5,5,6,6,6,12,12,12,0,11,11,11,8,8,8,4,4,4,10,10,10,9,7,7,9,9,9,5,5,5,9,9,8,7,7,7,12,9,9,10,10,10,6,6,6,12,12,12,11,11,11,12,12,12,0,11,11,11,8,8,8,10,4,4,11,11,11,10,10,10,9,9,9,5,5,5,9,9,9,4,4,4,7,7,7,9,9,9,3,3,3,10,10,10,6,6,6,12,12,12,11,11,11,5,5,5,6,6,6,0,12,12,12];
        this.reelStrip6 = [];

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
            [
                425,
                142,
                3
            ],
            [
                669,
                142,
                3
            ],
            [
                913,
                142,
                3
            ],
            [
                1157,
                142,
                3
            ],
            [
                1401,
                142,
                3
            ]
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
        this.slotFreeCount = [
            0,
            0,
            0,
            10,
            20,
            30
        ];
        this.slotFreeMpl = 1;
        this.slotViewState = (game.slotViewState == '' ? 'Normal' : game.slotViewState);
        this.hideButtons = [];
        // this.jpgs = collect($context->jpgs)->map(function($j){ return new \VanguardLTE\Stateless\JPG($j); });
        this.jpgs = context.jpgs.map((j: any) => new JPG(j));
        this.slotJackPercent = [];
        this.slotJackpot = [];
        for (let jp = 1; jp <= 4; jp++) {
            this.slotJackpot.push((game as any)['jp_' + jp]);
            this.slotJackPercent.push((game as any)['jp_' + jp + '_percent']);
        }
        this.Line = [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15
        ];
        this.gameLine = [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15
        ];
        this.Bet = (game.bet as string).split(',');
        this.Balance = user.balance;
        this.SymbolGame = [
            '0',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12'
        ];
        this.Bank = (game as any).get_gamebank();
        this.Percent = this.shop.percent;
        this.WinGamble = game.rezerv;
        this.slotDBId = game.id.toString();
        this.slotCurrency = this.shop.currency;
        this.count_balance = user.count_balance;
        if (user.address > 0 && user.count_balance == 0) {
            this.Percent = 0;
            this.jpgPercentZero = true;
        }
        else if (user.count_balance == 0) {
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
        if (!(this.game as any).advanced || (this.game as any).advanced.length <= 0) {
            (this.game as any).advanced = JSON.stringify({});
        }
        try {
            this.gameDataStatic = JSON.parse((this.game as any).advanced);
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

    public is_active() {
        if (this.isStateless) return true;
        if (this.game && this.shop && this.user && (!this.game.view || this.shop.is_blocked || this.user.is_blocked || this.user.status == 'Banned')) {
            // // \VanguardLTE\Session::where('user_id', $this->user->id)->delete();
            this.user.setAttribute('remember_token', null);
            return false;
        }
        if (!this.game.view) {
            return false;
        }
        if (this.shop.is_blocked) {
            return false;
        }
        if (this.user.is_blocked) {
            return false;
        }
        if (this.user.status == 'Banned') {
            return false;
        }
        return true;
    }

    public SetGameData(key: string, value: any) {
        const timeLife = 86400;
        this.gameData[key] = {
            'timelife': PhpHelpers.time() + timeLife,
            'payload': value
        };
    }

    public GetGameData(key: string) {
        if (this.gameData[key]) {
            return this.gameData[key]['payload'];
        }
        else {
            return 0;
        }
    }

    public FormatFloat(num: any) {
        const str0 = num.toString().split('.');
        if (str0[1]) {
            if (str0[1].length > 4) {
                return Math.round(num * 100) / 100;
            }
            else if (str0[1].length > 2) {
                return Math.floor(num * 100) / 100;
            }
            else {
                return num;
            }
        }
        else {
            return num;
        }
    }

    public SaveGameData() {
        this.user.session = JSON.stringify(this.gameData);
        this.user.save();
    }

    public CheckBonusWin() {
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

    public GetRandomPay() {
        let allRate = [];
        for (const key in this.Paytable) {
            const vl = this.Paytable[key];
            for (const vl2 of vl) {
                if (vl2 > 0) {
                    allRate.push(vl2);
                }
            }
        }
        // shuffle
        for (let i = allRate.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allRate[i], allRate[j]] = [allRate[j], allRate[i]];
        }
        if ((this.game as any).stat_in < ((this.game as any).stat_out + (allRate[0] * this.AllBet))) {
            allRate[0] = 0;
        }
        return allRate[0];
    }

    public HasGameDataStatic(key: string) {
        if (this.gameDataStatic[key]) {
            return true;
        }
        else {
            return false;
        }
    }

    public SaveGameDataStatic() {
        (this.game as any).advanced = JSON.stringify(this.gameDataStatic);
        this.game.save();
        (this.game as any).refresh();
    }

    public SetGameDataStatic(key: string, value: any) {
        const timeLife = 86400;
        this.gameDataStatic[key] = {
            'timelife': PhpHelpers.time() + timeLife,
            'payload': value
        };
    }

    public GetGameDataStatic(key: string) {
        if (this.gameDataStatic[key]) {
            return this.gameDataStatic[key]['payload'];
        }
        else {
            return 0;
        }
    }

    public HasGameData(key: string) {
        if (this.gameData[key]) {
            return true;
        }
        else {
            return false;
        }
    }

    public GetHistory() {
        if (this.isStateless) return 'NULL';
        // Legacy code removed as in PHP
        return 'NULL';
    }

    public UpdateJackpots(bet: number) {
        bet = bet * this.CurrentDenom;
        const count_balance = this.count_balance;
        let jsum = [];
        let payJack: any = 0;
        for (let i = 0; i < this.jpgs.length; i++) {
            if (count_balance == 0 || this.jpgPercentZero) {
                jsum[i] = this.jpgs[i].balance;
            }
            else if (count_balance < bet) {
                jsum[i] = count_balance / 100 * this.jpgs[i].percent + this.jpgs[i].balance;
            }
            else {
                jsum[i] = bet / 100 * this.jpgs[i].percent + this.jpgs[i].balance;
            }
            if (this.jpgs[i].get_pay_sum() < jsum[i] && this.jpgs[i].get_pay_sum() > 0) {
                if (this.jpgs[i].user_id && this.jpgs[i].user_id != this.user.id) {
                }
                else {
                    payJack = this.jpgs[i].get_pay_sum() / this.CurrentDenom;
                    jsum[i] = jsum[i] - this.jpgs[i].get_pay_sum();
                    this.SetBalance(this.jpgs[i].get_pay_sum() / this.CurrentDenom);
                    if (this.jpgs[i].get_pay_sum() > 0) {
                         StatGame.create({
                            'user_id': this.playerId,
                            'balance': this.Balance * this.CurrentDenom,
                            'bet': 0,
                            'win': this.jpgs[i].get_pay_sum(),
                            'game': this.game.name + ' JPG ' + this.jpgs[i].id,
                            'in_game': 0,
                            'in_jpg': 0,
                            'in_profit': 0,
                            'shop_id': this.shop_id,
                            'date_time': new Date().toISOString()
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
            payJack = parseFloat(payJack).toFixed(2);
            this.Jackpots['jackPay'] = payJack;
        }
    }

    public GetBank(slotState: string = '') {
        if (this.isBonusStart || slotState == 'bonus' || slotState == 'freespin' || slotState == 'respin') {
            slotState = 'bonus';
        }
        else {
            slotState = '';
        }
        const game = this.game;
        this.Bank = (game as any).get_gamebank(slotState);
        return this.Bank / this.CurrentDenom;
    }

    public GetPercent() {
        return this.Percent;
    }

    public GetCountBalanceUser() {
        return this.user.count_balance;
    }

    public InternalError(errcode: any) {
        console.error('Internal Error', errcode);
        // exit equivalent in TS?? Throw exception?
        // throw new Error(errcode);
        // Logic in PHP does exit. I will just log for now as server.ts handles it.
    }

    public InternalErrorSilent(errcode: any) {
        console.error('Internal Error Silent', errcode);
    }

    public SetBank(slotState: string = '', sum: number, slotEvent: string = '') {
        if (this.isBonusStart || slotState == 'bonus' || slotState == 'freespin' || slotState == 'respin') {
            slotState = 'bonus';
        }
        else {
            slotState = '';
        }
        if (this.GetBank(slotState) + sum < 0) {
            this.InternalError('Bank_   ' + sum + '  CurrentBank_ ' + this.GetBank(slotState) + ' CurrentState_ ' .concat(slotState) + ' Trigger_ ' + (this.GetBank(slotState) + sum));
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
            const count_balance = this.count_balance;
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
            }
            else if (count_balance > 0) {
                bankBonusSum = gameBet / 100 * prc_b;
            }
            for (let i = 0; i < this.jpgs.length; i++) {
                if (!this.jpgPercentZero) {
                    if (count_balance < gameBet && count_balance > 0) {
                        this.toSlotJackBanks += (count_balance / 100 * this.jpgs[i].percent);
                    }
                    else if (count_balance > 0) {
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
            (game as any).set_gamebank(bankBonusSum, 'inc', 'bonus');
        }
        if (sum == 0 && slotEvent == 'bet' && this.betRemains) {
            sum = this.betRemains;
        }
        (game as any).set_gamebank(sum, 'inc', slotState);
        game.save();
        return game;
    }

    public SetBalance(sum: number, slotEvent: string = '') {
        if (this.GetBalance() + sum < 0) {
            this.InternalError('Balance_   ' + sum);
        }
        sum = sum * this.CurrentDenom;
        if (sum < 0 && slotEvent == 'bet') {
            const user = this.user;
            if (user.count_balance == 0) {
                let remains = [];
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
                let remains0 = [];
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
                }
                else if (user.address > 0) {
                    user.address -= sm;
                }
            }
            else if (user.count_balance > 0 && user.count_balance < sum0) {
                const sm = sum0 - user.count_balance;
                if (user.address < sm && user.address > 0) {
                    user.address = 0;
                }
                else if (user.address > 0) {
                    user.address -= sm;
                }
            }
            this.user.count_balance = this.user.updateCountBalance(sum, this.count_balance);
            this.user.count_balance = this.FormatFloat(this.user.count_balance);
        }
        this.user.increment('balance', sum);
        this.user.balance = this.FormatFloat(this.user.balance);
        this.user.save();
        return this.user;
    }

    public GetBalance() {
        const user = this.user;
        this.Balance = user.balance / this.CurrentDenom;
        return this.Balance;
    }

    public SaveLogReport(spinSymbols: any, bet: any, lines: any, win: any, slotState: any) {
        if (this.isStateless) return;
        let reportName = this.slotId + ' ' + slotState;
        if (slotState == 'freespin') {
            reportName = this.slotId + ' FG';
        }
        else if (slotState == 'bet') {
            reportName = this.slotId + '';
        }
        else if (slotState == 'slotGamble') {
            reportName = this.slotId + ' DG';
        }
        const game = this.game;
        if (slotState == 'bet') {
            this.user.update_level('bet', bet * this.CurrentDenom);
        }
        if (slotState != 'freespin') {
            (game as any).increment('stat_in', bet * this.CurrentDenom);
        }
        (game as any).increment('stat_out', win * this.CurrentDenom);
        (game as any).tournament_stat(slotState, this.user.id, bet * this.CurrentDenom, win * this.CurrentDenom);
        this.user.update({ 'last_bid': new Date().toISOString() });
        if (!this.betProfit) {
            this.betProfit = 0;
            this.toGameBanks = 0;
            this.toSlotJackBanks = 0;
            this.toSysJackBanks = 0;
        }
        if (!this.toGameBanks) {
            this.toGameBanks = 0;
        }
        (this.game as any).increment('bids');
        (this.game as any).refresh();

        const slotsBank = 0;
        const bonusBank = 0;
        const fishBank = 0;
        const tableBank = 0;
        const littleBank = 0;
        const totalBank = slotsBank + bonusBank + fishBank + tableBank + littleBank;
        GameLog.create({
            'game_id': this.slotDBId,
            'user_id': this.playerId,
            'ip': '0.0.0.0', // $_SERVER['REMOTE_ADDR']
            'str': spinSymbols,
            'shop_id': this.shop_id
        });
        StatGame.create({
            'user_id': this.playerId,
            'balance': this.Balance * this.CurrentDenom,
            'bet': bet * this.CurrentDenom,
            'win': win * this.CurrentDenom,
            'game': reportName,
            'in_game': this.toGameBanks,
            'in_jpg': this.toSlotJackBanks,
            'in_profit': this.betProfit,
            'denomination': this.CurrentDenom,
            'shop_id': this.shop_id,
            'slots_bank': slotsBank,
            'bonus_bank': bonusBank,
            'fish_bank': fishBank,
            'table_bank': tableBank,
            'little_bank': littleBank,
            'total_bank': totalBank,
            'date_time': new Date().toISOString()
        });
    }

    public GetSpinSettings(garantType: string = 'bet', bet: any, lines: any) {
        let curField = 10;
        switch (lines) {
            case 10:
                curField = 10;
                break;
            case 9:
            case 8:
                curField = 9;
                break;
            case 7:
            case 6:
                curField = 7;
                break;
            case 5:
            case 4:
                curField = 5;
                break;
            case 3:
            case 2:
                curField = 3;
                break;
            case 1:
                curField = 1;
                break;
            default:
                curField = 10;
                break;
        }
        let pref = '';
        if (garantType != 'bet') {
            pref = '_bonus';
        }
        else {
            pref = '';
        }
        this.AllBet = bet * lines;
        const linesPercentConfigSpin = (this.game as any).get_lines_percent_config('spin');
        const linesPercentConfigBonus = (this.game as any).get_lines_percent_config('bonus');
        const currentPercent = this.shop.percent;
        let currentSpinWinChance = 0;
        let currentBonusWinChance = 0;
        let percentLevel = '';
        for (const k in linesPercentConfigSpin['line' + curField + pref]) {
            const v = linesPercentConfigSpin['line' + curField + pref][k];
            const l = k.split('_');
            const l0 = parseInt(l[0]);
            const l1 = parseInt(l[1]);
            if (l0 <= currentPercent && currentPercent <= l1) {
                percentLevel = k;
                break;
            }
        }
        currentSpinWinChance = linesPercentConfigSpin['line' + curField + pref][percentLevel];
        currentBonusWinChance = linesPercentConfigBonus['line' + curField + pref][percentLevel];
        const RtpControlCount = 200;
        if (!this.HasGameDataStatic('SpinWinLimit')) {
            this.SetGameDataStatic('SpinWinLimit', 0);
        }
        if (!this.HasGameDataStatic('RtpControlCount')) {
            this.SetGameDataStatic('RtpControlCount', RtpControlCount);
        }
        let rtpRange = 0;
        if ((this.game as any).stat_in > 0) {
            rtpRange = (this.game as any).stat_out / (this.game as any).stat_in * 100;
        }
        else {
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
        }
        else if (this.GetGameDataStatic('RtpControlCount') < 0) {
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
        }
        else {
            this.SetGameDataStatic('RtpControlCount', this.GetGameDataStatic('RtpControlCount') - 1);
        }
        const bonusWin = PhpHelpers.rand(1, currentBonusWinChance);
        const spinWin = PhpHelpers.rand(1, currentSpinWinChance);
        let return_val: [string, any] = [
            'none',
            0
        ];
        if (bonusWin == 1 && this.slotBonus) {
            this.isBonusStart = true;
            garantType = 'bonus';
            let winLimit = this.GetBank(garantType);
            return_val = [
                'bonus',
                winLimit
            ];
            if ((this.game as any).stat_in < (this.CheckBonusWin() * bet + (this.game as any).stat_out) || winLimit < (this.CheckBonusWin() * bet)) {
                return_val = [
                    'none',
                    0
                ];
            }
        }
        else if (spinWin == 1) {
            let winLimit = this.GetBank(garantType);
            return_val = [
                'win',
                winLimit
            ];
        }
        if (garantType == 'bet' && this.GetBalance() <= (2 / this.CurrentDenom)) {
            const randomPush = PhpHelpers.rand(1, 10);
            if (randomPush == 1) {
                let winLimit = this.GetBank('');
                return_val = [
                    'win',
                    winLimit
                ];
            }
        }
        return return_val;
    }

    public getNewSpin(game: any, spinWin: any = 0, bonusWin: any = 0, lines: any, garantType: string = 'bet') {
        let curField = 10;
        switch (lines) {
            case 10:
                curField = 10;
                break;
            case 9:
            case 8:
                curField = 9;
                break;
            case 7:
            case 6:
                curField = 7;
                break;
            case 5:
            case 4:
                curField = 5;
                break;
            case 3:
            case 2:
                curField = 3;
                break;
            case 1:
                curField = 1;
                break;
            default:
                curField = 10;
                break;
        }
        let pref = '';
        if (garantType != 'bet') {
            pref = '_bonus';
        }
        else {
            pref = '';
        }
        let win: any[] = [];
        if (spinWin) {
            win = game.game_win['winline' + pref + curField].split(',');
        }
        if (bonusWin) {
            win = game.game_win['winbonus' + pref + curField].split(',');
        }
        const number = PhpHelpers.rand(0, win.length - 1);
        return win[number];
    }

    public GetRandomScatterPos(rp: any) {
        let rpResult = [];
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
        // shuffle
        for (let i = rpResult.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [rpResult[i], rpResult[j]] = [rpResult[j], rpResult[i]];
        }
        if (rpResult[0] === undefined) {
            rpResult[0] = PhpHelpers.rand(2, rp.length - 3);
        }
        return rpResult[0];
    }

    public GetGambleSettings() {
        const spinWin = PhpHelpers.rand(1, this.WinGamble);
        return spinWin;
    }

    public GetReelStrips(winType: any, slotEvent: any) {
        const game = this.game;
        let prs: any = {};
        if (winType != 'bonus') {
            const strips = [
                'reelStrip1',
                'reelStrip2',
                'reelStrip3',
                'reelStrip4',
                'reelStrip5',
                'reelStrip6'
            ];
            strips.forEach((reelStrip, index) => {
                if (Array.isArray((this as any)[reelStrip]) && (this as any)[reelStrip].length > 0) {
                    prs[index + 1] = PhpHelpers.rand(0, (this as any)[reelStrip].length - 3);
                }
            });
        }
        else {
            let reelsId = [];
            const strips = [
                'reelStrip1',
                'reelStrip2',
                'reelStrip3',
                'reelStrip4',
                'reelStrip5',
                'reelStrip6'
            ];
            strips.forEach((reelStrip, index) => {
                 if (Array.isArray((this as any)[reelStrip]) && (this as any)[reelStrip].length > 0) {
                    prs[index + 1] = this.GetRandomScatterPos((this as any)[reelStrip]);
                    reelsId.push(index + 1);
                 }
            });
            const scattersCnt = PhpHelpers.rand(3, reelsId.length);
            // shuffle reelsId
            for (let i = reelsId.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [reelsId[i], reelsId[j]] = [reelsId[j], reelsId[i]];
            }
            for (let i = 0; i < reelsId.length; i++) {
                if (i < scattersCnt) {
                    prs[reelsId[i]] = this.GetRandomScatterPos((this as any)['reelStrip' + reelsId[i]]);
                }
                else {
                    prs[reelsId[i]] = PhpHelpers.rand(0, (this as any)['reelStrip' + reelsId[i]].length - 3);
                }
            }
        }
        let reel: any = {
            'rp': []
        };
        for (const index in prs) {
            const value = prs[index];
            const key = [...(this as any)['reelStrip' + index]]; // copy
            const cnt = key.length;

            let val0;
            if (value - 1 < 0) {
                val0 = key[cnt - 1]; // mimicking key[-1] = key[cnt-1]
            } else {
                val0 = key[value - 1];
            }

            let val1 = key[value];

            let val2;
            if (value + 1 >= cnt) {
                val2 = key[0]; // mimicking key[cnt] = key[0] (if value+1 == cnt)
            } else {
                val2 = key[value + 1];
            }

            reel['reel' + index] = [];
            reel['reel' + index][0] = val0;
            reel['reel' + index][1] = val1;
            reel['reel' + index][2] = val2;
            reel['reel' + index][3] = '';
            reel['rp'].push(value);
        }
        return reel;
    }
}
