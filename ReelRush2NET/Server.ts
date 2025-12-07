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
            postData['freeMode'] = '';
            if (postData['action'] == 'freespin') {
                postData['slotEvent'] = 'freespin';
                postData['action'] = 'spin';
            }
            if (postData['action'] == 'superfreespin') {
                postData['slotEvent'] = 'freespin';
                postData['action'] = 'spin';
                postData['freeMode'] = 'superfreespin';
            }
            if (postData['action'] == 'respin') {
                postData['slotEvent'] = 'respin';
                postData['action'] = 'spin';
            }
            if (postData['action'] == 'init' || postData['action'] == 'reloadbalance') {
                postData['action'] = 'init';
                postData['slotEvent'] = 'init';
            }
            if (postData['action'] == 'paytable') {
                postData['slotEvent'] = 'paytable';
            }
            if (postData['action'] == 'purchasestars') {
                postData['slotEvent'] = 'purchasestars';
            }
            if (postData['action'] == 'gamble') {
                postData['slotEvent'] = 'gamble';
            }
            if (postData['action'] == 'initfreespin') {
                postData['slotEvent'] = 'initfreespin';
            }
            if (postData['action'] == 'startfreespins') {
                postData['slotEvent'] = 'startfreespins';
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
                    slotSettings.SetGameData(slotSettings.slotId + 'Stars', 0);
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
                        curReels = '&rs.i0.r.i0.syms=SYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '';
                        curReels += ('&rs.i0.r.i1.syms=SYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '');
                        curReels += ('&rs.i0.r.i2.syms=SYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '');
                        curReels += ('&rs.i0.r.i3.syms=SYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '');
                        curReels += ('&rs.i0.r.i4.syms=SYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '');
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
                        freeState = 'rs.i1.r.i0.syms=SYM5%2CSYM5%2CSYM9&ws.i6.sym=SYM10&rs.i0.r.i4.hold=false&gamestate.history=basic%2Cstart_freespins%2Cfreespin&ws.i4.betline=0&rs.i1.r.i2.hold=false&ws.i5.types.i0.cents=30&ws.i9.direction=left_to_right&game.win.cents=1530&staticsharedurl=https%3A%2F%2Fstatic-shared.casinomodule.com%2Fgameclient_html%2Fdevicedetection%2Fcurrent&bl.i0.reelset=ALL&ws.i9.reelset=freespin3&freespins.initial=0&ws.i8.types.i0.wintype=coins&rs.i2.r.i0.hold=false&rs.i0.r.i0.syms=SYM4%2CSYM4%2CSYM5%2CSYM5%2CSYM9&ws.i6.reelset=freespin3&rs.i1.r.i1.pos=46&rs.i3.r.i4.pos=0&rs.i6.r.i3.syms=SYM12%2CSYM12%2CSYM4%2CSYM11%2CSYM10&rs.i0.r.i0.pos=0&rs.i2.r.i3.pos=50&rs.i5.r.i0.pos=25&rs.i2.r.i4.hold=false&rs.i3.r.i1.pos=0&ws.i6.types.i0.cents=30&rs.i2.id=freespin2&rs.i4.r.i2.overlay.i0.row=0&rs.i6.r.i1.pos=0&game.win.coins=306&rs.i1.r.i0.hold=false&ws.i1.reelset=freespin3&clientaction=init&rs.i4.r.i0.hold=false&rs.i0.r.i2.hold=false&rs.i4.r.i3.syms=SYM10%2CSYM10%2CSYM4%2CSYM4%2CSYM10&casinoID=netent&rs.i3.r.i2.hold=false&ws.i5.types.i0.coins=6&rs.i5.r.i1.syms=SYM13%2CSYM13%2CSYM1%2CSYM9%2CSYM9&rs.i0.r.i3.pos=0&rs.i4.r.i0.syms=SYM10%2CSYM10%2CSYM3%2CSYM3%2CSYM4&rs.i5.r.i3.pos=7&ws.i3.sym=SYM4&bl.i0.line=0%2F1%2F2%2F3%2F4%2C0%2F1%2F2%2F3%2F4%2C0%2F1%2F2%2F3%2F4%2C0%2F1%2F2%2F3%2F4%2C0%2F1%2F2%2F3%2F4&ws.i3.types.i0.coins=25&ws.i4.types.i0.wintype=coins&rs.i4.r.i2.pos=39&rs.i0.r.i2.syms=SYM3%2CSYM9%2CSYM9%2CSYM12%2CSYM12&game.win.amount=15.30&betlevel.all=' + slotSettings.Denominations.join('%2C') + '&ws.i7.betline=0&rs.i5.r.i2.hold=false&denomination.all=1%2C2%2C5%2C10%2C20&ws.i7.sym=SYM10&ws.i2.pos.i1=0%2C4&ws.i6.direction=left_to_right&rs.i2.r.i0.pos=15&ws.i2.pos.i0=1%2C1&ws.i0.reelset=freespin3&ws.i2.pos.i3=3%2C2&ws.i4.pos.i3=2%2C0&ws.i5.types.i0.wintype=coins&ws.i2.pos.i2=2%2C0&ws.i4.pos.i2=3%2C0&ws.i4.pos.i1=1%2C4&ws.i4.pos.i0=0%2C0&ws.i7.types.i0.wintype=coins&rs.i3.r.i2.syms=SYM5%2CSYM11%2CSYM9%2CSYM7%2CSYM8&rs.i1.r.i4.pos=28&denomination.standard=5&rs.i3.id=superFreespin2&multiplier=1&ws.i8.reelset=freespin3&freespins.denomination=5.000&autoplay=10%2C25%2C50%2C75%2C100%2C250%2C500%2C750%2C1000&ws.i6.types.i0.coins=6&freespins.totalwin.coins=144&ws.i0.direction=left_to_right&freespins.total=0&gamestate.stack=basic%2Cfreespin&rs.i6.r.i2.pos=0&ws.i6.betline=0&rs.i1.r.i4.syms=SYM6&gamesoundurl=https%3A%2F%2Fstatic.casinomodule.com%2F&rs.i5.r.i2.syms=SYM12%2CSYM12%2CSYM1%2CSYM4%2CSYM4&rs.i5.r.i3.hold=false&bet.betlevel=1&rs.i4.r.i2.hold=false&rs.i4.r.i1.syms=SYM4%2CSYM4%2CSYM13%2CSYM13%2CSYM10&lastreelsetid=freespin3&rs.i2.r.i4.pos=33&rs.i3.r.i0.syms=SYM6%2CSYM7%2CSYM3%2CSYM5%2CSYM5&playercurrencyiso=' + slotSettings.slotCurrency + '&rs.i4.r.i1.hold=false&ws.i2.types.i0.coins=25&rs.i3.r.i2.pos=0&ws.i2.sym=SYM4&freespins.multiplier=1&playforfun=false&jackpotcurrencyiso=' + slotSettings.slotCurrency + '&rs.i0.r.i4.syms=SYM5%2CSYM5%2CSYM13%2CSYM13%2CSYM3&rs.i0.r.i2.pos=0&ws.i9.types.i0.coins=6&rs.i6.r.i3.pos=0&ws.i1.betline=0&rs.i1.r.i0.pos=2&rs.i6.r.i3.hold=false&bl.i0.coins=20&ws.i2.types.i0.wintype=coins&rs.i2.r.i0.syms=SYM11%2CSYM9%2CSYM9%2CSYM13%2CSYM13&ws.i9.types.i0.cents=30&rs.i3.r.i1.syms=SYM13%2CSYM4%2CSYM6%2CSYM13%2CSYM13&rs.i1.r.i4.hold=false&freespins.left=5&casinoconfiguration.FEATURE_SUPER_TOKENS_BUY_ENABLED=TRUE&ws.i9.betline=0&rs.i4.r.i1.pos=33&ws.i7.pos.i0=0%2C1&rs.i4.r.i2.syms=SYM13%2CSYM11%2CSYM11%2CSYM12%2CSYM12&bl.standard=0&ws.i3.reelset=freespin3&ws.i7.pos.i3=2%2C0&ws.i7.pos.i2=3%2C0&rs.i5.r.i3.syms=SYM5%2CSYM5%2CSYM9%2CSYM9%2CSYM8&ws.i7.pos.i1=1%2C4&rs.i3.r.i0.hold=false&rs.i6.r.i4.syms=SYM12%2CSYM9%2CSYM5%2CSYM6%2CSYM11&ws.i5.direction=left_to_right&rs.i0.r.i3.hold=false&bet.denomination=5&rs.i5.r.i4.pos=64&rs.i4.id=freespin3&rs.i2.r.i1.hold=false&ws.i6.types.i0.wintype=coins&gameServerVersion=1.21.0&g4mode=false&freespins.win.coins=136&stars.unscaled=655&historybutton=false&ws.i2.direction=left_to_right&gameEventSetters.enabled=false&next.rs=freespin&ws.i8.types.i0.coins=6&ws.i2.types.i0.cents=125&rs.i1.r.i3.pos=15&rs.i0.r.i1.syms=SYM13%2CSYM1%2CSYM12%2CSYM10%2CSYM10&ws.i1.types.i0.coins=25&rs.i2.r.i1.pos=8&rs.i4.r.i4.pos=52&ws.i0.betline=0&rs.i1.r.i3.hold=false&totalwin.coins=306&rs.i5.r.i4.syms=SYM7%2CSYM13%2CSYM13&gamestate.current=freespin&rs.i4.r.i0.pos=4&ws.i3.direction=left_to_right&jackpotcurrency=%26%23x20AC%3B&bet.betlines=0&rs.i3.r.i1.hold=false&rs.i0.r.i3.syms=SYM11%2CSYM10%2CSYM10%2CSYM8%2CSYM8&rs.i1.r.i1.syms=SYM4%2CSYM4%2CSYM12&freespins.win.cents=680&isJackpotWin=false&rs.i6.r.i4.hold=false&ws.i8.betline=0&ws.i8.sym=SYM10&rs.i2.r.i3.hold=false&ws.i2.reelset=freespin3&freespins.betlines=0&rs.i4.r.i2.overlay.i0.with=SYM1&ws.i4.direction=left_to_right&rs.i0.r.i1.pos=0&rs.i4.r.i4.syms=SYM6%2CSYM11%2CSYM11%2CSYM13%2CSYM13&rs.i1.r.i3.syms=SYM6%2CSYM13%2CSYM13&ws.i3.betline=0&rs.i0.r.i1.hold=false&rs.i2.r.i1.syms=SYM4%2CSYM4%2CSYM12%2CSYM12%2CSYM10&ws.i1.types.i0.wintype=coins&openedpositions.thisspin=0&ws.i1.sym=SYM4&betlevel.standard=1&ws.i1.types.i0.cents=125&rs.i6.r.i2.syms=SYM5%2CSYM11%2CSYM9%2CSYM7%2CSYM8&gameover=false&rs.i3.r.i3.pos=0&rs.i5.id=basic&rs.i6.r.i4.pos=0&ws.i9.pos.i0=0%2C1&ws.i8.types.i0.cents=30&ws.i9.pos.i2=1%2C4&rs.i5.r.i1.hold=false&ws.i1.direction=left_to_right&ws.i9.pos.i1=3%2C4&rs.i5.r.i4.hold=false&rs.i6.r.i2.hold=false&bl.i0.id=0&ws.i5.pos.i0=0%2C0&ws.i5.pos.i1=1%2C4&ws.i5.pos.i2=2%2C0&nextaction=freespin&ws.i5.pos.i3=3%2C1&ws.i9.pos.i3=2%2C0&ws.i5.reelset=freespin3&freespins.totalwin.cents=720&ws.i2.betline=0&ws.i0.pos.i3=3%2C2&freespins.betlevel=1&ws.i0.pos.i2=1%2C0&ws.i1.pos.i3=1%2C0&rs.i4.r.i3.pos=55&playercurrency=%26%23x20AC%3B&ws.i3.pos.i3=2%2C0&rs.i4.r.i4.hold=false&ws.i1.pos.i0=3%2C3&ws.i1.pos.i1=0%2C4&ws.i3.pos.i1=3%2C3&ws.i1.pos.i2=2%2C0&ws.i3.pos.i2=0%2C4&ws.i0.pos.i1=2%2C0&rs.i5.r.i0.syms=SYM12%2CSYM11%2CSYM11%2CSYM6%2CSYM6&ws.i0.pos.i0=0%2C4&ws.i3.pos.i0=1%2C1&rs.i2.r.i4.syms=SYM10%2CSYM10%2CSYM8%2CSYM8%2CSYM12&rs.i4.r.i3.hold=false&ws.i5.sym=SYM10&rs.i6.r.i0.hold=false&rs.i0.id=freespin&credit=' + balanceInCents + '&ws.i0.types.i0.coins=25&rs.i2.r.i2.pos=24&ws.i9.sym=SYM10&last.rs=freespin&ws.i8.pos.i0=0%2C1&ws.i8.pos.i1=1%2C4&ws.i3.types.i0.wintype=coins&rs.i5.r.i1.pos=26&ws.i4.types.i0.cents=30&ws.i7.direction=left_to_right&openedpositions.total=12&ws.i0.sym=SYM4&ws.i6.pos.i2=1%2C4&rs.i6.r.i0.syms=SYM6%2CSYM7%2CSYM3%2CSYM5%2CSYM5&ws.i6.pos.i3=2%2C0&ws.i6.pos.i0=0%2C0&casinoconfiguration.FEATURE_SUPER_TOKENS_GAMBLE_ENABLED=true&ws.i6.pos.i1=3%2C4&ws.i8.pos.i2=2%2C0&ws.i8.pos.i3=3%2C1&rs.i6.r.i1.hold=false&rs.i2.r.i2.syms=SYM9%2CSYM13%2CSYM13%2CSYM7%2CSYM7&rs.i1.r.i2.pos=38&rs.i3.r.i3.syms=SYM12%2CSYM12%2CSYM4%2CSYM11%2CSYM10&ws.i0.types.i0.wintype=coins&ws.i4.reelset=freespin3&rs.i3.r.i4.hold=false&rs.i5.r.i0.hold=false&nearwinallowed=true&ws.i3.types.i0.cents=125&ws.i7.types.i0.coins=6&ws.i5.betline=0&rs.i6.r.i1.syms=SYM13%2CSYM4%2CSYM6%2CSYM13%2CSYM13&freespins.wavecount=1&rs.i3.r.i3.hold=false&stars.total=131&rs.i6.r.i0.pos=0&rs.i1.r.i2.syms=SYM10%2CSYM1%2CSYM11%2CSYM11%2CSYM9&rs.i6.id=superFreespin&totalwin.cents=1530&rs.i5.r.i2.pos=3&ws.i7.reelset=freespin3&rs.i0.r.i0.hold=false&ws.i4.sym=SYM10&rs.i2.r.i3.syms=SYM13%2CSYM6%2CSYM6%2CSYM11%2CSYM11&restore=true&rs.i1.id=basic2&rs.i3.r.i4.syms=SYM12%2CSYM9%2CSYM5%2CSYM6%2CSYM11&rs.i0.r.i4.pos=0&ws.i4.types.i0.coins=6&ws.i0.types.i0.cents=125&rs.i3.r.i0.pos=0&ws.i8.direction=left_to_right&rs.i2.r.i2.hold=false&ws.i9.types.i0.wintype=coins&wavecount=1&rs.i4.r.i2.overlay.i0.pos=39&ws.i7.types.i0.cents=30&rs.i1.r.i1.hold=false' + freeState;
                    }
                    result_tmp.push('rs.i4.id=freespin3&rs.i2.r.i1.hold=false&rs.i1.r.i0.syms=SYM3%2CSYM3%2CSYM5%2CSYM5%2CSYM11&gameServerVersion=1.21.0&g4mode=false&stars.unscaled=0&historybutton=false&rs.i0.r.i4.hold=false&gameEventSetters.enabled=false&rs.i1.r.i2.hold=false&rs.i1.r.i3.pos=0&rs.i0.r.i1.syms=SYM13%2CSYM4%2CSYM6%2CSYM13%2CSYM13&rs.i2.r.i1.pos=0&game.win.cents=0&rs.i4.r.i4.pos=0&staticsharedurl=https%3A%2F%2Fstatic-shared.casinomodule.com%2Fgameclient_html%2Fdevicedetection%2Fcurrent&bl.i0.reelset=ALL&rs.i1.r.i3.hold=false&totalwin.coins=0&rs.i5.r.i4.syms=SYM4%2CSYM4%2CSYM9%2CSYM9%2CSYM6&gamestate.current=basic&rs.i4.r.i0.pos=0&jackpotcurrency=%26%23x20AC%3B&rs.i3.r.i1.hold=false&rs.i2.r.i0.hold=false&rs.i0.r.i0.syms=SYM6%2CSYM7%2CSYM3%2CSYM5%2CSYM5&rs.i0.r.i3.syms=SYM12%2CSYM12%2CSYM4%2CSYM11%2CSYM10&rs.i1.r.i1.syms=SYM5%2CSYM5%2CSYM1%2CSYM6%2CSYM6&rs.i1.r.i1.pos=0&rs.i3.r.i4.pos=0&rs.i6.r.i3.syms=SYM12%2CSYM12%2CSYM4%2CSYM11%2CSYM10&isJackpotWin=false&rs.i6.r.i4.hold=false&rs.i0.r.i0.pos=0&rs.i2.r.i3.hold=false&rs.i2.r.i3.pos=0&rs.i5.r.i0.pos=0&rs.i0.r.i1.pos=0&rs.i4.r.i4.syms=SYM12%2CSYM9%2CSYM5%2CSYM6%2CSYM11&rs.i1.r.i3.syms=SYM10%2CSYM8%2CSYM8%2CSYM12%2CSYM12&rs.i2.r.i4.hold=false&rs.i3.r.i1.pos=0&rs.i2.id=freespin2&rs.i6.r.i1.pos=0&game.win.coins=0&rs.i1.r.i0.hold=false&rs.i0.r.i1.hold=false&rs.i2.r.i1.syms=SYM13%2CSYM4%2CSYM6%2CSYM13%2CSYM13&clientaction=init&openedpositions.thisspin=0&rs.i4.r.i0.hold=false&rs.i0.r.i2.hold=false&rs.i4.r.i3.syms=SYM12%2CSYM12%2CSYM4%2CSYM11%2CSYM10&casinoID=netent&betlevel.standard=1&rs.i3.r.i2.hold=false&rs.i6.r.i2.syms=SYM5%2CSYM11%2CSYM9%2CSYM7%2CSYM8&gameover=true&rs.i3.r.i3.pos=0&rs.i5.id=basic&rs.i5.r.i1.syms=SYM5%2CSYM5%2CSYM1%2CSYM6%2CSYM6&rs.i0.r.i3.pos=0&rs.i6.r.i4.pos=0&rs.i5.r.i1.hold=false&rs.i4.r.i0.syms=SYM6%2CSYM7%2CSYM3%2CSYM5%2CSYM5&rs.i5.r.i4.hold=false&rs.i6.r.i2.hold=false&rs.i5.r.i3.pos=0&bl.i0.id=0&bl.i0.line=0%2F1%2F2%2F3%2F4%2C0%2F1%2F2%2F3%2F4%2C0%2F1%2F2%2F3%2F4%2C0%2F1%2F2%2F3%2F4%2C0%2F1%2F2%2F3%2F4&nextaction=spin&rs.i4.r.i2.pos=0&rs.i0.r.i2.syms=SYM5%2CSYM11%2CSYM9%2CSYM7%2CSYM8&game.win.amount=0&betlevel.all=1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10&rs.i5.r.i2.hold=false&denomination.all=' + slotSettings.Denominations.join('%2C') + '&rs.i4.r.i3.pos=0&playercurrency=%26%23x20AC%3B&rs.i2.r.i0.pos=0&rs.i4.r.i4.hold=false&rs.i5.r.i0.syms=SYM3%2CSYM3%2CSYM5%2CSYM5%2CSYM11&rs.i2.r.i4.syms=SYM12%2CSYM9%2CSYM5%2CSYM6%2CSYM11&rs.i3.r.i2.syms=SYM5%2CSYM11%2CSYM9%2CSYM7%2CSYM8&rs.i4.r.i3.hold=false&rs.i6.r.i0.hold=false&rs.i0.id=freespin&credit=' + balanceInCents + '&rs.i1.r.i4.pos=0&denomination.standard=' + (slotSettings.CurrentDenomination * 100) + '&rs.i3.id=superFreespin2&multiplier=1&rs.i2.r.i2.pos=0&rs.i5.r.i1.pos=0&openedpositions.total=0&autoplay=10%2C25%2C50%2C75%2C100%2C250%2C500%2C750%2C1000&rs.i6.r.i0.syms=SYM6%2CSYM7%2CSYM3%2CSYM5%2CSYM5&casinoconfiguration.FEATURE_SUPER_TOKENS_GAMBLE_ENABLED=true&rs.i6.r.i2.pos=0&rs.i1.r.i4.syms=SYM4%2CSYM4%2CSYM9%2CSYM9%2CSYM6&rs.i6.r.i1.hold=false&rs.i2.r.i2.syms=SYM5%2CSYM11%2CSYM9%2CSYM7%2CSYM8&gamesoundurl=https%3A%2F%2Fstatic.casinomodule.com%2F&rs.i1.r.i2.pos=0&rs.i5.r.i2.syms=SYM6%2CSYM6%2CSYM13%2CSYM13%2CSYM11&rs.i3.r.i3.syms=SYM12%2CSYM12%2CSYM4%2CSYM11%2CSYM10&rs.i5.r.i3.hold=false&rs.i3.r.i4.hold=false&rs.i4.r.i2.hold=false&rs.i5.r.i0.hold=false&nearwinallowed=true&rs.i4.r.i1.syms=SYM13%2CSYM4%2CSYM6%2CSYM13%2CSYM13&rs.i2.r.i4.pos=0&rs.i3.r.i0.syms=SYM6%2CSYM7%2CSYM3%2CSYM5%2CSYM5&playercurrencyiso=' + slotSettings.slotCurrency + '&rs.i4.r.i1.hold=false&rs.i6.r.i1.syms=SYM13%2CSYM4%2CSYM6%2CSYM13%2CSYM13&rs.i3.r.i2.pos=0&rs.i3.r.i3.hold=false&stars.total=0&playforfun=false&jackpotcurrencyiso=' + slotSettings.slotCurrency . '&rs.i6.r.i0.pos=0&rs.i0.r.i4.syms=SYM12%2CSYM9%2CSYM5%2CSYM6%2CSYM11&rs.i0.r.i2.pos=0&rs.i1.r.i2.syms=SYM6%2CSYM6%2CSYM13%2CSYM13%2CSYM11&rs.i6.r.i3.pos=0&rs.i1.r.i0.pos=0&rs.i6.id=superFreespin&totalwin.cents=0&rs.i6.r.i3.hold=false&bl.i0.coins=20&rs.i2.r.i0.syms=SYM6%2CSYM7%2CSYM3%2CSYM5%2CSYM5&rs.i5.r.i2.pos=0&rs.i0.r.i0.hold=false&rs.i2.r.i3.syms=SYM12%2CSYM12%2CSYM4%2CSYM11%2CSYM10&restore=false&rs.i1.id=basic2&rs.i3.r.i4.syms=SYM12%2CSYM9%2CSYM5%2CSYM6%2CSYM11&rs.i3.r.i1.syms=SYM13%2CSYM4%2CSYM6%2CSYM13%2CSYM13&rs.i1.r.i4.hold=false&casinoconfiguration.FEATURE_SUPER_TOKENS_BUY_ENABLED=TRUE&rs.i0.r.i4.pos=0&rs.i4.r.i1.pos=0&rs.i4.r.i2.syms=SYM5%2CSYM11%2CSYM9%2CSYM7%2CSYM8&bl.standard=0&rs.i3.r.i0.pos=0&rs.i5.r.i3.syms=SYM10%2CSYM8%2CSYM8%2CSYM12%2CSYM12&rs.i3.r.i0.hold=false&rs.i2.r.i2.hold=false&wavecount=1&rs.i6.r.i4.syms=SYM12%2CSYM9%2CSYM5%2CSYM6%2CSYM11&rs.i1.r.i1.hold=false&rs.i0.r.i3.hold=false&rs.i5.r.i4.pos=0');
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
