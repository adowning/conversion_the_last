import { Game } from '../typescript_base/game';
import { User } from '../typescript_base/user';
import { IContext } from '../typescript_base/interfaces';
import { PhpHelpers } from '../typescript_base/php_helpers';

export class SlotSettings {
    public slotId: string = '';
    public playerId: string | null = null;
    public isStateless: boolean = false;
    public splitScreen: boolean | null = null;
    public reelStrip1: any[] = [];
    public reelStrip2: any[] = [];
    public reelStrip3: any[] = [];
    public reelStrip4: any[] = [];
    public reelStrip5: any[] = [];
    public reelStrip6: any[] = [];
    public reelStripBonus1: any[] = [];
    public reelStripBonus2: any[] = [];
    public reelStripBonus3: any[] = [];
    public reelStripBonus4: any[] = [];
    public reelStripBonus5: any[] = [];
    public reelStripBonus6: any[] = [];
    public Line: any[] = [];
    public scaleMode: any = null;
    public numFloat: any = null;
    public gameLine: any[] = [];
    public Bet: any[] = [];
    public isBonusStart: boolean = false;
    public Balance: number = 0;
    public SymbolGame: any[] = [];
    public GambleType: any = null;
    public lastEvent: any = null;
    public Jackpots: any = {};
    public keyController: any = null;
    public slotViewState: any = null;
    public hideButtons: any[] = [];
    public slotReelsConfig: any[] = [];
    public slotFreeCount: number = 0;
    public slotFreeMpl: number = 0;
    public slotWildMpl: number = 0;
    public slotExitUrl: any = null;
    public slotBonus: boolean = true;
    public slotBonusType: any = null;
    public slotScatterType: any = null;
    public slotGamble: boolean = true;
    public Paytable: any = {};
    public slotSounds: any[] = [];
    public jpgs: any = null;
    private Bank: any = null;
    private Percent: number = 0;
    private WinGamble: any = null;
    public shop_id: any = null;
    public currency: any = null;
    public user: User | null = null;
    public game: Game | null = null;
    public shop: any = null;
    public jpgPercentZero: boolean = false;
    public count_balance: any = null;
    public MaxWin: number = 0;
    public increaseRTP: number = 1;
    public CurrentDenom: number = 1;
    public gameData: any = {};
    public gameDataStatic: any = {};
    public AllBet: number = 0;
    public betRemains: number = 0;
    public betRemains0: number = 0;
    public betProfit: number = 0;
    public toGameBanks: number = 0;
    public toSlotJackBanks: number = 0;
    public toSysJackBanks: number = 0;
    public slotFastStop: number = 1;

    constructor(sid: string, playerId: string | null, context: IContext) {
        this.slotId = sid;
        this.isStateless = true; // Assuming context is always present in TS
        this.playerId = playerId;
        this.user = new User(context.user);
        this.shop_id = this.user.shop_id;
        this.game = new Game(context.game);
        this.shop = context.shop; // Using raw shop object as base
        // this.game.gamebank_instance = new GameBank(context.bank); // Not strictly needed if we use helper methods

        this.MaxWin = this.shop.max_win;
        this.increaseRTP = 1;
        this.CurrentDenom = this.game.denomination;
        this.scaleMode = 0;
        this.numFloat = 0;

        this.Paytable['SYM_0'] = [0, 0, 15, 100, 1000, 3000];
        this.Paytable['SYM_1'] = [0, 0, 0, 0, 0, 0];
        this.Paytable['SYM_2'] = [0, 0, 5, 50, 100, 1000];
        this.Paytable['SYM_3'] = [0, 0, 0, 20, 50, 500];
        this.Paytable['SYM_4'] = [0, 0, 0, 10, 30, 400];
        this.Paytable['SYM_5'] = [0, 0, 0, 10, 30, 400];
        this.Paytable['SYM_6'] = [0, 0, 0, 5, 25, 200];
        this.Paytable['SYM_7'] = [0, 0, 0, 5, 20, 100];
        this.Paytable['SYM_8'] = [0, 0, 0, 5, 20, 100];
        this.Paytable['SYM_9'] = [0, 0, 40, 100, 400, 2500];

        // Reel Strips (from reels.txt)
        this.reelStrip1 = [3,8,6,7,4,3,5,7,8,6,2,3,4,0,3,2,5,7,9,3,8,2,3,0,4,3,6,8,7,5,3,4,7,2,3,8,9,2,4,7,6,3,5,2,8,7,4,8,7,6,5,4,3,5,7,4,2,5,6,3,4,5,8,0,4,7,6,8];
        this.reelStrip2 = [3,8,6,7,4,3,5,7,8,6,2,3,4,0,3,2,5,7,9,3,8,2,3,0,4,3,6,8,7,5,3,4,7,2,3,8,9,2,4,7,6,3,5,2,8,7,4,8,7,6,5,4,3,5,7,4,2,5,6,3,4,5,8,0,4,7,6,8];
        this.reelStrip3 = [3,8,6,7,4,3,5,7,8,6,2,3,4,0,3,2,5,7,9,3,8,2,3,0,4,3,6,8,7,5,3,4,7,2,3,8,9,2,4,7,6,3,5,2,8,7,4,8,7,6,5,4,3,5,7,4,2,5,6,3,4,5,8,0,4,7,6,8];
        this.reelStrip4 = [3,8,6,7,4,3,5,7,8,6,2,3,4,0,3,2,5,7,9,3,8,2,3,0,4,3,6,8,7,5,3,4,7,2,3,8,9,2,4,7,6,3,5,2,8,7,4,8,7,6,5,4,3,5,7,4,2,5,6,3,4,5,8,0,4,7,6,8];
        this.reelStrip5 = [3,8,6,7,4,3,5,7,8,6,2,3,4,0,3,2,5,7,9,3,8,2,3,0,4,3,6,8,7,5,3,4,7,2,3,8,9,2,4,7,6,3,5,2,8,7,4,8,7,6,5,4,3,5,7,4,2,5,6,3,4,5,8,0,4,7,6,8];
        this.reelStrip6 = [];

        this.reelStripBonus1 = [3,8,6,7,4,3,5,7,8,6,2,3,4,0,3,2,5,7,9,3,8,2,3,0,4,3,6,8,7,5,3,4,7,2,3,8,9,2,4,7,6,3,5,2,8,7,4,8,7,6,5,4,3,5,7,4,2,5,6,3,4,5,8,0,4,7,6,8];
        this.reelStripBonus2 = [3,8,6,7,4,3,5,7,8,6,2,3,4,0,3,2,5,7,9,3,8,2,3,0,4,3,6,8,7,5,3,4,7,2,3,8,9,2,4,7,6,3,5,2,8,7,4,8,7,6,5,4,3,5,7,4,2,5,6,3,4,5,8,0,4,7,6,8];
        this.reelStripBonus3 = [3,8,6,7,4,3,5,7,8,6,2,3,4,0,3,2,5,7,9,3,8,2,3,0,4,3,6,8,7,5,3,4,7,2,3,8,9,2,4,7,6,3,5,2,8,7,4,8,7,6,5,4,3,5,7,4,2,5,6,3,4,5,8,0,4,7,6,8];
        this.reelStripBonus4 = [3,8,6,7,4,3,5,7,8,6,2,3,4,0,3,2,5,7,9,3,8,2,3,0,4,3,6,8,7,5,3,4,7,2,3,8,9,2,4,7,6,3,5,2,8,7,4,8,7,6,5,4,3,5,7,4,2,5,6,3,4,5,8,0,4,7,6,8];
        this.reelStripBonus5 = [3,8,6,7,4,3,5,7,8,6,2,3,4,0,3,2,5,7,9,3,8,2,3,0,4,3,6,8,7,5,3,4,7,2,3,8,9,2,4,7,6,3,5,2,8,7,4,8,7,6,5,4,3,5,7,4,2,5,6,3,4,5,8,0,4,7,6,8];
        this.reelStripBonus6 = [];

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
        this.slotFreeCount = 8;
        this.slotFreeMpl = 1;
        this.slotViewState = (this.game.slotViewState == '' ? 'Normal' : this.game.slotViewState);
        this.hideButtons = [];
        this.jpgs = null; // JPGs not fully implemented in this port yet, or passed from context

        this.Line = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        this.gameLine = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        this.Bet = this.game.bet.split(',');
        this.Balance = this.user.balance;
        this.SymbolGame = ['0', '1', 2, 3, 4, 5, 6, 7, 8, 9];
        this.Bank = this.game.get_gamebank();
        this.Percent = this.shop.percent;
        this.WinGamble = this.game.rezerv;
        this.slotId = this.game.id.toString(); // Using game ID as slot DB ID
        this.currency = this.shop.currency;
        this.count_balance = this.user.count_balance;

        if (this.user.address > 0 && this.user.count_balance == 0) {
            this.Percent = 0;
            this.jpgPercentZero = true;
        } else if (this.user.count_balance == 0) {
            this.Percent = 100;
        }

        // Initialize gameData and gameDataStatic from session/advanced
        // In TS port, we assume these are passed or managed via StatelessModel logic
        // For now, we initialize them as empty or parse if they exist in user/game
        // Note: The PHP version unserializes. Here we might get JSON.
    }

    public is_active(): boolean {
        return this.isStateless || (this.game && this.shop && this.user &&
               (!!this.game.view && !this.shop.is_blocked && !this.user.is_blocked && this.user.status !== 'BANNED'));
    }

    public SetGameData(key: string, value: any) {
        const timeLife = 86400;
        this.gameData[key] = {
            'timelife': Math.floor(Date.now() / 1000) + timeLife,
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

    public FormatFloat(num: number): any {
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

    public SaveGameData() {
        // In stateless, we might need to update the user object if we want to persist,
        // but typically this is done by returning data.
        // For compatibility with Server.ts logic, we keep this method but it might be no-op or specific to context.
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
        PhpHelpers.shuffle(allRate);
        if (this.game!.stat_in < (this.game!.stat_out + (allRate[0] * this.AllBet))) {
            allRate[0] = 0;
        }
        return allRate[0];
    }

    public HasGameDataStatic(key: string): boolean {
        return !!this.gameDataStatic[key];
    }

    public SaveGameDataStatic() {
        // No-op in stateless for now
    }

    public SetGameDataStatic(key: string, value: any) {
        const timeLife = 86400;
        this.gameDataStatic[key] = {
            'timelife': Math.floor(Date.now() / 1000) + timeLife,
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

    public UpdateJackpots(bet: number) {
        // Placeholder for jackpot logic
    }

    public GetBank(slotState: string = ''): number {
        if (this.isBonusStart || slotState == 'bonus' || slotState == 'freespin' || slotState == 'respin') {
            slotState = 'bonus';
        } else {
            slotState = '';
        }
        const game = this.game!;
        this.Bank = game.get_gamebank(slotState);
        return this.Bank / this.CurrentDenom;
    }

    public GetPercent(): number {
        return this.Percent;
    }

    public GetCountBalanceUser(): number {
        return this.user!.count_balance;
    }

    public InternalErrorSilent(errcode: any) {
        console.error("Internal Error Silent: " + errcode);
    }

    public InternalError(errcode: any) {
        console.error("Internal Error: " + errcode);
        throw new Error(errcode);
    }

    public SetBank(slotState: string = '', sum: number, slotEvent: string = ''): any {
        // Logic to update bank in Game object
        if (this.isBonusStart || slotState == 'bonus' || slotState == 'freespin' || slotState == 'respin') {
            slotState = 'bonus';
        } else {
            slotState = '';
        }
        if (this.GetBank(slotState) + sum < 0) {
            this.InternalError('Bank_   ' + sum + '  CurrentBank_ ' + this.GetBank(slotState) + ' CurrentState_ ' + slotState + ' Trigger_ ' + (this.GetBank(slotState) + sum));
        }
        sum = sum * this.CurrentDenom;
        const game = this.game!;
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
            } else if (count_balance > 0) {
                bankBonusSum = gameBet / 100 * prc_b;
            }

            // Jackpot bank update skipped for now
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
        // game.save(); // In stateless, we assume changes to game object are persisted by caller or context
        return game;
    }

    public SetBalance(sum: number, slotEvent: string = ''): User {
        if (this.GetBalance() + sum < 0) {
            this.InternalError('Balance_   ' + sum);
        }
        sum = sum * this.CurrentDenom;
        // Balance update logic... simplified for stateless
        this.user!.balance += sum;
        return this.user!;
    }

    public GetBalance(): number {
        const user = this.user!;
        this.Balance = user.balance / this.CurrentDenom;
        return this.Balance;
    }

    public SaveLogReport(spinSymbols: any, bet: any, lines: any, win: any, slotState: any) {
        // Reporting logic...
    }

    public GetSpinSettings(garantType: string = 'bet', bet: number, lines: number): any[] {
        let curField = 10;
        switch (lines) {
            case 10: curField = 10; break;
            case 9:
            case 8: curField = 9; break;
            case 7:
            case 6: curField = 7; break;
            case 5:
            case 4: curField = 5; break;
            case 3:
            case 2: curField = 3; break;
            case 1: curField = 1; break;
            default: curField = 10; break;
        }
        let pref = '';
        if (garantType != 'bet') {
            pref = '_bonus';
        }

        this.AllBet = bet * lines;
        // parsing lines_percent_config_spin which is a JSON string in the game object
        let linesPercentConfigSpin = JSON.parse(this.game!.lines_percent_config_spin);
        let linesPercentConfigBonus = JSON.parse(this.game!.lines_percent_config_bonus);

        // In PHP this was logic to pick percentage level.
        // We will assume simpler logic or port it if strictly necessary.
        // Porting simpler logic based on available data.

        let currentPercent = this.shop.percent;
        let currentSpinWinChance = 0;
        let currentBonusWinChance = 0;
        let percentLevel = '';

        const configMap = linesPercentConfigSpin['line' + curField + pref];
        if (configMap) {
            for (let k in configMap) {
                let l = k.split('_');
                let l0 = parseInt(l[0]);
                let l1 = parseInt(l[1]);
                if (l0 <= currentPercent && currentPercent <= l1) {
                    percentLevel = k;
                    break;
                }
            }
            if (percentLevel != '') {
                currentSpinWinChance = configMap[percentLevel];
                currentBonusWinChance = linesPercentConfigBonus['line' + curField + pref][percentLevel];
            }
        }

        // RTP Control Logic
        const RtpControlCount = 200;
        if (!this.HasGameDataStatic('SpinWinLimit')) {
            this.SetGameDataStatic('SpinWinLimit', 0);
        }
        if (!this.HasGameDataStatic('RtpControlCount')) {
            this.SetGameDataStatic('RtpControlCount', RtpControlCount);
        }

        // Skip some complex RTP logic for now or port it if needed.
        // Basic chance logic:
        let bonusWin = PhpHelpers.rand(1, currentBonusWinChance);
        let spinWin = PhpHelpers.rand(1, currentSpinWinChance);

        let ret: any[] = ['none', 0];

        if (bonusWin == 1 && this.slotBonus) {
            this.isBonusStart = true;
            garantType = 'bonus';
            let winLimit = this.GetBank(garantType);
            ret = ['bonus', winLimit];
            if (this.game!.stat_in < (this.CheckBonusWin() * bet + this.game!.stat_out) || winLimit < (this.CheckBonusWin() * bet)) {
                ret = ['none', 0];
            }
        } else if (spinWin == 1) {
            let winLimit = this.GetBank(garantType);
            ret = ['win', winLimit];
        }

        if (garantType == 'bet' && this.GetBalance() <= (2 / this.CurrentDenom)) {
            let randomPush = PhpHelpers.rand(1, 10);
            if (randomPush == 1) {
                let winLimit = this.GetBank('');
                ret = ['win', winLimit];
            }
        }

        return ret;
    }

    public GetRandomScatterPos(rp: any[]): number {
        let rpResult: number[] = [];
        for (let i = 0; i < rp.length; i++) {
            if (rp[i] == '9') {
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
        PhpHelpers.shuffle(rpResult);
        if (rpResult.length === 0) {
            rpResult[0] = PhpHelpers.rand(2, rp.length - 3);
        }
        return rpResult[0];
    }

    public GetGambleSettings(): number {
        let spinWin = PhpHelpers.rand(1, this.WinGamble);
        return spinWin;
    }

    public GetReelStrips(winType: string, slotEvent: string): any {
        if (slotEvent == 'freespin') {
             // In PHP it pops from reelStripBonus array. Here we can just assign directly since they are static.
             this.reelStrip1 = [...this.reelStripBonus1];
             this.reelStrip2 = [...this.reelStripBonus2];
             this.reelStrip3 = [...this.reelStripBonus3];
             this.reelStrip4 = [...this.reelStripBonus4];
             this.reelStrip5 = [...this.reelStripBonus5];
             this.reelStrip6 = [...this.reelStripBonus6];
        }

        let prs: {[key: string]: number} = {};
        let reelStrips = [this.reelStrip1, this.reelStrip2, this.reelStrip3, this.reelStrip4, this.reelStrip5, this.reelStrip6];

        if (winType != 'bonus') {
            reelStrips.forEach((strip, index) => {
                if (Array.isArray(strip) && strip.length > 0) {
                    prs[(index + 1).toString()] = PhpHelpers.rand(0, strip.length - 3);
                }
            });
        } else {
            let reelsId: number[] = [];
             reelStrips.forEach((strip, index) => {
                if (Array.isArray(strip) && strip.length > 0) {
                     prs[(index + 1).toString()] = this.GetRandomScatterPos(strip);
                     reelsId.push(index + 1);
                }
            });

            let scattersCnt = PhpHelpers.rand(3, reelsId.length);
            PhpHelpers.shuffle(reelsId);

            for (let i = 0; i < reelsId.length; i++) {
                let reelIdx = reelsId[i];
                let strip = (this as any)['reelStrip' + reelIdx];
                if (i < scattersCnt) {
                     prs[reelIdx.toString()] = this.GetRandomScatterPos(strip);
                } else {
                     prs[reelIdx.toString()] = PhpHelpers.rand(0, strip.length - 3);
                }
            }
        }

        let reel: any = { 'rp': [] };
        for (let index = 1; index <= 6; index++) {
            if (prs[index.toString()] !== undefined) {
                let value = prs[index.toString()];
                let key = (this as any)['reelStrip' + index];
                // In PHP key[-1] access is emulated by taking last element
                // But here we just need safe access.
                // The PHP code: $key[-1] = $key[count($key) - 1];
                // This seems to be for wrapping, but the code does $key[$value - 1].
                // If value is 0, value-1 is -1.

                let val0 = key[value - 1];
                if (value === 0) val0 = key[key.length - 1];

                reel['reel' + index] = [];
                reel['reel' + index][0] = val0;
                reel['reel' + index][1] = key[value];
                reel['reel' + index][2] = key[value + 1];
                reel['reel' + index][3] = '';
                reel['rp'].push(value);
            }
        }

        return reel;
    }
}
