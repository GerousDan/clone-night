var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="phaser.d.ts"/>
/// <reference path="Config.ts"/>
/// <reference path="VOL.ts"/>
var Icon = (function (_super) {
    __extends(Icon, _super);
    //max letter 12
    function Icon(game) {
        _super.call(this, game, 0, 0, '');
        this.anchor.set(0.5, 0.5);
        this.GTstyle = { font: "bold 64px kabel", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle" };
        this.GTstyle.align = "center";
        this.Cadre = this.game.make.sprite(0, 0, 'IconC');
        this.Cadre.anchor.set(0.5, 0.5);
        this.addChild(this.Cadre);
        this.img = this.game.make.sprite(0, this.Cadre.y + (this.Cadre.height / 2) - 12, 'IconC');
        this.img.anchor.set(0.5, 1);
        this.addChild(this.img);
    }
    return Icon;
}(Phaser.Sprite));
