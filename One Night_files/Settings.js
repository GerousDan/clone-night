/// <reference path="phaser.d.ts"/>
/// <reference path="Config.ts"/>
/// <reference path="ItemMenu.ts"/>
/// <reference path="Narration.ts"/>
/// <reference path="GameTimer.ts"/>
/// <reference path="RoleTimer.ts"/>
/// <reference path="Background.ts"/>
/// <reference path="OtherOptions.ts"/>
/// <reference path="ScrollabelText.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Settings = (function (_super) {
    __extends(Settings, _super);
    function Settings(game) {
        _super.call(this, game, 0, 0, '');
        //add the title
        this._Title = this.game.make.sprite(this.game.world.centerX, -10, 'logo_ver_en');
        this._Title.anchor.set(0.5, 0);
        this._Title.scale.set(0.8, 0.8);
        this.addChild(this._Title);
        // add first menu
        this.CreateFirstMenu();
        // button Back
        this._BackBtn = this.game.make.button(this.game.world.width * 0.22, this.game.world.height * 7.25 / 8, 'button_back');
        this._BackBtn.anchor.set(0.5, 0.5);
        this.Pstyle = { font: "48px kabel", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle" };
        this.Pstyle.align = "center";
        this.BackText = this.game.make.text(0, 0, Translate('Back = '), this.Pstyle);
        this.BackText.anchor.set(0.5, 0.5);
        this.BackText.x = 5 + this._BackBtn.x;
        this.BackText.y = 3 + this._BackBtn.y;
        this.addChild(this._BackBtn);
        this.addChild(this.BackText);
        if (Translate('Back = ')) {
            this.BackText.text = Translate('Back = ');
            this.BackText.scale.set(1, 1);
            ScaleTextWidth(this.BackText, this._BackBtn.width - 60);
            this.BackText.x = 7 + this._BackBtn.x;
            if (this.BackText.width > 132) {
                this.BackText.x = 15 + this._BackBtn.x;
            }
        }
        // button Help
        this._HelpBtn = this.game.make.button(this.game.world.width * 0.78, this.game.world.height * 7.25 / 8, 'button');
        this._HelpBtn.anchor.set(0.5, 0.5);
        this.HelpText = this.game.make.text(0, 0, Translate('Help = '), this.Pstyle);
        this.HelpText.anchor.set(0.5, 0.5);
        this.HelpText.x = this._HelpBtn.x;
        this.HelpText.y = 3 + this._HelpBtn.y;
        this.addChild(this._HelpBtn);
        this.addChild(this.HelpText);
        this.Fcounter = 0;
        this.FontTimerEvent = this.game.time.events.loop(Phaser.Timer.SECOND * 0.2, this.CheckFont, this);
        this.scolllmask = this.game.make.sprite(this.game.world.centerX, this.game.world.height, 'scrollmask');
        this.scolllmask.anchor.set(0.5, 1);
        this.addChildAt(this.scolllmask, 1);
        var LOGO = this.game.make.sprite(0, 0, 'bezier');
        LOGO.anchor.set(0, 0.5);
        LOGO.x = this.game.world.width - LOGO.width - 16;
        LOGO.y = this.game.world.height * 6.35 / 8;
        LOGO.inputEnabled = true;
        var s = "Learn more about One Night...";
        if (Translate(s + ' = ')) {
            s = Translate(s + ' = ');
        }
        var learmore = this.game.make.text(16, this.game.world.height * 6.35 / 8, s, { font: "24px kabel", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle" });
        learmore.anchor.set(0, 0.5);
        learmore.inputEnabled = true;
        this.LogoGroup = this.game.make.group();
        this.LogoGroup.add(learmore);
        this.LogoGroup.add(LOGO);
        this.addChild(this.LogoGroup);
        this.LogoGroup.onChildInputDown.add(this.GoToBezeir, this);
        game.add.existing(this);
    }
    Settings.prototype.CheckFont = function () {
        this.BackText.setStyle(this.Pstyle);
        this.HelpText.setStyle(this.Pstyle);
        this.Fcounter++;
        if (this.Fcounter > 10) {
            this.FontTimerEvent.timer.removeAll();
        }
    };
    Settings.prototype.CreateFirstMenu = function () {
        // console.log(Translate(Gender+' = ')+", VOL "+VOLUME.toString()+", "+Language.toUpperCase());
        this.TITLES = [Translate('Narration = '), Translate('Background = '), Translate('Game Timer = '), Translate('Role Timer = '), Translate('Other = ')];
        this.CheckValues();
        var ACTIONS = [this.Narration_Menu, this.Background_Menu, this.GameTimer_Menu, this.RoleTimer_Menu, this.Other_Menu];
        var ONOFF = [true, true, true, false, false];
        this.FirstMenu = this.game.make.group();
        this.addChild(this.FirstMenu);
        for (var i = 0; i < 5; i++) {
            var Item = new ItemMenu(this.game, this.TITLES[i], this.SUBTITLES[i], ONOFF[i], i);
            Item.x = 22;
            Item.y = (i * 132) + 160;
            Item.EditBtn.events.onInputDown.add(ACTIONS[i], this);
            this.FirstMenu.add(Item);
        }
        this.BackTo = "Main";
        this.isHelp = true;
    };
    Settings.prototype.Narration_Menu = function () {
        this._Narration = new Narration(this.game, Translate('Narration = '));
        this.addChild(this._Narration);
        this.FirstMenu.visible = false;
        this.LogoGroup.visible = false;
        this.HelpText.text = 'MAIN';
        if (Translate('Main = ')) {
            this.HelpText.text = Translate('Main = ');
            this.isHelp = false;
        }
        this.BackTo = "Parent";
    };
    Settings.prototype.Background_Menu = function () {
        this.scolllmask.visible = true;
        this._Background = new Background(this.game, Translate('Background = '));
        this.addChildAt(this._Background, 0);
        this.FirstMenu.visible = false;
        this.LogoGroup.visible = false;
        this.HelpText.text = 'MAIN';
        if (Translate('Main = ')) {
            this.HelpText.text = Translate('Main = ');
            this.isHelp = false;
        }
        this.BackTo = "Parent";
    };
    Settings.prototype.GameTimer_Menu = function () {
        this._GameTimer = new GameTimer(this.game, Translate('Game Timer = '));
        this.addChild(this._GameTimer);
        this.FirstMenu.visible = false;
        this.LogoGroup.visible = false;
        this.HelpText.text = 'MAIN';
        if (Translate('Main = ')) {
            this.HelpText.text = Translate('Main = ');
            this.isHelp = false;
        }
        this.BackTo = "Parent";
    };
    Settings.prototype.RoleTimer_Menu = function () {
        this._RoleTimer = new RoleTimer(this.game, Translate('Role Timer = '));
        this.addChild(this._RoleTimer);
        this.FirstMenu.visible = false;
        this.LogoGroup.visible = false;
        this.HelpText.text = 'MAIN';
        if (Translate('Main = ')) {
            this.HelpText.text = Translate('Main = ');
            this.isHelp = false;
        }
        this.BackTo = "Parent";
    };
    Settings.prototype.Other_Menu = function () {
        this._OtherOptions = new OtherOptions(this.game, Translate('Other Options = '));
        this.addChild(this._OtherOptions);
        this.FirstMenu.visible = false;
        this.LogoGroup.visible = false;
        this.HelpText.text = 'MAIN';
        if (Translate('Main = ')) {
            this.HelpText.text = Translate('Main = ');
            this.isHelp = false;
        }
        this.BackTo = "Parent";
    };
    Settings.prototype.BackCliked = function () {
        RunUpdate_Settings = true;
        if (this.BackTo == "Main") {
            this.visible = false;
        }
        if (this.BackTo == "Parent") {
            if (this._Narration) {
                this.removeChild(this._Narration);
                this._Narration.destroy();
                this._Narration = null;
            }
            if (this._GameTimer) {
                this.removeChild(this._GameTimer);
                this._GameTimer.destroy();
                this._GameTimer = null;
            }
            if (this._RoleTimer) {
                this.removeChild(this._RoleTimer);
                this._RoleTimer.destroy();
                this._RoleTimer = null;
            }
            if (this._Background) {
                this._Background.RemoveMyListener();
                this.removeChild(this._Background);
                this._Background.destroy();
                this._Background = null;
                this.scolllmask.visible = false;
            }
            if (this._OtherOptions) {
                this.removeChild(this._OtherOptions);
                this._OtherOptions.destroy();
                this._OtherOptions = null;
            }
            if (this._ScrollabelText) {
                this._ScrollabelText.BeforeQuit();
                this.removeChild(this._ScrollabelText);
                this._ScrollabelText.destroy();
                this._ScrollabelText = null;
            }
            this.HelpText.text = 'HELP';
            if (Translate('Help = ')) {
                this.HelpText.text = Translate('Help = ');
                this.isHelp = true;
            }
            this.FirstMenu.visible = true;
            this.LogoGroup.visible = true;
            this.BackTo = "Main";
        }
    };
    Settings.prototype.update = function () {
        if (this._Background) {
            this._Background.update();
        }
        if (this._ScrollabelText) {
            this._ScrollabelText.update();
        }
        //update Narration menu
        if (RunUpdate_Narration && this._Narration) {
            // console.log(Translate('Narration = '),Translate('male = '),Translate('female = '),Translate('Gender Specific = '));
            this._Narration.RefreshTexts();
            if (Translate('Back = ')) {
                this.BackText.text = Translate('Back = ');
                this.BackText.scale.set(1, 1);
                ScaleTextWidth(this.BackText, this._BackBtn.width - 60);
                this.BackText.x = 7 + this._BackBtn.x;
                if (this.BackText.width > 132) {
                    this.BackText.x = 15 + this._BackBtn.x;
                }
            }
            if (Translate('Help = ')) {
                this.HelpText.text = Translate('Help = ');
            }
            RunUpdate_Narration = false;
        }
        if (RunUpdate_Settings) {
            console.log("------ RunUpdate_Settings", Gender, Translate(Gender + ' = '));
            this.CheckValues();
            for (var it = 0; it < this.FirstMenu.children.length; it++) {
                var p = this.FirstMenu.getAt(it);
                p.Title.text = this.TITLES[it];
                p.SubTitle.text = this.SUBTITLES[it];
            }
            this.RefreshFirstScreen();
            RunUpdate_Settings = false;
        }
    };
    Settings.prototype.CheckValues = function () {
        //GameTimer
        var s0 = MINS.toString();
        if (s0.length == 1) {
            s0 = "0" + s0;
        }
        var s1 = ", 1 Min";
        if (!GT.bt1Selected) {
            s1 = "";
        }
        var s2 = ", 30 Sec";
        if (!GT.bt2Selected) {
            s2 = "";
        }
        //RoleTimer
        var s3 = ', ' + Translate('Complex Roles = ');
        if (!RT.bt1Selected) {
            s3 = "";
        }
        var s4 = Secs.toString();
        if (s4.length == 1) {
            s4 = "0" + s4;
        }
        //others
        var s5 = Translate(OP[0].tx + ' = ');
        var s6 = ", " + Translate(OP[1].tx + ' = ');
        var s7 = ", " + Translate(OP[2].tx + ' = ');
        var s8 = ", " + OP[3].tx;
        var s9 = ", " + OP[4].tx;
        if (!OP[0].Selected || !OP[0].Visible) {
            s5 = "";
        }
        if (!OP[1].Selected || !OP[1].Visible) {
            s6 = "";
        }
        if (!OP[2].Selected || !OP[2].Visible) {
            s7 = "";
        }
        if (!OP[3].Selected || !OP[3].Visible) {
            s8 = "";
        }
        if (!OP[4].Selected || !OP[4].Visible) {
            s9 = "";
        }
        var TS = s5 + s6 + s7 + s8 + s9;
        if (TS.charAt(0) == ",") {
            TS = TS.replace(",", "");
        }
        //panel tittles and subtitles
        this.TITLES = [Translate('Narration = '), Translate('Background = '), Translate('Game Timer = '), Translate('Role Timer = '), Translate('Other = ')];
        this.SUBTITLES = [
            Translate(Gender + ' = ') + ", VOL " + VOLUME.toString() + ", " + Language.toUpperCase(),
            " " + BCaudio + ", Vol " + BCVOL.toString(),
            " " + s0 + ":00" + s1 + s2,
            " 00:" + s4 + s3,
            TS // no found for expert and verbose even in english
        ];
    };
    Settings.prototype.ShowHelp = function () {
        this.FirstMenu.visible = false;
        this.LogoGroup.visible = false;
        this.HelpText.text = 'MAIN';
        if (Translate('Main = ')) {
            this.HelpText.text = Translate('Main = ');
            this.isHelp = false;
        }
        this.BackTo = "Parent";
        this._ScrollabelText = new ScrollabelText(this.game, ["One Night App Help\n Help text go here!"], { W: 600, H: 800 }, 0, { W: 600, H: 800 });
        this.addChild(this._ScrollabelText);
        this._ScrollabelText.x = this.game.world.centerX;
        this._ScrollabelText.y = 250;
    };
    Settings.prototype.GoToBezeir = function () { window.open("https://beziergames.com/", '_blank'); };
    Settings.prototype.RefreshFirstScreen = function () {
        for (var i = 0; i < this.FirstMenu.children.length; i++) {
            var item = this.FirstMenu.getAt(i);
            if (!SFT[i]) {
                item.alpha = 0.5;
            }
            else {
                item.alpha = 1;
            }
        }
    };
    return Settings;
}(Phaser.Sprite));
