/// <reference path="phaser.d.ts"/>
/// <reference path="Config.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var List = (function (_super) {
    __extends(List, _super);
    function List(game) {
        _super.call(this, game, 0, 0, '');
        this.Y = null;
        this.H = 0;
        this.Yi = 130; //197;
        this.MustTweenDown = false;
        this.MustTweenUP = false;
        this.CurrentnameCounter = -1;
        this.SoundNameIsPlaying = false;
        this.IsScrolling = false;
        this.AllT = [];
        this.TextMaxWidth = 146;
        console.log("-----------------------------------> List Constructor");
        this.GTstyle = { font: "bold 20px kabel", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle" };
        this.AddIcons();
        this.Fcounter = 0;
        this.FontTimerEvent = this.game.time.events.loop(Phaser.Timer.SECOND * 0.2, this.CheckFont, this);
        this.scolllmask = this.game.make.sprite(this.game.world.centerX, this.game.world.height, 'scrollmask');
        this.scolllmask.anchor.set(0.5, 1);
        this.addChild(this.scolllmask);
        Me_List = this;
        game.add.existing(this);
    }
    List.prototype.Action = function () {
    };
    List.prototype.AddIcons = function () {
        this.IconsGroup = this.game.make.group();
        this.IconsGroup.inputEnableChildren = true;
        this.addChild(this.IconsGroup);
        var UsedNames = []; // here we save add names
        for (var i = 0; i < currentList.length; i++) {
            for (var N = 0; N < currentList[i].N; N++) {
                var sp = this.game.make.sprite(0, 0, currentList[i].K, currentList[i].F);
                var img = this.game.make.sprite(0, 0, currentList[i].K, currentList[i].F);
                sp.name = currentList[i].icon;
                sp.events.onInputDown.add(this.splistener, this);
                sp.events.onInputUp.add(this.removesplistener, this);
                var Cadre = this.game.make.sprite(sp.width / 2, sp.height + 4, 'IconC');
                Cadre.anchor.set(0.5, 1);
                sp.addChild(Cadre);
                sp.addChild(img);
                // console.log("about sp",sp.width,sp.height);
                //console.log("about Cadre",Cadre.width,Cadre.height);
                //Max chars :14
                var st = sp.name.toUpperCase();
                ;
                if (Translate(sp.name + ' = ')) {
                    st = Translate(sp.name + ' = ').toUpperCase();
                }
                var TxtName = this.game.make.text(0, 0, st.toUpperCase(), this.GTstyle);
                TxtName.anchor.set(0.5, 0.5);
                TxtName.x = Cadre.x - 2; //(sp.width-TxtName.width)/2;
                TxtName.y = (sp.height - 8);
                sp.addChild(TxtName);
                var TxtName2 = this.game.make.text(0, 0, "TXT2", this.GTstyle);
                TxtName2.anchor.set(0.5, 0.5);
                TxtName2.x = Cadre.x; //(sp.width-TxtName.width)/2;
                TxtName2.y = (sp.height - 26);
                sp.addChild(TxtName2);
                /*OOOOOOOOOOOOOOO*/
                if (OP[1].Selected) {
                    TxtName.alpha = 1;
                    TxtName2.alpha = 1;
                }
                else {
                    TxtName.alpha = 0;
                    TxtName2.alpha = 0;
                }
                var spl = [];
                spl = st.split(" ");
                var TextScale = 0.95;
                //break line
                if (st.length > 15 && spl.length > 2) {
                    var s2 = spl[1]; // because spl[0] = ""
                    var s1 = st.replace(spl[1], "");
                    TxtName2.text = s2;
                    TxtName.text = s1;
                    TxtName2.visible = true;
                }
                else {
                    TxtName.text = st;
                    TxtName2.visible = false;
                    //width correction
                    if (TxtName.width > this.TextMaxWidth) {
                        TextScale = this.TextMaxWidth / TxtName.width;
                        TxtName.scale.set(TextScale, TextScale);
                    }
                    else {
                        TxtName.scale.set(sp.scale.x, sp.scale.y);
                    }
                }
                this.AllT.push(TxtName);
                this.AllT.push(TxtName2);
                sp.data = { _Cadre: Cadre, _TXT: TxtName, _TXT2: TxtName2, TXTscale: TextScale };
                var ind = SelectedCrads.indexOf(sp.name);
                if (ind != -1) {
                    sp.alpha = 1;
                    Cadre.alpha = 1;
                    SelectedCrads[ind] = "*"; //remove from array
                    UsedNames.push(sp.name); //save to new array
                }
                else {
                    sp.alpha = 0.6;
                    Cadre.alpha = 0;
                }
                sp.scale.set(0.9, 0.9);
                this.IconsGroup.add(sp);
            }
        }
        //refill the array
        SelectedCrads = UsedNames;
        this.IconsGroup.align(4, -1, 160, 170, Phaser.BOTTOM_CENTER);
        this.IconsGroup.x = 0;
        this.IconsGroup.y = this.Yi;
        //console.log("this.Yi",this.Yi);
        //create the mask
        var graphics = this.game.make.graphics(0, 0);
        graphics.beginFill(0xFF0000, 1);
        graphics.drawRect(0, 200, Config.GW, 1000); //680
        this.addChild(graphics);
        this.IconsGroup.mask = graphics;
        //alow drag drop
        this.game.input.onDown.add(this.onDown, this);
        this.game.input.onUp.add(this.onUp, this);
    };
    List.prototype.onDown = function () {
        if (this.game.input.y > 950 || this.game.input.y < 214) {
            return;
        }
        //console.log("------------------- > on down",this.game.input.y);
        if (this.Y == null) {
            this.Y = this.game.input.y;
        }
    };
    List.prototype.onUp = function () {
        //console.log("------------------- > on UP");
        this.Y = null;
        if (this.MustTweenUP) {
            //console.log("execute,MustTweenUP");
            this.game.add.tween(this.IconsGroup).to({ x: this.IconsGroup.x, y: this.Yi }, 100, "Linear", true, 0);
        }
        if (this.MustTweenDown) {
            // console.log("execute,MustTweenDown to ",950 - this.IconsGroup.height-52);
            this.game.add.tween(this.IconsGroup).to({ x: this.IconsGroup.x, y: Math.floor(980 - this.IconsGroup.height - 97) }, 100, "Linear", true, 0);
        }
    };
    List.prototype.update = function () {
        //console.log("------------------- > on down",this.game.input.y);
        // say name
        if (this.Y != null) {
            if (Math.abs(this.SYI - this.Y) > 32) {
                this.IsScrolling = true;
            }
            else {
                this.IsScrolling = false;
            }
            if (this.CurrentnameCounter != -1 && Math.abs(this.SYI - this.Y) < 32) {
                this.CurrentnameCounter--;
                if (this.CurrentnameCounter == 0) {
                    //console.log("voila",Math.abs(this.SYI-this.Y));
                    //en_male_psychic_name
                    //console.log(">>>>>>>>>>>>>>> say name",Narrator,this.currentname);
                    this.SoundNameIsPlaying = true;
                    //show stars
                    addLoaderStars();
                    //name in cache
                    console.log("keys :", Narrator + this.currentname + "_name", Narrator + this.currentname + "rules");
                    AutoPlaySounds = [Narrator + this.currentname + "_name", Narrator + this.currentname + "rules"];
                    //load and play name+rules : we have only the engilsh
                    LoadGroup([
                        { sound: true, key: Narrator + this.currentname + "_name", url: 'AllSounds/names/' + Narrator + this.currentname + "_name.mp3" },
                        { sound: true, key: Narrator + this.currentname + "rules", url: 'AllSounds/sounds/' + Narrator + this.currentname + "_rules.mp3" }
                    ]);
                }
            }
        }
        //scroll the list
        if (this.Y != null) {
            if (this.IconsGroup.y + (this.game.input.y - this.Y) > 400) {
                return;
            }
            if (this.IconsGroup.y + this.IconsGroup.height < 800) {
                return;
            }
            this.IconsGroup.y = this.IconsGroup.y + (this.game.input.y - this.Y);
            this.Y = this.game.input.y;
            //console.log("this.IconsGroup.y",this.IconsGroup.y);
            if (this.IconsGroup.y + this.IconsGroup.height < 980 && this.IconsGroup.height > 800) {
                // console.log("limit down");
                this.MustTweenDown = true;
            }
            else {
                this.MustTweenDown = false;
            }
            if (this.IconsGroup.y + this.IconsGroup.height < 980 && this.IconsGroup.height < 800) {
                // console.log("case 1",this.IconsGroup.y+this.IconsGroup.height);
                // console.log(this.IconsGroup.y,this.Yi);
                this.MustTweenUP = true;
            }
            else if (this.IconsGroup.y > this.Yi) {
                // console.log("case 2");
                this.MustTweenUP = true;
            }
            else {
                this.MustTweenUP = false;
            }
        }
    };
    List.prototype.RemoveInputs = function () {
        Me_List.game.input.onDown.remove(Me_List.onDown, Me_List);
        Me_List.game.input.onUp.remove(Me_List.onUp, Me_List);
        Me_List.IconsGroup.destroy();
        Me_List.FontTimerEvent.timer.removeAll();
    };
    List.prototype.splistener = function (sp) {
        this.currentname = sp.name;
        //  console.log("this.currentname",this.currentname) ;
        this.SYI = this.game.input.y;
        this.CurrentnameCounter = 12;
    };
    List.prototype.removesplistener = function (sp) {
        this.CurrentnameCounter = -1;
        //if not selected just t play sound
        if (!this.SoundNameIsPlaying && !this.IsScrolling) {
            if (sp.alpha == 1) {
                sp.alpha = 0.6;
                sp.data._Cadre.alpha = 0;
                //remove from the selected cards
                removeCard(sp.name);
            }
            else {
                sp.alpha = 1;
                sp.data._Cadre.alpha = 1;
                sp.data._TXT.scale.set(1.5, 1.5);
                this.game.add.tween(sp.data._TXT.scale).to({ x: sp.data.TXTscale, y: sp.data.TXTscale }, 300, "Linear", true);
                sp.data._TXT2.scale.set(1.5, 1.5);
                this.game.add.tween(sp.data._TXT2.scale).to({ x: 1, y: 1 }, 300, "Linear", true);
                //add to the selected cards
                AddCard(sp.name);
            }
        }
        this.SoundNameIsPlaying = false;
    };
    List.prototype.CheckFont = function () {
        //console.log("FirstCheck",this.Fcounter);
        for (var t = 0; t < this.AllT.length; t++) {
            this.AllT[t].setStyle(this.GTstyle);
            this.AllT[t].stroke = "#000000";
            this.AllT[t].strokeThickness = 6;
        }
        //  console.log("v",this.Fcounter);
        this.Fcounter++;
        if (this.Fcounter == MAxCheck) {
            // console.log("stop checking",this.Fcounter);
            this.FontTimerEvent.timer.removeAll();
            MAxCheck = 1;
        }
    };
    List.prototype.PauseInputsEvents = function () {
        Me_List.game.input.onDown.remove(Me_List.onDown, Me_List);
        Me_List.game.input.onUp.remove(Me_List.onUp, Me_List);
    };
    List.prototype.ResumeInputsEvents = function () {
        Me_List.game.input.onDown.add(Me_List.onDown, Me_List);
        Me_List.game.input.onUp.add(Me_List.onUp, Me_List);
    };
    List.prototype.RefreshNames = function () {
        this.IconsGroup.forEach(function (item) {
            if (Translate(item.name + ' = ')) {
                var st = Translate(item.name + ' = ').toUpperCase();
                //console.log("st",st);
                var spl = [];
                spl = st.split(" ");
                var TextScale = 0.95;
                if (st.length > 15 && spl.length > 2) {
                    var s2 = spl[1]; // because spl[0] = ""
                    var s1 = st.replace(spl[1], "");
                    item.data._TXT2.text = s2;
                    item.data._TXT.text = s1;
                    item.data._TXT2.visible = true;
                }
                else {
                    item.data._TXT.text = st;
                    item.data._TXT2.visible = false;
                    if (item.data._TXT.width > this.TextMaxWidth) {
                        TextScale = this.TextMaxWidth / item.data._TXT.width;
                        item.data._TXT.scale.set(TextScale, TextScale);
                    }
                    else {
                        item.data._TXT.scale.set(item.scale.x, item.scale.y);
                    }
                }
                item.data.TXTscale = TextScale;
            }
            /*OOOOOOOOOOOOOOO*/
            if (OP[1].Selected) {
                item.data._TXT.alpha = 1;
                item.data._TXT2.alpha = 1;
            }
            else {
                item.data._TXT.alpha = 0;
                item.data._TXT2.alpha = 0;
            }
        }, this);
    };
    return List;
}(Phaser.Sprite));
