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
            if (postData['action'] == 'freespin') {
                postData['slotEvent'] = 'freespin';
                postData['action'] = 'spin';
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
            } else if (slotSettings.GetGameData(slotSettings.slotId + 'GameDenom')) {
                postData['bet_denomination'] = slotSettings.GetGameData(slotSettings.slotId + 'GameDenom');
                slotSettings.CurrentDenom = postData['bet_denomination'];
                slotSettings.CurrentDenomination = postData['bet_denomination'];
            }

            balanceInCents = Math.round(slotSettings.GetBalance() * slotSettings.CurrentDenom * 100);

            if (postData['slotEvent'] == 'bet') {
                let lines = 9;
                let betline = parseFloat(postData['bet_betlevel']);
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

            let lines = 9;
            let betline = 0;
            let totalWin = 0;
            let freeState = '';
            let curReels = '';
            let winString = '';
            let jsSpin = '';
            let jsJack = '';

            switch(aid) {
                case 'init':
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

                    if (slotSettings.GetGameData('LightsNETCurrentFreeGame') < slotSettings.GetGameData('LightsNETFreeGames') && slotSettings.GetGameData('LightsNETFreeGames') > 0) {
                        freeState = `TODO_INIT_BONUS_STRING`;
                    }
                    result_tmp.push(`TODO_INIT_NORMAL_STRING` + curReels + freeState);
                    break;
                case 'paytable':
                    result_tmp.push(`TODO_PAYTABLE_STRING`);
                    break;
                case 'initfreespin':
                    result_tmp.push(`TODO_INITFREESPIN_STRING`);
                    break;
                case 'spin':
                    let linesId: number[][] = [
                        [2, 2, 2, 2, 2], [1, 1, 1, 1, 1], [3, 3, 3, 3, 3], [1, 2, 3, 2, 1], [3, 2, 1, 2, 3],
                        [1, 1, 2, 1, 1], [3, 3, 2, 3, 3], [2, 3, 3, 3, 2], [2, 1, 1, 1, 2]
                    ];
                    lines = 9;
                    slotSettings.CurrentDenom = postData['bet_denomination'];
                    slotSettings.CurrentDenomination = postData['bet_denomination'];
                    let allbet = 0;
                    let bonusMpl = 1;
                    let rset = 'basic';

                    if (postData['slotEvent'] != 'freespin') {
                        betline = parseFloat(postData['bet_betlevel']);
                        allbet = betline * lines;
                        slotSettings.UpdateJackpots(allbet);
                        if (!postData['slotEvent']) {
                            postData['slotEvent'] = 'bet';
                        }
                        slotSettings.SetBalance(-1 * allbet, postData['slotEvent']);
                        let bankSum = allbet / 100 * slotSettings.GetPercent();
                        slotSettings.SetBank((postData['slotEvent'] ? postData['slotEvent'] : ''), bankSum, postData['slotEvent']);
                        slotSettings.UpdateJackpots(allbet);
                        slotSettings.SetGameData('LightsNETBonusWin', 0);
                        slotSettings.SetGameData('LightsNETFreeGames', 0);
                        slotSettings.SetGameData('LightsNETCurrentFreeGame', 0);
                        slotSettings.SetGameData('LightsNETTotalWin', 0);
                        slotSettings.SetGameData('LightsNETBet', betline);
                        slotSettings.SetGameData('LightsNETDenom', postData['bet_denomination']);
                        slotSettings.SetGameData('LightsNETFreeBalance', (slotSettings.GetBalance() * 100).toFixed(2));
                        bonusMpl = 1;
                        rset = 'basic';
                    } else {
                        postData['bet_denomination'] = slotSettings.GetGameData('LightsNETDenom');
                        slotSettings.CurrentDenom = postData['bet_denomination'];
                        slotSettings.CurrentDenomination = postData['bet_denomination'];
                        betline = slotSettings.GetGameData('LightsNETBet');
                        allbet = betline * lines;
                        slotSettings.SetGameData('LightsNETCurrentFreeGame', slotSettings.GetGameData('LightsNETCurrentFreeGame') + 1);
                        bonusMpl = slotSettings.slotFreeMpl;
                        rset = 'freespin';
                    }

                    let winTypeTmp = slotSettings.GetSpinSettings(postData['slotEvent'], allbet, lines);
                    let winType = winTypeTmp[0];
                    let spinWinLimit = winTypeTmp[1];
                    balanceInCents = Math.round(slotSettings.GetBalance() * slotSettings.CurrentDenom * 100);

                    if (winType == 'bonus' && postData['slotEvent'] == 'freespin') {
                        winType = 'win';
                    }

                    for (let i = 0; i <= 2000; i++) {
                        totalWin = 0;
                        let lineWins: string[] = [];
                        let cWins = new Array(9).fill(0);
                        let wild = ['1']; // In LightsNET, 1 is wild
                        let scatter = '0'; // 0 is scatter
                        let reels = slotSettings.GetReelStrips(winType, postData['slotEvent']);
                        let tmpReels = JSON.parse(JSON.stringify(reels)); // Deep copy
                        let wildStr = '';
                        let wildStrArr: string[] = [];
                        let wildsCount = 0;

                        if (postData['slotEvent'] == 'freespin') {
                            wildsCount = PhpHelpers.rand(3, 6);
                        } else {
                            wildsCount = PhpHelpers.rand(2, 4);
                        }

                        let wc = 0;
                        for (let r = 0; r < 200; r++) {
                            let rew0 = PhpHelpers.rand(1, 5);
                            let rew = PhpHelpers.rand(0, 2);
                            let sym = reels['reel' + rew0][rew];
                            if (sym == 1 || sym == 0) {
                                // skip
                            } else {
                                wc++;
                                reels['reel' + rew0][rew] = 1; // set to Wild
                            }
                            if (wildsCount <= wc) {
                                break;
                            }
                        }

                        for (let r = 1; r <= 5; r++) {
                            let wcc = 0;
                            for (let p = 0; p <= 2; p++) {
                                if (reels['reel' + r][p] == 1) {
                                    wildStrArr.push('&rs.i0.r.i' + (r - 1) + '.overlay.i' + wcc + '.pos=321&rs.i0.r.i' + (r - 1) + '.overlay.i' + wcc + '.with=SYM1&rs.i0.r.i' + (r - 1) + '.overlay.i' + wcc + '.row=' + p);
                                    wcc++;
                                }
                            }
                        }

                        let winLineCount = 0;

                        for (let k = 0; k < lines; k++) {
                            let tmpStringWin = '';
                            for (let j = 0; j < slotSettings.SymbolGame.length; j++) {
                                let csym = slotSettings.SymbolGame[j];
                                if (csym == scatter || !slotSettings.Paytable['SYM_' + csym]) {
                                    continue;
                                } else {
                                    let s: number[] = [];
                                    s[0] = reels['reel1'][linesId[k][0] - 1];
                                    s[1] = reels['reel2'][linesId[k][1] - 1];
                                    s[2] = reels['reel3'][linesId[k][2] - 1];
                                    s[3] = reels['reel4'][linesId[k][3] - 1];
                                    s[4] = reels['reel5'][linesId[k][4] - 1];

                                    let mpl = 1;

                                    // Check 3
                                    if ((s[0] == parseInt(csym) || wild.includes(String(s[0]))) && (s[1] == parseInt(csym) || wild.includes(String(s[1]))) && (s[2] == parseInt(csym) || wild.includes(String(s[2])))) {
                                         mpl = 1;
                                         if (wild.includes(String(s[0])) && wild.includes(String(s[1])) && wild.includes(String(s[2]))) {
                                             mpl = 1;
                                         } else if (wild.includes(String(s[0])) || wild.includes(String(s[1])) || wild.includes(String(s[2]))) {
                                             mpl = slotSettings.slotWildMpl;
                                         }
                                         let tmpWin = slotSettings.Paytable['SYM_' + csym][3] * betline * mpl * bonusMpl;
                                         if (cWins[k] < tmpWin) {
                                             cWins[k] = tmpWin;
                                             tmpStringWin = '&ws.i' + winLineCount + '.reelset=basic&ws.i' + winLineCount + '.types.i0.coins=' + tmpWin + '&ws.i' + winLineCount + '.pos.i0=0%2C' + (linesId[k][0] - 1) + '&ws.i' + winLineCount + '.pos.i1=1%2C' + (linesId[k][1] - 1) + '&ws.i' + winLineCount + '.pos.i2=2%2C' + (linesId[k][2] - 1) + '&ws.i' + winLineCount + '.types.i0.wintype=coins&ws.i' + winLineCount + '.betline=' + k + '&ws.i' + winLineCount + '.sym=SYM' + csym + '&ws.i' + winLineCount + '.direction=left_to_right&ws.i' + winLineCount + '.types.i0.cents=' + (tmpWin * slotSettings.CurrentDenomination * 100) + '&ws.i' + winLineCount + '.reelset=' + rset;
                                         }
                                    }

                                    // Check 4
                                    if ((s[0] == parseInt(csym) || wild.includes(String(s[0]))) && (s[1] == parseInt(csym) || wild.includes(String(s[1]))) && (s[2] == parseInt(csym) || wild.includes(String(s[2]))) && (s[3] == parseInt(csym) || wild.includes(String(s[3])))) {
                                         mpl = 1;
                                         if (wild.includes(String(s[0])) && wild.includes(String(s[1])) && wild.includes(String(s[2])) && wild.includes(String(s[3]))) {
                                             mpl = 1;
                                         } else if (wild.includes(String(s[0])) || wild.includes(String(s[1])) || wild.includes(String(s[2])) || wild.includes(String(s[3]))) {
                                             mpl = slotSettings.slotWildMpl;
                                         }
                                         let tmpWin = slotSettings.Paytable['SYM_' + csym][4] * betline * mpl * bonusMpl;
                                         if (cWins[k] < tmpWin) {
                                             cWins[k] = tmpWin;
                                             tmpStringWin = '&ws.i' + winLineCount + '.reelset=basic&ws.i' + winLineCount + '.types.i0.coins=' + tmpWin + '&ws.i' + winLineCount + '.pos.i0=0%2C' + (linesId[k][0] - 1) + '&ws.i' + winLineCount + '.pos.i1=1%2C' + (linesId[k][1] - 1) + '&ws.i' + winLineCount + '.pos.i2=2%2C' + (linesId[k][2] - 1) + '&ws.i' + winLineCount + '.pos.i3=3%2C' + (linesId[k][3] - 1) + '&ws.i' + winLineCount + '.types.i0.wintype=coins&ws.i' + winLineCount + '.betline=' + k + '&ws.i' + winLineCount + '.sym=SYM' + csym + '&ws.i' + winLineCount + '.direction=left_to_right&ws.i' + winLineCount + '.types.i0.cents=' + (tmpWin * slotSettings.CurrentDenomination * 100) + '' + '&ws.i' + winLineCount + '.reelset=' + rset;
                                         }
                                    }

                                    // Check 5
                                    if ((s[0] == parseInt(csym) || wild.includes(String(s[0]))) && (s[1] == parseInt(csym) || wild.includes(String(s[1]))) && (s[2] == parseInt(csym) || wild.includes(String(s[2]))) && (s[3] == parseInt(csym) || wild.includes(String(s[3]))) && (s[4] == parseInt(csym) || wild.includes(String(s[4])))) {
                                         mpl = 1;
                                         if (wild.includes(String(s[0])) && wild.includes(String(s[1])) && wild.includes(String(s[2])) && wild.includes(String(s[3])) && wild.includes(String(s[4]))) {
                                             mpl = 1;
                                         } else if (wild.includes(String(s[0])) || wild.includes(String(s[1])) || wild.includes(String(s[2])) || wild.includes(String(s[3])) || wild.includes(String(s[4]))) {
                                             mpl = slotSettings.slotWildMpl;
                                         }
                                         let tmpWin = slotSettings.Paytable['SYM_' + csym][5] * betline * mpl * bonusMpl;
                                         if (cWins[k] < tmpWin) {
                                             cWins[k] = tmpWin;
                                             tmpStringWin = '&ws.i' + winLineCount + '.reelset=basic&ws.i' + winLineCount + '.types.i0.coins=' + tmpWin + '&ws.i' + winLineCount + '.pos.i0=0%2C' + (linesId[k][0] - 1) + '&ws.i' + winLineCount + '.pos.i1=1%2C' + (linesId[k][1] - 1) + '&ws.i' + winLineCount + '.pos.i2=2%2C' + (linesId[k][2] - 1) + '&ws.i' + winLineCount + '.pos.i3=3%2C' + (linesId[k][3] - 1) + '&ws.i' + winLineCount + '.pos.i4=4%2C' + (linesId[k][4] - 1) + '&ws.i' + winLineCount + '.types.i0.wintype=coins&ws.i' + winLineCount + '.betline=' + k + '&ws.i' + winLineCount + '.sym=SYM' + csym + '&ws.i' + winLineCount + '.direction=left_to_right&ws.i' + winLineCount + '.types.i0.cents=' + (tmpWin * slotSettings.CurrentDenomination * 100) + '' + '&ws.i' + winLineCount + '.reelset=' + rset;
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

                        reels = tmpReels; // Restore original reels for scatter check?

                        let scattersWin = 0;
                        let scattersStr = '';
                        let scattersCount = 0;
                        let scPos: string[] = [];

                        for (let r = 1; r <= 5; r++) {
                            for (let p = 0; p <= 2; p++) {
                                if (reels['reel' + r][p] == scatter) {
                                    scattersCount++;
                                    scPos.push('&ws.i0.pos.i' + (r - 1) + '=' + (r - 1) + '%2C' + p + '');
                                }
                            }
                        }

                        if (scattersCount >= 3) {
                            scattersStr = '&ws.i0.types.i0.freespins=' + slotSettings.slotFreeCount[scattersCount] + '&ws.i0.reelset=basic&ws.i0.betline=null&ws.i0.types.i0.wintype=freespins&ws.i0.direction=none&' + scPos.join('');
                        }
                        totalWin += scattersWin;

                        if (i > 1000) {
                            winType = 'none';
                        }
                        if (i > 1500) {
                            return '{"responseEvent":"error","responseType":"' + postData['slotEvent'] + '","serverResponse":"Bad Reel Strip"}';
                        }

                        if (slotSettings.MaxWin < (totalWin * slotSettings.CurrentDenom)) {
                            // continue
                        } else {
                            let minWin = slotSettings.GetRandomPay();
                            if (i > 700) {
                                minWin = 0;
                            }
                            if (slotSettings.increaseRTP && winType == 'win' && totalWin < (minWin * allbet)) {
                                // continue
                            } else if (scattersCount >= 3 && winType != 'bonus') {
                                // continue
                            } else if (totalWin <= spinWinLimit && winType == 'bonus') {
                                let cBank = slotSettings.GetBank(postData['slotEvent'] || '');
                                if (cBank < spinWinLimit) {
                                    spinWinLimit = cBank;
                                } else {
                                    break;
                                }
                            } else if (totalWin > 0 && totalWin <= spinWinLimit && winType == 'win') {
                                let cBank = slotSettings.GetBank(postData['slotEvent'] || '');
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

                    if (totalWin > 0) {
                        slotSettings.SetBank((postData['slotEvent'] || ''), -1 * totalWin);
                        slotSettings.SetBalance(totalWin);
                    }

                    let reportWin = totalWin;
                    let wildStr = wildStrArr.join('');

                    curReels = '&rs.i0.r.i0.syms=SYM' + reels['reel1'][0] + '%2CSYM' + reels['reel1'][1] + '%2CSYM' + reels['reel1'][2] + '';
                    curReels += ('&rs.i0.r.i1.syms=SYM' + reels['reel2'][0] + '%2CSYM' + reels['reel2'][1] + '%2CSYM' + reels['reel2'][2] + '');
                    curReels += ('&rs.i0.r.i2.syms=SYM' + reels['reel3'][0] + '%2CSYM' + reels['reel3'][1] + '%2CSYM' + reels['reel3'][2] + '');
                    curReels += ('&rs.i0.r.i3.syms=SYM' + reels['reel4'][0] + '%2CSYM' + reels['reel4'][1] + '%2CSYM' + reels['reel4'][2] + '');
                    curReels += ('&rs.i0.r.i4.syms=SYM' + reels['reel5'][0] + '%2CSYM' + reels['reel5'][1] + '%2CSYM' + reels['reel5'][2] + '');

                    if (postData['slotEvent'] == 'freespin') {
                        slotSettings.SetGameData('LightsNETBonusWin', slotSettings.GetGameData('LightsNETBonusWin') + totalWin);
                        slotSettings.SetGameData('LightsNETTotalWin', slotSettings.GetGameData('LightsNETTotalWin') + totalWin);
                    } else {
                        slotSettings.SetGameData('LightsNETTotalWin', totalWin);
                    }

                    let fs = 0;
                    if (scattersCount >= 3) {
                        slotSettings.SetGameData('LightsNETFreeStartWin', totalWin);
                        slotSettings.SetGameData('LightsNETBonusWin', totalWin);
                        slotSettings.SetGameData('LightsNETFreeGames', slotSettings.slotFreeCount[scattersCount]);
                        fs = slotSettings.GetGameData('LightsNETFreeGames');
                        freeState = '&freespins.betlines=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19&freespins.totalwin.cents=0&nextaction=freespin&freespins.left=' + fs + '&freespins.wavecount=1&freespins.multiplier=1&gamestate.stack=basic%2Cfreespin&freespins.totalwin.coins=0&freespins.total=' + fs + '&freespins.win.cents=0&gamestate.current=freespin&freespins.initial=' + fs + '&freespins.win.coins=0&freespins.betlevel=' + slotSettings.GetGameData('LightsNETBet') + '&totalwin.coins=' + totalWin + '&credit=' + balanceInCents + '&totalwin.cents=' + (totalWin * slotSettings.CurrentDenomination * 100) + '&game.win.amount=' + (totalWin / slotSettings.CurrentDenomination) + '';
                        curReels += freeState;
                    }

                    winString = lineWins.join('');
                    jsSpin = JSON.stringify(reels);
                    jsJack = JSON.stringify(slotSettings.Jackpots);

                    if (postData['slotEvent'] == 'freespin') {
                         totalWin = slotSettings.GetGameData('LightsNETBonusWin');
                         let nextaction = 'spin';
                         let stack = 'basic';
                         let gamestate = 'basic';
                         if (slotSettings.GetGameData(slotSettings.slotId + 'FreeGames') <= slotSettings.GetGameData(slotSettings.slotId + 'CurrentFreeGame') && slotSettings.GetGameData('LightsNETBonusWin') > 0) {
                             // end of freespin
                         } else {
                             gamestate = 'freespin';
                             nextaction = 'freespin';
                             stack = 'basic%2Cfreespin';
                         }
                         fs = slotSettings.GetGameData('LightsNETFreeGames');
                         let fsl = slotSettings.GetGameData('LightsNETFreeGames') - slotSettings.GetGameData('LightsNETCurrentFreeGame');

                         let freeStateStr = 'previous.rs.i0=freespin&freespins.betlevel=1&g4mode=false&freespins.win.coins=0&playercurrency=%26%23x20AC%3B&historybutton=false&current.rs.i0=freespin&rs.i0.r.i4.hold=false&next.rs=freespin&gamestate.history=basic%2Cfreespin&rs.i0.r.i1.syms=SYM12%2CSYM8%2CSYM8&game.win.cents=0&rs.i0.id=freespin&totalwin.coins=0&credit=502920&gamestate.current=freespin&freespins.initial=10&jackpotcurrency=%26%23x20AC%3B&multiplier=1&last.rs=freespin&freespins.denomination=5.000&rs.i0.r.i0.syms=SYM5%2CSYM5%2CSYM10&rs.i0.r.i3.syms=SYM10%2CSYM10%2CSYM7&freespins.win.cents=0&freespins.totalwin.coins=0&freespins.total=10&isJackpotWin=false&gamestate.stack=basic%2Cfreespin&rs.i0.r.i0.pos=245&freespins.betlines=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8&gamesoundurl=&rs.i0.r.i1.pos=21&game.win.coins=0&playercurrencyiso=' + slotSettings.slotCurrency + '&rs.i0.r.i1.hold=false&freespins.wavecount=1&freespins.multiplier=1&playforfun=false&jackpotcurrencyiso=' + slotSettings.slotCurrency + '&clientaction=freespin&rs.i0.r.i2.hold=false&rs.i0.r.i4.syms=SYM6%2CSYM6%2CSYM6&rs.i0.r.i2.pos=75&totalwin.cents=0&gameover=false&rs.i0.r.i0.hold=false&rs.i0.r.i3.pos=146&freespins.left=9&rs.i0.r.i4.pos=245&nextaction=freespin&wavecount=1&rs.i0.r.i2.syms=SYM11%2CSYM11%2CSYM11&rs.i0.r.i3.hold=false&game.win.amount=0.00&freespins.totalwin.cents=0';

                         let appendState = '&freespins.totalwin.cents=0&nextaction=' + nextaction + '&freespins.left=' + fsl + '&freespins.wavecount=1&next.rs=freespin&current.rs.i0=freespin&freespins.multiplier=1&gamestate.stack=' + stack + '&freespins.totalwin.coins=' + totalWin + '&freespins.total=' + fs + '&freespins.win.cents=' + (totalWin / slotSettings.CurrentDenomination * 100) + '&gamestate.current=' + gamestate + '&freespins.initial=' + fs + '&freespins.win.coins=' + totalWin + '&freespins.betlevel=' + slotSettings.GetGameData('LightsNETBet') + '&totalwin.coins=' + totalWin + '&credit=' + balanceInCents + '&totalwin.cents=' + (totalWin * slotSettings.CurrentDenomination * 100) + '&game.win.amount=' + (totalWin / slotSettings.CurrentDenomination);

                         curReels = freeStateStr + curReels + appendState;
                         freeState = appendState;
                    }

                    let response_json = '{"responseEvent":"spin","responseType":"' + postData['slotEvent'] + '","serverResponse":{"freeState":"' + freeState + '","slotLines":' + lines + ',"slotBet":' + betline + ',"totalFreeGames":' + slotSettings.GetGameData('LightsNETFreeGames') + ',"currentFreeGames":' + slotSettings.GetGameData('LightsNETCurrentFreeGame') + ',"Balance":' + balanceInCents + ',"afterBalance":' + balanceInCents + ',"bonusWin":' + slotSettings.GetGameData('LightsNETBonusWin') + ',"totalWin":' + totalWin + ',"winLines":[],"Jackpots":' + jsJack + ',"reelsSymbols":' + jsSpin + '}}';

                    slotSettings.SaveLogReport(response_json, allbet, lines, reportWin, postData['slotEvent']);

                    result_tmp.push(`TODO_SPIN_STRING` + curReels + winString + wildStr + scattersStr);
                    break;
            }
            return result_tmp[0];
        } catch(e) {
            console.error(e);
            return '{"responseEvent":"error","responseType":"InternalError","serverResponse":"InternalError"}';
        }
    }
}
