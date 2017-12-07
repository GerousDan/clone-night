/// <reference path="phaser.d.ts"/>
/// <reference path="Config.ts"/>
/// <reference path="DraggableSprite.ts"/>
/// <reference path="ContinueButton.ts"/>
/// <reference path="HomeMenu.ts"/>
/// <reference path="List.ts"/>
/// <reference path="ItemMenu.ts"/>
/// <reference path="Settings.ts"/>
/// <reference path="Narration.ts"/>
/// <reference path="VOL.ts"/>
/// <reference path="GameTimer.ts"/>
/// <reference path="RoleTimer.ts"/>
/// <reference path="Background.ts"/>
/// <reference path="PlayState.ts"/>
/// <reference path="AboutSounds.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
    }
    Main.prototype.preload = function () {
        this.create_Main();
    };
    Main.prototype.create_Main = function () {
        console.log("* --------------------------- create Main *");
        Translate('Timer');
        Me = this;
        //add background
        this.game.add.sprite(0, 0, 'background');
        //add icons "list"
        Callback1 = this.AddList;
        //addHomeMenu
        this._HomeMenu = new HomeMenu(this.game);
        this._HomeMenu._Settings.events.onInputDown.add(this.ToggleSetting, this);
        //add the defualt list
        this.AddList();
        //add Settings
        this._Settings = new Settings(this.game);
        this._Settings.visible = false;
        this._Settings._BackBtn.events.onInputDown.add(this.ToggleSetting, this);
        this._Settings._HelpBtn.events.onInputDown.add(this.HM, this);
        this._PlayState = new PlayState(this.game);
        this._PlayState.visible = false;
    };
    Main.prototype.AddList = function () {
        //console.log(List1Selected,List2Selected,List3Selected,List4Selected,List5Selected);
        GetCurrentList();
        //console.log("creating the list *****************",currentList);
        if (Me._List) {
            Me._List.RemoveInputs();
            Me._List.destroy();
        }
        Me._List = new List(GameRef);
        //go to top
        Me._HomeMenu.bringToTop();
    };
    Main.prototype.ToggleSetting = function () {
        SR.PlaySound('sfx_tap');
        if (!this._Settings.visible) {
            this._HomeMenu.visible = false;
            this._List.visible = false;
            this._List.PauseInputsEvents();
            this._Settings.visible = true;
        }
        else {
            if (this._Settings.BackTo == "Main") {
                this._HomeMenu.visible = true;
                this._List.RefreshNames();
                this._List.visible = true;
                this._List.ResumeInputsEvents();
            }
            this._Settings.BackCliked();
            this._HomeMenu.UpdateGameTimeText();
        }
    };
    Main.prototype.HM = function () {
        if (!this._Settings.isHelp) {
            this._Settings.BackTo = "Parent";
            this._Settings.BackCliked();
            this.ToggleSetting();
        }
        else {
            console.log("show Help ...");
            this._Settings.ShowHelp();
        }
    };
    Main.prototype.update = function () {
        if (RunUpdate) {
            //number of player for play button
            this._HomeMenu.SetPlayText(SelectedCrads.length);
            this._HomeMenu.RefreshGameTime();
            RunUpdate = false;
        }
        if (StartPlay) {
            this._HomeMenu.visible = false;
            this._Settings.visible = false;
            this._List.visible = false;
            this._PlayState.visible = true;
            this._PlayState.Start();
            StartPlay = false;
        }
        if (this._PlayState.visible && this._PlayState.QUIT) {
            this._HomeMenu.visible = true;
            this._Settings.visible = false;
            this._List.visible = true;
            this._PlayState.visible = false;
        }
    };
    return Main;
}(Phaser.State));
