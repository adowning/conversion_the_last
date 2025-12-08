import { SlotSettings } from './SlotSettings';
import { IContext } from '../typescript_base/interfaces';
import { PhpHelpers } from '../typescript_base/php_helpers';

export class Server {
    public get(request: any, context: IContext): any {
        try {
            const slotSettings = new SlotSettings(request.game, request.userId, context);
            if (!slotSettings.is_active()) {
                const response = '{"responseEvent":"error","responseType":"","serverResponse":"Game is disabled"}';
                return response;
            }

            let postData = context.postData;
            let result_tmp: string[] = [];
            let reqId = '';

            if (postData['gameData']) {
                postData = postData['gameData'];
                reqId = postData['cmd'];
                if (!postData['cmd']) {
                     const response = '{"responseEvent":"error","responseType":"","serverResponse":"incorrect action"}';
                     return response;
                }
            } else {
                reqId = postData['action'];
            }

            if (reqId == 'SpinRequest') {
                if (postData['data']['coin'] <= 0 || postData['data']['bet'] <= 0) {
                     const response = '{"responseEvent":"error","responseType":"","serverResponse":"invalid bet state"}';
                     return response;
                }
                if (slotSettings.GetBalance() < (postData['data']['coin'] * postData['data']['bet'] * 10) && slotSettings.GetGameData(slotSettings.slotId + 'FreeGames') <= 0) {
                     const response = '{"responseEvent":"error","responseType":"","serverResponse":"invalid balance"}';
                     return response;
                }
            }

            switch (reqId) {
                case 'InitRequest':
                    result_tmp[0] = '{"action":"InitResponce","result":true,"sesId":"a40e5dc15a83a70f288e421fbcfc6de8","data":{"id":16183084}}';
                    return result_tmp[0];
                    break;
                case 'EventsRequest':
                    result_tmp[0] = '{"action":"EventsResponce","result":true,"sesId":"a40e5dc15a83a70f288e421fbcfc6de8","data":[]}';
                    return result_tmp[0];
                    break;
                case 'APIVersionRequest':
                    result_tmp.push('{"action":"APIVersionResponse","result":true,"sesId":false,"data":{"router":"v3.12","transportConfig":{"reconnectTimeout":500000000000}}}');
                    break;
                case 'PickBonusItemRequest':
                    const bonusSymbol = postData['data']['index'];
                    slotSettings.SetGameData(slotSettings.slotId + 'BonusSymbol', bonusSymbol);
                    result_tmp.push('{"action":"PickBonusItemResponse","result":"true","sesId":"10000217909","data":{"state":"PickBonus","params":{"picksRemain":"0","expandingSymbols":["' + bonusSymbol + '"]}}}');
                    break;
                case 'CheckBrokenGameRequest':
                    result_tmp.push('{"action":"CheckBrokenGameResponse","result":"true","sesId":"false","data":{"haveBrokenGame":"false"}}');
                    break;
                case 'AuthRequest':
                    slotSettings.SetGameData(slotSettings.slotId + 'BonusWin', 0);
                    slotSettings.SetGameData(slotSettings.slotId + 'FreeGames', 0);
                    slotSettings.SetGameData(slotSettings.slotId + 'CurrentFreeGame', 0);
                    slotSettings.SetGameData(slotSettings.slotId + 'TotalWin', 0);
                    slotSettings.SetGameData(slotSettings.slotId + 'FreeBalance', 0);
                    slotSettings.SetGameData(slotSettings.slotId + 'FreeStartWin', 0);
                    slotSettings.SetGameData(slotSettings.slotId + 'BonusSymbol', -1);

                    const lastEvent = slotSettings.GetHistory();
                    let rp1 = '';
                    let rp2 = '';
                    let bet = 0;

                    if (lastEvent != 'NULL') {
                        slotSettings.SetGameData(slotSettings.slotId + 'BonusWin', lastEvent.serverResponse.bonusWin);
                        slotSettings.SetGameData(slotSettings.slotId + 'FreeGames', lastEvent.serverResponse.totalFreeGames);
                        slotSettings.SetGameData(slotSettings.slotId + 'CurrentFreeGame', lastEvent.serverResponse.currentFreeGames);
                        slotSettings.SetGameData(slotSettings.slotId + 'TotalWin', lastEvent.serverResponse.bonusWin);
                        slotSettings.SetGameData(slotSettings.slotId + 'BonusSymbol', lastEvent.serverResponse.BonusSymbol);
                        slotSettings.SetGameData(slotSettings.slotId + 'FreeBalance', 0);
                        slotSettings.SetGameData(slotSettings.slotId + 'FreeStartWin', 0);

                        rp1 = lastEvent.serverResponse.reelsSymbols.rp.join(',');
                        rp2 = '[' + lastEvent.serverResponse.reelsSymbols.reel1[0] + ',' + lastEvent.serverResponse.reelsSymbols.reel2[0] + ',' + lastEvent.serverResponse.reelsSymbols.reel3[0] + ',' + lastEvent.serverResponse.reelsSymbols.reel4[0] + ',' + lastEvent.serverResponse.reelsSymbols.reel5[0] + ']';
                        rp2 += (',[' + lastEvent.serverResponse.reelsSymbols.reel1[1] + ',' + lastEvent.serverResponse.reelsSymbols.reel2[1] + ',' + lastEvent.serverResponse.reelsSymbols.reel3[1] + ',' + lastEvent.serverResponse.reelsSymbols.reel4[1] + ',' + lastEvent.serverResponse.reelsSymbols.reel5[1] + ']');
                        rp2 += (',[' + lastEvent.serverResponse.reelsSymbols.reel1[2] + ',' + lastEvent.serverResponse.reelsSymbols.reel2[2] + ',' + lastEvent.serverResponse.reelsSymbols.reel3[2] + ',' + lastEvent.serverResponse.reelsSymbols.reel4[2] + ',' + lastEvent.serverResponse.reelsSymbols.reel5[2] + ']');
                        bet = lastEvent.serverResponse.slotBet * 100 * 20;
                    } else {
                         rp1 = [
                            PhpHelpers.rand(0, slotSettings.reelStrip1.length - 3),
                            PhpHelpers.rand(0, slotSettings.reelStrip2.length - 3),
                            PhpHelpers.rand(0, slotSettings.reelStrip3.length - 3)
                        ].join(',');

                        let rp_1 = PhpHelpers.rand(0, slotSettings.reelStrip1.length - 3);
                        let rp_2 = PhpHelpers.rand(0, slotSettings.reelStrip2.length - 3);
                        let rp_3 = PhpHelpers.rand(0, slotSettings.reelStrip3.length - 3);
                        let rp_4 = PhpHelpers.rand(0, slotSettings.reelStrip4.length - 3);
                        let rp_5 = PhpHelpers.rand(0, slotSettings.reelStrip5.length - 3);

                        let rr1 = slotSettings.reelStrip1[rp_1];
                        let rr2 = slotSettings.reelStrip2[rp_2];
                        let rr3 = slotSettings.reelStrip3[rp_3];
                        let rr4 = slotSettings.reelStrip4[rp_4];
                        let rr5 = slotSettings.reelStrip5[rp_5];

                        rp2 = '[' + rr1 + ',' + rr2 + ',' + rr3 + ',' + rr4 + ',' + rr5 + ']';

                        rr1 = slotSettings.reelStrip1[rp_1 + 1];
                        rr2 = slotSettings.reelStrip2[rp_2 + 1];
                        rr3 = slotSettings.reelStrip3[rp_3 + 1];
                        rr4 = slotSettings.reelStrip4[rp_4 + 1];
                        rr5 = slotSettings.reelStrip5[rp_5 + 1];

                        rp2 += (',[' + rr1 + ',' + rr2 + ',' + rr3 + ',' + rr4 + ',' + rr5 + ']');

                        rr1 = slotSettings.reelStrip1[rp_1 + 2];
                        rr2 = slotSettings.reelStrip2[rp_2 + 2];
                        rr3 = slotSettings.reelStrip3[rp_3 + 2];
                        rr4 = slotSettings.reelStrip4[rp_4 + 2];
                        rr5 = slotSettings.reelStrip5[rp_5 + 2];

                        rp2 += (',[' + rr1 + ',' + rr2 + ',' + rr3 + ',' + rr4 + ',' + rr5 + ']');
                        bet = parseFloat(slotSettings.Bet[0]) * 100 * 20;
                    }

                    if (slotSettings.GetGameData(slotSettings.slotId + 'FreeGames') == slotSettings.GetGameData(slotSettings.slotId + 'CurrentFreeGame')) {
                        slotSettings.SetGameData(slotSettings.slotId + 'FreeGames', 0);
                        slotSettings.SetGameData(slotSettings.slotId + 'CurrentFreeGame', 0);
                    }

                    if (slotSettings.GetGameData(slotSettings.slotId + 'CurrentFreeGame') < slotSettings.GetGameData(slotSettings.slotId + 'FreeGames')) {
                        const fBonusWin = slotSettings.GetGameData(slotSettings.slotId + 'BonusWin');
                        const fTotal = slotSettings.GetGameData(slotSettings.slotId + 'FreeGames');
                        const fCurrent = slotSettings.GetGameData(slotSettings.slotId + 'CurrentFreeGame');
                        const fRemain = fTotal - fCurrent;
                        // restoreString variable is unused in PHP auth request? No, it's used in constructing lastResponse, but PHP example logic here is slightly messy.
                        // Wait, PHP code has $restoreString but it is NOT appended to $result_tmp[0].
                        // $result_tmp[0] is hardcoded string.
                        // Actually, I should check if restoreString is used.
                        // In PHP: $restoreString = '...'; ... $result_tmp[0] = '...';
                        // The restoreString is completely ignored in the PHP output for AuthResponse in this file.
                        // I will ignore it too.
                    }

                    result_tmp[0] = '{"action":"AuthResponse","result":"true","sesId":"10000258053","data":{"snivy":"proxy v6.10.48 (API v4.23)","supportedFeatures":["Offers","Jackpots","InstantJackpots","SweepStakes"],"sessionId":"10000258053","defaultLines":["0","1","2","3","4","5","6","7","8","9"],"bets":["1","2","3","4","5","10","15","20","30","40","50","100","200","400","800"],"betMultiplier":"1.0000000","defaultBet":"1","defaultCoinValue":"0.01","coinValues":["0.01"],"gameParameters":{"availableLines":[["1","1","1","1","1"],["0","0","0","0","0"],["2","2","2","2","2"],["0","1","2","1","0"],["2","1","0","1","2"],["1","2","2","2","1"],["1","0","0","0","1"],["2","2","1","0","0"],["0","0","1","2","2"],["2","1","1","1","0"]],"rtp":"92.18","payouts":[{"payout":"2","symbols":["0","0"],"type":"basic"},{"payout":"30","symbols":["0","0","0"],"type":"basic"},{"payout":"120","symbols":["0","0","0","0"],"type":"basic"},{"payout":"800","symbols":["0","0","0","0","0"],"type":"basic"},{"payout":"2","symbols":["1","1"],"type":"basic"},{"payout":"30","symbols":["1","1","1"],"type":"basic"},{"payout":"120","symbols":["1","1","1","1"],"type":"basic"},{"payout":"800","symbols":["1","1","1","1","1"],"type":"basic"},{"payout":"20","symbols":["2","2","2"],"type":"basic"},{"payout":"100","symbols":["2","2","2","2"],"type":"basic"},{"payout":"400","symbols":["2","2","2","2","2"],"type":"basic"},{"payout":"20","symbols":["3","3","3"],"type":"basic"},{"payout":"70","symbols":["3","3","3","3"],"type":"basic"},{"payout":"250","symbols":["3","3","3","3","3"],"type":"basic"},{"payout":"20","symbols":["4","4","4"],"type":"basic"},{"payout":"70","symbols":["4","4","4","4"],"type":"basic"},{"payout":"250","symbols":["4","4","4","4","4"],"type":"basic"},{"payout":"10","symbols":["5","5","5"],"type":"basic"},{"payout":"50","symbols":["5","5","5","5"],"type":"basic"},{"payout":"120","symbols":["5","5","5","5","5"],"type":"basic"},{"payout":"10","symbols":["6","6","6"],"type":"basic"},{"payout":"50","symbols":["6","6","6","6"],"type":"basic"},{"payout":"120","symbols":["6","6","6","6","6"],"type":"basic"},{"payout":"4","symbols":["7","7","7"],"type":"basic"},{"payout":"30","symbols":["7","7","7","7"],"type":"basic"},{"payout":"100","symbols":["7","7","7","7","7"],"type":"basic"},{"payout":"4","symbols":["8","8","8"],"type":"basic"},{"payout":"30","symbols":["8","8","8","8"],"type":"basic"},{"payout":"100","symbols":["8","8","8","8","8"],"type":"basic"},{"payout":"4","symbols":["9","9","9"],"type":"basic"},{"payout":"30","symbols":["9","9","9","9"],"type":"basic"},{"payout":"100","symbols":["9","9","9","9","9"],"type":"basic"},{"payout":"2","symbols":["10","10"],"type":"basic"},{"payout":"4","symbols":["10","10","10"],"type":"basic"},{"payout":"30","symbols":["10","10","10","10"],"type":"basic"},{"payout":"100","symbols":["10","10","10","10","10"],"type":"basic"},{"payout":"2","symbols":["11","11"],"type":"scatter"},{"payout":"4","symbols":["11","11","11"],"type":"scatter"},{"payout":"20","symbols":["11","11","11","11"],"type":"scatter"},{"payout":"500","symbols":["11","11","11","11","11"],"type":"scatter"},{"payout":"10","symbols":["12","12"],"type":"basic"},{"payout":"250","symbols":["12","12","12"],"type":"basic"},{"payout":"2500","symbols":["12","12","12","12"],"type":"basic"},{"payout":"9000","symbols":["12","12","12","12","12"],"type":"basic"}],"initialSymbols":[["8","6","7","8","4"],["7","0","12","3","9"],["0","8","9","10","0"]]},"jackpotsEnabled":"true","gameModes":"[]"}}';
                    break;
                case 'BalanceRequest':
                    result_tmp.push('{"action":"BalanceResponse","result":"true","sesId":"10000214325","data":{"entries":"0.00","totalAmount":"' + slotSettings.GetBalance() + '","currency":"' + slotSettings.currency + '"}}');
                    break;
                case 'FreeSpinRequest':
                case 'SpinRequest':
                    postData['slotEvent'] = 'bet';
                    let bonusMpl = 1;
                    const linesId: any[] = [];
                    linesId[0] = [2, 2, 2, 2, 2];
                    linesId[1] = [1, 1, 1, 1, 1];
                    linesId[2] = [3, 3, 3, 3, 3];
                    linesId[3] = [1, 2, 3, 2, 1];
                    linesId[4] = [3, 2, 1, 2, 3];
                    linesId[5] = [2, 3, 3, 3, 2];
                    linesId[6] = [2, 1, 1, 1, 2];
                    linesId[7] = [3, 3, 2, 1, 1];
                    linesId[8] = [1, 1, 2, 3, 3];
                    linesId[9] = [3, 2, 2, 2, 1];

                    const lines = 10;
                    const betLine = postData['data']['coin'] * postData['data']['bet'];
                    const allbet = betLine * lines;

                    if (postData['slotEvent']) {
                    } else {
                        postData['slotEvent'] = 'bet';
                    }

                    if (reqId == 'FreeSpinRequest') {
                        postData['slotEvent'] = 'freespin';
                    }

                    if (postData['slotEvent'] != 'freespin') {
                        slotSettings.SetBalance(-1 * allbet, postData['slotEvent']);
                        const bankSum = allbet / 100 * slotSettings.GetPercent();
                        slotSettings.SetBank(postData['slotEvent'], bankSum, postData['slotEvent']);
                        slotSettings.UpdateJackpots(allbet);
                        slotSettings.SetGameData(slotSettings.slotId + 'BonusWin', 0);
                        slotSettings.SetGameData(slotSettings.slotId + 'FreeGames', 0);
                        slotSettings.SetGameData(slotSettings.slotId + 'CurrentFreeGame', 0);
                        slotSettings.SetGameData(slotSettings.slotId + 'BonusSymbol', -1);
                        slotSettings.SetGameData(slotSettings.slotId + 'TotalWin', 0);
                        slotSettings.SetGameData(slotSettings.slotId + 'FreeBalance', 0);
                        slotSettings.SetGameData(slotSettings.slotId + 'FreeStartWin', 0);
                    } else {
                        slotSettings.SetGameData(slotSettings.slotId + 'CurrentFreeGame', slotSettings.GetGameData(slotSettings.slotId + 'CurrentFreeGame') + 1);
                        bonusMpl = slotSettings.slotFreeMpl;
                    }

                    const winTypeTmp = slotSettings.GetSpinSettings(postData['slotEvent'], betLine, lines);
                    let winType = winTypeTmp[0];
                    let spinWinLimit = winTypeTmp[1];

                    let totalWin = 0;
                    let lineWins: string[] = [];
                    let cWins: number[] = new Array(50).fill(0);
                    let wild = ['12'];
                    const scatter = '11';
                    let reels: any = null;
                    let reelsTmp: any = null;
                    let response = '';
                    let gameState = 'Ready';

                    for (let i = 0; i <= 2000; i++) {
                        totalWin = 0;
                        lineWins = [];
                        cWins = new Array(50).fill(0);

                        reels = slotSettings.GetReelStrips(winType, postData['slotEvent']);
                        reelsTmp = reels;

                        for (let k = 0; k < lines; k++) {
                            let tmpStringWin = '';
                            for (let j = 0; j < slotSettings.SymbolGame.length; j++) {
                                const csym = slotSettings.SymbolGame[j];
                                if (csym == scatter || !slotSettings.Paytable['SYM_' + csym]) {
                                    continue;
                                } else {
                                    let s = [];
                                    s[0] = reels['reel1'][linesId[k][0] - 1];
                                    s[1] = reels['reel2'][linesId[k][1] - 1];
                                    s[2] = reels['reel3'][linesId[k][2] - 1];
                                    s[3] = reels['reel4'][linesId[k][3] - 1];
                                    s[4] = reels['reel5'][linesId[k][4] - 1];

                                    let p0 = linesId[k][0] - 1;
                                    let p1 = linesId[k][1] - 1;
                                    let p2 = linesId[k][2] - 1;
                                    let p3 = linesId[k][3] - 1;
                                    let p4 = linesId[k][4] - 1;

                                    if (s[0] == csym || wild.includes(s[0])) {
                                        let mpl = 1;
                                        let tmpWin = slotSettings.Paytable['SYM_' + csym][1] * betLine * mpl * bonusMpl;
                                        if (cWins[k] < tmpWin) {
                                            cWins[k] = tmpWin;
                                            tmpStringWin = '{"type":"LineWinAmount","selectedLine":"' + k + '","amount":"' + tmpWin + '","wonSymbols":[["0","' + p0 + '"]]}';
                                        }
                                    }

                                    if ((s[0] == csym || wild.includes(s[0])) && (s[1] == csym || wild.includes(s[1]))) {
                                        let mpl = 1;
                                        if (wild.includes(s[0]) && wild.includes(s[1])) {
                                            mpl = 0;
                                        } else if (wild.includes(s[0]) || wild.includes(s[1])) {
                                            mpl = slotSettings.slotWildMpl;
                                        }
                                        let tmpWin = slotSettings.Paytable['SYM_' + csym][2] * betLine * mpl * bonusMpl;
                                        if (cWins[k] < tmpWin) {
                                            cWins[k] = tmpWin;
                                            tmpStringWin = '{"type":"LineWinAmount","selectedLine":"' + k + '","amount":"' + tmpWin + '","wonSymbols":[["0","' + p0 + '"],["1","' + p1 + '"]]}';
                                        }
                                    }

                                    if ((s[0] == csym || wild.includes(s[0])) && (s[1] == csym || wild.includes(s[1])) && (s[2] == csym || wild.includes(s[2]))) {
                                        let mpl = 1;
                                        if (wild.includes(s[0]) && wild.includes(s[1]) && wild.includes(s[2])) {
                                            mpl = 0;
                                        } else if (wild.includes(s[0]) || wild.includes(s[1]) || wild.includes(s[2])) {
                                            mpl = slotSettings.slotWildMpl;
                                        }
                                        let tmpWin = slotSettings.Paytable['SYM_' + csym][3] * betLine * mpl * bonusMpl;
                                        if (cWins[k] < tmpWin) {
                                            cWins[k] = tmpWin;
                                            tmpStringWin = '{"type":"LineWinAmount","selectedLine":"' + k + '","amount":"' + tmpWin + '","wonSymbols":[["0","' + p0 + '"],["1","' + p1 + '"],["2","' + p2 + '"]]}';
                                        }
                                    }

                                    if ((s[0] == csym || wild.includes(s[0])) && (s[1] == csym || wild.includes(s[1])) && (s[2] == csym || wild.includes(s[2])) && (s[3] == csym || wild.includes(s[3]))) {
                                        let mpl = 1;
                                        if (wild.includes(s[0]) && wild.includes(s[1]) && wild.includes(s[2]) && wild.includes(s[3])) {
                                            mpl = 0;
                                        } else if (wild.includes(s[0]) || wild.includes(s[1]) || wild.includes(s[2]) || wild.includes(s[3])) {
                                            mpl = slotSettings.slotWildMpl;
                                        }
                                        let tmpWin = slotSettings.Paytable['SYM_' + csym][4] * betLine * mpl * bonusMpl;
                                        if (cWins[k] < tmpWin) {
                                            cWins[k] = tmpWin;
                                            tmpStringWin = '{"type":"LineWinAmount","selectedLine":"' + k + '","amount":"' + tmpWin + '","wonSymbols":[["0","' + p0 + '"],["1","' + p1 + '"],["2","' + p2 + '"],["3","' + p3 + '"]]}';
                                        }
                                    }

                                    if ((s[0] == csym || wild.includes(s[0])) && (s[1] == csym || wild.includes(s[1])) && (s[2] == csym || wild.includes(s[2])) && (s[3] == csym || wild.includes(s[3])) && (s[4] == csym || wild.includes(s[4]))) {
                                        let mpl = 1;
                                        if (wild.includes(s[0]) && wild.includes(s[1]) && wild.includes(s[2]) && wild.includes(s[3]) && wild.includes(s[4])) {
                                            mpl = 0;
                                        } else if (wild.includes(s[0]) || wild.includes(s[1]) || wild.includes(s[2]) || wild.includes(s[3]) || wild.includes(s[4])) {
                                            mpl = slotSettings.slotWildMpl;
                                        }
                                        let tmpWin = slotSettings.Paytable['SYM_' + csym][5] * betLine * mpl * bonusMpl;
                                        if (cWins[k] < tmpWin) {
                                            cWins[k] = tmpWin;
                                            tmpStringWin = '{"type":"LineWinAmount","selectedLine":"' + k + '","amount":"' + tmpWin + '","wonSymbols":[["0","' + p0 + '"],["1","' + p1 + '"],["2","' + p2 + '"],["3","' + p3 + '"],["4","' + p4 + '"]]}';
                                        }
                                    }
                                }
                            }

                            if (cWins[k] > 0 && tmpStringWin != '') {
                                lineWins.push(tmpStringWin);
                                totalWin += cWins[k];
                            }
                        }

                        let scattersWin = 0;
                        let scattersWinB = 0;
                        let scattersPos: string[] = [];
                        let scattersCount = 0;
                        let bSym = slotSettings.GetGameData(slotSettings.slotId + 'BonusSymbol');
                        let bSymCnt = 0;

                        for (let r = 1; r <= 5; r++) {
                            for (let p = 0; p <= 2; p++) {
                                if (reels['reel' + r][p] == scatter) {
                                    scattersCount++;
                                    scattersPos.push('["' + (r - 1) + '","' + p + '"]');
                                }
                            }
                        }

                        for (let r = 1; r <= 5; r++) {
                            for (let p = 0; p <= 2; p++) {
                                if (reels['reel' + r][p] == bSym) {
                                    bSymCnt++;
                                    break;
                                }
                            }
                        }

                        if (slotSettings.Paytable['SYM_' + scatter]) {
                             scattersWin = slotSettings.Paytable['SYM_' + scatter][scattersCount] * betLine * lines * bonusMpl;
                        }

                        gameState = 'Ready';
                        if (scattersCount >= 3 && slotSettings.slotBonus) {
                            gameState = 'FreeSpins';
                            let scw = '{"type":"Bonus","bonusName":"FreeSpins","params":{"freeSpins":"' + slotSettings.slotFreeCount + '"},"amount":"' + slotSettings.FormatFloat(scattersWin) + '","wonSymbols":[' + scattersPos.join(',') + ']}';
                            lineWins.push(scw);
                        } else if (scattersCount >= 2) {
                            let scw = '{"wonSymbols":[' + scattersPos.join(',') + '],"amount":"' + slotSettings.FormatFloat(scattersWin) + '","type":"WinAmount"}';
                            lineWins.push(scw);
                        }

                        totalWin += (scattersWin + scattersWinB);

                        if (i > 1000) {
                            winType = 'none';
                        }
                        if (i > 1500) {
                            response = '{"responseEvent":"error","responseType":"","serverResponse":"' + totalWin + ' Bad Reel Strip"}';
                            return response;
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
                            } else {
                                if (i > 1500) {
                                    response = '{"responseEvent":"error","responseType":"","serverResponse":"Bad Reel Strip"}';
                                    return response;
                                }

                                if (scattersCount >= 3 && winType != 'bonus') {
                                    // continue
                                } else if (totalWin <= spinWinLimit && winType == 'bonus') {
                                    let cBank = slotSettings.GetBank(postData['slotEvent']);
                                    if (cBank < spinWinLimit) {
                                        spinWinLimit = cBank;
                                    } else {
                                        break;
                                    }
                                } else if (totalWin > 0 && totalWin <= spinWinLimit && winType == 'win') {
                                    let cBank = slotSettings.GetBank(postData['slotEvent']);
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

                    if (totalWin > 0) {
                        slotSettings.SetBank(postData['slotEvent'], -1 * totalWin, '');
                        slotSettings.SetBalance(totalWin);
                    }

                    let reportWin = totalWin;
                    if (postData['slotEvent'] == 'freespin') {
                        slotSettings.SetGameData(slotSettings.slotId + 'BonusWin', slotSettings.GetGameData(slotSettings.slotId + 'BonusWin') + totalWin);
                        slotSettings.SetGameData(slotSettings.slotId + 'TotalWin', slotSettings.GetGameData(slotSettings.slotId + 'TotalWin') + totalWin);
                    } else {
                        slotSettings.SetGameData(slotSettings.slotId + 'TotalWin', totalWin);
                    }

                    if (scattersCount >= 3) {
                        if (slotSettings.GetGameData(slotSettings.slotId + 'FreeGames') > 0) {
                             slotSettings.SetGameData(slotSettings.slotId + 'FreeGames', slotSettings.GetGameData(slotSettings.slotId + 'FreeGames') + slotSettings.slotFreeCount);
                        } else {
                            slotSettings.SetGameData(slotSettings.slotId + 'FreeStartWin', totalWin);
                            slotSettings.SetGameData(slotSettings.slotId + 'BonusWin', totalWin);
                            slotSettings.SetGameData(slotSettings.slotId + 'FreeGames', slotSettings.slotFreeCount);
                        }
                    }

                    reels = reelsTmp;
                    let jsSpin = '' + JSON.stringify(reels) + '';
                    let jsJack = '' + JSON.stringify(slotSettings.Jackpots) + '';

                    let winString = '';
                    if (totalWin > 0) {
                        winString = ',"slotWin":{"totalWin":"' + totalWin + '","lineWinAmounts":[' + lineWins.join(',') + '],"canGamble":"false"}';
                    } else {
                        winString = '';
                    }

                    response = '{"responseEvent":"spin","responseType":"' + postData['slotEvent'] + '","serverResponse":{"BonusSymbol":' + slotSettings.GetGameData(slotSettings.slotId + 'BonusSymbol') + ',"slotLines":' + lines + ',"slotBet":' + betLine + ',"totalFreeGames":' + slotSettings.GetGameData(slotSettings.slotId + 'FreeGames') + ',"currentFreeGames":' + slotSettings.GetGameData(slotSettings.slotId + 'CurrentFreeGame') + ',"Balance":' + slotSettings.GetBalance() + ',"afterBalance":' + slotSettings.GetBalance() + ',"bonusWin":' + slotSettings.GetGameData(slotSettings.slotId + 'BonusWin') + ',"freeStartWin":' + slotSettings.GetGameData(slotSettings.slotId + 'FreeStartWin') + ',"totalWin":' + totalWin + ',"winLines":[],"bonusInfo":[],"Jackpots":' + jsJack + ',"reelsSymbols":' + jsSpin + '}}';

                    let symb = '["' + reels['reel1'][0] + '","' + reels['reel2'][0] + '","' + reels['reel3'][0] + '","' + reels['reel4'][0] + '","' + reels['reel5'][0] + '"],["' + reels['reel1'][1] + '","' + reels['reel2'][1] + '","' + reels['reel3'][1] + '","' + reels['reel4'][1] + '","' + reels['reel5'][1] + '"],["' + reels['reel1'][2] + '","' + reels['reel2'][2] + '","' + reels['reel3'][2] + '","' + reels['reel4'][2] + '","' + reels['reel5'][2] + '"]';

                    slotSettings.SaveLogReport(response, allbet, lines, reportWin, postData['slotEvent']);

                    if (postData['slotEvent'] == 'freespin') {
                        const bonusWin0 = slotSettings.GetGameData(slotSettings.slotId + 'BonusWin');
                        const freeSpinRemain = slotSettings.GetGameData(slotSettings.slotId + 'FreeGames') - slotSettings.GetGameData(slotSettings.slotId + 'CurrentFreeGame');
                        const freeSpinsTotal = slotSettings.GetGameData(slotSettings.slotId + 'FreeGames');
                        let gameParameters = '';

                        if (slotSettings.GetGameData(slotSettings.slotId + 'FreeGames') <= slotSettings.GetGameData(slotSettings.slotId + 'CurrentFreeGame') && slotSettings.GetGameData(slotSettings.slotId + 'FreeGames') > 0) {
                            gameState = 'Ready';
                            gameParameters = '"gameParameters":{"initialSymbols":[' + slotSettings.GetGameData(slotSettings.slotId + 'initialSymbols') + ']},';
                        }

                        result_tmp.push('{"action":"FreeSpinResponse","result":"true","sesId":"10000228087","data":{' + gameParameters + '"state":"' + gameState + '"' + winString + ',"spinResult":{"type":"SpinResult","rows":[' + symb + ']},"totalBonusWin":"' + slotSettings.FormatFloat(bonusWin0) + '","freeSpinRemain":"' + freeSpinRemain + '","freeSpinsTotal":"' + freeSpinsTotal + '"}}');
                    } else {
                        slotSettings.SetGameData(slotSettings.slotId + 'initialSymbols', symb);
                        result_tmp.push('{"action":"SpinResponse","result":"true","sesId":"10000373695","data":{"spinResult":{"type":"SpinResult","rows":[' + symb + ' ]}' + winString + ',"state":"' + gameState + '"}}');
                    }
                    break;
            }

            return result_tmp.join('------');
        } catch (e) {
            console.error(e);
            return '{"responseEvent":"error","responseType":"' + e + '","serverResponse":"InternalError"}';
        }
    }
}
