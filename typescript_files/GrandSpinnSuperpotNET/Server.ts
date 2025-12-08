import { SlotSettings } from './SlotSettings';
import { IContext } from '../typescript_base/interfaces';
import { PhpHelpers } from '../typescript_base/php_helpers';

export class Server {
    public get(request: any, game: any, userId: number, context: IContext): string {
        try {
            const slotSettings = new SlotSettings(game.name, userId, context);
            if (!slotSettings.is_active()) {
                return '{"responseEvent":"error","responseType":"","serverResponse":"Game is disabled"}';
            }

            let postData = context.postData;
            let balanceInCents = Math.round(slotSettings.GetBalance() * slotSettings.CurrentDenom * 100);
            let result_tmp: string[] = [];
            let aid = '';

            postData['slotEvent'] = 'bet';

            if (postData['operation']) {
                postData['slotEvent'] = 'jackpot';
                postData['action'] = 'jackpot';
            }
            if (postData['action'] == 'nudge') {
                postData['slotEvent'] = 'nudge';
                postData['action'] = 'nudge';
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

            if (postData['bet_denomination'] && postData['bet_denomination'] >= 1) {
                postData['bet_denomination'] = parseFloat(postData['bet_denomination']) / 100;
                slotSettings.CurrentDenom = postData['bet_denomination'];
                slotSettings.CurrentDenomination = postData['bet_denomination'];
                slotSettings.SetGameData(slotSettings.slotId + 'GameDenom', postData['bet_denomination']);
            } else if (slotSettings.HasGameData(slotSettings.slotId + 'GameDenom')) {
                postData['bet_denomination'] = slotSettings.GetGameData(slotSettings.slotId + 'GameDenom');
                slotSettings.CurrentDenom = postData['bet_denomination'];
                slotSettings.CurrentDenomination = postData['bet_denomination'];
            }

            balanceInCents = Math.round(slotSettings.GetBalance() * slotSettings.CurrentDenom * 100);

            if (postData['slotEvent'] == 'bet') {
                const lines = 20;
                const betline = parseFloat(postData['bet_betlevel']);
                if (lines <= 0 || betline <= 0.0001) {
                    return '{"responseEvent":"error","responseType":"' + postData['slotEvent'] + '","serverResponse":"invalid bet state"}';
                }
                if (slotSettings.GetBalance() < (lines * betline)) {
                    return '{"responseEvent":"error","responseType":"' + postData['slotEvent'] + '","serverResponse":"invalid balance"}';
                }
            }

            if (slotSettings.GetGameData(slotSettings.slotId + 'FreeGames') < slotSettings.GetGameData(slotSettings.slotId + 'CurrentFreeGame') && postData['slotEvent'] == 'freespin') {
                return '{"responseEvent":"error","responseType":"' + postData['slotEvent'] + '","serverResponse":"invalid bonus state"}';
            }

            aid = String(postData['action']);

            switch (aid) {
                case 'init':
                    // Init logic
                    const gameBets = slotSettings.Bet;
                    const lastEvent = slotSettings.GetHistory();
                    slotSettings.SetGameData('GrandSpinnSuperpotNETBonusWin', 0);
                    slotSettings.SetGameData('GrandSpinnSuperpotNETFreeGames', 0);
                    slotSettings.SetGameData('GrandSpinnSuperpotNETCurrentFreeGame', 0);
                    slotSettings.SetGameData('GrandSpinnSuperpotNETTotalWin', 0);
                    slotSettings.SetGameData('GrandSpinnSuperpotNETFreeBalance', 0);
                    let freeState = '';
                    let curReels = '';
                    let reels: any = {};

                    if (lastEvent != 'NULL') {
                        slotSettings.SetGameData(slotSettings.slotId + 'BonusWin', lastEvent.serverResponse.bonusWin);
                        slotSettings.SetGameData(slotSettings.slotId + 'FreeGames', lastEvent.serverResponse.totalFreeGames);
                        slotSettings.SetGameData(slotSettings.slotId + 'CurrentFreeGame', lastEvent.serverResponse.currentFreeGames);
                        slotSettings.SetGameData(slotSettings.slotId + 'TotalWin', lastEvent.serverResponse.bonusWin);
                        slotSettings.SetGameData(slotSettings.slotId + 'FreeBalance', lastEvent.serverResponse.Balance);
                        freeState = lastEvent.serverResponse.freeState;
                        reels = lastEvent.serverResponse.reelsSymbols;
                        curReels = '&rs.i0.r.i0.syms=SYM' + reels.reel1[0] + '%2CSYM' + reels.reel1[1] + '%2CSYM' + reels.reel1[2] + '';
                        curReels += ('&rs.i0.r.i1.syms=SYM' + reels.reel2[0] + '%2CSYM' + reels.reel2[1] + '%2CSYM' + reels.reel2[2] + '');
                        curReels += ('&rs.i0.r.i2.syms=SYM' + reels.reel3[0] + '%2CSYM' + reels.reel3[1] + '%2CSYM' + reels.reel3[2] + '');
                        curReels += ('&rs.i0.r.i3.syms=SYM' + reels.reel4[0] + '%2CSYM' + reels.reel4[1] + '%2CSYM' + reels.reel4[2] + '');
                        curReels += ('&rs.i0.r.i4.syms=SYM' + reels.reel5[0] + '%2CSYM' + reels.reel5[1] + '%2CSYM' + reels.reel5[2] + '');
                        curReels += ('&rs.i1.r.i0.syms=SYM' + reels.reel1[0] + '%2CSYM' + reels.reel1[1] + '%2CSYM' + reels.reel1[2] + '');
                        curReels += ('&rs.i1.r.i1.syms=SYM' + reels.reel2[0] + '%2CSYM' + reels.reel2[1] + '%2CSYM' + reels.reel2[2] + '');
                        curReels += ('&rs.i1.r.i2.syms=SYM' + reels.reel3[0] + '%2CSYM' + reels.reel3[1] + '%2CSYM' + reels.reel3[2] + '');
                        curReels += ('&rs.i1.r.i3.syms=SYM' + reels.reel4[0] + '%2CSYM' + reels.reel4[1] + '%2CSYM' + reels.reel4[2] + '');
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
                    } else {
                        curReels = '&rs.i0.r.i0.syms=SYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '';
                        curReels += ('&rs.i0.r.i1.syms=SYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '');
                        curReels += ('&rs.i0.r.i2.syms=SYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '%2CSYM' + PhpHelpers.rand(1, 7) + '');
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

                    const denoms = slotSettings.Denominations.map(d => d * 100).join('%2C');

                    if (slotSettings.GetGameData('GrandSpinnSuperpotNETCurrentFreeGame') < slotSettings.GetGameData('GrandSpinnSuperpotNETFreeGames') && slotSettings.GetGameData('GrandSpinnSuperpotNETFreeGames') > 0) {
                        freeState = 'rs.i1.r.i0.syms=SYM2%2CSYM5%2CSYM5&bl.i6.coins=1&bl.i17.reelset=ALL&rs.i0.nearwin=4&bl.i15.id=15&rs.i0.r.i4.hold=false&gamestate.history=basic%2Cfreespin&rs.i1.r.i2.hold=false&game.win.cents=176&rs.i1.r.i1.overlay.i2.pos=61&staticsharedurl=https%3A%2F%2Fstatic-shared.casinomodule.com%2Fgameclient_html%2Fdevicedetection%2Fcurrent&bl.i10.line=1%2C2%2C1%2C2%2C1&bl.i0.reelset=ALL&bl.i18.coins=1&bl.i10.id=10&freespins.initial=15&bl.i3.reelset=ALL&bl.i4.line=2%2C1%2C0%2C1%2C2&bl.i13.coins=1&rs.i0.r.i0.syms=SYM5%2CSYM0%2CSYM6&bl.i2.id=2&rs.i1.r.i1.pos=59&rs.i0.r.i0.pos=24&bl.i14.reelset=ALL&game.win.coins=88&rs.i1.r.i0.hold=false&bl.i3.id=3&ws.i1.reelset=freespin&bl.i12.coins=1&bl.i8.reelset=ALL&clientaction=init&rs.i0.r.i2.hold=false&bl.i16.id=16&casinoID=netent&bl.i5.coins=1&rs.i1.r.i1.overlay.i1.row=1&bl.i8.id=8&rs.i0.r.i3.pos=17&bl.i6.line=2%2C2%2C1%2C2%2C2&bl.i12.line=2%2C1%2C2%2C1%2C2&bl.i0.line=1%2C1%2C1%2C1%2C1&rs.i0.r.i2.syms=SYM7%2CSYM6%2CSYM6&rs.i1.r.i1.overlay.i1.with=SYM1_FS&game.win.amount=1.76&betlevel.all=1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10&denomination.all=' + denoms + '&ws.i0.reelset=freespin&bl.i1.id=1&rs.i0.r.i3.attention.i0=2&rs.i1.r.i1.overlay.i0.with=SYM1_FS&rs.i1.r.i4.pos=39&denomination.standard=' + (slotSettings.CurrentDenomination * 100) + '&multiplier=1&bl.i14.id=14&bl.i19.line=0%2C2%2C2%2C2%2C0&freespins.denomination=2.000&bl.i12.reelset=ALL&bl.i2.coins=1&bl.i6.id=6&autoplay=10%2C25%2C50%2C75%2C100%2C250%2C500%2C750%2C1000&freespins.totalwin.coins=80&ws.i0.direction=left_to_right&freespins.total=15&gamestate.stack=basic%2Cfreespin&rs.i1.r.i4.syms=SYM5%2CSYM4%2CSYM4&gamesoundurl=&bet.betlevel=1&bl.i5.reelset=ALL&bl.i19.coins=1&bl.i7.id=7&bl.i18.reelset=ALL&playercurrencyiso=' + slotSettings.slotCurrency + '&bl.i1.coins=1&bl.i14.line=1%2C1%2C2%2C1%2C1&freespins.multiplier=1&playforfun=false&jackpotcurrencyiso=' + slotSettings.slotCurrency + '&rs.i0.r.i4.syms=SYM5%2CSYM5%2CSYM0&rs.i0.r.i2.pos=48&bl.i13.line=1%2C1%2C0%2C1%2C1&ws.i1.betline=19&rs.i1.r.i0.pos=20&bl.i0.coins=1&bl.i2.reelset=ALL&rs.i1.r.i1.overlay.i2.row=2&rs.i1.r.i4.hold=false&freespins.left=14&bl.standard=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19&bl.i15.reelset=ALL&rs.i0.r.i3.hold=false&bet.denomination=' + (slotSettings.CurrentDenomination * 100) + '&g4mode=false&bl.i11.line=0%2C1%2C0%2C1%2C0&freespins.win.coins=80&historybutton=false&bl.i5.id=5&gameEventSetters.enabled=false&rs.i1.r.i3.pos=27&rs.i0.r.i1.syms=SYM5%2CSYM1%2CSYM3&bl.i3.coins=1&ws.i1.types.i0.coins=40&bl.i10.coins=1&bl.i18.id=18&ws.i0.betline=3&rs.i1.r.i3.hold=false&totalwin.coins=88&bl.i5.line=0%2C0%2C1%2C0%2C0&gamestate.current=freespin&jackpotcurrency=%26%23x20AC%3B&bl.i7.line=1%2C2%2C2%2C2%2C1&bet.betlines=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19&rs.i0.r.i3.syms=SYM4%2CSYM4%2CSYM0&rs.i1.r.i1.syms=SYM7%2CSYM1_FS%2CSYM5&bl.i16.coins=1&freespins.win.cents=160&bl.i9.coins=1&bl.i7.reelset=ALL&isJackpotWin=false&rs.i1.r.i1.overlay.i0.pos=59&freespins.betlines=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19&rs.i0.r.i1.pos=61&rs.i1.r.i3.syms=SYM3%2CSYM3%2CSYM6&bl.i13.id=13&rs.i0.r.i1.hold=false&ws.i1.types.i0.wintype=coins&bl.i9.line=1%2C0%2C1%2C0%2C1&ws.i1.sym=SYM2&betlevel.standard=1&bl.i10.reelset=ALL&ws.i1.types.i0.cents=80&gameover=false&bl.i11.coins=1&ws.i1.direction=left_to_right&bl.i13.reelset=ALL&bl.i0.id=0&nextaction=freespin&bl.i15.line=0%2C1%2C1%2C1%2C0&bl.i3.line=0%2C1%2C2%2C1%2C0&bl.i19.id=19&bl.i4.reelset=ALL&bl.i4.coins=1&bl.i18.line=2%2C0%2C2%2C0%2C2&freespins.totalwin.cents=160&bl.i9.id=9&bl.i17.line=0%2C2%2C0%2C2%2C0&bl.i11.id=11&freespins.betlevel=1&ws.i0.pos.i2=2%2C2&playercurrency=%26%23x20AC%3B&bl.i9.reelset=ALL&bl.i17.coins=1&ws.i1.pos.i0=0%2C0&ws.i1.pos.i1=2%2C2&ws.i1.pos.i2=1%2C2&ws.i0.pos.i1=1%2C1&bl.i19.reelset=ALL&ws.i0.pos.i0=0%2C0&bl.i11.reelset=ALL&bl.i16.line=2%2C1%2C1%2C1%2C2&rs.i0.id=basic&credit=' + balanceInCents + '&ws.i0.types.i0.coins=40&bl.i1.reelset=ALL&rs.i1.r.i1.overlay.i1.pos=60&rs.i1.r.i1.overlay.i2.with=SYM1_FS&bl.i1.line=0%2C0%2C0%2C0%2C0&ws.i0.sym=SYM2&bl.i17.id=17&rs.i1.r.i2.pos=1&bl.i16.reelset=ALL&ws.i0.types.i0.wintype=coins&nearwinallowed=true&bl.i8.line=1%2C0%2C0%2C0%2C1&rs.i1.r.i1.overlay.i0.row=0&freespins.wavecount=1&rs.i0.r.i4.attention.i0=2&bl.i8.coins=1&bl.i15.coins=1&bl.i2.line=2%2C2%2C2%2C2%2C2&rs.i0.r.i0.attention.i0=1&rs.i1.r.i2.syms=SYM3%2CSYM3%2CSYM2&totalwin.cents=176&rs.i0.r.i0.hold=false&restore=true&rs.i1.id=freespin&bl.i12.id=12&bl.i4.id=4&rs.i0.r.i4.pos=10&bl.i7.coins=1&ws.i0.types.i0.cents=80&bl.i6.reelset=ALL&wavecount=1&bl.i14.coins=1&rs.i1.r.i1.hold=false' + freeState;
                            }
                            result_tmp.push('denomination.all=' + denoms + '&gameServerVersion=1.10.0&g4mode=false&playercurrency=%26%23x20AC%3B&historybutton=false&gameEventSetters.enabled=false&rs.i0.r.i1.syms=SYM5%2CSYM5%2CSYM5&game.win.cents=0&staticsharedurl=https%3A%2F%2Fstatic-shared.casinomodule.com%2Fgameclient_html%2Fdevicedetection%2Fcurrent&rs.i0.id=basic&bl.i0.reelset=ALL&totalwin.coins=0&credit=' + balanceInCents + '&gamestate.current=basic&denomination.standard=' + (slotSettings.CurrentDenomination * 100) + '&jackpot.tt_mega.' + slotSettings.slotCurrency + '.amount-30s=' + Math.round(slotSettings.slotJackpot[0] * 100) + '&jackpotcurrency=%26%23x20AC%3B&multiplier=1&rs.i0.r.i0.syms=SYM7%2CSYM7%2CSYM7&autoplay=10%2C25%2C50%2C75%2C100%2C250%2C500%2C750%2C1000&isJackpotWin=false&rs.i0.r.i0.pos=0&gamesoundurl=https%3A%2F%2Fstatic.casinomodule.com%2F&nearwinallowed=true&rs.i0.r.i1.pos=0&game.win.coins=0&playercurrencyiso=' + slotSettings.slotCurrency + '&rs.i0.r.i1.hold=false&playforfun=false&jackpotcurrencyiso=' + slotSettings.slotCurrency + '&clientaction=init&jackpot.tt_mega.' + slotSettings.slotCurrency + '.lastpayedout=0&rs.i0.r.i2.hold=false&rs.i0.r.i2.pos=0&casinoID=netent&jackpot.tt_mega.' + slotSettings.slotCurrency + '.amount=' + Math.round(slotSettings.slotJackpot[0] * 100) + '&betlevel.standard=1&totalwin.cents=0&gameover=true&bl.i0.coins=2&rs.i0.r.i0.hold=false&restore=false&bl.i0.id=0&bl.standard=0&bl.i0.line=1%2C1%2C1&nextaction=spin&wavecount=1&rs.i0.r.i2.syms=SYM8%2CSYM8%2CSYM8&game.win.amount=0&betlevel.all=1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10');
                            break;
                        case 'paytable':
                            result_tmp.push('pt.i0.comp.i0.type=betline&pt.i0.comp.i6.type=betline&gameServerVersion=1.10.0&g4mode=false&playercurrency=%26%23x20AC%3B&historybutton=false&pt.i0.comp.i1.multi=20&pt.i0.comp.i4.multi=3&pt.i0.comp.i5.freespins=0&bl.i0.reelset=ALL&credit=496500&pt.i0.comp.i5.type=betline&pt.i0.comp.i2.freespins=0&jackpot.tt_mega.' + slotSettings.slotCurrency + '.amount-30s=' + Math.round(slotSettings.slotJackpot[0] * 100) + '&pt.i0.comp.i5.multi=2&pt.i0.comp.i4.freespins=0&jackpotcurrency=%26%23x20AC%3B&pt.i0.comp.i4.type=betline&pt.i0.id=basic&pt.i0.comp.i1.type=betline&isJackpotWin=false&pt.i0.comp.i2.symbol=SYM4&pt.i0.comp.i4.symbol=SYM6&gamesoundurl=https%3A%2F%2Fstatic.casinomodule.com%2F&pt.i0.comp.i1.freespins=0&pt.i0.comp.i6.symbol=SYM8&pt.i0.comp.i0.symbol=SYM1&pt.i0.comp.i1.n=3&pt.i0.comp.i3.n=3&pt.i0.comp.i5.n=3&pt.i0.comp.i3.type=betline&pt.i0.comp.i3.freespins=0&pt.i0.comp.i6.multi=1&playercurrencyiso=' + slotSettings.slotCurrency + '&playforfun=false&jackpotcurrencyiso=' + slotSettings.slotCurrency + '&clientaction=paytable&jackpot.tt_mega.' + slotSettings.slotCurrency + '.lastpayedout=0&pt.i0.comp.i2.multi=10&pt.i0.comp.i0.freespins=0&pt.i0.comp.i2.type=betline&jackpot.tt_mega.' + slotSettings.slotCurrency + '.amount=' + Math.round(slotSettings.slotJackpot[0] * 100) + '&bl.i0.coins=2&pt.i0.comp.i0.multi=20&bl.i0.id=0&bl.i0.line=1%2C1%2C1&pt.i0.comp.i3.symbol=SYM5&pt.i0.comp.i5.symbol=SYM7&pt.i0.comp.i6.freespins=0&pt.i0.comp.i0.n=3&pt.i0.comp.i2.n=3&pt.i0.comp.i1.symbol=SYM3&pt.i0.comp.i3.multi=5&pt.i0.comp.i4.n=3&pt.i0.comp.i6.n=3');
                            break;
                        case 'jackpot':
                            result_tmp.push('jackpot.tt_mega.' + slotSettings.slotCurrency + '.amount-30s=' + Math.round(slotSettings.slotJackpot[0] * 100) + '&jackpot.tt_mega.' + slotSettings.slotCurrency + '.lastpayedout=0&jackpot.tt_mega.' + slotSettings.slotCurrency + '.nplayers=0&jackpot.tt_mega.' + slotSettings.slotCurrency + '.amount=' + Math.round(slotSettings.slotJackpot[0] * 100) + '');
                            break;
                        case 'initfreespin':
                            result_tmp.push('rs.i1.r.i0.syms=SYM5%2CSYM0%2CSYM6&freespins.betlevel=1&g4mode=false&freespins.win.coins=0&playercurrency=%26%23x20AC%3B&historybutton=false&rs.i0.r.i4.hold=false&gamestate.history=basic&rs.i1.r.i2.hold=false&rs.i1.r.i3.pos=18&rs.i0.r.i1.syms=SYM5%2CSYM5%2CSYM7&game.win.cents=0&rs.i0.id=freespin&rs.i1.r.i3.hold=false&totalwin.coins=0&credit=497520&rs.i1.r.i4.pos=30&gamestate.current=freespin&freespins.initial=15&jackpotcurrency=%26%23x20AC%3B&multiplier=1&bet.betlines=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19&rs.i0.r.i0.syms=SYM2%2CSYM7%2CSYM7&freespins.denomination=2.000&rs.i0.r.i3.syms=SYM4%2CSYM4%2CSYM4&rs.i1.r.i1.syms=SYM2%2CSYM3%2CSYM3&rs.i1.r.i1.pos=3&freespins.win.cents=0&freespins.totalwin.coins=0&freespins.total=15&isJackpotWin=false&gamestate.stack=basic%2Cfreespin&rs.i0.r.i0.pos=3&rs.i1.r.i4.syms=SYM1%2CSYM7%2CSYM7&freespins.betlines=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19&gamesoundurl=&rs.i1.r.i2.pos=15&bet.betlevel=1&rs.i1.nearwin=4%2C3&rs.i0.r.i1.pos=18&rs.i1.r.i3.syms=SYM4%2CSYM0%2CSYM6&game.win.coins=0&playercurrencyiso=' + slotSettings.slotCurrency + '&rs.i1.r.i0.hold=false&rs.i0.r.i1.hold=false&freespins.wavecount=1&freespins.multiplier=1&playforfun=false&jackpotcurrencyiso=' + slotSettings.slotCurrency + '&clientaction=initfreespin&rs.i0.r.i2.hold=false&rs.i0.r.i4.syms=SYM6%2CSYM5%2CSYM5&rs.i0.r.i2.pos=0&rs.i1.r.i2.syms=SYM6%2CSYM6%2CSYM0&rs.i1.r.i0.pos=24&totalwin.cents=0&gameover=false&rs.i0.r.i0.hold=false&rs.i1.id=basic&rs.i0.r.i3.pos=3&rs.i1.r.i4.hold=false&freespins.left=15&rs.i0.r.i4.pos=20&rs.i1.r.i2.attention.i0=2&rs.i1.r.i0.attention.i0=1&rs.i1.r.i3.attention.i0=1&nextaction=freespin&wavecount=1&rs.i0.r.i2.syms=SYM3%2CSYM3%2CSYM3&rs.i1.r.i1.hold=false&rs.i0.r.i3.hold=false&game.win.amount=0.00&bet.denomination=2&freespins.totalwin.cents=0');
                            break;
                        case 'spin':
                            const responseTemplate = {
                                "spin":"rs.i0.r.i0.overlay.i0.pos=32&rs.i0.r.i2.overlay.i2.pos=39&gameServerVersion=1.10.0&g4mode=false&playercurrency=%26%23x20AC%3B&historybutton=false&rs.i0.r.i2.overlay.i1.pos=38&next.rs=basic&gamestate.history=basic&rs.i0.r.i0.overlay.i1.with=SYM7&rs.i0.r.i0.overlay.i1.row=1&rs.i0.r.i1.syms=SYM11%2CSYM25%2CSYM16&game.win.cents=0&rs.i0.r.i2.overlay.i0.pos=37&rs.i0.id=ultraShort3&totalwin.coins=0&credit=499900&gamestate.current=basic&rs.i0.r.i0.overlay.i2.row=2&jackpot.tt_mega.EUR.amount-30s=500000&rs.i0.r.i0.overlay.i0.with=SYM100&rs.i0.r.i2.overlay.i0.row=0&jackpotcurrency=%26%23x20AC%3B&rs.i0.r.i0.overlay.i2.pos=34&rs.i0.r.i1.overlay.i1.with=SYM99&multiplier=1&rs.i0.r.i2.overlay.i2.with=SYM5&last.rs=ultraShort3&rs.i0.r.i0.syms=SYM28%2CSYM16%2CSYM16&rs.i0.r.i0.overlay.i1.pos=33&rs.i0.r.i1.overlay.i0.row=0&rs.i0.r.i1.overlay.i2.pos=22&rs.i0.r.i2.overlay.i0.with=SYM50&rs.i0.r.i2.overlay.i1.row=1&isJackpotWin=false&gamestate.stack=basic&rs.i0.r.i0.pos=32&gamesoundurl=https%3A%2F%2Fstatic.casinomodule.com%2F&rs.i0.r.i0.overlay.i0.row=0&rs.i0.r.i1.overlay.i1.row=1&rs.i0.r.i2.overlay.i2.row=2&rs.i0.r.i1.pos=20&rs.i0.r.i1.overlay.i1.pos=21&game.win.coins=0&playercurrencyiso=EUR&rs.i0.r.i1.hold=false&rs.i0.r.i1.overlay.i0.pos=20&rs.i0.r.i1.overlay.i2.row=2&playforfun=true&jackpotcurrencyiso=EUR&clientaction=spin&jackpot.tt_mega.EUR.lastpayedout=0&rs.i0.r.i1.overlay.i2.with=SYM7&rs.i0.r.i2.hold=false&rs.i0.r.i2.pos=37&jackpot.tt_mega.EUR.amount=500000&totalwin.cents=0&gameover=true&rs.i0.r.i0.hold=false&nextaction=spin&wavecount=1&rs.i0.r.i1.overlay.i0.with=SYM8&rs.i0.r.i0.overlay.i2.with=SYM7&rs.i0.r.i2.syms=SYM29%2CSYM15%2CSYM15&rs.i0.r.i2.overlay.i1.with=SYM5&game.win.amount=0"
                            };
                            let responseData: any = {};
                            responseData['spin'] = slotSettings.DecodeData(responseTemplate['spin']);

                            const linesId: number[][] = [];
                            linesId[0] = [2, 2, 2, 2, 2];

                            const lines = 1;
                            slotSettings.CurrentDenom = postData['bet_denomination'];
                            slotSettings.CurrentDenomination = postData['bet_denomination'];

                            let betline = 0;
                            let allbet = 0;
                            let bonusMpl = 1;
                            let jackState: any = null;

                            if (postData['slotEvent'] != 'nudge') {
                                betline = parseFloat(postData['bet_betlevel']);
                                allbet = betline * lines * 2;
                                slotSettings.UpdateJackpots(allbet);
                                if (!postData['slotEvent']) {
                                    postData['slotEvent'] = 'bet';
                                }
                                slotSettings.SetBalance(-1 * allbet, postData['slotEvent']);
                                const bankSum = allbet / 100 * slotSettings.GetPercent();
                                slotSettings.SetBank((postData['slotEvent'] ? postData['slotEvent'] : ''), bankSum, postData['slotEvent']);
                                jackState = slotSettings.UpdateJackpots(allbet);
                                slotSettings.SetGameData('GrandSpinnSuperpotNETBonusWin', 0);
                                slotSettings.SetGameData('GrandSpinnSuperpotNETFreeGames', 0);
                                slotSettings.SetGameData('GrandSpinnSuperpotNETCurrentFreeGame', 0);
                                slotSettings.SetGameData('GrandSpinnSuperpotNETTotalWin', 0);
                                slotSettings.SetGameData('GrandSpinnSuperpotNETBet', betline);
                                slotSettings.SetGameData('GrandSpinnSuperpotNETDenom', postData['bet_denomination']);
                                slotSettings.SetGameData('GrandSpinnSuperpotNETFreeBalance', Number(slotSettings.GetBalance().toFixed(2)) * 100);
                                bonusMpl = 1;
                            } else {
                                postData['bet_denomination'] = slotSettings.GetGameData('GrandSpinnSuperpotNETDenom');
                                slotSettings.CurrentDenom = postData['bet_denomination'];
                                slotSettings.CurrentDenomination = postData['bet_denomination'];
                                betline = slotSettings.GetGameData('GrandSpinnSuperpotNETBet');
                                allbet = betline * lines;
                                slotSettings.SetGameData('GrandSpinnSuperpotNETCurrentFreeGame', slotSettings.GetGameData('GrandSpinnSuperpotNETCurrentFreeGame') + 1);
                                bonusMpl = slotSettings.slotFreeMpl || 1;
                            }

                            let winTypeTmp = slotSettings.GetSpinSettings(postData['slotEvent'], allbet, lines);
                            let winType = winTypeTmp[0];
                            let spinWinLimit = winTypeTmp[1];

                            if (winType == 'bonus' && postData['slotEvent'] == 'freespin') {
                                winType = 'win';
                            }

                            let totalWin = 0;
                            let lineWins: string[] = [];
                            let cWins = new Array(76).fill(0);
                            let wild = ['1'];
                            let scatter = '0';

                            for (let i = 0; i <= 2000; i++) {
                                totalWin = 0;
                                lineWins = [];
                                cWins = new Array(76).fill(0);

                                if (postData['slotEvent'] == 'nudge') {
                                    reels = slotSettings.OffsetReelStrips(slotSettings.GetGameData('GrandSpinnSuperpotNETReels'), PhpHelpers.rand(1, 1));
                                } else {
                                    reels = slotSettings.GetReelStrips(winType, postData['slotEvent']);
                                }

                                if (jackState && jackState.isJackPay) {
                                    reels['reel1'][1] = '102';
                                    reels['reel2'][1] = '102';
                                    reels['reel3'][1] = '102';
                                } else if (reels['reel1'][1] == '102' && reels['reel2'][1] == '102' && reels['reel3'][1] == '102') {
                                    // continue? in PHP it is empty block which means it just proceeds or skips checks?
                                    // PHP: else if(...) { }
                                }

                                let winLineCount = 0;
                                for (let k = 0; k < lines; k++) {
                                    let tmpStringWin = '';
                                    for (let j = 0; j < (slotSettings.SymbolGame?.length || 0); j++) {
                                        const csym = slotSettings.SymbolGame![j];
                                        if (csym == scatter || !slotSettings.Paytable['SYM_' + csym]) {
                                        } else {
                                            const s: any[] = [];
                                            // linesId is 0-based in PHP code $linesId[0] = [2,2,2,2,2]
                                            // $linesId[$k][0] is 2. PHP reels array is 0-based.
                                            // $reels['reel1'][$linesId[$k][0] - 1]
                                            // 2 - 1 = 1.
                                            s[0] = reels['reel1'][linesId[k][0] - 1];
                                            s[1] = reels['reel2'][linesId[k][1] - 1];
                                            s[2] = reels['reel3'][linesId[k][2] - 1];
                                            s[3] = reels['reel4'][linesId[k][3] - 1];
                                            s[4] = reels['reel5'][linesId[k][4] - 1];

                                            const is_wild = (sym: any) => wild.includes(String(sym));

                                            // 3 symbols check
                                            if ((s[0] == csym || is_wild(s[0])) && (s[1] == csym || is_wild(s[1])) && (s[2] == csym || is_wild(s[2]))) {
                                                let mpl = 1;
                                                if (is_wild(s[0]) && is_wild(s[1]) && is_wild(s[2])) {
                                                    mpl = 1;
                                                } else if (is_wild(s[0]) || is_wild(s[1]) || is_wild(s[2])) {
                                                    mpl = slotSettings.slotWildMpl || 1;
                                                }
                                                const tmpWin = slotSettings.Paytable['SYM_' + csym][3] * betline * mpl * bonusMpl;
                                                if (cWins[k] < tmpWin) {
                                                    cWins[k] = tmpWin;
                                                    tmpStringWin = '&ws.i' + winLineCount + '.reelset=basic&ws.i' + winLineCount + '.types.i0.coins=' + tmpWin + '&ws.i' + winLineCount + '.pos.i0=0%2C' + (linesId[k][0] - 1) + '&ws.i' + winLineCount + '.pos.i1=1%2C' + (linesId[k][1] - 1) + '&ws.i' + winLineCount + '.pos.i2=2%2C' + (linesId[k][2] - 1) + '&ws.i' + winLineCount + '.types.i0.wintype=coins&ws.i' + winLineCount + '.betline=' + k + '&ws.i' + winLineCount + '.sym=SYM' + csym + '&ws.i' + winLineCount + '.direction=left_to_right&ws.i' + winLineCount + '.types.i0.cents=' + (tmpWin * slotSettings.CurrentDenomination * 100) + '';
                                                }
                                            }
                                        }
                                    }
                                    if (cWins[k] > 0 && tmpStringWin != '') {
                                        lineWins.push(tmpStringWin);
                                        totalWin += cWins[k];
                                        winLineCount++;
                                    }
                                }

                                let scattersCount = 0;
                                let scPos: string[] = [];
                                for (let r = 1; r <= 5; r++) {
                                    for (let p = 0; p <= 2; p++) { // PHP loops p<=2 (0,1,2)
                                        if (reels['reel' + r][p] == scatter) {
                                            scattersCount++;
                                            scPos.push('&ws.i0.pos.i' + (r - 1) + '=' + (r - 1) + '%2C' + p + '');
                                        }
                                    }
                                }

                                if (scattersCount >= 3) {
                                    // scatter logic
                                }

                                if (i > 1000) winType = 'none';
                                if (i > 1500) { return '{"responseEvent":"error","responseType":"' + postData['slotEvent'] + '","serverResponse":"Bad Reel Strip"}'; }

                                if (slotSettings.MaxWin < (totalWin * slotSettings.CurrentDenom)) {
                                } else {
                                    const minWin = slotSettings.GetRandomPay();
                                    if (i > 700) {
                                        // minWin = 0;
                                    }
                                    if (slotSettings.increaseRTP && winType == 'win' && totalWin < (minWin * allbet)) {
                                    } else {
                                        if (postData['slotEvent'] == 'nudge') {
                                            break;
                                        }
                                        if (scattersCount >= 3 && winType != 'bonus') {
                                        } else if (totalWin <= spinWinLimit && winType == 'bonus') {
                                            const cBank = slotSettings.GetBank((postData['slotEvent'] ? postData['slotEvent'] : ''));
                                            if (cBank < spinWinLimit) {
                                                spinWinLimit = cBank;
                                            } else {
                                                break;
                                            }
                                        } else if (totalWin > 0 && totalWin <= spinWinLimit && winType == 'win') {
                                            const cBank = slotSettings.GetBank((postData['slotEvent'] ? postData['slotEvent'] : ''));
                                            if (cBank < spinWinLimit) {
                                                spinWinLimit = cBank;
                                            } else {
                                                break;
                                            }
                                        } else if (totalWin == 0 && winType == 'none') {
                                            break;
                                        }
                                    }
                                }
                            }

                            let freeState = '';
                            if (totalWin > 0) {
                                slotSettings.SetBank((postData['slotEvent'] ? postData['slotEvent'] : ''), -1 * totalWin);
                                slotSettings.SetBalance(totalWin);
                            }

                            const reportWin = totalWin;

                            if (postData['slotEvent'] == 'nudge') {
                                slotSettings.SetGameData('GrandSpinnSuperpotNETBonusWin', slotSettings.GetGameData('GrandSpinnSuperpotNETBonusWin') + totalWin);
                                slotSettings.SetGameData('GrandSpinnSuperpotNETTotalWin', slotSettings.GetGameData('GrandSpinnSuperpotNETTotalWin') + totalWin);
                            } else {
                                slotSettings.SetGameData('GrandSpinnSuperpotNETTotalWin', totalWin);
                            }

                            let fs = 0;
                            if (scattersCount >= 3) {
                                slotSettings.SetGameData('GrandSpinnSuperpotNETFreeStartWin', totalWin);
                                slotSettings.SetGameData('GrandSpinnSuperpotNETBonusWin', totalWin);
                                slotSettings.SetGameData('GrandSpinnSuperpotNETFreeGames', slotSettings.slotFreeCount![scattersCount]);
                                fs = slotSettings.GetGameData('GrandSpinnSuperpotNETFreeGames');
                                freeState = '&freespins.betlines=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19&freespins.totalwin.cents=0&nextaction=freespin&freespins.left=' + fs + '&freespins.wavecount=1&freespins.multiplier=1&gamestate.stack=basic%2Cfreespin&freespins.totalwin.coins=0&freespins.total=' + fs + '&freespins.win.cents=0&gamestate.current=freespin&freespins.initial=' + fs + '&freespins.win.coins=0&freespins.betlevel=' + slotSettings.GetGameData('GrandSpinnSuperpotNETBet') + '&totalwin.coins=' + totalWin + '&credit=' + balanceInCents + '&totalwin.cents=' + (totalWin * slotSettings.CurrentDenomination * 100) + '&game.win.amount=' + (totalWin / slotSettings.CurrentDenomination) + '';
                                curReels += freeState;
                            }

                            const winString = lineWins.join('');
                            const jsSpin = JSON.stringify(reels);
                            const jsJack = JSON.stringify(slotSettings.Jackpots);

                            let isJack = 'false';
                            let clientaction = 'spin';
                            let gameover = 'true';
                            let nextaction = 'spin';
                            let state = 'idle';

                            if (totalWin > 0) {
                                state = 'gamble';
                                gameover = 'true'; // PHP says: gameover = 'false'; nextaction = 'nudge'; gameover = 'true'; -- wait, it overwrites?
                                // PHP:
                                // $state = 'gamble';
                                // $gameover = 'false';
                                // $nextaction = 'nudge';
                                // $gameover = 'true';
                                // It seems it overwrites immediately? Or maybe a typo in my reading/PHP?
                                // "gameover = 'true';" is the last one.
                                // But nextaction is 'nudge'.
                                nextaction = 'nudge';
                                slotSettings.SetGameData('GrandSpinnSuperpotNETNudge', 2);
                            } else {
                                state = 'idle';
                                gameover = 'true';
                                nextaction = 'spin';
                            }

                            if (postData['slotEvent'] == 'nudge') {
                                slotSettings.SetGameData('GrandSpinnSuperpotNETNudge', slotSettings.GetGameData('GrandSpinnSuperpotNETNudge') + 1);
                                const nudgeCnt = slotSettings.GetGameData('GrandSpinnSuperpotNETNudge') + 1;
                                clientaction = 'spin';
                                gameover = 'true';
                                if (slotSettings.GetGameData('GrandSpinnSuperpotNETNudge') >= 5) {
                                    nextaction = 'spin';
                                    gameover = 'true';
                                }
                                for (let nc = 3; nc < nudgeCnt; nc++) {
                                    // Empty loop in PHP?
                                }
                                result_tmp[0] = 'rs.i0.r.i0.overlay.i0.pos=30&rs.i0.r.i2.overlay.i2.pos=11&gameServerVersion=1.10.0&g4mode=false&playercurrency=%26%23x20AC%3B&historybutton=false&rs.i0.r.i2.overlay.i1.pos=10&next.rs=basic&gamestate.history=basic&rs.i0.r.i0.overlay.i1.with=SYM8&rs.i0.r.i0.overlay.i1.row=1&rs.i0.r.i1.syms=SYM29%2CSYM10%2CSYM10&game.win.cents=' + (totalWin * slotSettings.CurrentDenomination * 100) + '&rs.i0.r.i2.overlay.i0.pos=9&rs.i0.id=ultraShort5&totalwin.coins=' + totalWin + '&credit=' + balanceInCents + '&gamestate.current=basic&rs.i0.r.i0.overlay.i2.row=2&jackpot.tt_mega.' + slotSettings.slotCurrency + '.amount-30s=' + Math.round(slotSettings.slotJackpot[0] * 100) + '&rs.i0.r.i0.overlay.i0.with=SYM8&rs.i0.r.i2.overlay.i0.row=0&jackpotcurrency=%26%23x20AC%3B&rs.i0.r.i0.overlay.i2.pos=32&rs.i0.r.i1.overlay.i1.with=SYM4&multiplier=1&rs.i0.r.i2.overlay.i2.with=SYM7&last.rs=ultraShort5&rs.i0.r.i0.syms=SYM14%2CSYM14%2CSYM28&rs.i0.r.i0.overlay.i1.pos=31&rs.i0.r.i1.overlay.i0.row=0&rs.i0.r.i1.overlay.i2.pos=39&rs.i0.r.i2.overlay.i0.with=SYM7&rs.i0.r.i2.overlay.i1.row=1&isJackpotWin=false&gamestate.stack=basic&rs.i0.r.i0.pos=30&gamesoundurl=https%3A%2F%2Fstatic.casinomodule.com%2F&rs.i0.r.i0.overlay.i0.row=0&rs.i0.r.i1.overlay.i1.row=1&rs.i0.r.i2.overlay.i2.row=2&rs.i0.r.i1.pos=37&rs.i0.r.i1.overlay.i1.pos=38&game.win.coins=' + totalWin + '&playercurrencyiso=' + slotSettings.slotCurrency + '&rs.i0.r.i1.hold=false&rs.i0.r.i1.overlay.i0.pos=37&rs.i0.r.i1.overlay.i2.row=2&playforfun=false&jackpotcurrencyiso=' + slotSettings.slotCurrency + '&clientaction=' + clientaction + '&jackpot.tt_mega.' + slotSettings.slotCurrency + '.lastpayedout=0&rs.i0.r.i1.overlay.i2.with=SYM4&rs.i0.r.i2.hold=false&rs.i0.r.i2.pos=9&jackpot.tt_mega.' + slotSettings.slotCurrency + '.amount=' + Math.round(slotSettings.slotJackpot[0] * 100) + '&totalwin.cents=' + (totalWin * slotSettings.CurrentDenomination * 100) + '&gameover=' + gameover + '&rs.i0.r.i0.hold=false&nextaction=' + nextaction + '&wavecount=1&rs.i0.r.i1.overlay.i0.with=SYM102&rs.i0.r.i0.overlay.i2.with=SYM101&rs.i0.r.i2.syms=SYM12%2CSYM12%2CSYM12&rs.i0.r.i2.overlay.i1.with=SYM7&game.win.amount=' + (totalWin / slotSettings.CurrentDenomination) + '' + curReels + winString + '';
                            }

                            if (postData['slotEvent'] == 'freespin') {
                                totalWin = slotSettings.GetGameData('GrandSpinnSuperpotNETBonusWin');
                                let stack = '';
                                let gamestate = '';
                                if (slotSettings.GetGameData(slotSettings.slotId + 'FreeGames') <= slotSettings.GetGameData(slotSettings.slotId + 'CurrentFreeGame') && slotSettings.GetGameData('GrandSpinnSuperpotNETBonusWin') > 0) {
                                    nextaction = 'spin';
                                    stack = 'basic';
                                    gamestate = 'basic';
                                } else {
                                    gamestate = 'freespin';
                                    nextaction = 'freespin';
                                    stack = 'basic%2Cfreespin';
                                }
                                const fs = slotSettings.GetGameData('GrandSpinnSuperpotNETFreeGames');
                                const fsl = slotSettings.GetGameData('GrandSpinnSuperpotNETFreeGames') - slotSettings.GetGameData('GrandSpinnSuperpotNETCurrentFreeGame');
                                freeState = '&freespins.betlines=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19&freespins.totalwin.cents=0&nextaction=' + nextaction + '&freespins.left=' + fsl + '&freespins.wavecount=1&freespins.multiplier=1&gamestate.stack=' + stack + '&freespins.totalwin.coins=' + totalWin + '&freespins.total=' + fs + '&freespins.win.cents=' + (totalWin / slotSettings.CurrentDenomination * 100) + '&gamestate.current=' + gamestate + '&freespins.initial=' + fs + '&freespins.win.coins=' + totalWin + '&freespins.betlevel=' + slotSettings.GetGameData('GrandSpinnSuperpotNETBet') + '&totalwin.coins=' + totalWin + '&credit=' + balanceInCents + '&totalwin.cents=' + (totalWin * slotSettings.CurrentDenomination * 100) + '&game.win.amount=' + (totalWin / slotSettings.CurrentDenomination) + '';
                                curReels += freeState;
                            }

                            const response = '{"responseEvent":"spin","responseType":"' + postData['slotEvent'] + '","serverResponse":{"freeState":"' + freeState + '","slotLines":' + lines + ',"slotBet":' + betline + ',"totalFreeGames":' + slotSettings.GetGameData('GrandSpinnSuperpotNETFreeGames') + ',"currentFreeGames":' + slotSettings.GetGameData('GrandSpinnSuperpotNETCurrentFreeGame') + ',"Balance":' + balanceInCents + ',"afterBalance":' + balanceInCents + ',"bonusWin":' + slotSettings.GetGameData('GrandSpinnSuperpotNETBonusWin') + ',"totalWin":' + totalWin + ',"winLines":[],"Jackpots":' + jsJack + ',"reelsSymbols":' + jsSpin + '}}';

                            slotSettings.SaveLogReport(response, allbet, lines, reportWin, postData['slotEvent']);

                            if (jackState && jackState.isJackPay) {
                                slotSettings.SetBalance(slotSettings.slotJackpot[0] / slotSettings.CurrentDenom);
                                slotSettings.ClearJackpot(0);
                            }

                            balanceInCents = Math.round(slotSettings.GetBalance() * slotSettings.CurrentDenom * 100);
                            slotSettings.SetGameData('GrandSpinnSuperpotNETReels', reels);

                            // Populating responseData['spin'] fields logic
                            responseData['spin']['gamesoundurl'] = '';
                            responseData['spin']['playercurrency'] = slotSettings.slotCurrency;
                            responseData['spin']['jackpotcurrency'] = slotSettings.slotCurrency;
                            responseData['spin']['playercurrencyiso'] = slotSettings.slotCurrency;
                            responseData['spin']['jackpotcurrencyiso'] = slotSettings.slotCurrency;
                            if (!responseData['spin']['jackpot']) responseData['spin']['jackpot'] = {};
                            if (!responseData['spin']['jackpot']['tt_mega']) responseData['spin']['jackpot']['tt_mega'] = {};
                            if (!responseData['spin']['jackpot']['tt_mega'][slotSettings.slotCurrency!]) responseData['spin']['jackpot']['tt_mega'][slotSettings.slotCurrency!] = {};

                            responseData['spin']['jackpot']['tt_mega'][slotSettings.slotCurrency!]['amount'] = Math.round(slotSettings.slotJackpot[0] * 100);
                            responseData['spin']['jackpot']['tt_mega'][slotSettings.slotCurrency!]['amount-30s'] = Math.round(slotSettings.slotJackpot[0] * 100);
                            responseData['spin']['jackpot']['tt_mega'][slotSettings.slotCurrency!]['lastpayedout'] = 0;

                            responseData['spin']['credit'] = balanceInCents;
                            if (!responseData['spin']['game']) responseData['spin']['game'] = {};
                            if (!responseData['spin']['game']['win']) responseData['spin']['game']['win'] = {};

                            responseData['spin']['game']['win']['amount'] = totalWin / slotSettings.CurrentDenomination;
                            responseData['spin']['game']['win']['coins'] = totalWin;
                            responseData['spin']['game']['win']['cents'] = totalWin * slotSettings.CurrentDenomination * 100;

                            if (!responseData['spin']['totalwin']) responseData['spin']['totalwin'] = {};
                            responseData['spin']['totalwin']['cents'] = totalWin * slotSettings.CurrentDenomination * 100;
                            responseData['spin']['totalwin']['coins'] = totalWin;

                            for (let r = 1; r <= 3; r++) {
                                // PHP: $r-1
                                if (!responseData['spin']['rs']['i0']['r']['i' + (r - 1)]['overlay']) responseData['spin']['rs']['i0']['r']['i' + (r - 1)]['overlay'] = {};

                                responseData['spin']['rs']['i0']['r']['i' + (r - 1)]['overlay']['i0'] = {
                                    'pos': reels['rps'][r - 1][0], // rps was populated in GetReelStrips
                                    'with': 'SYM' + reels['reel' + r][0],
                                    'row': 0
                                };
                                responseData['spin']['rs']['i0']['r']['i' + (r - 1)]['overlay']['i1'] = {
                                    'pos': reels['rps'][r - 1][1],
                                    'with': 'SYM' + reels['reel' + r][1],
                                    'row': 1
                                };
                                responseData['spin']['rs']['i0']['r']['i' + (r - 1)]['overlay']['i2'] = {
                                    'pos': reels['rps'][r - 1][2],
                                    'with': 'SYM' + reels['reel' + r][2],
                                    'row': 2
                                };
                                responseData['spin']['rs']['i0']['r']['i' + (r - 1)]['pos'] = reels['rp'][r - 1]; // rp in reels
                                responseData['spin']['rs']['i0']['r']['i' + (r - 1)]['syms'] = 'SYM' + reels['reel' + r][0] + '%2CSYM' + reels['reel' + r][1] + '%2CSYM' + reels['reel' + r][2] + '';
                            }

                            result_tmp[0] = slotSettings.FormatResponse(responseData['spin']) + winString;
                            break;
                    }

                    const response = result_tmp[0];
                    slotSettings.SaveGameData();
                    slotSettings.SaveGameDataStatic();
                    return response;

        } catch (e) {
            console.error(e);
            return '{"responseEvent":"error","responseType":"InternalError","serverResponse":"InternalError"}';
        }
    }
}
