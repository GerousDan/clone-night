/// <reference path="phaser.d.ts"/>
/// <reference path="Config.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DraggableSprite = (function (_super) {
    __extends(DraggableSprite, _super);
    function DraggableSprite(game, letters, Bg) {
        _super.call(this, game, 0, 0, '');
        game.add.existing(this);
        this.data = "Draggable";
        this.L = letters;
        this.BG = this.game.make.sprite(0, 0, Bg.key, Bg.frame);
        this.BG.anchor.set(0.5, 0.5);
        this.addChild(this.BG);
        if (letters.length > 0) {
            this.Istyle = { font: "160px VAGzStarBold", fill: "#000000", boundsAlignH: "center", boundsAlignV: "middle" };
            this.Txt = this.game.make.text(0, 0, letters, this.Istyle);
            this.Txt.setTextBounds(0, 0, this.BG.width, this.BG.height);
            this.Txt.x = -this.BG.width / 2;
            this.Txt.y = -10 - this.BG.height / 2;
            this.addChild(this.Txt);
            this.Fcounter = 0;
            this.FontTimerEvent = this.game.time.events.loop(Phaser.Timer.SECOND * 0.2, this.CheckFont, this);
        }
    }
    DraggableSprite.prototype.EnableInputs = function () {
        this.inputEnabled = true;
        //  Allow dragging - the 'true' parameter will make the sprite snap to the center
        this.input.enableDrag(true, true);
        this.input.useHandCursor = true;
        this.events.onInputDown.add(this.playLetter, this);
    };
    DraggableSprite.prototype.playLetter = function () {
    };
    DraggableSprite.prototype.CheckFont = function () {
        this.Txt.setStyle(this.Istyle);
        console.log("v", this.Fcounter);
        this.Fcounter++;
        if (this.Fcounter > 5) {
            this.FontTimerEvent.timer.removeAll();
        }
    };
    return DraggableSprite;
}(Phaser.Sprite));
