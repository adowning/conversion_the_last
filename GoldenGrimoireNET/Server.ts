
import { SlotSettings } from "./SlotSettings";
import { IContext } from "../typescript_base/interfaces";
import { PhpHelpers } from "../typescript_base/php_helpers";

const linesId: number[][] = [
    [2, 2, 2, 2, 2], [3, 3, 3, 3, 3], [1, 1, 1, 1, 1], [4, 4, 4, 4, 4], [4, 3, 2, 3, 4],
    [3, 2, 1, 2, 3], [1, 2, 3, 2, 1], [2, 3, 4, 3, 2], [4, 3, 4, 3, 4], [3, 2, 3, 2, 3],
    [2, 1, 2, 1, 2], [1, 2, 1, 2, 1], [2, 3, 2, 3, 2], [3, 4, 3, 4, 3], [2, 2, 1, 2, 2],
    [3, 3, 2, 3, 3], [4, 4, 3, 4, 4], [3, 3, 4, 3, 3], [2, 2, 3, 2, 2], [1, 1, 2, 1, 1],
    [4, 4, 1, 4, 4], [4, 4, 2, 4, 4], [3, 3, 1, 3, 3], [1, 1, 4, 1, 1], [1, 1, 3, 1, 1],
    [2, 2, 4, 2, 2], [4, 2, 4, 2, 4], [3, 1, 3, 1, 3], [1, 3, 1, 3, 1], [2, 4, 2, 4, 2],
    [1, 2, 2, 2, 1], [2, 3, 3, 3, 2], [3, 4, 4, 4, 3], [4, 3, 3, 3, 4], [3, 2, 2, 2, 3],
    [2, 1, 1, 1, 2], [4, 1, 4, 1, 4], [1, 4, 1, 4, 1], [4, 1, 1, 1, 4], [1, 4, 4, 4, 1]
];

export class Server {
    public get(request: any, context: IContext): string {
        try {
            const slotSettings = new SlotSettings(context.game.name, context.user.id, context);
            if (!slotSettings.is_active()) {
                return '{"responseEvent":"error","responseType":"","serverResponse":"Game is disabled"}';
            }

            const postData = context.postData;
            let balanceInCents = Math.round(slotSettings.GetBalance() * slotSettings.CurrentDenom * 100);
            const result_tmp: string[] = [];
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

            slotSettings.SetGameData('GoldenGrimoireNETBonusWin', 0);
            slotSettings.SetGameData('GoldenGrimoireNETFreeGames', 0);
            slotSettings.SetGameData('GoldenGrimoireNETCurrentFreeGame', 0);
            slotSettings.SetGameData('GoldenGrimoireNETTotalWin', 0);
            slotSettings.SetGameData('GoldenGrimoireNETFreeBalance', 0);

            let freeState = '';
            let curReels = '';

            switch (aid) {
                case 'init':
                    curReels = '&rs.i0.r.i0.syms=SYM' + PhpHelpers.rand(1, 10) + '%2CSYM' + PhpHelpers.rand(1, 10) + '%2CSYM' + PhpHelpers.rand(1, 10) + '%2CSYM' + PhpHelpers.rand(1, 10) + '' + '%2CSYM' + PhpHelpers.rand(1, 10) + '';
                    curReels += ('&rs.i0.r.i1.syms=SYM' + PhpHelpers.rand(1, 10) + '%2CSYM' + PhpHelpers.rand(1, 10) + '%2CSYM' + PhpHelpers.rand(1, 10) + '%2CSYM' + PhpHelpers.rand(1, 10) + '' + '%2CSYM' + PhpHelpers.rand(1, 10) + '');
                    curReels += ('&rs.i0.r.i2.syms=SYM' + PhpHelpers.rand(1, 10) + '%2CSYM' + PhpHelpers.rand(1, 10) + '%2CSYM' + PhpHelpers.rand(1, 10) + '%2CSYM' + PhpHelpers.rand(1, 10) + '' + '%2CSYM' + PhpHelpers.rand(1, 10) + '');
                    curReels += ('&rs.i0.r.i3.syms=SYM' + PhpHelpers.rand(1, 10) + '%2CSYM' + PhpHelpers.rand(1, 10) + '%2CSYM' + PhpHelpers.rand(1, 10) + '%2CSYM' + PhpHelpers.rand(1, 10) + '' + '%2CSYM' + PhpHelpers.rand(1, 10) + '');
                    curReels += ('&rs.i0.r.i4.syms=SYM' + PhpHelpers.rand(1, 10) + '%2CSYM' + PhpHelpers.rand(1, 10) + '%2CSYM' + PhpHelpers.rand(1, 10) + '%2CSYM' + PhpHelpers.rand(1, 10) + '' + '%2CSYM' + PhpHelpers.rand(1, 10) + '');
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

                    for( let d = 0; d < slotSettings.Denominations.length; d++ )
                    {
                        slotSettings.Denominations[d] = slotSettings.Denominations[d] * 100;
                    }

                    if( slotSettings.GetGameData('GoldenGrimoireNETCurrentFreeGame') < slotSettings.GetGameData('GoldenGrimoireNETFreeGames') && slotSettings.GetGameData('GoldenGrimoireNETFreeGames') > 0 )
                    {
                        freeState = 'rs.i1.r.i0.syms=SYM2%2CSYM5%2CSYM5&bl.i6.coins=1&bl.i17.reelset=ALL&rs.i0.nearwin=4&bl.i15.id=15&rs.i0.r.i4.hold=false&gamestate.history=basic%2Cfreespin&rs.i1.r.i2.hold=false&game.win.cents=176&rs.i1.r.i1.overlay.i2.pos=61&staticsharedurl=&bl.i10.line=1%2C2%2C1%2C2%2C1&bl.i0.reelset=ALL&bl.i18.coins=1&bl.i10.id=10&freespins.initial=15&bl.i3.reelset=ALL&bl.i4.line=2%2C1%2C0%2C1%2C2&bl.i13.coins=1&rs.i0.r.i0.syms=SYM5%2CSYM0%2CSYM6&bl.i2.id=2&rs.i1.r.i1.pos=59&rs.i0.r.i0.pos=24&bl.i14.reelset=ALL&game.win.coins=88&rs.i1.r.i0.hold=false&bl.i3.id=3&ws.i1.reelset=freespin&bl.i12.coins=1&bl.i8.reelset=ALL&clientaction=init&rs.i0.r.i2.hold=false&bl.i16.id=16&casinoID=netent&bl.i5.coins=1&rs.i1.r.i1.overlay.i1.row=1&bl.i8.id=8&rs.i0.r.i3.pos=17&bl.i6.line=2%2C2%2C1%2C2%2C2&bl.i12.line=2%2C1%2C2%2C1%2C2&bl.i0.line=1%2C1%2C1%2C1%2C1&rs.i0.r.i2.syms=SYM7%2CSYM6%2CSYM6&rs.i1.r.i1.overlay.i1.with=SYM1_FS&game.win.amount=1.76&betlevel.all=1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10&denomination.all=' + slotSettings.Denominations.join('%2C') + '&ws.i0.reelset=freespin&bl.i1.id=1&rs.i0.r.i3.attention.i0=2&rs.i1.r.i1.overlay.i0.with=SYM1_FS&rs.i1.r.i4.pos=39&denomination.standard=' + (slotSettings.CurrentDenomination * 100) + '&multiplier=1&bl.i14.id=14&bl.i19.line=0%2C2%2C2%2C2%2C0&freespins.denomination=2.000&bl.i12.reelset=ALL&bl.i2.coins=1&bl.i6.id=6&autoplay=10%2C25%2C50%2C75%2C100%2C250%2C500%2C750%2C1000&freespins.totalwin.coins=80&ws.i0.direction=left_to_right&freespins.total=15&gamestate.stack=basic%2Cfreespin&rs.i1.r.i4.syms=SYM5%2CSYM4%2CSYM4&gamesoundurl=&bet.betlevel=1&bl.i5.reelset=ALL&bl.i19.coins=1&bl.i7.id=7&bl.i18.reelset=ALL&playercurrencyiso=' + slotSettings.slotCurrency + '&bl.i1.coins=1&bl.i14.line=1%2C1%2C2%2C1%2C1&freespins.multiplier=1&playforfun=false&jackpotcurrencyiso=' + slotSettings.slotCurrency + '&rs.i0.r.i4.syms=SYM5%2CSYM5%2CSYM0&rs.i0.r.i2.pos=48&bl.i13.line=1%2C1%2C0%2C1%2C1&ws.i1.betline=19&rs.i1.r.i0.pos=20&bl.i0.coins=1&bl.i2.reelset=ALL&rs.i1.r.i1.overlay.i2.row=2&rs.i1.r.i4.hold=false&freespins.left=14&bl.standard=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19&bl.i15.reelset=ALL&rs.i0.r.i3.hold=false&bet.denomination=' + (slotSettings.CurrentDenomination * 100) + '&g4mode=false&bl.i11.line=0%2C1%2C0%2C1%2C0&freespins.win.coins=80&historybutton=false&bl.i5.id=5&gameEventSetters.enabled=false&rs.i1.r.i3.pos=27&rs.i0.r.i1.syms=SYM5%2CSYM1%2CSYM3&bl.i3.coins=1&ws.i1.types.i0.coins=40&bl.i10.coins=1&bl.i18.id=18&ws.i0.betline=3&rs.i1.r.i3.hold=false&totalwin.coins=88&bl.i5.line=0%2C0%2C1%2C0%2C0&gamestate.current=freespin&jackpotcurrency=%26%23x20AC%3B&bl.i7.line=1%2C2%2C2%2C2%2C1&bet.betlines=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19&rs.i0.r.i3.syms=SYM4%2CSYM4%2CSYM0&rs.i1.r.i1.syms=SYM7%2CSYM1_FS%2CSYM5&bl.i16.coins=1&freespins.win.cents=160&bl.i9.coins=1&bl.i7.reelset=ALL&isJackpotWin=false&rs.i1.r.i1.overlay.i0.pos=59&freespins.betlines=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19&rs.i0.r.i1.pos=61&rs.i1.r.i3.syms=SYM3%2CSYM3%2CSYM6&bl.i13.id=13&rs.i0.r.i1.hold=false&ws.i1.types.i0.wintype=coins&bl.i9.line=1%2C0%2C1%2C0%2C1&ws.i1.sym=SYM2&betlevel.standard=1&bl.i10.reelset=ALL&ws.i1.types.i0.cents=80&gameover=false&bl.i11.coins=1&ws.i1.direction=left_to_right&bl.i13.reelset=ALL&bl.i0.id=0&nextaction=freespin&bl.i15.line=0%2C1%2C1%2C1%2C0&bl.i3.line=0%2C1%2C2%2C1%2C0&bl.i19.id=19&bl.i4.reelset=ALL&bl.i4.coins=1&bl.i18.line=2%2C0%2C2%2C0%2C2&freespins.totalwin.cents=160&bl.i9.id=9&bl.i17.line=0%2C2%2C0%2C2%2C0&bl.i11.id=11&freespins.betlevel=1&ws.i0.pos.i2=2%2C2&playercurrency=%26%23x20AC%3B&bl.i9.reelset=ALL&bl.i17.coins=1&ws.i1.pos.i0=0%2C0&ws.i1.pos.i1=2%2C2&ws.i1.pos.i2=1%2C2&ws.i0.pos.i1=1%2C1&bl.i19.reelset=ALL&ws.i0.pos.i0=0%2C0&bl.i11.reelset=ALL&bl.i16.line=2%2C1%2C1%2C1%2C2&rs.i0.id=basic&credit=' + balanceInCents + '&ws.i0.types.i0.coins=40&bl.i1.reelset=ALL&rs.i1.r.i1.overlay.i1.pos=60&rs.i1.r.i1.overlay.i2.with=SYM1_FS&bl.i1.line=0%2C0%2C0%2C0%2C0&ws.i0.sym=SYM2&bl.i17.id=17&rs.i1.r.i2.pos=1&bl.i16.reelset=ALL&ws.i0.types.i0.wintype=coins&nearwinallowed=true&bl.i8.line=1%2C0%2C0%2C0%2C1&rs.i1.r.i1.overlay.i0.row=0&freespins.wavecount=1&rs.i0.r.i4.attention.i0=2&bl.i8.coins=1&bl.i15.coins=1&bl.i2.line=2%2C2%2C2%2C2%2C2&rs.i0.r.i0.attention.i0=1&rs.i1.r.i2.syms=SYM3%2CSYM3%2CSYM2&totalwin.cents=176&rs.i0.r.i0.hold=false&restore=true&rs.i1.id=freespin&bl.i12.id=12&bl.i4.id=4&rs.i0.r.i4.pos=10&bl.i7.coins=1&ws.i0.types.i0.cents=80&bl.i6.reelset=ALL&wavecount=1&bl.i14.coins=1&rs.i1.r.i1.hold=false';
                    }
                    result_tmp.push('bl.i32.reelset=ALL&rs.i1.r.i0.syms=SYM3%2CSYM3%2CSYM3%2CSYM3&bl.i6.coins=0&bl.i17.reelset=ALL&bl.i15.id=15&rs.i0.r.i4.hold=false&rs.i1.r.i2.hold=false&bl.i21.id=21&game.win.cents=0&staticsharedurl=https%3A%2F%2Fstatic-shared.casinomodule.com%2Fgameclient_html%2Fdevicedetection%2Fcurrent&bl.i23.reelset=ALL&bl.i33.coins=0&bl.i10.line=1%2C0%2C1%2C0%2C1&bl.i0.reelset=ALL&bl.i20.coins=0&bl.i18.coins=0&bl.i10.id=10&bl.i3.reelset=ALL&bl.i4.line=3%2C2%2C1%2C2%2C3&bl.i13.coins=0&bl.i26.reelset=ALL&bl.i24.line=0%2C0%2C2%2C0%2C0&bl.i27.id=27&rs.i2.r.i0.hold=false&rs.i0.r.i0.syms=SYM3%2CSYM3%2CSYM6%2CSYM6&bl.i2.id=2&rs.i1.r.i1.pos=0&bl.i38.line=3%2C0%2C0%2C0%2C3&rs.i3.r.i4.pos=0&reelsTriggeredFreeSpin=null&rs.i0.r.i0.pos=0&bl.i14.reelset=ALL&rs.i2.r.i3.pos=0&bl.i38.id=38&bl.i39.coins=0&rs.i5.r.i0.pos=0&rs.i2.r.i4.hold=false&rs.i3.r.i1.pos=0&rs.i2.id=basic2&game.win.coins=0&bl.i28.line=0%2C2%2C0%2C2%2C0&rs.i1.r.i0.hold=false&bl.i3.id=3&bl.i22.line=2%2C2%2C0%2C2%2C2&bl.i12.coins=0&bl.i8.reelset=ALL&clientaction=init&rs.i4.r.i0.hold=false&rs.i0.r.i2.hold=false&rs.i4.r.i3.syms=SYM3%2CSYM3%2CSYM3%2CSYM3&bl.i16.id=16&bl.i37.reelset=ALL&bl.i39.id=39&casinoID=netent&bl.i5.coins=0&rs.i3.r.i2.hold=false&bl.i8.id=8&rs.i5.r.i1.syms=SYM3%2CSYM3%2CSYM3%2CSYM3&rs.i0.r.i3.pos=0&bl.i33.id=33&rs.i4.r.i0.syms=SYM6%2CSYM6%2CSYM6%2CSYM6&rs.i5.r.i3.pos=0&bl.i6.line=0%2C1%2C2%2C1%2C0&bl.i22.id=22&bl.i12.line=1%2C2%2C1%2C2%2C1&bl.i0.line=1%2C1%2C1%2C1%2C1&bl.i29.reelset=ALL&bl.i34.line=2%2C1%2C1%2C1%2C2&rs.i4.r.i2.pos=0&bl.i31.line=1%2C2%2C2%2C2%2C1&rs.i0.r.i2.syms=SYM13%2CSYM13%2CSYM5%2CSYM5&bl.i34.coins=0&game.win.amount=0&betlevel.all=1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10&rs.i5.r.i2.hold=false&denomination.all=' + slotSettings.Denominations.join('%2C') + '&bl.i27.coins=0&bl.i34.reelset=ALL&rs.i2.r.i0.pos=0&bl.i30.reelset=ALL&bl.i1.id=1&rs.i3.r.i2.syms=SYM3%2CSYM3%2CSYM3%2CSYM3&bl.i33.line=3%2C2%2C2%2C2%2C3&bl.i25.id=25&rs.i1.r.i4.pos=0&denomination.standard=' + (slotSettings.CurrentDenomination * 100) + '&rs.i3.id=mystery1&bl.i31.id=31&bl.i32.line=2%2C3%2C3%2C3%2C2&multiplier=1&bl.i14.id=14&bl.i19.line=0%2C0%2C1%2C0%2C0&bl.i12.reelset=ALL&bl.i2.coins=0&bl.i6.id=6&bl.i21.reelset=ALL&autoplay=10%2C25%2C50%2C75%2C100%2C250%2C500%2C750%2C1000&bl.i20.id=20&rs.i1.r.i4.syms=SYM5%2CSYM5%2CSYM5%2CSYM5&gamesoundurl=https%3A%2F%2Fstatic.casinomodule.com%2F&rs.i5.r.i2.syms=SYM6%2CSYM6%2CSYM6%2CSYM6&rs.i5.r.i3.hold=false&rs.i4.r.i2.hold=false&bl.i33.reelset=ALL&bl.i5.reelset=ALL&bl.i24.coins=0&rs.i4.r.i1.syms=SYM7%2CSYM7%2CSYM7%2CSYM7&bl.i19.coins=0&bl.i32.coins=0&bl.i7.id=7&bl.i18.reelset=ALL&rs.i2.r.i4.pos=0&rs.i3.r.i0.syms=SYM6%2CSYM6%2CSYM6%2CSYM6&playercurrencyiso=' + slotSettings.slotCurrency + '&bl.i1.coins=0&bl.i32.id=32&rs.i4.r.i1.hold=false&rs.i3.r.i2.pos=0&bl.i14.line=1%2C1%2C0%2C1%2C1&playforfun=false&jackpotcurrencyiso=' + slotSettings.slotCurrency + '&rs.i0.r.i4.syms=SYM8%2CSYM8%2CSYM8%2CSYM8&bl.i25.coins=0&rs.i0.r.i2.pos=0&bl.i39.reelset=ALL&bl.i13.line=2%2C3%2C2%2C3%2C2&bl.i24.reelset=ALL&rs.i1.r.i0.pos=0&bl.i0.coins=20&rs.i2.r.i0.syms=SYM10%2CSYM10%2CSYM10%2CSYM10&bl.i2.reelset=ALL&bl.i31.coins=0&bl.i37.id=37&rs.i3.r.i1.syms=SYM8%2CSYM8%2CSYM8%2CSYM8&rs.i1.r.i4.hold=false&rs.i4.r.i1.pos=0&bl.i26.coins=0&rs.i4.r.i2.syms=SYM9%2CSYM9%2CSYM9%2CSYM9&bl.i27.reelset=ALL&bl.standard=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19%2C20%2C21%2C22%2C23%2C24%2C25%2C26%2C27%2C28%2C29%2C30%2C31%2C32%2C33%2C34%2C35%2C36%2C37%2C38%2C39&bl.i29.line=1%2C3%2C1%2C3%2C1&rs.i5.r.i3.syms=SYM6%2CSYM6%2CSYM7%2CSYM7&rs.i3.r.i0.hold=false&bl.i23.line=0%2C0%2C3%2C0%2C0&bl.i26.id=26&bl.i15.reelset=ALL&rs.i0.r.i3.hold=false&rs.i5.r.i4.pos=0&rs.i4.id=basic1&rs.i2.r.i1.hold=false&gameServerVersion=1.0.1&g4mode=false&bl.i11.line=0%2C1%2C0%2C1%2C0&bl.i30.id=30&historybutton=false&bl.i25.line=1%2C1%2C3%2C1%2C1&bl.i5.id=5&gameEventSetters.enabled=false&bl.i36.reelset=ALL&rs.i1.r.i3.pos=0&rs.i0.r.i1.syms=SYM8%2CSYM8%2CSYM10%2CSYM10&bl.i3.coins=0&bl.i10.coins=0&bl.i18.id=18&rs.i2.r.i1.pos=0&rs.i4.r.i4.pos=0&bl.i30.coins=0&bl.i39.line=0%2C3%2C3%2C3%2C0&rs.i1.r.i3.hold=false&totalwin.coins=0&rs.i5.r.i4.syms=SYM6%2CSYM6%2CSYM3%2CSYM3&bl.i5.line=2%2C1%2C0%2C1%2C2&gamestate.current=basic&bl.i28.coins=0&rs.i4.r.i0.pos=0&bl.i27.line=2%2C0%2C2%2C0%2C2&jackpotcurrency=%26%23x20AC%3B&bl.i7.line=1%2C2%2C3%2C2%2C1&bl.i35.id=35&rs.i3.r.i1.hold=false&rs.i0.r.i3.syms=SYM8%2CSYM8%2CSYM8%2CSYM8&rs.i1.r.i1.syms=SYM7%2CSYM7%2CSYM5%2CSYM5&bl.i16.coins=0&bl.i36.coins=0&bl.i9.coins=0&bl.i30.line=0%2C1%2C1%2C1%2C0&bl.i7.reelset=ALL&isJackpotWin=false&rs.i2.r.i3.hold=false&bl.i24.id=24&rs.i0.r.i1.pos=0&rs.i4.r.i4.syms=SYM3%2CSYM3%2CSYM9%2CSYM9&bl.i22.coins=0&rs.i1.r.i3.syms=SYM5%2CSYM5%2CSYM5%2CSYM5&bl.i29.coins=0&bl.i31.reelset=ALL&bl.i13.id=13&bl.i36.id=36&rs.i0.r.i1.hold=false&rs.i2.r.i1.syms=SYM8%2CSYM8%2CSYM8%2CSYM8&bl.i9.line=2%2C1%2C2%2C1%2C2&bl.i35.coins=0&betlevel.standard=1&bl.i10.reelset=ALL&gameover=true&rs.i3.r.i3.pos=0&bl.i25.reelset=ALL&rs.i5.id=freespin2&bl.i23.coins=0&bl.i11.coins=0&rs.i5.r.i1.hold=false&bl.i22.reelset=ALL&rs.i5.r.i4.hold=false&bl.i13.reelset=ALL&bl.i0.id=0&nextaction=spin&bl.i15.line=2%2C2%2C1%2C2%2C2&bl.i3.line=3%2C3%2C3%2C3%2C3&bl.i19.id=19&bl.i4.reelset=ALL&bl.i4.coins=0&bl.i37.line=0%2C3%2C0%2C3%2C0&bl.i18.line=1%2C1%2C2%2C1%2C1&bl.i9.id=9&bl.i34.id=34&bl.i17.line=2%2C2%2C3%2C2%2C2&bl.i11.id=11&bl.i37.coins=0&rs.i4.r.i3.pos=0&playercurrency=%26%23x20AC%3B&bl.i9.reelset=ALL&rs.i4.r.i4.hold=false&bl.i17.coins=0&bl.i28.id=28&rs.i5.r.i0.syms=SYM9%2CSYM9%2CSYM9%2CSYM9&bl.i19.reelset=ALL&rs.i2.r.i4.syms=SYM9%2CSYM9%2CSYM9%2CSYM9&rs.i4.r.i3.hold=false&bl.i11.reelset=ALL&bl.i16.line=3%2C3%2C2%2C3%2C3&rs.i0.id=freespin1&bl.i38.reelset=ALL&credit=' + balanceInCents + '&bl.i21.line=3%2C3%2C1%2C3%2C3&bl.i35.line=1%2C0%2C0%2C0%2C1&bl.i1.reelset=ALL&rs.i2.r.i2.pos=0&bl.i21.coins=0&bl.i28.reelset=ALL&rs.i5.r.i1.pos=0&bl.i1.line=2%2C2%2C2%2C2%2C2&bl.i17.id=17&rs.i2.r.i2.syms=SYM10%2CSYM10%2CSYM10%2CSYM10&rs.i1.r.i2.pos=0&bl.i16.reelset=ALL&rs.i3.r.i3.syms=SYM3%2CSYM3%2CSYM6%2CSYM6&rs.i3.r.i4.hold=false&rs.i5.r.i0.hold=false&nearwinallowed=true&bl.i8.line=3%2C2%2C3%2C2%2C3&bl.i35.reelset=ALL&rs.i3.r.i3.hold=false&bl.i8.coins=0&bl.i23.id=23&bl.i15.coins=0&bl.i36.line=3%2C0%2C3%2C0%2C3&bl.i2.line=0%2C0%2C0%2C0%2C0&rs.i1.r.i2.syms=SYM6%2CSYM6%2CSYM6%2CSYM6&totalwin.cents=0&bl.i38.coins=0&rs.i5.r.i2.pos=0&rs.i0.r.i0.hold=false&rs.i2.r.i3.syms=SYM6%2CSYM6%2CSYM10%2CSYM10&restore=false&rs.i1.id=mystery2&rs.i3.r.i4.syms=SYM10%2CSYM10%2CSYM10%2CSYM10&bl.i12.id=12&bl.i29.id=29&bl.i4.id=4&rs.i0.r.i4.pos=0&bl.i7.coins=0&bl.i6.reelset=ALL&rs.i3.r.i0.pos=0&bl.i20.line=3%2C3%2C0%2C3%2C3&rs.i2.r.i2.hold=false&bl.i20.reelset=ALL&wavecount=1&bl.i14.coins=0&rs.i1.r.i1.hold=false&bl.i26.line=3%2C1%2C3%2C1%2C3' + curReels + freeState);
                    break;
                case 'spin':
                    const lines = 20;
                    slotSettings.CurrentDenom = postData['bet_denomination'];
                    slotSettings.CurrentDenomination = postData['bet_denomination'];

                    let betline = 0;
                    let allbet = 0;
                    let bonusMpl = 1;

                    if (postData['slotEvent'] != 'freespin') {
                         betline = parseFloat(postData['bet_betlevel']);
                         allbet = betline * lines;
                         slotSettings.UpdateJackpots(allbet);

                         if (!postData['slotEvent']) postData['slotEvent'] = 'bet';

                         slotSettings.SetBalance(-1 * allbet, postData['slotEvent']);
                         const bankSum = allbet / 100 * slotSettings.GetPercent();
                         slotSettings.SetBank((postData['slotEvent'] ? postData['slotEvent'] : ''), bankSum, postData['slotEvent']);
                         slotSettings.UpdateJackpots(allbet);

                         slotSettings.SetGameData('GoldenGrimoireNETBonusWin', 0);
                         slotSettings.SetGameData('GoldenGrimoireNETFreeGames', 0);
                         slotSettings.SetGameData('GoldenGrimoireNETCurrentFreeGame', 0);
                         slotSettings.SetGameData('GoldenGrimoireNETTotalWin', 0);
                         slotSettings.SetGameData('GoldenGrimoireNETBet', betline);
                         slotSettings.SetGameData('GoldenGrimoireNETDenom', postData['bet_denomination']);
                         slotSettings.SetGameData('GoldenGrimoireNETFreeBalance', (slotSettings.GetBalance() * 100).toFixed(2));
                         bonusMpl = 1;
                    } else {
                        postData['bet_denomination'] = slotSettings.GetGameData('GoldenGrimoireNETDenom');
                        slotSettings.CurrentDenom = postData['bet_denomination'];
                        slotSettings.CurrentDenomination = postData['bet_denomination'];
                        betline = slotSettings.GetGameData('GoldenGrimoireNETBet');
                        allbet = betline * lines;
                        slotSettings.SetGameData('GoldenGrimoireNETCurrentFreeGame', slotSettings.GetGameData('GoldenGrimoireNETCurrentFreeGame') + 1);
                        bonusMpl = slotSettings.slotFreeMpl;
                    }

                    const winTypeTmp = slotSettings.GetSpinSettings(postData['slotEvent'], allbet, lines);
                    let winType = winTypeTmp[0];
                    let spinWinLimit = winTypeTmp[1];

                    balanceInCents = Math.round(slotSettings.GetBalance() * slotSettings.CurrentDenom * 100);

                    let totalWin = 0;
                    let lineWins: string[] = [];
                    let reels: any = {};
                    let reelsTmp: any = {};
                    let overlaySym = '';
                    let scattersCount = 0;
                    let scattersStr = '';
                    let overlayCnt = 0;

                    for (let i = 0; i <= 2000; i++) {
                        totalWin = 0;
                        lineWins = [];
                        const cWins = new Array(40).fill(0);
                        const wild = ['1'];
                        const scatter = '0';

                        reels = slotSettings.GetReelStrips(winType, postData['slotEvent']);
                        reelsTmp = JSON.parse(JSON.stringify(reels));

                        overlaySym = '';
                        overlayCnt = 0;
                        const overlayRandomSymArr = [1, 6, 7, 8, 9, 10];
                        // Shuffle
                        this.shuffle(overlayRandomSymArr);
                        const overlayRandomSym = overlayRandomSymArr[0];

                        for (let r = 1; r <= 5; r++) {
                            for (let p = 0; p <= 3; p++) {
                                if (reels['reel' + r][p] == 13) {
                                    overlaySym += ('&rs.i0.r.i' + (r - 1) + '.overlay.i' + overlayCnt + '.pos=59&rs.i0.r.i' + (r - 1) + '.overlay.i' + overlayCnt + '.row=' + p + '&rs.i0.r.i' + (r - 1) + '.overlay.i' + overlayCnt + '.with=SYM' + overlayRandomSym + '');
                                    reels['reel' + r][p] = overlayRandomSym;
                                    if (reels['reel1'][p] == overlayRandomSym) {
                                        for (let rr = r; rr >= 1; rr--) {
                                            reels['reel' + rr][p] = overlayRandomSym;
                                        }
                                    }
                                    overlayCnt++;
                                }
                            }
                        }

                        let winLineCount = 0;
                        for (let k = 0; k < lines; k++) {
                            let tmpStringWin = '';
                            for (let j = 0; j < (slotSettings.SymbolGame as string[]).length; j++) {
                                const csym = (slotSettings.SymbolGame as string[])[j];
                                if (csym == scatter || !slotSettings.Paytable['SYM_' + csym]) {
                                    continue;
                                } else {
                                    const s: any[] = [];
                                    s[0] = reels['reel1'][linesId[k][0] - 1];
                                    s[1] = reels['reel2'][linesId[k][1] - 1];
                                    s[2] = reels['reel3'][linesId[k][2] - 1];
                                    s[3] = reels['reel4'][linesId[k][3] - 1];
                                    s[4] = reels['reel5'][linesId[k][4] - 1];

                                    const isWildSym = (sym: any) => sym == csym || wild.indexOf(sym) !== -1;

                                    if (isWildSym(s[0]) && isWildSym(s[1]) && isWildSym(s[2])) {
                                        let mpl = 1;
                                        if (wild.indexOf(s[0]) !== -1 && wild.indexOf(s[1]) !== -1 && wild.indexOf(s[2]) !== -1) {
                                            mpl = 1;
                                        } else if (wild.indexOf(s[0]) !== -1 || wild.indexOf(s[1]) !== -1 || wild.indexOf(s[2]) !== -1) {
                                            mpl = slotSettings.slotWildMpl;
                                        }

                                        const tmpWin = slotSettings.Paytable['SYM_' + csym][3] * betline * mpl * bonusMpl;
                                        if (cWins[k] < tmpWin) {
                                            cWins[k] = tmpWin;
                                            tmpStringWin = '&ws.i' + winLineCount + '.reelset=basic&ws.i' + winLineCount + '.types.i0.coins=' + tmpWin + '&ws.i' + winLineCount + '.pos.i0=0%2C' + (linesId[k][0] - 1) + '&ws.i' + winLineCount + '.pos.i1=1%2C' + (linesId[k][1] - 1) + '&ws.i' + winLineCount + '.pos.i2=2%2C' + (linesId[k][2] - 1) + '&ws.i' + winLineCount + '.types.i0.wintype=coins&ws.i' + winLineCount + '.betline=' + k + '&ws.i' + winLineCount + '.sym=SYM' + csym + '&ws.i' + winLineCount + '.direction=left_to_right&ws.i' + winLineCount + '.types.i0.cents=' + (tmpWin * slotSettings.CurrentDenomination * 100) + '';
                                        }
                                    }

                                    if (isWildSym(s[0]) && isWildSym(s[1]) && isWildSym(s[2]) && isWildSym(s[3])) {
                                        let mpl = 1;
                                        if (wild.indexOf(s[0]) !== -1 && wild.indexOf(s[1]) !== -1 && wild.indexOf(s[2]) !== -1 && wild.indexOf(s[3]) !== -1) {
                                            mpl = 1;
                                        } else if (wild.indexOf(s[0]) !== -1 || wild.indexOf(s[1]) !== -1 || wild.indexOf(s[2]) !== -1 || wild.indexOf(s[3]) !== -1) {
                                            mpl = slotSettings.slotWildMpl;
                                        }

                                        const tmpWin = slotSettings.Paytable['SYM_' + csym][4] * betline * mpl * bonusMpl;
                                        if (cWins[k] < tmpWin) {
                                            cWins[k] = tmpWin;
                                            tmpStringWin = '&ws.i' + winLineCount + '.reelset=basic&ws.i' + winLineCount + '.types.i0.coins=' + tmpWin + '&ws.i' + winLineCount + '.pos.i0=0%2C' + (linesId[k][0] - 1) + '&ws.i' + winLineCount + '.pos.i1=1%2C' + (linesId[k][1] - 1) + '&ws.i' + winLineCount + '.pos.i2=2%2C' + (linesId[k][2] - 1) + '&ws.i' + winLineCount + '.pos.i3=3%2C' + (linesId[k][3] - 1) + '&ws.i' + winLineCount + '.types.i0.wintype=coins&ws.i' + winLineCount + '.betline=' + k + '&ws.i' + winLineCount + '.sym=SYM' + csym + '&ws.i' + winLineCount + '.direction=left_to_right&ws.i' + winLineCount + '.types.i0.cents=' + (tmpWin * slotSettings.CurrentDenomination * 100) + '';
                                        }
                                    }

                                    if (isWildSym(s[0]) && isWildSym(s[1]) && isWildSym(s[2]) && isWildSym(s[3]) && isWildSym(s[4])) {
                                        let mpl = 1;
                                        if (wild.indexOf(s[0]) !== -1 && wild.indexOf(s[1]) !== -1 && wild.indexOf(s[2]) !== -1 && wild.indexOf(s[3]) !== -1 && wild.indexOf(s[4]) !== -1) {
                                            mpl = 1;
                                        } else if (wild.indexOf(s[0]) !== -1 || wild.indexOf(s[1]) !== -1 || wild.indexOf(s[2]) !== -1 || wild.indexOf(s[3]) !== -1 || wild.indexOf(s[4]) !== -1) {
                                            mpl = slotSettings.slotWildMpl;
                                        }

                                        const tmpWin = slotSettings.Paytable['SYM_' + csym][5] * betline * mpl * bonusMpl;
                                        if (cWins[k] < tmpWin) {
                                            cWins[k] = tmpWin;
                                            tmpStringWin = '&ws.i' + winLineCount + '.reelset=basic&ws.i' + winLineCount + '.types.i0.coins=' + tmpWin + '&ws.i' + winLineCount + '.pos.i0=0%2C' + (linesId[k][0] - 1) + '&ws.i' + winLineCount + '.pos.i1=1%2C' + (linesId[k][1] - 1) + '&ws.i' + winLineCount + '.pos.i2=2%2C' + (linesId[k][2] - 1) + '&ws.i' + winLineCount + '.pos.i3=3%2C' + (linesId[k][3] - 1) + '&ws.i' + winLineCount + '.pos.i4=4%2C' + (linesId[k][4] - 1) + '&ws.i' + winLineCount + '.types.i0.wintype=coins&ws.i' + winLineCount + '.betline=' + k + '&ws.i' + winLineCount + '.sym=SYM' + csym + '&ws.i' + winLineCount + '.direction=left_to_right&ws.i' + winLineCount + '.types.i0.cents=' + (tmpWin * slotSettings.CurrentDenomination * 100) + '';
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

                        let scattersWin = 0;
                        scattersStr = '';
                        scattersCount = 0;
                        const scPos: string[] = [];

                        for (let r = 1; r <= 5; r++) {
                            for (let p = 0; p <= 3; p++) {
                                if (reels['reel' + r][p] == scatter) {
                                    scattersCount++;
                                    scPos.push('&ws.i0.pos.i' + (r - 1) + '=' + (r - 1) + '%2C' + p + '');
                                }
                            }
                        }

                        if (scattersCount >= 3) {
                            scattersStr = '&ws.i0.types.i0.freespins=' + slotSettings.slotFreeCount[scattersCount] + '&ws.i0.reelset=basic&ws.i0.betline=null&ws.i0.types.i0.wintype=freespins&ws.i0.direction=none' + scPos.join('');
                        }

                        totalWin += scattersWin;

                        if (i > 1000) {
                            winType = 'none';
                        }
                        if (i > 1500) {
                            return '{"responseEvent":"error","responseType":"' + postData['slotEvent'] + '","serverResponse":"Bad Reel Strip"}';
                        }

                        if (slotSettings.MaxWin < (totalWin * slotSettings.CurrentDenom)) {
                             // retry
                        } else {
                            let minWin = slotSettings.GetRandomPay();
                            if (i > 700) minWin = 0;

                            if (slotSettings.increaseRTP && winType == 'win' && totalWin < (minWin * allbet)) {
                                // retry
                            } else if (scattersCount >= 3 && winType != 'bonus') {
                                // retry
                            } else if (totalWin <= spinWinLimit && winType == 'bonus') {
                                const cBank = slotSettings.GetBank(postData['slotEvent'] || '');
                                if (cBank < spinWinLimit) {
                                    spinWinLimit = cBank;
                                } else {
                                    break;
                                }
                            } else if (totalWin > 0 && totalWin <= spinWinLimit && winType == 'win') {
                                const cBank = slotSettings.GetBank(postData['slotEvent'] || '');
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
                        slotSettings.SetBank((postData['slotEvent'] ? postData['slotEvent'] : ''), -1 * totalWin);
                        slotSettings.SetBalance(totalWin);
                    }

                    reels = reelsTmp;
                    const reportWin = totalWin;

                    curReels = '&rs.i0.r.i0.syms=SYM' + reels['reel1'][0] + '%2CSYM' + reels['reel1'][1] + '%2CSYM' + reels['reel1'][2] + '' + '%2CSYM' + reels['reel1'][3] + '';
                    curReels += ('&rs.i0.r.i1.syms=SYM' + reels['reel2'][0] + '%2CSYM' + reels['reel2'][1] + '%2CSYM' + reels['reel2'][2] + '' + '%2CSYM' + reels['reel2'][3] + '');
                    curReels += ('&rs.i0.r.i2.syms=SYM' + reels['reel3'][0] + '%2CSYM' + reels['reel3'][1] + '%2CSYM' + reels['reel3'][2] + '' + '%2CSYM' + reels['reel3'][3] + '');
                    curReels += ('&rs.i0.r.i3.syms=SYM' + reels['reel4'][0] + '%2CSYM' + reels['reel4'][1] + '%2CSYM' + reels['reel4'][2] + '' + '%2CSYM' + reels['reel4'][3] + '');
                    curReels += ('&rs.i0.r.i4.syms=SYM' + reels['reel5'][0] + '%2CSYM' + reels['reel5'][1] + '%2CSYM' + reels['reel5'][2] + '' + '%2CSYM' + reels['reel5'][3] + '');

                    if (postData['slotEvent'] == 'freespin') {
                        slotSettings.SetGameData('GoldenGrimoireNETBonusWin', slotSettings.GetGameData('GoldenGrimoireNETBonusWin') + totalWin);
                        slotSettings.SetGameData('GoldenGrimoireNETTotalWin', slotSettings.GetGameData('GoldenGrimoireNETTotalWin') + totalWin);
                    } else {
                        slotSettings.SetGameData('GoldenGrimoireNETTotalWin', totalWin);
                    }

                    let fs = 0;
                    if (scattersCount >= 3) {
                        slotSettings.SetGameData('GoldenGrimoireNETFreeStartWin', totalWin);
                        slotSettings.SetGameData('GoldenGrimoireNETBonusWin', totalWin);
                        slotSettings.SetGameData('GoldenGrimoireNETFreeGames', slotSettings.slotFreeCount[scattersCount]);
                        fs = slotSettings.GetGameData('GoldenGrimoireNETFreeGames');
                    }

                    const winString = lineWins.join('');
                    const jsSpin = JSON.stringify(reels);
                    const jsJack = JSON.stringify(slotSettings.Jackpots);

                    let state = 'idle';
                    let gameover = 'true';
                    let nextaction = 'spin';
                    if (totalWin > 0) {
                        state = 'gamble';
                        gameover = 'true';
                    }

                    if (postData['slotEvent'] == 'freespin') {
                        totalWin = slotSettings.GetGameData('GoldenGrimoireNETBonusWin');
                        let stack = 'basic';
                        let gamestate = 'basic';
                        if (slotSettings.GetGameData(slotSettings.slotId + 'FreeGames') <= slotSettings.GetGameData(slotSettings.slotId + 'CurrentFreeGame') && slotSettings.GetGameData('GoldenGrimoireNETBonusWin') > 0) {
                            nextaction = 'spin';
                            stack = 'basic';
                            gamestate = 'basic';
                        } else {
                            gamestate = 'freespin';
                            nextaction = 'freespin';
                            stack = 'basic%2Cfreespin';
                        }
                        const fsTotal = slotSettings.GetGameData('GoldenGrimoireNETFreeGames');
                        const fsl = fsTotal - slotSettings.GetGameData('GoldenGrimoireNETCurrentFreeGame');

                        freeState = '&freespins.betlines=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19&freespins.totalwin.cents=0&nextaction=' + nextaction + '&freespins.left=' + fsl + '&freespins.wavecount=1&freespins.multiplier=1&gamestate.stack=' + stack + '&freespins.totalwin.coins=' + totalWin + '&freespins.total=' + fsTotal + '&freespins.win.cents=' + (totalWin / slotSettings.CurrentDenomination * 100) + '&gamestate.current=' + gamestate + '&freespins.initial=' + fsTotal + '&freespins.win.coins=' + totalWin + '&freespins.betlevel=' + slotSettings.GetGameData('GoldenGrimoireNETBet') + '&totalwin.coins=' + totalWin + '&credit=' + balanceInCents + '&totalwin.cents=' + (totalWin * slotSettings.CurrentDenomination * 100) + '&game.win.amount=' + (totalWin / slotSettings.CurrentDenomination) + '';
                        curReels += freeState;
                    }

                    const response = '{"responseEvent":"spin","responseType":"' + postData['slotEvent'] + '","serverResponse":{"freeState":"' + freeState + '","slotLines":' + lines + ',"slotBet":' + betline + ',"totalFreeGames":' + slotSettings.GetGameData('GoldenGrimoireNETFreeGames') + ',"currentFreeGames":' + slotSettings.GetGameData('GoldenGrimoireNETCurrentFreeGame') + ',"Balance":' + balanceInCents + ',"afterBalance":' + balanceInCents + ',"bonusWin":' + slotSettings.GetGameData('GoldenGrimoireNETBonusWin') + ',"totalWin":' + totalWin + ',"winLines":[],"Jackpots":' + jsJack + ',"reelsSymbols":' + jsSpin + '}}';
                    slotSettings.SaveLogReport(response, allbet, lines, reportWin, postData['slotEvent']);
                    balanceInCents = Math.round(slotSettings.GetBalance() * slotSettings.CurrentDenom * 100);

                    if (scattersCount >= 3) {
                        result_tmp.push('freespins.betlevel=1&ws.i0.pos.i2=2%2C1&gameServerVersion=1.0.1&g4mode=false&freespins.win.coins=0&playercurrency=%26%23x20AC%3B&rs.i0.nearwin=4&historybutton=false&current.rs.i0=freespin&rs.i0.r.i4.hold=false&ws.i0.types.i0.freespins=8&ws.i0.reelset=basic1&next.rs=freespin&gamestate.history=basic&ws.i0.pos.i1=4%2C2&ws.i0.pos.i0=0%2C0&rs.i0.r.i1.syms=SYM7%2CSYM7%2CSYM7%2CSYM7&game.win.cents=0&ws.i0.betline=null&rs.i0.id=basic1&totalwin.coins=0&credit=501500&gamestate.current=freespin&freespins.initial=8&jackpotcurrency=%26%23x20AC%3B&multiplier=1&freespins.denomination=5.000&rs.i0.r.i0.syms=SYM0%2CSYM7%2CSYM7%2CSYM7&rs.i0.r.i3.syms=SYM7%2CSYM7%2CSYM3%2CSYM3&freespins.win.cents=0&ws.i0.sym=SYM0&freespins.totalwin.coins=0&freespins.total=8&ws.i0.direction=none&isJackpotWin=false&gamestate.stack=basic%2Cfreespin&rs.i0.r.i0.pos=152&freespins.betlines=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19%2C20%2C21%2C22%2C23%2C24%2C25%2C26%2C27%2C28%2C29%2C30%2C31%2C32%2C33%2C34%2C35%2C36%2C37%2C38%2C39&gamesoundurl=&ws.i0.types.i0.wintype=freespins&cjpUrl=&rs.i0.r.i1.pos=32&game.win.coins=0&playercurrencyiso=' + slotSettings.slotCurrency + '&rs.i0.r.i1.hold=false&freespins.wavecount=1&freespins.multiplier=1&playforfun=false&jackpotcurrencyiso=' + slotSettings.slotCurrency + '&clientaction=spin&rs.i0.r.i2.hold=false&rs.i0.r.i4.syms=SYM10%2CSYM10%2CSYM0%2CSYM3&rs.i0.r.i2.pos=108&totalwin.cents=0&gameover=false&rs.i0.r.i0.hold=false&rs.i0.r.i3.pos=72&freespins.left=8&rs.i0.r.i4.pos=85&nextaction=freespin&wavecount=1&ws.i0.types.i0.multipliers=1&rs.i0.r.i2.syms=SYM6%2CSYM0%2CSYM9%2CSYM9&rs.i0.r.i3.hold=false&game.win.amount=0.00&freespins.totalwin.cents=0' + curReels + winString + overlaySym);
                    } else {
                        result_tmp.push('rs.i0.r.i1.pos=18&g4mode=false&game.win.coins=' + totalWin + '&playercurrency=%26%23x20AC%3B&playercurrencyiso=' + slotSettings.slotCurrency + '&historybutton=false&rs.i0.r.i1.hold=false&rs.i0.r.i4.hold=false&gamestate.history=basic&playforfun=false&jackpotcurrencyiso=' + slotSettings.slotCurrency + '&clientaction=spin&rs.i0.r.i2.hold=false&game.win.cents=' + (totalWin * slotSettings.CurrentDenomination * 100) + '&rs.i0.r.i2.pos=47&rs.i0.id=basic&totalwin.coins=' + totalWin + '&credit=' + balanceInCents + '&totalwin.cents=' + (totalWin * slotSettings.CurrentDenomination * 100) + '&gamestate.current=basic&gameover=true&rs.i0.r.i0.hold=false&jackpotcurrency=%26%23x20AC%3B&multiplier=1&rs.i0.r.i3.pos=4&rs.i0.r.i4.pos=5&isJackpotWin=false&gamestate.stack=basic&nextaction=spin&rs.i0.r.i0.pos=7&wavecount=1&gamesoundurl=&rs.i0.r.i3.hold=false&game.win.amount=' + (totalWin / slotSettings.CurrentDenomination) + '' + curReels + winString + overlaySym);
                    }
                    break;
            }

            slotSettings.SaveGameData();
            slotSettings.SaveGameDataStatic();

            return result_tmp[0];

        } catch (e) {
            console.error(e);
            return '{"responseEvent":"error","responseType":"","serverResponse":"InternalError"}';
        }
    }

    private shuffle(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = PhpHelpers.rand(0, i);
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}
