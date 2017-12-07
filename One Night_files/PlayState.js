var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="phaser.d.ts"/>
/// <reference path="Config.ts"/>
/// <reference path="VOL.ts"/>
var PlayState = (function (_super) {
    __extends(PlayState, _super);
    function PlayState(game) {
        _super.call(this, game, 0, 0, '');
        this.QUIT = false;
        this.LinesPerCharc = 0;
        this.ActionsPerCharc = [];
        this.ActionCounter = 0;
        this.WereWolf_Lone = false;
        //add the title
        this._Title = this.game.make.sprite(this.game.world.centerX, -10, 'logo_ver_en');
        this._Title.anchor.set(0.5, 0);
        this._Title.scale.set(0.8, 0.8);
        this.addChild(this._Title);
        //Define styles
        this.style1 = { font: "bold 64px kabel", fill: "#FFFF00", align: "center", boundsAlignH: "center", boundsAlignV: "middle", wordWrap: true, wordWrapWidth: 460 };
        this.style2 = { font: "bold 32px kabel", fill: "#FFFF00", align: "center", boundsAlignH: "center", boundsAlignV: "middle", wordWrap: true, wordWrapWidth: 460 };
        this.Cadre = this.game.make.sprite(this.game.world.centerX, 360, 'cards_23');
        this.Cadre.anchor.set(0.5, 0.5);
        this.addChild(this.Cadre);
        this._TXT = this.game.make.text(this.game.world.centerX, this.game.world.centerY, "", this.style1);
        this._TXT.anchor.set(0.5, 0.5);
        this.addChild(this._TXT);
        this.TEXT("The Text Go Here", this.style1);
        this._SPRITE = this.game.make.sprite(0, 0, '');
        this._SPRITE.anchor.set(0.5, 0.5);
        this.Cadre.addChild(this._SPRITE);
        Me_PlaySate = this;
        game.add.existing(this);
    }
    PlayState.prototype.TEXT = function (s, Style) {
        this._TXT.setStyle(Style);
        this._TXT.text = s;
        if (this.Cadre.visible) {
            this._TXT.y = this.Cadre.y + (this.Cadre.height / 2) + 200;
        }
        else {
            this._TXT.x = this.game.world.centerX;
            this._TXT.y = this.game.world.centerY;
        }
    };
    PlayState.prototype.SPRITE = function (Key, Frame) {
        this._SPRITE.loadTexture(Key, Frame);
    };
    PlayState.prototype.Start = function () {
        console.log("-------------- start playing roles ------------------------");
        this.QUIT = false;
        this.GetPlayersOrder();
        this.AnimCharacter(this._Players[0]);
    };
    PlayState.prototype.GetPlayersOrder = function () {
        this._Players = [];
        for (var p = 0; p < SelectedCrads.length; p++) {
            for (var pi = 0; pi < currentList.length; pi++) {
                if (SelectedCrads[p] == currentList[pi].icon) {
                    this._Players.push(currentList[pi]);
                }
            }
        }
        this._Players.sort(function (a, b) {
            return a.Order - b.Order;
        });
        console.log("Players", this._Players);
        this._PlayersNamesInOrder = [];
        for (var p = 0; p < this._Players.length; p++) {
            this._PlayersNamesInOrder.push(this._Players[p].icon);
        }
        console.log("PlayersNamesInOrder", this._PlayersNamesInOrder);
    };
    PlayState.prototype.AnimCharacter = function (data) {
        this.LinesPerCharc = 0;
        this.ActionsPerCharc = [];
        this.ActionCounter = 0;
        for (var c = 0; c < OrderA.length - 1; c++) {
            var or1;
            var or2;
            var Char;
            var and1;
            var and2;
            var not;
            var At6;
            var or1_satisfied = false;
            var or2_satisfied = false;
            var Char_satisfied = false;
            var and1_satisfied = false;
            var and2_satisfied = false;
            var not_satisfied = false;
            or1 = OrderA[c][0][0]; //or
            or2 = OrderA[c][0][1]; //or
            Char = OrderA[c][0][2]; //char
            and1 = OrderA[c][0][3]; //and
            and2 = OrderA[c][0][4]; //and
            not = OrderA[c][0][5]; //not
            At6 = OrderA[c][0][6]; //At6
            /*
            console.log("--------------- collected");
            console.log("or1:",or1);
            console.log("or2:",or2);
            console.log("Char:",Char);
            console.log("and1:",and1);
            console.log("and2:",and2);
            console.log("not:",not);
            console.log("At6:",At6);
            */
            //checkthislinecase
            console.log("----------------Cheking case");
            if (or1.length > 0) {
            }
            else {
                or1_satisfied = true;
            }
            if (or2.length > 0) {
            }
            else {
                or2_satisfied = true;
            }
            if (Char.length > 0) {
                //  console.log("looking for :",this.Corr(Char) );
                if (this._PlayersNamesInOrder.indexOf(this.Corr(Char)) != -1) {
                    //  console.log("Char:",this.Corr(Char) ,'satisfied'); 
                    Char_satisfied = true;
                }
            }
            else {
                Char_satisfied = true;
            }
            if (and1.length > 0) {
                var s_tocheck = and1;
                var F1 = true;
                if (and1 == "lone") {
                    F1 = this.CheckThisString(and1);
                    if (F1) {
                        and1_satisfied = true;
                    }
                }
                else if (and1.indexOf(">") != -1) {
                    F1 = this.CheckThisString(and1);
                    s_tocheck = and1.substring(0, and1.length - 2);
                    if (this._PlayersNamesInOrder.indexOf(this.Corr(s_tocheck)) != -1 && F1) {
                        and1_satisfied = true;
                    }
                }
                else {
                    if (this._PlayersNamesInOrder.indexOf(this.Corr(s_tocheck)) != -1 && F1) {
                        and1_satisfied = true;
                    }
                }
            }
            else {
                and1_satisfied = true;
            }
            if (and2.length > 0) {
            }
            else {
                and2_satisfied = true;
            }
            if (not.length > 0) {
                var F1 = false;
                if (not == "verbose") {
                    F1 = this.CheckThisString(not);
                    if (F1) {
                        not_satisfied = true;
                    }
                }
                else {
                    if (this._PlayersNamesInOrder.indexOf(this.Corr(not)) == -1) {
                        not_satisfied = true;
                    }
                }
            }
            else {
                not_satisfied = true;
            }
            console.log(or1_satisfied, or2_satisfied, Char_satisfied, and1_satisfied, and2_satisfied, not_satisfied);
            if (or1_satisfied && or2_satisfied && Char_satisfied && and1_satisfied && and2_satisfied && not_satisfied) {
                if (or1.length + or2.length + Char.length + and1.length + and2.length != 0) {
                    console.log(" GOOD LINE : ", c, " : ", OrderA[c][0]);
                    this.LinesPerCharc++;
                    this.ActionsPerCharc.push(OrderA[c][0]);
                }
                else {
                }
            }
            else {
            }
        }
        console.log("--Everyone", OrderA[235][0]);
        console.log(">>>>>>>>>>>>>>>>", data.icon);
        console.log("-- Total lines ", this.LinesPerCharc);
        console.log("-- lines data ", this.ActionsPerCharc);
        this.FirstStep();
    };
    PlayState.prototype.FirstStep = function () {
        console.log("----------------> step1", Translate(OrderA[6][0][6] + ' = '));
        this.Cadre.visible = false;
        var st = Translate(OrderA[6][0][6] + ' = ');
        this.TEXT(st, this.style1);
        SR.PlaySound(Language + '_' + Gender + "_" + OrderA[6][0][6], this.Step2, this);
        //load next sound if needed :the entire text about this role
        addLoaderStars();
        if (this.ActionsPerCharc.length > 0) {
            LoadGroup([{ sound: true, key: Language + '_' + Gender + "_" + this.ActionsPerCharc[this.ActionCounter][6], url: 'AllSounds/' + CURL + '/' + Language + '_' + Gender + "_" + this.ActionsPerCharc[this.ActionCounter][6] + '.mp3' }]);
        }
    };
    PlayState.prototype.Step2 = function () {
        console.log("----------------> step2", this.ActionsPerCharc[this.ActionCounter], this.ActionCounter, this.ActionsPerCharc.length); // this.ActionCounter = 0
        if (this.ActionsPerCharc.length > 0 && this.ActionCounter < this.ActionsPerCharc.length) {
            var st = Translate(this.ActionsPerCharc[this.ActionCounter][6] + ' = ');
            var IMG = this.GetImage(this.ActionsPerCharc[this.ActionCounter][2]);
            this.SPRITE(IMG.K, IMG.F);
            this.Cadre.visible = true;
            this.TEXT(st, this.style2);
            if (this.WereWolf_Lone) {
                this.WereWolf_Lone = false;
                SR.PlaySound(Language + '_' + Gender + "_" + this.ActionsPerCharc[this.ActionCounter][6], this.Step2, this);
                addLoaderStars();
                this.ActionCounter++; // this.ActionCounter = 1
                LoadGroup([{ sound: true, key: Language + '_' + Gender + "_" + this.ActionsPerCharc[this.ActionCounter][6], url: 'AllSounds/' + CURL + '/' + Language + '_' + Gender + "_" + this.ActionsPerCharc[this.ActionCounter][6] + '.mp3' }]);
            }
            else {
                SR.PlaySound(Language + '_' + Gender + "_" + this.ActionsPerCharc[this.ActionCounter][6], this.Step3, this);
            }
        }
        else {
            this.LastStep();
        }
    };
    PlayState.prototype.Step3 = function () {
        if (this.ActionCounter + 1 < this.ActionsPerCharc.length) {
            console.log("----------------> step3 PAUSE for ");
            var st = Translate('PAUSE for = ') + " " + Secs.toString() + Translate('seconds = ');
            // console.log("st : ",st);
            this.TEXT(st, this.style2);
            this.TE = this.game.time.events.add(Phaser.Timer.SECOND * Secs, this.Step4, this);
            //lod ...close your eyes
            addLoaderStars();
            this.ActionCounter++; // this.ActionCounter = 1
            LoadGroup([{ sound: true, key: Language + '_' + Gender + "_" + this.ActionsPerCharc[this.ActionCounter][6], url: 'AllSounds/' + CURL + '/' + Language + '_' + Gender + "_" + this.ActionsPerCharc[this.ActionCounter][6] + '.mp3' }]);
        }
        else {
            this.LastStep();
        }
    };
    PlayState.prototype.Step4 = function () {
        console.log("----------------> step4", this.ActionsPerCharc[this.ActionCounter]);
        var st = Translate(this.ActionsPerCharc[this.ActionCounter][6] + ' = ');
        var IMG = this.GetImage(this.ActionsPerCharc[this.ActionCounter][2]);
        this.SPRITE(IMG.K, IMG.F);
        this.TEXT(st, this.style2);
        //check if array contain another line 
        if (this.ActionCounter + 1 < this.ActionsPerCharc.length) {
            //we have another line
            LoadGroup([{ sound: true, key: Language + '_' + Gender + "_" + this.ActionsPerCharc[this.ActionCounter + 1][6], url: 'AllSounds/' + CURL + '/' + Language + '_' + Gender + "_" + this.ActionsPerCharc[this.ActionCounter + 1][6] + '.mp3' }]);
            SR.PlaySound(Language + '_' + Gender + "_" + this.ActionsPerCharc[this.ActionCounter][6], this.AnotherStep, this);
        }
        else {
            SR.PlaySound(Language + '_' + Gender + "_" + this.ActionsPerCharc[this.ActionCounter][6], this.LastStep, this);
        }
    };
    PlayState.prototype.AnotherStep = function () {
        this.ActionCounter++;
        console.log("reding AnotherStep : ", this.ActionsPerCharc[this.ActionCounter]);
        this.Step2();
    };
    PlayState.prototype.LastStep = function () {
        this.Cadre.visible = false;
        var st = Translate(OrderA[235][0][6] + ' = ');
        this.TEXT(st, this.style1);
        SR.PlaySound(Language + '_' + Gender + "_" + OrderA[235][0][6], this.Quit, this);
    };
    PlayState.prototype.update = function () {
    };
    PlayState.prototype.Quit = function () {
        this.QUIT = true;
    };
    PlayState.prototype.Corr = function (s, p) {
        var st = s;
        if (s == "werewolves") {
            st = "werewolf";
        }
        if (s == "anywolves") {
            for (var en = 0; en < this._PlayersNamesInOrder.length; en++) {
                for (var aa = 0; aa < anywolves_names.length; aa++) {
                    if (this._PlayersNamesInOrder[en] == anywolves_names[aa]) {
                        st = this._PlayersNamesInOrder[en];
                        console.log('anywolves >->-> ', st);
                    }
                }
            }
        }
        if (s == "anyaliens") {
            for (var en = 0; en < this._PlayersNamesInOrder.length; en++) {
                for (var aa = 0; aa < anyaliens_names.length; aa++) {
                    if (this._PlayersNamesInOrder[en] == anyaliens_names[aa]) {
                        st = this._PlayersNamesInOrder[en];
                        console.log('anyaliens >->-> ', st);
                    }
                }
            }
        }
        if (st != s) {
        }
        return st;
    };
    PlayState.prototype.GetImage = function (s) {
        var imagedata = { K: '', F: '' };
        var index = this._PlayersNamesInOrder.indexOf(this.Corr(s));
        // console.log(index,this.Corr(s));
        // console.log(this._Players[index]);
        // console.log(this._Players[index].K,this._Players[index].F);
        imagedata = { K: this._Players[index].K, F: this._Players[index].F };
        //console.log(imagedata);
        if (imagedata == null) {
            console.log("!! no image founded for ", s);
        }
        return imagedata;
    };
    PlayState.prototype.CheckThisString = function (S) {
        var VALUE = false;
        if (S == "lone") {
            if (OP[0].Selected) {
                VALUE = true;
                this.WereWolf_Lone = true;
            }
        }
        if (S == "verbose") {
            if (OP[4].Selected) {
                VALUE = true;
            }
        }
        if (S.indexOf(">") != -1) {
            var COND = parseInt(S.charAt(S.length - 1));
            //console.log(S);
            //console.log("COND",">",COND);
            //console.log(and1.substring(0,and1.length-2));
            var ss = this.Corr(S.substring(0, S.length - 2));
            // console.log('ss',ss);
            console.log(countInArray(this._PlayersNamesInOrder, ss));
            if (countInArray(this._PlayersNamesInOrder, ss) > COND) {
                VALUE = true;
            }
        }
        return VALUE;
    };
    return PlayState;
}(Phaser.Sprite));
