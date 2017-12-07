/// <reference path="phaser.d.ts"/>
/// <reference path="Config.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HomeMenu = (function (_super) {
    __extends(HomeMenu, _super);
    function HomeMenu(game) {
        _super.call(this, game, 0, 0, '');
        this.GTstyle = { font: "30px kabel", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle" };
        this.Pstyle = { font: "48px kabel", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle" };
        this._Title = this.game.make.sprite(this.game.world.centerX, -10, 'logo_ver_en');
        this._Title.anchor.set(0.5, 0);
        this._Title.scale.set(0.8, 0.8);
        this.addChild(this._Title);
        this.AddFiveButtons();
        this._GameTime = this.game.make.button(0, 0, 'GT', this.Action, this);
        this._GameTime.anchor.set(0, 0.5);
        this._GameTime.x = 25;
        this._GameTime.y = this.game.world.height * 7.2 / 8;
        this._GameTime.name = "GameTime";
        this.GameTimeText = this.game.make.text(0, 0, 'GAME\nTIMER', this.GTstyle);
        this.GameTimeText.x = this._GameTime.x + (this._GameTime.width / 2);
        this.GameTimeText.y = this._GameTime.y - 14;
        this.GameTimeText.anchor.set(0.5, 0.5);
        var s0 = MINS.toString();
        if (s0.length == 1) {
            s0 = "0" + s0;
        }
        this.GameTimeText2 = this.game.make.text(0, 0, s0 + ':00', this.GTstyle);
        this.GameTimeText2.x = this.GameTimeText.x;
        this.GameTimeText2.y = this._GameTime.y + 46;
        this.GameTimeText2.anchor.set(0.5, 0.5);
        this.addChild(this._GameTime);
        this.addChild(this.GameTimeText);
        this.addChild(this.GameTimeText2);
        this._Play = this.game.make.button(this.game.world.centerX, 0, 'button', this.Action, this);
        this._Play.anchor.set(0.5, 0.5);
        this._Play.y = this.game.world.height * 7.2 / 8;
        this._Play.name = "PLAY";
        this.PlayText = this.game.make.text(0, 0, Translate('Play = '), this.Pstyle);
        this.PlayText.anchor.set(0.5, 0.5);
        this.PlayText.x = this._Play.x;
        this.PlayText.y = this._Play.y;
        ScaleTextWidth(this.PlayText, this._Play.width - 20);
        this.addChild(this._Play);
        this.addChild(this.PlayText);
        this._Settings = this.game.make.button(0, 0, 'button_gear');
        this._Settings.anchor.set(0, 0.5);
        this._Settings.y = this.game.world.height * 7.2 / 8;
        this._Settings.x = this.game.world.width - this._Settings.width - 64;
        this.addChild(this._Settings);
        this._Settings.scale.set(1.2, 1.2);
        game.add.existing(this);
        this.Fcounter = 0;
        this.FontTimerEvent = this.game.time.events.loop(Phaser.Timer.SECOND * 0.2, this.CheckFont, this);
    }
    HomeMenu.prototype.Action = function (bt) {
        var Enable;
        if (bt.alpha == 0) {
            bt.alpha = 1;
            Enable = true;
        }
        else {
            bt.alpha = 0;
            Enable = false;
        }
        //console.log(bt.name)
        if (bt.name == "bt1") {
            List1Selected = Enable;
            Callback1();
        }
        else if (bt.name == "bt2") {
            List2Selected = Enable;
            Callback1();
        }
        else if (bt.name == "bt3") {
            List3Selected = Enable;
            Callback1();
        }
        else if (bt.name == "bt4") {
            List4Selected = Enable;
            Callback1();
        }
        else if (bt.name == "bt5") {
            List5Selected = Enable;
            Callback1();
        }
        else if (bt.name == "GameTime") {
            SFT[2] = Enable;
            RunUpdate_Settings = true;
        }
        else if (bt.name == "PLAY") {
            StartPlay = true;
        }
        this._Play.alpha = 1;
    };
    HomeMenu.prototype.CheckFont = function () {
        this.GameTimeText.setStyle(this.GTstyle);
        this.GameTimeText2.setStyle(this.GTstyle);
        this.PlayText.setStyle(this.Pstyle);
        //  console.log("v",this.Fcounter);
        this.Fcounter++;
        if (this.Fcounter > 10) {
            this.FontTimerEvent.timer.removeAll();
        }
    };
    HomeMenu.prototype.UpdateGameTimeText = function () {
        var s0 = MINS.toString();
        if (s0.length == 1) {
            s0 = "0" + s0;
        }
        this.GameTimeText2.text = s0 + ':00';
    };
    HomeMenu.prototype.SetPlayText = function (N) {
        //console.log("Translate('Play = ')",Translate('Play = '));
        if (N != 0) {
            if (Translate('Play = ')) {
                this.PlayText.text = Translate('Play = ') + ' ' + N.toString();
            }
        }
        else {
            if (Translate('Play = ')) {
                this.PlayText.text = Translate('Play = ');
            }
        }
        this.PlayText.x = this._Play.x;
        this.PlayText.y = this._Play.y;
        //correct text size
        //console.log("***",this.PlayText.width,this._Play.width);
        this.PlayText.scale.set(1, 1);
        ScaleTextWidth(this.PlayText, this._Play.width - 50);
    };
    HomeMenu.prototype.AddFiveButtons = function () {
        for (var b = 0; b < 5; b++) {
            var sp = this.game.make.sprite(8 + 127.5 * b, this._Title.height - 20, 'm' + (b + 1).toString());
            var bt = this.game.make.button(8 + 127.5 * b, this._Title.height - 20, 'bt', this.Action, this);
            if (b != 0) {
                bt.alpha = 0;
            }
            bt.name = "bt" + (b + 1).toString();
            this.addChild(sp);
            this.addChild(bt);
            sp.scale.set(0.9, 0.9);
            bt.scale.set(0.9, 0.9);
        }
    };
    HomeMenu.prototype.RefreshGameTime = function () {
        if (!SFT[2]) {
            this._GameTime.alpha = 0;
        }
        else {
            this._GameTime.alpha = 1;
        }
    };
    return HomeMenu;
}(Phaser.Sprite));
