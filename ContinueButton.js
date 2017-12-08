var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="phaser.d.ts"/>
/// <reference path="Config.ts"/>
var ContinueButton = (function (_super) {
    __extends(ContinueButton, _super);
    function ContinueButton(game, X, Y, Scale, CallBack, context) {
        _super.call(this, game, X, Y, 'UI', CallBack, context, 'GRREN_BUTTON3.png', 'GRREN_BUTTON3.png', 'GRREN_BUTTON3.png', 'GRREN_BUTTON3.png');
        this.anchor.set(0.5, 0.5);
        var SprarklesOffset = [{ x: -100, y: 0 }, { x: 90, y: -70 }, { x: 70, y: -90 }, { x: -50, y: -50 }, { x: -20, y: 60 }, { x: 50, y: 70 }, { x: 0, y: 0 }];
        for (var i = 0; i < 7; i++) {
            var Sparkles = this.game.make.sprite(0, 0, 'UI', 'sparkle0001.png');
            Sparkles.anchor.set(0.5, 0.5);
            Sparkles.scale.set(2, 2);
            Sparkles.x += SprarklesOffset[i].x;
            Sparkles.y += SprarklesOffset[i].y;
            var frameNames = Phaser.Animation.generateFrameNames('sparkle', 1, 20, '.png', 4);
            Sparkles.animations.add('ASparkles', frameNames, 8 + Math.round(Math.random() * 8), true);
            Sparkles.animations.play('ASparkles');
            this.addChild(Sparkles);
            this.scale.set(Scale, Scale);
            game.add.existing(this);
        }
    }
    return ContinueButton;
}(Phaser.Button));
