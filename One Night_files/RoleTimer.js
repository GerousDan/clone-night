var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="phaser.d.ts"/>
/// <reference path="Config.ts"/>
/// <reference path="VOL.ts"/>
var RoleTimer = (function (_super) {
    __extends(RoleTimer, _super);
    function RoleTimer(game, TXT) {
        _super.call(this, game, 0, 0, '');
        //add text1
        this.style1 = { font: "bold 64px kabel", fill: "#FFFF00", boundsAlignH: "center", boundsAlignV: "left" };
        this.Title = this.game.make.text(this.game.world.centerX, 240, TXT, this.style1);
        this.Title.anchor.set(0.5, 0.5);
        this.addChild(this.Title);
        ScaleTextWidth(this.Title, 600);
        //add 3 buttons
        this.style2 = { font: "bold 32px kabel", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "left" };
        //male
        this.b1_sp = this.game.make.sprite(this.game.world.centerX - 64, 465, 'item_smallOFF');
        this.b1_sp.anchor.set(0.5, 0.5);
        this.addChild(this.b1_sp);
        this.b1_sp.scale.y = 1.4;
        this.b1_txt = this.game.make.text(this.b1_sp.x, this.b1_sp.y + 4, Translate(RT.bt1Text + ' = '), this.style2);
        this.b1_txt.anchor.set(0.5, 0.5);
        this.b1_sp.name = 'b1';
        this.b1_sp.data = { selected: false };
        if (RT.bt1Selected) {
            this.b1_sp.loadTexture('item_smallON');
            this.b1_sp.data = { selected: true };
        }
        this.addChild(this.b1_txt);
        this.b1_sp.inputEnabled = true;
        this.b1_sp.events.onInputDown.add(this.Action, this);
        //volules
        this.Vol = new VOL(this.game, this.game.world.width - 90, this.game.world.centerY - 173, Translate("sec = "));
        this.Vol.scale.set(0.8, 0.8);
        this.addChild(this.Vol);
        this.Vol.VolCounterText.text = Secs.toString();
        this.Vol.Vplus.events.onInputDown.add(this.FuncP, this);
        this.Vol.Vmins.events.onInputDown.add(this.FuncM, this);
    }
    RoleTimer.prototype.Action = function (sp) {
        if (sp.data.selected) {
            SR.PlaySound('sfx_tap');
            sp.loadTexture('item_smallOFF');
            sp.data.selected = false;
            RT.bt1Selected = false;
        }
        else {
            sp.loadTexture('item_smallON');
            SR.PlaySound('sfx_tap');
            sp.data.selected = true;
            RT.bt1Selected = true;
        }
    };
    RoleTimer.prototype.FuncP = function () {
        SR.PlaySound('sfx_tap');
        Secs++;
        this.Save();
    };
    RoleTimer.prototype.FuncM = function () {
        SR.PlaySound('sfx_tap');
        Secs--;
        this.Save();
    };
    RoleTimer.prototype.Save = function () {
        if (Secs > 30) {
            Secs = 30;
        }
        if (Secs < 0) {
            Secs = 0;
        }
        //show the volume
        this.Vol.VolCounterText.text = Secs.toString();
    };
    return RoleTimer;
}(Phaser.Sprite));
