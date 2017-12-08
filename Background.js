/// <reference path="phaser.d.ts"/>
/// <reference path="Config.ts"/>
/// <reference path="VOL.ts"/>
/// <reference path="ScrollerMenuV.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Background = (function (_super) {
    __extends(Background, _super);
    function Background(game, TXT) {
        _super.call(this, game, 0, 0, '');
        //add text1
        this.style1 = { font: "bold 64px kabel", fill: "#FFFF00", boundsAlignH: "center", boundsAlignV: "left" };
        this.Title = this.game.make.text(this.game.world.centerX, 220, TXT, this.style1);
        this.Title.anchor.set(0.5, 0.5);
        this.addChild(this.Title);
        ScaleTextWidth(this.Title, 600);
        //add 3 buttons
        this.style2 = { font: "bold 32px kabel", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "left" };
        this.SMV = new ScrollerMenuV(this.game, BCA, { W: 400, H: 61 }, 10, { W: 400, H: 700 });
        this.addChild(this.SMV);
        this.SMV.x = this.game.world.centerX;
        this.SMV.y = 300;
        //volume
        this.Vol = new VOL(this.game, this.game.world.width - 60, this.game.world.centerY - 173, Translate("vol = "));
        this.Vol.scale.set(0.8, 0.8);
        this.addChild(this.Vol);
        this.Vol.VolCounterText.text = BCVOL.toString();
        this.Vol.Vplus.events.onInputDown.add(this.FuncP, this);
        this.Vol.Vmins.events.onInputDown.add(this.FuncM, this);
    }
    Background.prototype.FuncP = function () {
        SR.PlaySound('sfx_tap');
        BCVOL++;
        this.Save();
    };
    Background.prototype.FuncM = function () {
        SR.PlaySound('sfx_tap');
        BCVOL--;
        this.Save();
    };
    Background.prototype.Save = function () {
        if (BCVOL > 10) {
            BCVOL = 10;
        }
        if (BCVOL < 0) {
            BCVOL = 0;
        }
        //show the volume
        this.Vol.VolCounterText.text = BCVOL.toString();
    };
    Background.prototype.update = function () {
        this.SMV.update();
    };
    Background.prototype.RemoveMyListener = function () {
        this.SMV.BeforeQuit();
    };
    return Background;
}(Phaser.Sprite));
