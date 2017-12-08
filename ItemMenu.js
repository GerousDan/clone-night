var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="phaser.d.ts"/>
/// <reference path="Config.ts"/>
var ItemMenu = (function (_super) {
    __extends(ItemMenu, _super);
    function ItemMenu(game, TXT, SUB, OnOFF, PositionIn_SFT) {
        _super.call(this, game, 0, 0, '');
        this.data = { index: PositionIn_SFT };
        //add rectangular bg
        this.BG = this.game.make.sprite(0, 0, "item_setting");
        this.addChild(this.BG);
        //add text1
        this.style1 = { font: "bold 38px kabel", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "left" };
        this.Title = this.game.make.text(17, 16, TXT, this.style1);
        this.addChild(this.Title);
        //add text2
        this.style2 = { font: "26px kabel", fill: "#FFFF00", boundsAlignH: "center", boundsAlignV: "left" };
        // console.log("use SUB",SUB);     
        this.SubTitle = this.game.make.text(17, 68, SUB, this.style2);
        this.addChild(this.SubTitle);
        // add edit button
        this.EditBtn = this.game.make.button(0, 0, 'edit_bt');
        this.EditBtn.x = this.BG.x + this.BG.width - this.EditBtn.width - 20;
        this.EditBtn.y = (this.BG.height - this.EditBtn.height) / 2;
        this.addChild(this.EditBtn);
        //can be on/off
        if (OnOFF) {
            this.inputEnabled = true;
            this.events.onInputDown.add(this.ToggleOnOFF, this);
        }
        if (SFT[this.data.index] == true) {
            this.alpha = 1;
        }
        else {
            this.alpha = 0.5;
        }
        this.Fcounter = 0;
        this.FontTimerEvent = this.game.time.events.loop(Phaser.Timer.SECOND * 0.2, this.CheckFont, this);
    }
    ItemMenu.prototype.CheckFont = function () {
        this.Title.setStyle(this.style1);
        this.SubTitle.setStyle(this.style2);
        this.Fcounter++;
        if (this.Fcounter > 10) {
            this.FontTimerEvent.timer.removeAll();
        }
    };
    ItemMenu.prototype.SetSubTitle = function (txt) {
        this.SubTitle.text = txt;
    };
    ItemMenu.prototype.ToggleOnOFF = function () {
        if (this.alpha == 1) {
            SR.PlaySound('sfx_tap');
            this.alpha = 0.5;
            SFT[this.data.index] = false;
        }
        else {
            this.alpha = 1;
            SR.PlaySound('sfx_tap');
            SFT[this.data.index] = true;
        }
        RunUpdate = true;
    };
    return ItemMenu;
}(Phaser.Sprite));
