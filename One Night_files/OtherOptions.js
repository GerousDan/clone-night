var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="phaser.d.ts"/>
/// <reference path="Config.ts"/>
/// <reference path="VOL.ts"/>
var OtherOptions = (function (_super) {
    __extends(OtherOptions, _super);
    function OtherOptions(game, TXT) {
        _super.call(this, game, 0, 0, '');
        this.All = ["Lone Wolf", "Labels", "Move Your Card", "Expert Mode", "Verbose Doppelganger", "Randomization"];
        //add text1
        this.style1 = { font: "bold 64px kabel", fill: "#FFFF00", boundsAlignH: "center", boundsAlignV: "left" };
        this.Title = this.game.make.text(this.game.world.centerX, 240, TXT, this.style1);
        this.Title.anchor.set(0.5, 0.5);
        this.addChild(this.Title);
        //add 3 buttons
        this.style2 = { font: "bold 32px kabel", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "left" };
        this.style2.align = "center";
        //add buttons
        var Ydec = 0;
        for (var i = 0; i < OP.length; i++) {
            var b1_sp = this.game.make.sprite(this.game.world.centerX, 360 + (70 * i) + Ydec, 'item_smallOFF');
            b1_sp.anchor.set(0.5, 0.5);
            this.addChild(b1_sp);
            var s = OP[i].S;
            if (Translate(OP[i].S + ' = ')) {
                s = Translate(OP[i].S + ' = ');
            }
            if (OP[i].Breaker) {
                s = AddBreakAt(s, 1);
                b1_sp.scale.y = 1.4;
                Ydec = 28;
                b1_sp.y += 14;
            }
            else {
                Ydec = 0;
            }
            var b1_txt = this.game.make.text(b1_sp.x, b1_sp.y + 4, s, this.style2);
            b1_txt.anchor.set(0.5, 0.5);
            this.addChild(b1_txt);
            b1_sp.name = 'b1';
            b1_sp.data = { selected: false, id: i };
            if (OP[i].Selected) {
                b1_sp.loadTexture('item_smallON');
                b1_sp.data = { selected: true, id: i };
            }
            if (!OP[i].Visible) {
                b1_sp.visible = false;
                b1_txt.visible = false;
            }
            b1_sp.inputEnabled = true;
            b1_sp.events.onInputDown.add(this.Action, this);
        }
    }
    OtherOptions.prototype.Action = function (sp) {
        if (sp.data.selected) {
            SR.PlaySound('sfx_tap');
            sp.loadTexture('item_smallOFF');
            sp.data.selected = false;
            OP[sp.data.id].Selected = false;
        }
        else {
            sp.loadTexture('item_smallON');
            SR.PlaySound('sfx_tap');
            sp.data.selected = true;
            OP[sp.data.id].Selected = true;
        }
    };
    return OtherOptions;
}(Phaser.Sprite));
