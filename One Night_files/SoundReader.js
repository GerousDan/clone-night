/// <reference path="phaser.d.ts"/>
/// <reference path="Config.ts"/>
var SoundReader = (function () {
    function SoundReader() {
        console.log("sound Reader Ready");
    }
    SoundReader.prototype.PlaySound = function (key, CompleteCallBack, context) {
        if (this.SFX) {
            this.SFX.onStop.removeAll();
            this.SFX.destroy();
            this.SFX = null;
        }
        this.SFX = GameRef.add.sound(key, 1, false);
        this.SFX.play();
        if (CompleteCallBack && context) {
            this.SFX.onStop.add(CompleteCallBack, context);
        }
    };
    SoundReader.prototype.PlaySequence = function (_keys) {
        this.Keys = [];
        this.SoundCounter = 0;
        this.Keys = _keys;
        this.PlaySound(this.Keys[this.SoundCounter], this.Next, this);
    };
    SoundReader.prototype.Next = function () {
        this.SoundCounter++;
        if (this.SoundCounter < this.Keys.length) {
            console.log("key to use", this.Keys[this.SoundCounter], this.SoundCounter, this.Keys.length, this.Keys);
            this.PlaySound(this.Keys[this.SoundCounter], this.Next, this);
        }
    };
    SoundReader.prototype.PlaySparate = function (key) {
        if (this.S_SFX) {
            this.S_SFX.onStop.removeAll();
            this.S_SFX.destroy();
            this.S_SFX = null;
        }
        this.S_SFX = GameRef.add.sound(key, 1, false);
        this.S_SFX.play();
    };
    return SoundReader;
}());
