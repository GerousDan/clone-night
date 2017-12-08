/// <reference path="phaser.d.ts"/>
/// <reference path="Config.ts"/>
/// <reference path="SoundReader.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Boot = (function (_super) {
    __extends(Boot, _super);
    function Boot() {
        _super.call(this);
    }
    Boot.prototype.preload = function () {
        //initiate SoundReader 
        SR = new SoundReader();
        //load the loader : stars
        this.Boot_create();
    };
    Boot.prototype.Boot_create = function () {
        console.log(" - Boot state -");
        this.game.renderer.renderSession.roundPixels = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.parentIsWindow = true;
        this.game.scale.refresh();
        this.game.stage.backgroundColor = Config.BG_color;
        this.game.scale.windowConstraints.bottom = 'visual';
        this.game.add.sprite(0, 0, 'Splash');
        //show stars loader animation
        addLoaderStars();
        //define the next state
        AutoNextState = "_Main";
        //satrt loading first page
        LoadGroup(Group1);
    };
    return Boot;
}(Phaser.State));
