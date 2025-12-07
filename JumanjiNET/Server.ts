import { SlotSettings } from './SlotSettings';
import { IContext } from '../typescript_base/interfaces';
import { PhpHelpers } from '../typescript_base/php_helpers';

export class Server {
    public get(request: any, game: any, userId: any, context: IContext) {
        try {
            const slotSettings = new SlotSettings(game, userId, context);
            if (!slotSettings.is_active()) {
                const response = '{"responseEvent":"error","responseType":"","serverResponse":"Game is disabled"}';
                return response;
            }
            let postData = context.postData;
            let balanceInCents = Math.round(slotSettings.GetBalance() * slotSettings.CurrentDenom * 100);
            let result_tmp: any[] = [];
            let aid = '';
            postData['slotEvent'] = 'bet';
            if (postData['action'] == 'freespin') {
                postData['slotEvent'] = 'freespin';
                postData['action'] = 'freespin';
            }
            if (postData['action'] == 'respin') {
                postData['slotEvent'] = 'respin';
                postData['action'] = 'spin';
            }
            if (postData['action'] == 'shuffle') {
                postData['slotEvent'] = 'shuffle';
                postData['action'] = 'spin';
                if (slotSettings.GetGameData(slotSettings.slotId + 'ShuffleActive') != 1) {
                    const response = '{"responseEvent":"error","responseType":"' + postData['slotEvent'] + '","serverResponse":"invalid bonus state"}';
                    return response;
                }
            }
            if (postData['action'] == 'init' || postData['action'] == 'reloadbalance') {
                postData['action'] = 'init';
                postData['slotEvent'] = 'init';
            }
            if (postData['action'] == 'paytable') {
                postData['slotEvent'] = 'paytable';
            }
            if (postData['action'] == 'initfreespin') {
                postData['slotEvent'] = 'initfreespin';
            }
            if (postData['action'] == 'initbonus') {
                postData['slotEvent'] = 'initbonus';
            }
            if (postData['action'] == 'bonusaction') {
                postData['slotEvent'] = 'bonusaction';
            }
            if (postData['action'] == 'endbonus') {
                postData['slotEvent'] = 'endbonus';
            }
            if (postData['bet_denomination'] !== undefined && parseFloat(postData['bet_denomination']) >= 1) {
                postData['bet_denomination'] = parseFloat(postData['bet_denomination']) / 100;
                slotSettings.CurrentDenom = postData['bet_denomination'];
                slotSettings.CurrentDenomination = postData['bet_denomination'];
                slotSettings.SetGameData(slotSettings.slotId + 'GameDenom', postData['bet_denomination']);
            }
            else if (slotSettings.HasGameData(slotSettings.slotId + 'GameDenom')) {
                postData['bet_denomination'] = slotSettings.GetGameData(slotSettings.slotId + 'GameDenom');
                slotSettings.CurrentDenom = postData['bet_denomination'];
                slotSettings.CurrentDenomination = postData['bet_denomination'];
            }
            balanceInCents = Math.round(slotSettings.GetBalance() * slotSettings.CurrentDenom * 100);
            if (postData['slotEvent'] == 'bet') {
                const lines = 20;
                const betline = parseFloat(postData['bet_betlevel']);
                if (lines <= 0 || betline <= 0.0001) {
                    const response = '{"responseEvent":"error","responseType":"' + postData['slotEvent'] + '","serverResponse":"invalid bet state"}';
                    return response;
                }
                if (slotSettings.GetBalance() < (lines * betline)) {
                    const response = '{"responseEvent":"error","responseType":"' + postData['slotEvent'] + '","serverResponse":"invalid balance"}';
                    return response;
                }
            }
            if (slotSettings.GetGameData(slotSettings.slotId + 'FreeGames') < slotSettings.GetGameData(slotSettings.slotId + 'CurrentFreeGame') && postData['slotEvent'] == 'freespin') {
                const response = '{"responseEvent":"error","responseType":"' + postData['slotEvent'] + '","serverResponse":"invalid bonus state"}';
                return response;
            }
            aid = postData['action'].toString();
            switch (aid) {
                case 'init':
                    const gameBets = slotSettings.Bet;
                    const lastEvent = slotSettings.GetHistory();
                    slotSettings.SetGameData(slotSettings.slotId + 'BonusWin', 0);
                    slotSettings.SetGameData(slotSettings.slotId + 'FreeGames', 0);
                    slotSettings.SetGameData(slotSettings.slotId + 'CurrentFreeGame', 0);
                    slotSettings.SetGameData(slotSettings.slotId + 'TotalWin', 0);
                    slotSettings.SetGameData(slotSettings.slotId + 'FreeBalance', 0);
                    let freeState = '';
                    let curReels = '';
                    if (lastEvent != 'NULL') {
                        slotSettings.SetGameData(slotSettings.slotId + 'BonusWin', lastEvent.serverResponse.bonusWin);
                        slotSettings.SetGameData(slotSettings.slotId + 'FreeGames', lastEvent.serverResponse.totalFreeGames);
                        slotSettings.SetGameData(slotSettings.slotId + 'CurrentFreeGame', lastEvent.serverResponse.currentFreeGames);
                        slotSettings.SetGameData(slotSettings.slotId + 'TotalWin', lastEvent.serverResponse.bonusWin);
                        slotSettings.SetGameData(slotSettings.slotId + 'FreeBalance', lastEvent.serverResponse.Balance);
                        freeState = lastEvent.serverResponse.freeState;
                        const reels = lastEvent.serverResponse.reelsSymbols;
                        curReels = '&rs.i0.r.i0.syms=SYM' + reels.reel1[0] + '%2CSYM' + reels.reel1[1] + '%2CSYM' + reels.reel1[2] + '';
                        curReels += ('&rs.i0.r.i1.syms=SYM' + reels.reel2[0] + '%2CSYM' + reels.reel2[1] + '%2CSYM' + reels.reel2[2] + '%2CSYM' + reels.reel2[3] + '');
                        curReels += ('&rs.i0.r.i2.syms=SYM' + reels.reel3[0] + '%2CSYM' + reels.reel3[1] + '%2CSYM' + reels.reel3[2] + '%2CSYM' + reels.reel3[3] + '%2CSYM' + reels.reel3[4] + '');
                        curReels += ('&rs.i0.r.i3.syms=SYM' + reels.reel4[0] + '%2CSYM' + reels.reel4[1] + '%2CSYM' + reels.reel4[2] + '%2CSYM' + reels.reel4[3] + '');
                        curReels += ('&rs.i0.r.i4.syms=SYM' + reels.reel5[0] + '%2CSYM' + reels.reel5[1] + '%2CSYM' + reels.reel5[2] + '');
                        curReels += ('&rs.i1.r.i0.syms=SYM' + reels.reel1[0] + '%2CSYM' + reels.reel1[1] + '%2CSYM' + reels.reel1[2] + '');
                        curReels += ('&rs.i1.r.i1.syms=SYM' + reels.reel2[0] + '%2CSYM' + reels.reel2[1] + '%2CSYM' + reels.reel2[2] + '%2CSYM' + reels.reel2[3] + '');
                        curReels += ('&rs.i1.r.i2.syms=SYM' + reels.reel3[0] + '%2CSYM' + reels.reel3[1] + '%2CSYM' + reels.reel3[2] + '%2CSYM' + reels.reel3[3] + '%2CSYM' + reels.reel3[4] + '');
                        curReels += ('&rs.i1.r.i3.syms=SYM' + reels.reel4[0] + '%2CSYM' + reels.reel4[1] + '%2CSYM' + reels.reel4[2] + '%2CSYM' + reels.reel4[3] + '');
                        curReels += ('&rs.i1.r.i4.syms=SYM' + reels.reel5[0] + '%2CSYM' + reels.reel5[1] + '%2CSYM' + reels.reel5[2] + '');
                        curReels += ('&rs.i0.r.i0.pos=' + reels.rp[0]);
                        curReels += ('&rs.i0.r.i1.pos=' + reels.rp[0]);
                        curReels += ('&rs.i0.r.i2.pos=' + reels.rp[0]);
                        curReels += ('&rs.i0.r.i3.pos=' + reels.rp[0]);
                        curReels += ('&rs.i0.r.i4.pos=' + reels.rp[0]);
                        curReels += ('&rs.i1.r.i0.pos=' + reels.rp[0]);
                        curReels += ('&rs.i1.r.i1.pos=' + reels.rp[0]);
                        curReels += ('&rs.i1.r.i2.pos=' + reels.rp[0]);
                        curReels += ('&rs.i1.r.i3.pos=' + reels.rp[0]);
                        curReels += ('&rs.i1.r.i4.pos=' + reels.rp[0]);
                    }
                    else {
                        curReels = '&rs.i0.r.i0.syms=SYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '';
                        curReels += ('&rs.i0.r.i1.syms=SYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '');
                        curReels += ('&rs.i0.r.i2.syms=SYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '');
                        curReels += ('&rs.i0.r.i3.syms=SYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '');
                        curReels += ('&rs.i0.r.i4.syms=SYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '');
                        curReels += ('&rs.i0.r.i0.pos=' + PhpHelpers.rand(1, 10));
                        curReels += ('&rs.i0.r.i1.pos=' + PhpHelpers.rand(1, 10));
                        curReels += ('&rs.i0.r.i2.pos=' + PhpHelpers.rand(1, 10));
                        curReels += ('&rs.i0.r.i3.pos=' + PhpHelpers.rand(1, 10));
                        curReels += ('&rs.i0.r.i4.pos=' + PhpHelpers.rand(1, 10));
                        curReels += ('&rs.i1.r.i0.pos=' + PhpHelpers.rand(1, 10));
                        curReels += ('&rs.i1.r.i1.pos=' + PhpHelpers.rand(1, 10));
                        curReels += ('&rs.i1.r.i2.pos=' + PhpHelpers.rand(1, 10));
                        curReels += ('&rs.i1.r.i3.pos=' + PhpHelpers.rand(1, 10));
                        curReels += ('&rs.i1.r.i4.pos=' + PhpHelpers.rand(1, 10));
                    }
                    for (let d = 0; d < slotSettings.Denominations.length; d++) {
                        slotSettings.Denominations[d] = slotSettings.Denominations[d] * 100;
                    }
                    if (slotSettings.GetGameData(slotSettings.slotId + 'CurrentFreeGame') < slotSettings.GetGameData(slotSettings.slotId + 'FreeGames') && slotSettings.GetGameData(slotSettings.slotId + 'FreeGames') > 0) {
                        freeState = 'previous.rs.i0=freespinlevel0&rs.i1.r.i0.syms=SYM6%2CSYM3%2CSYM5&bl.i6.coins=1&rs.i8.r.i3.hold=false&bl.i17.reelset=ALL&bl.i15.id=15&rs.i0.r.i4.hold=false&rs.i9.r.i1.hold=false&gamestate.history=basic%2Cfreespin&rs.i1.r.i2.hold=false&rs.i8.r.i1.syms=SYM3%2CSYM9%2CSYM9&game.win.cents=685&rs.i7.r.i3.syms=SYM4%2CSYM8%2CSYM10&staticsharedurl=&bl.i10.line=1%2C2%2C1%2C2%2C1&bl.i0.reelset=ALL&bl.i18.coins=1&bl.i10.id=10&freespins.initial=10&bl.i3.reelset=ALL&bl.i4.line=2%2C1%2C0%2C1%2C2&bl.i13.coins=1&rs.i2.r.i0.hold=false&rs.i0.r.i0.syms=SYM7%2CSYM4%2CSYM7&rs.i9.r.i3.hold=false&bl.i2.id=2&rs.i1.r.i1.pos=1&rs.i7.r.i1.syms=SYM0%2CSYM5%2CSYM10&rs.i3.r.i4.pos=0&rs.i6.r.i3.syms=SYM5%2CSYM4%2CSYM8&rs.i0.r.i0.pos=0&bl.i14.reelset=ALL&rs.i2.r.i3.pos=62&rs.i5.r.i1.overlay.i0.with=SYM1&rs.i5.r.i0.pos=5&rs.i7.id=basic&rs.i7.r.i3.pos=99&rs.i2.r.i4.hold=false&rs.i3.r.i1.pos=0&rs.i2.id=freespinlevel0respin&rs.i6.r.i1.pos=0&game.win.coins=137&rs.i1.r.i0.hold=false&bl.i3.id=3&ws.i1.reelset=freespinlevel0&bl.i12.coins=1&bl.i8.reelset=ALL&clientaction=init&rs.i4.r.i0.hold=false&rs.i0.r.i2.hold=false&rs.i4.r.i3.syms=SYM5%2CSYM4%2CSYM8&bl.i16.id=16&casinoID=netent&rs.i2.r.i3.overlay.i0.with=SYM1&bl.i5.coins=1&rs.i3.r.i2.hold=false&bl.i8.id=8&rs.i5.r.i1.syms=SYM6%2CSYM10%2CSYM1&rs.i7.r.i0.pos=42&rs.i7.r.i3.hold=false&rs.i0.r.i3.pos=0&rs.i4.r.i0.syms=SYM7%2CSYM4%2CSYM7&rs.i8.r.i1.pos=0&rs.i5.r.i3.pos=87&bl.i6.line=2%2C2%2C1%2C2%2C2&bl.i12.line=2%2C1%2C2%2C1%2C2&bl.i0.line=1%2C1%2C1%2C1%2C1&wild.w0.expand.position.row=2&rs.i4.r.i2.pos=0&rs.i0.r.i2.syms=SYM8%2CSYM8%2CSYM4&rs.i8.r.i1.hold=false&rs.i9.r.i2.pos=0&game.win.amount=6.85&betlevel.all=1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10&rs.i5.r.i2.hold=false&denomination.all=' + slotSettings.Denominations.join('%2C') + '&rs.i2.r.i0.pos=20&current.rs.i0=freespinlevel0respin&ws.i0.reelset=freespinlevel0&rs.i7.r.i2.pos=91&bl.i1.id=1&rs.i3.r.i2.syms=SYM10%2CSYM10%2CSYM5&rs.i1.r.i4.pos=10&rs.i8.id=freespinlevel3&denomination.standard=' + (slotSettings.CurrentDenomination * 100) + '&rs.i3.id=freespinlevel1&multiplier=1&bl.i14.id=14&wild.w0.expand.position.reel=1&bl.i19.line=0%2C2%2C2%2C2%2C0&freespins.denomination=5.000&bl.i12.reelset=ALL&bl.i2.coins=1&bl.i6.id=6&autoplay=10%2C25%2C50%2C75%2C100%2C250%2C500%2C750%2C1000&freespins.totalwin.coins=137&ws.i0.direction=left_to_right&freespins.total=10&gamestate.stack=basic%2Cfreespin&rs.i6.r.i2.pos=0&rs.i1.r.i4.syms=SYM9%2CSYM9%2CSYM5&gamesoundurl=&rs.i5.r.i2.syms=SYM10%2CSYM7%2CSYM4&rs.i5.r.i3.hold=false&bet.betlevel=1&rs.i2.r.i3.overlay.i0.pos=63&rs.i4.r.i2.hold=false&bl.i5.reelset=ALL&rs.i4.r.i1.syms=SYM7%2CSYM7%2CSYM3&bl.i19.coins=1&bl.i7.id=7&bl.i18.reelset=ALL&rs.i2.r.i4.pos=2&rs.i3.r.i0.syms=SYM7%2CSYM4%2CSYM7&rs.i8.r.i4.pos=0&playercurrencyiso=' + slotSettings.slotCurrency + '&bl.i1.coins=1&rs.i2.r.i3.overlay.i0.row=1&rs.i4.r.i1.hold=false&rs.i3.r.i2.pos=0&bl.i14.line=1%2C1%2C2%2C1%2C1&freespins.multiplier=1&playforfun=false&rs.i8.r.i0.hold=false&jackpotcurrencyiso=' + slotSettings.slotCurrency + '&rs.i0.r.i4.syms=SYM6%2CSYM10%2CSYM9&rs.i0.r.i2.pos=0&bl.i13.line=1%2C1%2C0%2C1%2C1&rs.i6.r.i3.pos=0&ws.i1.betline=13&rs.i1.r.i0.pos=10&rs.i6.r.i3.hold=false&bl.i0.coins=1&rs.i2.r.i0.syms=SYM7%2CSYM7%2CSYM8&bl.i2.reelset=ALL&rs.i3.r.i1.syms=SYM3%2CSYM9%2CSYM9&rs.i1.r.i4.hold=false&freespins.left=6&rs.i9.r.i3.pos=0&rs.i4.r.i1.pos=0&rs.i4.r.i2.syms=SYM8%2CSYM8%2CSYM4&bl.standard=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19&rs.i5.r.i3.syms=SYM3%2CSYM9%2CSYM9&rs.i3.r.i0.hold=false&rs.i9.r.i1.syms=SYM3%2CSYM9%2CSYM9&rs.i6.r.i4.syms=SYM6%2CSYM10%2CSYM4&rs.i8.r.i0.syms=SYM7%2CSYM4%2CSYM7&rs.i8.r.i0.pos=0&bl.i15.reelset=ALL&rs.i0.r.i3.hold=false&bet.denomination=5&rs.i5.r.i4.pos=4&rs.i9.id=freespinlevel2&rs.i4.id=freespinlevel3respin&rs.i7.r.i2.syms=SYM9%2CSYM4%2CSYM10&rs.i2.r.i1.hold=false&gameServerVersion=1.5.0&g4mode=false&bl.i11.line=0%2C1%2C0%2C1%2C0&freespins.win.coins=8&historybutton=false&bl.i5.id=5&gameEventSetters.enabled=false&next.rs=freespinlevel0respin&rs.i1.r.i3.pos=2&rs.i0.r.i1.syms=SYM7%2CSYM7%2CSYM3&bl.i3.coins=1&ws.i1.types.i0.coins=4&bl.i10.coins=1&bl.i18.id=18&rs.i2.r.i1.pos=12&rs.i7.r.i4.hold=false&rs.i4.r.i4.pos=0&rs.i8.r.i2.hold=false&ws.i0.betline=4&rs.i1.r.i3.hold=false&rs.i7.r.i1.pos=123&totalwin.coins=137&rs.i5.r.i4.syms=SYM6%2CSYM6%2CSYM9&rs.i9.r.i4.pos=0&bl.i5.line=0%2C0%2C1%2C0%2C0&gamestate.current=freespin&rs.i4.r.i0.pos=0&jackpotcurrency=%26%23x20AC%3B&bl.i7.line=1%2C2%2C2%2C2%2C1&rs.i8.r.i2.syms=SYM10%2CSYM10%2CSYM5&rs.i9.r.i0.hold=false&bet.betlines=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19&rs.i3.r.i1.hold=false&rs.i9.r.i0.syms=SYM7%2CSYM4%2CSYM7&rs.i7.r.i4.syms=SYM0%2CSYM9%2CSYM7&rs.i0.r.i3.syms=SYM5%2CSYM4%2CSYM8&rs.i1.r.i1.syms=SYM7%2CSYM7%2CSYM6&bl.i16.coins=1&rs.i5.r.i1.overlay.i0.pos=22&freespins.win.cents=40&bl.i9.coins=1&bl.i7.reelset=ALL&isJackpotWin=false&rs.i6.r.i4.hold=false&rs.i2.r.i3.hold=false&wild.w0.expand.type=NONE&freespins.betlines=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19&rs.i0.r.i1.pos=0&rs.i4.r.i4.syms=SYM6%2CSYM10%2CSYM9&rs.i1.r.i3.syms=SYM7%2CSYM6%2CSYM8&bl.i13.id=13&rs.i0.r.i1.hold=false&rs.i2.r.i1.syms=SYM10%2CSYM4%2CSYM10&ws.i1.types.i0.wintype=coins&rs.i9.r.i2.syms=SYM10%2CSYM10%2CSYM5&bl.i9.line=1%2C0%2C1%2C0%2C1&rs.i8.r.i4.syms=SYM6%2CSYM9%2CSYM9&rs.i9.r.i0.pos=0&rs.i8.r.i3.pos=0&ws.i1.sym=SYM10&betlevel.standard=1&bl.i10.reelset=ALL&ws.i1.types.i0.cents=20&rs.i6.r.i2.syms=SYM8%2CSYM6%2CSYM4&rs.i7.r.i0.syms=SYM5%2CSYM7%2CSYM0&gameover=false&rs.i3.r.i3.pos=0&rs.i5.id=freespinlevel0&rs.i7.r.i0.hold=false&rs.i6.r.i4.pos=0&bl.i11.coins=1&rs.i5.r.i1.hold=false&ws.i1.direction=left_to_right&rs.i5.r.i4.hold=false&rs.i6.r.i2.hold=false&bl.i13.reelset=ALL&bl.i0.id=0&rs.i9.r.i2.hold=false&nextaction=respin&bl.i15.line=0%2C1%2C1%2C1%2C0&bl.i3.line=0%2C1%2C2%2C1%2C0&bl.i19.id=19&bl.i4.reelset=ALL&rs.i7.r.i1.attention.i0=0&bl.i4.coins=1&bl.i18.line=2%2C0%2C2%2C0%2C2&rs.i8.r.i4.hold=false&freespins.totalwin.cents=685&bl.i9.id=9&bl.i17.line=0%2C2%2C0%2C2%2C0&bl.i11.id=11&freespins.betlevel=1&ws.i0.pos.i2=2%2C0&rs.i4.r.i3.pos=0&playercurrency=%26%23x20AC%3B&bl.i9.reelset=ALL&rs.i4.r.i4.hold=false&bl.i17.coins=1&ws.i1.pos.i0=1%2C1&ws.i1.pos.i1=0%2C1&ws.i1.pos.i2=2%2C0&ws.i0.pos.i1=0%2C2&rs.i5.r.i0.syms=SYM9%2CSYM10%2CSYM10&bl.i19.reelset=ALL&ws.i0.pos.i0=1%2C1&rs.i2.r.i4.syms=SYM4%2CSYM8%2CSYM8&rs.i7.r.i4.pos=41&rs.i4.r.i3.hold=false&rs.i6.r.i0.hold=false&bl.i11.reelset=ALL&bl.i16.line=2%2C1%2C1%2C1%2C2&rs.i0.id=freespinlevel2respin&credit=' + balanceInCents + '&ws.i0.types.i0.coins=4&rs.i9.r.i3.syms=SYM6%2CSYM7%2CSYM7&bl.i1.reelset=ALL&rs.i2.r.i2.pos=19&last.rs=freespinlevel0&rs.i5.r.i1.overlay.i0.row=2&rs.i5.r.i1.pos=20&bl.i1.line=0%2C0%2C0%2C0%2C0&ws.i0.sym=SYM10&rs.i6.r.i0.syms=SYM7%2CSYM4%2CSYM7&rs.i6.r.i1.hold=false&bl.i17.id=17&rs.i2.r.i2.syms=SYM4%2CSYM6%2CSYM7&rs.i1.r.i2.pos=19&bl.i16.reelset=ALL&rs.i3.r.i3.syms=SYM6%2CSYM7%2CSYM7&ws.i0.types.i0.wintype=coins&rs.i3.r.i4.hold=false&rs.i5.r.i0.hold=false&nearwinallowed=true&collectablesWon=2&rs.i9.r.i1.pos=0&bl.i8.line=1%2C0%2C0%2C0%2C1&rs.i7.r.i2.hold=false&rs.i6.r.i1.syms=SYM5%2CSYM9%2CSYM9&freespins.wavecount=1&rs.i3.r.i3.hold=false&rs.i6.r.i0.pos=0&bl.i8.coins=1&bl.i15.coins=1&bl.i2.line=2%2C2%2C2%2C2%2C2&rs.i1.r.i2.syms=SYM8%2CSYM4%2CSYM3&rs.i7.nearwin=4%2C2%2C3&rs.i9.r.i4.hold=false&rs.i6.id=freespinlevel1respin&totalwin.cents=685&rs.i7.r.i1.hold=false&rs.i5.r.i2.pos=98&rs.i0.r.i0.hold=false&rs.i2.r.i3.syms=SYM9%2CSYM9%2CSYM5&rs.i8.r.i2.pos=0&restore=true&rs.i1.id=basicrespin&rs.i3.r.i4.syms=SYM6%2CSYM9%2CSYM9&bl.i12.id=12&bl.i4.id=4&rs.i0.r.i4.pos=0&bl.i7.coins=1&ws.i0.types.i0.cents=20&bl.i6.reelset=ALL&rs.i3.r.i0.pos=0&rs.i2.r.i2.hold=false&rs.i7.r.i0.attention.i0=2&wavecount=1&rs.i9.r.i4.syms=SYM6%2CSYM9%2CSYM9&bl.i14.coins=1&rs.i8.r.i3.syms=SYM6%2CSYM7%2CSYM7&rs.i1.r.i1.hold=false&rs.i7.r.i4.attention.i0=0' + freeState);
                    }
                    result_tmp.push('bl.i32.reelset=ALL&rs.i1.r.i0.syms=SYM7&bl.i6.coins=0&bl.i17.reelset=ALL&bl.i15.id=15&rs.i0.r.i4.hold=false&rs.i1.r.i15.pos=0&rs.i1.r.i2.hold=false&bl.i21.id=21&game.win.cents=0&staticsharedurl=&bl.i23.reelset=ALL&bl.i33.coins=0&rs.i1.r.i11.syms=SYM11&bl.i10.line=0%2C1%2C2%2C2%2C2&bl.i0.reelset=ALL&bl.i20.coins=0&bl.i18.coins=0&bl.i10.id=10&bl.i3.reelset=ALL&bl.i4.line=0%2C1%2C1%2C0%2C0&bl.i13.coins=0&bl.i26.reelset=ALL&bl.i24.line=1%2C2%2C3%2C3%2C2&bl.i27.id=27&rs.i2.r.i0.hold=false&rs.i0.r.i0.syms=SYM6%2CSYM6%2CSYM7&bl.i2.id=2&rs.i1.r.i1.pos=0&feature.sticky.active=false&rs.i1.r.i13.hold=false&rs.i0.r.i0.pos=0&bl.i14.reelset=ALL&rs.i2.r.i3.pos=2&feature.wildreels.active=false&rs.i2.r.i4.hold=false&rs.i1.r.i9.syms=SYM11&rs.i2.id=basic&game.win.coins=0&bl.i28.line=2%2C2%2C2%2C2%2C2&rs.i1.r.i0.hold=false&bl.i3.id=3&bl.i22.line=1%2C2%2C3%2C2%2C1&rs.i1.r.i13.syms=SYM7&bl.i12.coins=0&bl.i8.reelset=ALL&clientaction=init&rs.i0.r.i2.hold=false&bl.i16.id=16&rs.i1.r.i15.hold=false&casinoID=netent&rs.i1.r.i8.pos=0&bl.i5.coins=0&rs.i1.r.i6.hold=false&bl.i8.id=8&rs.i0.r.i3.pos=0&bl.i33.id=33&bl.i6.line=0%2C1%2C1%2C1%2C1&bl.i22.id=22&bl.i12.line=1%2C1%2C1%2C1%2C0&bl.i0.line=0%2C0%2C0%2C0%2C0&bl.i29.reelset=ALL&bl.i34.line=2%2C3%2C3%2C3%2C2&bl.i31.line=2%2C2%2C3%2C3%2C2&rs.i0.r.i2.syms=SYM7%2CSYM7%2CSYM6%2CSYM6%2CSYM5&bl.i34.coins=0&game.win.amount=0&betlevel.all=1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10&rs.i1.r.i6.syms=SYM11&denomination.all=' + slotSettings.Denominations.join('%2C') + '&bl.i27.coins=0&bl.i34.reelset=ALL&rs.i2.r.i0.pos=0&bl.i30.reelset=ALL&bl.i1.id=1&bl.i33.line=2%2C3%2C3%2C2%2C2&bl.i25.id=25&rs.i1.r.i9.hold=false&rs.i1.r.i5.syms=SYM7&rs.i1.r.i4.pos=0&denomination.standard=' + (slotSettings.CurrentDenomination * 100) + '&bl.i31.id=31&bl.i32.line=2%2C3%2C3%2C2%2C1&multiplier=1&bl.i14.id=14&bl.i19.line=1%2C2%2C2%2C1%2C1&bl.i12.reelset=ALL&bl.i2.coins=0&bl.i6.id=6&bl.i21.reelset=ALL&autoplay=10%2C25%2C50%2C75%2C100%2C250%2C500%2C750%2C1000&rs.i1.r.i15.syms=SYM11&bl.i20.id=20&rs.i1.r.i12.pos=0&rs.i1.r.i4.syms=SYM7&feature.shuffle.active=false&gamesoundurl=&bl.i33.reelset=ALL&bl.i5.reelset=ALL&bl.i24.coins=0&rs.i1.r.i11.pos=0&bl.i19.coins=0&bl.i32.coins=0&bl.i7.id=7&bl.i18.reelset=ALL&rs.i2.r.i4.pos=0&playercurrencyiso=' + slotSettings.slotCurrency + '&bl.i1.coins=0&bl.i32.id=32&bl.i14.line=1%2C1%2C2%2C1%2C0&playforfun=false&jackpotcurrencyiso=' + slotSettings.slotCurrency + '&rs.i0.r.i4.syms=SYM8%2CSYM8%2CSYM7&rs.i1.r.i9.pos=0&bl.i25.coins=0&rs.i0.r.i2.pos=0&bl.i13.line=1%2C1%2C1%2C1%2C1&bl.i24.reelset=ALL&rs.i1.r.i0.pos=0&rs.i1.r.i14.syms=SYM7&bl.i0.coins=10&rs.i2.r.i0.syms=SYM9%2CSYM9%2CSYM10&bl.i2.reelset=ALL&rs.i1.r.i5.pos=0&bl.i31.coins=0&rs.i1.r.i4.hold=false&bl.i26.coins=0&bl.i27.reelset=ALL&rs.i1.r.i14.hold=false&bl.standard=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19%2C20%2C21%2C22%2C23%2C24%2C25%2C26%2C27%2C28%2C29%2C30%2C31%2C32%2C33%2C34%2C35&bl.i29.line=2%2C2%2C3%2C2%2C1&bl.i23.line=1%2C2%2C3%2C2%2C2&bl.i26.id=26&bl.i15.reelset=ALL&rs.i0.r.i3.hold=false&rs.i1.r.i16.pos=0&rs.i2.r.i1.hold=false&gameServerVersion=2.0.1&g4mode=false&bl.i11.line=1%2C1%2C1%2C0%2C0&bl.i30.id=30&feature.randomwilds.active=false&historybutton=false&bl.i25.line=2%2C2%2C2%2C1%2C0&bl.i5.id=5&gameEventSetters.enabled=false&rs.i1.r.i10.syms=SYM7&rs.i1.r.i3.pos=0&rs.i0.r.i1.syms=SYM4%2CSYM4%2CSYM7%2CSYM7&rs.i1.r.i17.pos=0&bl.i3.coins=0&bl.i10.coins=0&bl.i18.id=18&rs.i2.r.i1.pos=1&rs.i1.r.i12.hold=false&bl.i30.coins=0&nextclientrs=basic&rs.i1.r.i3.hold=false&totalwin.coins=0&bl.i5.line=0%2C1%2C1%2C1%2C0&gamestate.current=basic&bl.i28.coins=0&bl.i27.line=2%2C2%2C2%2C2%2C1&jackpotcurrency=%26%23x20AC%3B&bl.i7.line=0%2C1%2C2%2C1%2C0&bl.i35.id=35&rs.i1.r.i13.pos=0&rs.i0.r.i3.syms=SYM4%2CSYM4%2CSYM8%2CSYM8&rs.i1.r.i1.syms=SYM7&bl.i16.coins=0&bl.i9.coins=0&bl.i30.line=2%2C2%2C3%2C2%2C2&bl.i7.reelset=ALL&isJackpotWin=false&rs.i1.r.i5.hold=false&rs.i2.r.i3.hold=false&rs.i1.r.i12.syms=SYM11&bl.i24.id=24&rs.i1.r.i10.hold=false&rs.i0.r.i1.pos=0&bl.i22.coins=0&rs.i1.r.i3.syms=SYM11&bl.i29.coins=0&bl.i31.reelset=ALL&bl.i13.id=13&rs.i0.r.i1.hold=false&rs.i2.r.i1.syms=SYM8%2CSYM8%2CSYM0%2CSYM7&bl.i9.line=0%2C1%2C2%2C2%2C1&rs.i1.r.i10.pos=0&bl.i35.coins=0&betlevel.standard=1&bl.i10.reelset=ALL&gameover=true&bl.i25.reelset=ALL&bl.i23.coins=0&bl.i11.coins=0&bl.i22.reelset=ALL&bl.i13.reelset=ALL&bl.i0.id=0&nextaction=spin&bl.i15.line=1%2C1%2C2%2C1%2C1&bl.i3.line=0%2C0%2C1%2C1%2C1&bl.i19.id=19&bl.i4.reelset=ALL&bl.i4.coins=0&rs.i1.r.i6.pos=0&bl.i18.line=1%2C2%2C2%2C1%2C0&bl.i9.id=9&bl.i34.id=34&bl.i17.line=1%2C1%2C2%2C2%2C2&bl.i11.id=11&playercurrency=%26%23x20AC%3B&rs.i1.r.i16.syms=SYM11&bl.i9.reelset=ALL&bl.i17.coins=0&bl.i28.id=28&bl.i19.reelset=ALL&rs.i2.r.i4.syms=SYM4%2CSYM4%2CSYM9&bl.i11.reelset=ALL&bl.i16.line=1%2C1%2C2%2C2%2C1&rs.i1.r.i18.hold=false&rs.i0.id=freespin&rs.i1.r.i14.pos=0&rs.i1.r.i17.syms=SYM7&credit=' . $balanceInCents . '&rs.i1.r.i18.pos=0&bl.i21.line=1%2C2%2C2%2C2%2C2&bl.i35.line=2%2C3%2C4%2C3%2C2&bl.i1.reelset=ALL&rs.i2.r.i2.pos=5&bl.i21.coins=0&bl.i28.reelset=ALL&bl.i1.line=0%2C0%2C1%2C0%2C0&rs.i1.r.i8.hold=false&rs.i1.r.i16.hold=false&bl.i17.id=17&rs.i2.r.i2.syms=SYM6%2CSYM6%2CSYM7%2CSYM7%2CSYM9&rs.i1.r.i2.pos=0&bl.i16.reelset=ALL&rs.i1.r.i7.syms=SYM11&nearwinallowed=true&bl.i8.line=0%2C1%2C2%2C1%2C1&bl.i35.reelset=ALL&rs.i1.r.i7.pos=0&rs.i1.r.i18.syms=SYM11&rs.i1.r.i8.syms=SYM7&bl.i8.coins=0&bl.i23.id=23&bl.i15.coins=0&bl.i2.line=0%2C0%2C1%2C1%2C0&rs.i1.r.i2.syms=SYM7&totalwin.cents=0&rs.i1.r.i11.hold=false&rs.i0.r.i0.hold=false&rs.i1.r.i7.hold=false&rs.i2.r.i3.syms=SYM8%2CSYM8%2CSYM10%2CSYM10&restore=false&rs.i1.id=respin&bl.i12.id=12&bl.i29.id=29&rs.i1.r.i17.hold=false&bl.i4.id=4&rs.i0.r.i4.pos=0&bl.i7.coins=0&bl.i6.reelset=ALL&bl.i20.line=1%2C2%2C2%2C2%2C1&rs.i2.r.i2.hold=false&bl.i20.reelset=ALL&wavecount=1&bl.i14.coins=0&rs.i1.r.i1.hold=false&bl.i26.line=2%2C2%2C2%2C1%2C1' + curReels;
                            break;
                        case 'endbonus':
                            const resultWinAllEnd = slotSettings.GetGameData(slotSettings.slotId + 'TotalWin');
                            const resultWinAllCentsEnd = slotSettings.GetGameData(slotSettings.slotId + 'TotalWin') * slotSettings.CurrentDenomination * 100;
                            result_tmp.push('previous.rs.i0=freespin&freespins.betlevel=1&gameServerVersion=2.0.1&g4mode=false&freespins.win.coins=' + resultWinAllEnd + '&playercurrency=%26%23x20AC%3B&feature.randomwilds.active=false&historybutton=false&current.rs.i0=basic&sub.sym12.r4=sym10&sub.sym12.r3=sym10&next.rs=basic&sub.sym12.r2=sym10&gamestate.history=basic%2Cbonus%2Cfreespin%2Cbonus&sub.sym12.r1=sym10&sub.sym12.r0=sym10&game.win.cents=' + resultWinAllCentsEnd + '&feature.randomwilds.positions=0%3A0%2C1%3A2%2C1%3A3%2C2%3A0%2C2%3A4%2C3%3A0%2C3%3A1%2C3%3A2&nextclientrs=basic&totalwin.coins=' + resultWinAllEnd + '&credit=' + balanceInCents + '&gamestate.current=basic&freespins.initial=5&jackpotcurrency=%26%23x20AC%3B&multiplier=1&last.rs=freespin&bonus.rollsleft=0&freespins.denomination=' + slotSettings.CurrentDenomination + '&feature.sticky.active=false&freespins.win.cents=' + resultWinAllCentsEnd + '&freespins.totalwin.coins=' + resultWinAllEnd + '&freespins.total=5&isJackpotWin=false&gamestate.stack=basic&feature.shuffle.active=false&freespins.betlines=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19%2C20%2C21%2C22%2C23%2C24%2C25%2C26%2C27%2C28%2C29%2C30%2C31%2C32%2C33%2C34%2C35&gamesoundurl=&feature.wildreels.active=false&game.win.coins=' + resultWinAllEnd + '&playercurrencyiso=' + slotSettings.slotCurrency + '&freespins.wavecount=1&freespins.multiplier=1&playforfun=false&jackpotcurrencyiso=' + slotSettings.slotCurrency + '&clientaction=endbonus&sub.sym13.r0=sym5&sub.sym13.r1=sym5&sub.sym13.r2=sym5&sub.sym13.r3=sym5&sub.sym13.r4=sym5&bonus.token=crocodile&totalwin.cents=' + resultWinAllCentsEnd + '&gameover=true&bonus.feature.disabled=randomwilds&bonus.board.position=25&freespins.left=0&sub.sym11.r4=sym10&sub.sym11.r3=sym10&sub.sym11.r2=sym10&sub.sym11.r1=sym10&sub.sym11.r0=sym10&nextaction=spin&wavecount=1&game.win.amount=3.23&freespins.totalwin.cents=' + resultWinAllCentsEnd + '');
                            break;
                        case 'initbonus':
                            const resultWinAllInit = slotSettings.GetGameData(slotSettings.slotId + 'TotalWin');
                            const resultWinAllCentsInit = slotSettings.GetGameData(slotSettings.slotId + 'TotalWin') * slotSettings.CurrentDenomination * 100;
                            result_tmp.push('bonus.field.i3.type=coin&bonus.field.i29.type=coin&gameServerVersion=2.0.1&g4mode=false&feature.randomwilds.active=false&historybutton=false&sub.sym12.r4=sym7&sub.sym12.r3=sym7&sub.sym12.r2=sym7&gamestate.history=basic&sub.sym12.r1=sym7&sub.sym12.r0=sym7&bonus.field.i2.value=1&bonus.field.i14.type=coin&game.win.cents=' + resultWinAllCentsInit + '&bonus.field.i28.type=feature&bonus.field.i2.type=reroll&nextclientrs=basic&totalwin.coins=' + resultWinAllInit + '&gamestate.current=bonus&jackpotcurrency=%26%23x20AC%3B&bonus.rollsleft=6&bonus.field.i28.value=randomwilds&bonus.field.i1.type=coin&feature.sticky.active=false&bonus.field.i17.value=1&isJackpotWin=false&bonuswin.cents=' + resultWinAllCentsInit + '&totalbonuswin.cents=' + resultWinAllCentsInit + '&bonus.field.i4.type=feature&bonus.field.i22.value=1&bonus.field.i20.type=feature&feature.wildreels.active=false&bonus.field.i31.type=coin&bonus.field.i15.type=coin&bonus.field.i25.value=3&bonus.field.i6.type=reroll&bonus.field.i0.type=mystery&game.win.coins=' + resultWinAllInit + '&bonus.field.i18.type=reroll&bonus.field.i14.value=1&clientaction=initbonus&sub.sym13.r0=sym3&bonus.field.i21.type=feature&bonus.field.i21.value=shuffle&sub.sym13.r1=sym3&sub.sym13.r2=sym3&sub.sym13.r3=sym3&sub.sym13.r4=sym3&bonus.field.i1.value=1&bonus.field.i7.value=1&bonus.field.i17.type=coin&bonus.field.i31.value=1&gameover=false&bonus.field.i30.type=coin&totalbonuswin.coins=' + resultWinAllInit + '&bonus.board.position=0&sub.sym11.r4=sym6&sub.sym11.r3=sym6&sub.sym11.r2=sym6&sub.sym11.r1=sym6&sub.sym11.r0=sym6&bonus.field.i11.type=feature&gamestate.bonusid=alan-bonus&bonus.field.i27.value=randomwilds&bonus.field.i8.value=unrevealed&bonus.field.i27.type=feature&nextaction=bonusaction&bonus.field.i20.value=shuffle&bonus.field.i15.value=2&game.win.amount=' + resultWinAllCentsInit + '&bonus.field.i9.type=reroll&playercurrency=%26%23x20AC%3B&bonus.field.i6.value=1&bonus.field.i24.type=mystery&bonus.field.i8.type=mystery&bonus.field.i10.type=coin&bonus.field.i26.value=1&bonus.field.i16.value=unrevealed&bonus.field.i9.value=1&bonus.field.i19.value=1&bonus.field.i29.value=1&credit=' + balanceInCents + '&multiplier=1&bonus.field.i13.value=1&bonus.field.i30.value=1&gamestate.stack=basic%2Cbonus&feature.shuffle.active=false&gamesoundurl=&bonus.field.i0.value=unrevealed&bonus.field.i3.value=5&bonus.field.i7.type=coin&bonus.field.i10.value=1&bonus.field.i23.type=coin&bonus.field.i12.type=feature&bonus.field.i26.type=coin&playercurrencyiso=' + slotSettings.slotCurrency + '&bonus.field.i24.value=unrevealed&playforfun=false&jackpotcurrencyiso=' + slotSettings.slotCurrency + '&bonus.field.i11.value=wildreels&bonus.field.i13.type=coin&bonus.field.i25.type=coin&bonus.field.i5.type=feature&totalwin.cents=' + resultWinAllCentsInit + '&bonus.field.i4.value=stickywin&bonus.field.i22.type=coin&bonus.field.i5.value=stickywin&bonus.field.i16.type=mystery&bonus.field.i19.type=coin&bonusgame.coinvalue=' + slotSettings.CurrentDenomination + '&bonus.field.i23.value=1&bonus.field.i18.value=1&bonus.field.i12.value=wildreels&wavecount=1&nextactiontype=selecttoken&bonuswin.coins=' + resultWinAllInit + '');
                            break;
                        case 'bonusaction':
                            if (postData['bonus_token']) {
                                slotSettings.SetGameData(slotSettings.slotId + 'BonusToken', postData['bonus_token']);
                                slotSettings.SetGameData(slotSettings.slotId + 'BonusStep', 0);
                                slotSettings.SetGameData(slotSettings.slotId + 'BonusRolls', 6);
                                result_tmp.push('gameServerVersion=2.0.1&g4mode=false&playercurrency=%26%23x20AC%3B&feature.randomwilds.active=false&historybutton=false&sub.sym12.r4=sym3&sub.sym12.r3=sym3&sub.sym12.r2=sym3&gamestate.history=basic%2Cbonus&sub.sym12.r1=sym3&sub.sym12.r0=sym3&game.win.cents=0&nextclientrs=basic&totalwin.coins=0&credit=' + balanceInCents + '&gamestate.current=bonus&jackpotcurrency=%26%23x20AC%3B&multiplier=1&bonus.rollsleft=5&feature.sticky.active=false&isJackpotWin=false&gamestate.stack=basic%2Cbonus&bonuswin.cents=0&totalbonuswin.cents=0&feature.shuffle.active=false&gamesoundurl=&feature.wildreels.active=false&game.win.coins=0&playercurrencyiso=' + slotSettings.slotCurrency + '&playforfun=false&jackpotcurrencyiso=' + slotSettings.slotCurrency + '&clientaction=bonusaction&sub.sym13.r0=sym4&sub.sym13.r1=sym4&sub.sym13.r2=sym4&sub.sym13.r3=sym4&sub.sym13.r4=sym4&bonus.token=' + slotSettings.GetGameData(slotSettings.slotId + 'BonusToken') + '&totalwin.cents=0&gameover=false&totalbonuswin.coins=0&bonus.board.position=0&sub.sym11.r4=sym6&sub.sym11.r3=sym6&sub.sym11.r2=sym6&sub.sym11.r1=sym6&sub.sym11.r0=sym6&bonusgame.coinvalue=0.01&gamestate.bonusid=alan-bonus&nextaction=bonusaction&wavecount=1&nextactiontype=roll&game.win.amount=0.0&bonuswin.coins=0');
                                const boardValues = [
                                    'x1',
                                    'EXTRA',
                                    'x5',
                                    'STICKY',
                                    'STICKY',
                                    'EXTRA',
                                    'x1',
                                    '?',
                                    'EXTRA',
                                    'x1',
                                    'CROC',
                                    'CROC',
                                    'x1',
                                    'x1',
                                    'x2',
                                    '?',
                                    'x1',
                                    'EXTRA',
                                    'x1',
                                    'MONKEY',
                                    'MONKEY',
                                    'x1',
                                    'x1',
                                    '?',
                                    'x3',
                                    'x1',
                                    'RHINO',
                                    'RHINO',
                                    'x1',
                                    'x1',
                                    'x1',
                                    '?'
                                ];
                                slotSettings.SetGameData(slotSettings.slotId + 'boardValues', boardValues);
                            }
                            else {
                                const BonusToken = slotSettings.GetGameData(slotSettings.slotId + 'BonusToken');
                                let BonusRolls = slotSettings.GetGameData(slotSettings.slotId + 'BonusRolls');
                                const allbet = slotSettings.GetGameData(slotSettings.slotId + 'AllBet');
                                slotSettings.SetGameData(slotSettings.slotId + 'CurrentFreeGame', 0);
                                const boardValues = slotSettings.GetGameData(slotSettings.slotId + 'boardValues');
                                const bank = slotSettings.GetBank((postData['slotEvent'] ? postData['slotEvent'] : ''));
                                let BonusStep = slotSettings.GetGameData(slotSettings.slotId + 'BonusStep');
                                let dicePoint0 = 0;
                                let dicePoint1 = 0;
                                let dicePoint = 0;
                                let curBoardPos = '';
                                let bonusWinType = '';
                                let totalWin = 0;
                                let bonusWinValue: any = 1;
                                let resultFsStr = '';

                                for (let i = 0; i <= 2000; i++) {
                                    BonusStep = slotSettings.GetGameData(slotSettings.slotId + 'BonusStep');
                                    dicePoint0 = PhpHelpers.rand(1, 6);
                                    dicePoint1 = PhpHelpers.rand(1, 6);
                                    dicePoint = dicePoint0 + dicePoint1;
                                    BonusStep += dicePoint;
                                    if (BonusStep > 31) {
                                        BonusStep = BonusStep - 32;
                                    }
                                    curBoardPos = boardValues[BonusStep - 1];
                                    if (curBoardPos == '?') {
                                    }
                                    else if (BonusRolls == 1 && curBoardPos != 'x1' && curBoardPos != 'x2' && curBoardPos != 'x3' && curBoardPos != 'x5') {
                                    }
                                    else {
                                        totalWin = 0;
                                        let freeGames = 0;
                                        let freeGamesType = '';
                                        bonusWinType = '';
                                        bonusWinValue = 1;
                                        const fsInitStr = '&freespins.betlevel=1&freespins.win.coins=0&freespins.initial=6&freespins.denomination=' + slotSettings.CurrentDenomination + '&freespins.win.cents=0&freespins.totalwin.coins=0&freespins.total=6&freespins.betlines=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19%2C20%2C21%2C22%2C23%2C24%2C25%2C26%2C27%2C28%2C29%2C3&freespins.wavecount=1&freespins.multiplier=1&freespins.left=6&freespins.totalwin.cents=0';
                                        const featureInitStr = '&current.rs.i0=freespin&next.rs=freespin&bonus.win.type=feature&gamestate.current=freespin&gamestate.stack=basic%2Cfreespin&clientaction=bonusaction&nextaction=bonusaction&nextactiontype=roll';
                                        const advancedStr = '';
                                        resultFsStr = '';
                                        switch (curBoardPos) {
                                            case 'x1':
                                                bonusWinType = 'coin';
                                                totalWin = allbet * 1;
                                                bonusWinValue = 1;
                                                break;
                                            case 'x2':
                                                bonusWinType = 'coin';
                                                totalWin = allbet * 2;
                                                bonusWinValue = 2;
                                                break;
                                            case 'x3':
                                                bonusWinType = 'coin';
                                                totalWin = allbet * 1;
                                                bonusWinValue = 3;
                                                break;
                                            case 'x5':
                                                bonusWinType = 'coin';
                                                totalWin = allbet * 5;
                                                bonusWinValue = 5;
                                                break;
                                            case 'EXTRA':
                                                const BonusRollsTmp = PhpHelpers.rand(1, 3);
                                                resultFsStr = '&bonus.win.value=' + BonusRollsTmp;
                                                bonusWinType = 'reroll';
                                                BonusRolls += BonusRollsTmp;
                                                bonusWinValue = BonusRollsTmp;
                                                break;
                                            case 'CROC':
                                                boardValues[10] = 'EXTRA';
                                                boardValues[11] = 'EXTRA';
                                                slotSettings.SetGameData(slotSettings.slotId + 'CurrentFreeGame', 0);
                                                resultFsStr = fsInitStr + featureInitStr + '&bonus.win.value=wildreels&feature.wildreels.active=true&nextclientrs=wildreels&nextaction=freespin';
                                                bonusWinType = 'feature';
                                                bonusWinValue = 'wildfeatures';
                                                slotSettings.SetGameData(slotSettings.slotId + 'BonusType', 'wildreels');
                                                slotSettings.SetGameData(slotSettings.slotId + 'FreeGames', 6);
                                                break;
                                            case 'STICKY':
                                                boardValues[26] = 'EXTRA';
                                                boardValues[27] = 'EXTRA';
                                                slotSettings.SetGameData(slotSettings.slotId + 'CurrentFreeGame', 0);
                                                resultFsStr = fsInitStr + featureInitStr + '&bonus.win.value=randomwilds&feature.randomwilds.active=true&nextclientrs=wildreels&nextaction=freespin';
                                                bonusWinType = 'feature';
                                                bonusWinValue = 'wildfeatures';
                                                slotSettings.SetGameData(slotSettings.slotId + 'BonusType', 'wildfeatures');
                                                slotSettings.SetGameData(slotSettings.slotId + 'FreeGames', 6);
                                                break;
                                            case 'MONKEY':
                                                slotSettings.SetGameData(slotSettings.slotId + 'CurrentFreeGame', 0);
                                                resultFsStr = fsInitStr + featureInitStr + '&bonus.win.value=shuffle&feature.shuffle.active=true&nextclientrs=shuffle&nextaction=freespin';
                                                bonusWinType = 'feature';
                                                bonusWinValue = 'shuffle';
                                                slotSettings.SetGameData(slotSettings.slotId + 'BonusType', 'shuffle');
                                                slotSettings.SetGameData(slotSettings.slotId + 'FreeGames', 6);
                                                break;
                                            case 'RHINO':
                                                slotSettings.SetGameData(slotSettings.slotId + 'CurrentFreeGame', 0);
                                                resultFsStr = fsInitStr + featureInitStr + '&bonus.win.value=wildreels&feature.wildreels.active=true&nextclientrs=wildreels&nextaction=freespin';
                                                bonusWinType = 'feature';
                                                bonusWinValue = 'wildfeatures';
                                                slotSettings.SetGameData(slotSettings.slotId + 'BonusType', 'wildfeatures');
                                                slotSettings.SetGameData(slotSettings.slotId + 'FreeGames', 6);
                                                break;
                                            case '?':
                                                slotSettings.SetGameData(slotSettings.slotId + 'CurrentFreeGame', 0);
                                                resultFsStr = fsInitStr + featureInitStr + '&bonus.win.value=wildreels&feature.wildreels.active=true&nextclientrs=wildreels&nextaction=freespin';
                                                bonusWinType = 'feature';
                                                bonusWinValue = 'wildreels';
                                                slotSettings.SetGameData(slotSettings.slotId + 'BonusType', 'wildreels');
                                                slotSettings.SetGameData(slotSettings.slotId + 'FreeGames', 6);
                                                break;
                                        }
                                        if (totalWin <= bank) {
                                            break;
                                        }
                                    }
                                }
                                slotSettings.SetGameData(slotSettings.slotId + 'TotalWin', slotSettings.GetGameData(slotSettings.slotId + 'TotalWin') + totalWin);
                                BonusRolls--;
                                const resultWinAll = slotSettings.GetGameData(slotSettings.slotId + 'TotalWin');
                                const resultWinAllCents = slotSettings.GetGameData(slotSettings.slotId + 'TotalWin') * slotSettings.CurrentDenomination * 100;
                                const totalWinCents = totalWin * slotSettings.CurrentDenomination * 100;
                                const totalWinCoins = totalWin;
                                if (totalWin > 0) {
                                    slotSettings.SetBank((postData['slotEvent'] ? postData['slotEvent'] : ''), -1 * totalWin);
                                    slotSettings.SetBalance(totalWin);
                                }
                                if (BonusRolls <= 0) {
                                    resultFsStr += '&nextaction=endbonus&bonusgameover=true';
                                }
                                result_tmp.push('&cbs=' + curBoardPos + '&gameServerVersion=2.0.1&g4mode=false&playercurrency=%26%23x20AC%3B&feature.randomwilds.active=false&historybutton=false&sub.sym12.r4=sym4&bonus.win.value=' + bonusWinValue + '&sub.sym12.r3=sym4&sub.sym12.r2=sym4&gamestate.history=basic%2Cbonus&sub.sym12.r1=sym4&sub.sym12.r0=sym3&bonus.win.type=' + bonusWinType + '&game.win.cents=' + resultWinAllCents + '&nextclientrs=basic&totalwin.coins=' + resultWinAll + '&credit=' + balanceInCents + '&gamestate.current=bonus&jackpotcurrency=%26%23x20AC%3B&multiplier=1&bonus.rollsleft=' + BonusRolls + '&feature.sticky.active=false&isJackpotWin=false&gamestate.stack=basic%2Cbonus&bonuswin.cents=' + totalWinCents + '&totalbonuswin.cents=' + resultWinAllCents + '&feature.shuffle.active=false&gamesoundurl=&feature.wildreels.active=false&bonus.dice.i0.result=' + dicePoint0 + '&game.win.coins=' + resultWinAll + '&playercurrencyiso=' + slotSettings.slotCurrency + '&playforfun=false&jackpotcurrencyiso=' .concat(slotSettings.slotCurrency) + '&clientaction=bonusaction&sub.sym13.r0=sym4&sub.sym13.r1=sym4&sub.sym13.r2=sym4&sub.sym13.r3=sym4&sub.sym13.r4=sym4&bonus.token=' + BonusToken + '&totalwin.cents=' + resultWinAllCents + '&gameover=false&totalbonuswin.coins=' + resultWinAll + '&bonus.board.position=' + BonusStep + '&sub.sym11.r4=sym4&sub.sym11.r3=sym4&sub.sym11.r2=sym4&sub.sym11.r1=sym4&sub.sym11.r0=sym4&bonusgame.coinvalue=' + slotSettings.CurrentDenomination + '&gamestate.bonusid=alan-bonus&nextaction=bonusaction&wavecount=1&nextactiontype=roll&bonus.dice.i1.result=' + dicePoint1 + '&game.win.amount=' + (totalWinCents * slotSettings.CurrentDenomination) + '&bonuswin.coins=' + totalWinCoins + '' + resultFsStr);
                                slotSettings.SetGameData(slotSettings.slotId + 'boardValues', boardValues);
                                slotSettings.SetGameData(slotSettings.slotId + 'BonusToken', BonusToken);
                                slotSettings.SetGameData(slotSettings.slotId + 'BonusStep', BonusStep);
                                slotSettings.SetGameData(slotSettings.slotId + 'BonusRolls', BonusRolls);
                                const response_log = '{"responseEvent":"gambleResult","serverResponse":{"totalWin":0}}';
                                slotSettings.SaveLogReport(response_log, 0, 1, totalWin, 'BG');
                            }
                            break;
                    }
                    const response = result_tmp[0];
                    slotSettings.SaveGameData();
                    slotSettings.SaveGameDataStatic();
                    return response;
                }
                catch( \Exception $e )
                {
                    if( isset($slotSettings) )
                    {
                        $slotSettings->InternalErrorSilent($e);
                    }
                    else
                    {
                            $strLog = '';
                            $strLog .= "\n";
                            $strLog .= ('{"responseEvent":"error","responseType":"' . $e . '","serverResponse":"InternalError","request":' . json_encode($_REQUEST) . ',"requestRaw":' . file_get_contents('php://input') . '}');
                            $strLog .= "\n";
                            $strLog .= ' ############################################### ';
                            $strLog .= "\n";
                            $slg = '';
                        if( file_exists(storage_path('logs/') . 'GameInternal.log') )
                        {
                            $slg = file_get_contents(storage_path('logs/') . 'GameInternal.log');
                        }
                        file_put_contents(storage_path('logs/') . 'GameInternal.log', $slg . $strLog);
                    }
                }


    }
  }
}
