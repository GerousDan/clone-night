var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="phaser.d.ts"/>
/// <reference path="Config.ts"/>
var VOL = (function (_super) {
    __extends(VOL, _super);
    function VOL(game, X, Y, TXT) {
        _super.call(this, game, 0, 0, '');
        //add text1
        this.style1 = { font: "bold 42px kabel", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "left" };
        // volumes button's
        this.Vplus = this.game.make.button(0, 0, 'button_add');
        this.Vplus.anchor.set(0.5, 0.5);
        this.addChild(this.Vplus);
        this.VolCounterText = this.game.make.text(this.Vplus.x, 85, '5', this.style1);
        this.VolCounterText.anchor.set(0.5, 0.5);
        this.addChild(this.VolCounterText);
        this.Vmins = this.game.make.button(0, 170, 'button_sub');
        this.Vmins.anchor.set(0.5, 0.5);
        this.addChild(this.Vmins);
        this.VolTxt = this.game.make.text(this.Vplus.x, 260, TXT, this.style1);
        this.VolTxt.anchor.set(0.5, 0.5);
        this.addChild(this.VolTxt);
        this.x = X;
        this.y = Y;
    }
    return VOL;
}(Phaser.Sprite));
