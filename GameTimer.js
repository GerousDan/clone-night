var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="phaser.d.ts"/>
/// <reference path="Config.ts"/>
/// <reference path="VOL.ts"/>
var GameTimer = (function (_super) {
    __extends(GameTimer, _super);
    function GameTimer(game, TXT) {
        _super.call(this, game, 0, 0, '');
        //add text1
        this.style1 = { font: "bold 64px kabel", fill: "#FFFF00", boundsAlignH: "center", boundsAlignV: "center" };
        this.Title = this.game.make.text(this.game.world.centerX, 240, TXT, this.style1);
        this.Title.anchor.set(0.5, 0.5);
        this.addChild(this.Title);
        ScaleTextWidth(this.Title, 600);
        //add 3 buttons
        this.style2 = { font: "bold 32px kabel", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "center" };
        this.style2.align = "center";
        //male
        this.b1_sp = this.game.make.sprite(this.game.world.centerX - 64, 400, 'item_smallOFF');
        this.b1_sp.anchor.set(0.5, 0.5);
        this.b1_sp.scale.y = 1.4;
        this.addChild(this.b1_sp);
        var BreakL = 2;
        if (Language == "en") {
            BreakL = 3;
        }
        this.b1_txt = this.game.make.text(this.b1_sp.x, this.b1_sp.y + 4, AddBreakAt(Translate(GT.bt1Text + ' = '), BreakL), this.style2);
        this.b1_txt.anchor.set(0.5, 0.5);
        this.addChild(this.b1_txt);
        this.b1_sp.name = 'b1';
        this.b1_sp.data = { selected: false };
        if (GT.bt1Selected) {
            this.b1_sp.loadTexture('item_smallON');
            this.b1_sp.data = { selected: true };
        }
        // this.b1_sp.addChild(this.b1_txt);
        this.b1_sp.inputEnabled = true;
        this.b1_sp.events.onInputDown.add(this.Action, this);
        //femle
        this.b2_sp = this.game.make.sprite(this.game.world.centerX - 64, 520, 'item_smallOFF');
        this.b2_sp.anchor.set(0.5, 0.5);
        this.b2_sp.scale.y = 1.4;
        this.addChild(this.b2_sp);
        this.b2_txt = this.game.make.text(this.b2_sp.x, this.b2_sp.y + 4, AddBreakAt(Translate(GT.bt2Text + ' = '), BreakL), this.style2);
        this.b2_txt.anchor.set(0.5, 0.5);
        this.addChild(this.b2_txt);
        this.b2_sp.name = 'b2';
        this.b2_sp.data = { selected: false };
        if (GT.bt2Selected) {
            this.b2_sp.loadTexture('item_smallON');
            this.b2_sp.data = { selected: true };
        }
        this.b2_sp.inputEnabled = true;
        this.b2_sp.events.onInputDown.add(this.Action, this);
        //volules
        this.Vol = new VOL(this.game, this.game.world.width - 90, this.game.world.centerY - 176, Translate("min = "));
        this.Vol.scale.set(0.8, 0.8);
        this.addChild(this.Vol);
        this.Vol.VolCounterText.text = MINS.toString();
        this.Vol.Vplus.events.onInputDown.add(this.FuncP, this);
        this.Vol.Vmins.events.onInputDown.add(this.FuncM, this);
    }
    GameTimer.prototype.Action = function (sp) {
        if (sp.data.selected) {
            SR.PlaySound('sfx_tap');
            sp.loadTexture('item_smallOFF');
            sp.data.selected = false;
            if (sp.name == 'b1') {
                GT.bt1Selected = false;
            }
            else if (sp.name == 'b2') {
                GT.bt2Selected = false;
            }
        }
        else {
            sp.loadTexture('item_smallON');
            SR.PlaySound('sfx_tap');
            sp.data.selected = true;
            if (sp.name == 'b1') {
                GT.bt1Selected = true;
            }
            else if (sp.name == 'b2') {
                GT.bt2Selected = true;
            }
        }
    };
    GameTimer.prototype.FuncP = function () {
        SR.PlaySound('sfx_tap');
        MINS++;
        this.Save();
    };
    GameTimer.prototype.FuncM = function () {
        SR.PlaySound('sfx_tap');
        MINS--;
        this.Save();
    };
    GameTimer.prototype.Save = function () {
        if (MINS > 30) {
            MINS = 30;
        }
        if (MINS < 0) {
            MINS = 0;
        }
        //show the volume
        this.Vol.VolCounterText.text = MINS.toString();
    };
    return GameTimer;
}(Phaser.Sprite));
