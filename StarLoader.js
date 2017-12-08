var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="phaser.d.ts"/>
/// <reference path="Config.ts"/>
var StarLoader = (function (_super) {
    __extends(StarLoader, _super);
    function StarLoader(game) {
        _super.call(this, game, 0, 0, '');
        /*
        var graphics = this.game.make.graphics(0, 0);
            // set a fill and line style
            graphics.beginFill(0x000000);
            graphics.lineStyle(0, 0x000000, 1);
            graphics.drawRect(0, 0, Config.GW, Config.GH);
            this.addChild(graphics);
        */
        this.Loader = this.game.make.sprite(this.game.width / 2, this.game.world.height * 7.4 / 8, 'Loader');
        this.Loader.anchor.set(0.5, 0.5);
        var frameNames = Phaser.Animation.generateFrameNames('loading_stars', 1, 9, '.png', 4);
        this.Loader.animations.add('rotate', frameNames, 12, true);
        this.Loader.animations.play('rotate');
        this.addChild(this.Loader);
        this.Loader.scale.set(0.5, 0.5);
        game.add.existing(this);
    }
    StarLoader.prototype.update = function () {
        if (!Isloading) {
            console.log("Isloading", Isloading);
            removeLoaderStars();
        }
    };
    return StarLoader;
}(Phaser.Sprite));
