/// <reference path="phaser.d.ts"/>
/// <reference path="Boot.ts" />
/// <reference path="Main.ts" />
/// <reference path="Config.ts" />
var SimpleGame = (function () {
    function SimpleGame() {
        this.game = new Phaser.Game(Config.GW, Config.GH, Phaser.AUTO, Config.DOM_PARENT_ID, { preload: this.preload, create: this.create });
        GameRef = this.game;
    }
    SimpleGame.prototype.preload = function () {
        this.game.load.atlas('Loader', 'images/UI/loader.png', 'images/UI/loader.json');
        this.game.load.image('Splash', 'images/UI/Splash.png');
    };
    SimpleGame.prototype.create = function () {
        // prepare the game data
        CreateListes();
        this.game.state.add("_Boot", Boot);
        this.game.state.add("_Main", Main);
        this.game.state.start("_Boot");
    };
    return SimpleGame;
}());
