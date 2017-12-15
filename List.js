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
        this.Yi = 130; //197
        this.MustTweenDown = false;
        this.MustTweenUP = false;
        this.CurrentnameCounter = -1;
        this.SoundNameIsPlaying = false;
        this.IsScrolling = false;
        this.AllT = [];
        this.TextMaxWidth = 130;
        //console.log("-----------------------------------> List Constructor");
        this.GTstyle = { font: "bold 20px kabel", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "center" };
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
                var spC = this.game.make.sprite(0, 0, '');
                spC.anchor.set(0.5, 0.5);
                var sp = new Icon(this.game);
                sp.img.loadTexture(currentList[i].K, currentList[i].F);
                sp.scale.set(0.345, 0.345);
                spC.addChild(sp);
                spC.name = currentList[i].icon;
                var TxtName = this.game.make.text(-2, 60, "azertyuiopqs1", this.GTstyle);
                TxtName.anchor.set(0.5, 0.5);
                spC.addChild(TxtName);
                var TxtName2 = this.game.make.text(2, 40, "azertyuiopqs2", this.GTstyle);
                TxtName2.anchor.set(0.5, 0.5);
                spC.addChild(TxtName2);
                //Max chars :12
                var st = spC.name.toUpperCase();
                if (Translate(spC.name + ' = ')) {
                    st = Translate(spC.name + ' = ').toUpperCase();
                }
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
                var TextScale = 1;
                //break line
                if (st.length > 15 && spl.length > 2) {
                    var s2 = spl[1]; // because spl[0] = ""
                    var s1 = st.replace(spl[1], "");
                    if (spl.length > 3) {
                        s2 = spl[1] + " " + spl[2];
                        s1 = st.replace(s2, "");
                    }
                    TxtName2.text = s2;
                    TxtName.text = s1;
                    TxtName2.visible = true;
                }
                else {
                    TxtName.text = st;
                    TxtName2.visible = false;
                }
                ScaleTextWidth(TxtName, this.TextMaxWidth);
                if (s2) {
                    ScaleTextWidth(TxtName2, this.TextMaxWidth);
                }
                this.AllT.push(TxtName);
                this.AllT.push(TxtName2);
                spC.events.onInputDown.add(this.splistener, this);
                spC.events.onInputUp.add(this.removesplistener, this);
                spC.data = { _TXT: TxtName, _TXT2: TxtName2 };
                var ind = SelectedCrads.indexOf(spC.name);
                if (ind != -1) {
                    spC.alpha = 1;
                    SelectedCrads[ind] = "*"; //remove from array
                    UsedNames.push(spC.name); //save to new array
                }
                else {
                    spC.alpha = 0.6;
                }
                this.IconsGroup.add(spC);
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
        if (this.game.input.y > 960 || this.game.input.y < 210) {
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
            this.game.add.tween(this.IconsGroup).to({ x: this.IconsGroup.x, y: Math.floor(980 - this.IconsGroup.height - 280) }, 100, "Linear", true, 0);
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
            if (this.IconsGroup.y + this.IconsGroup.height < 600) {
                return;
            }
            this.IconsGroup.y = this.IconsGroup.y + (this.game.input.y - this.Y);
            this.Y = this.game.input.y;
            //console.log("this.IconsGroup.y",this.IconsGroup.y);
            if (this.IconsGroup.y + this.IconsGroup.height < 600 && this.IconsGroup.height > 800) {
                // console.log("limit down");
                this.MustTweenDown = true;
            }
            else {
                this.MustTweenDown = false;
            }
            if (this.IconsGroup.y + this.IconsGroup.height < 600 && this.IconsGroup.height < 800) {
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
                //remove from the selected cards
                removeCard(sp.name);
                SR.PlaySound('sfx_tap');
            }
            else {
                sp.alpha = 1;
                // console.log(sp.name, ":tween SC",sp.data.TXTscale);
                // if( !sp.data.TXTscale ){sp.data.TXTscale = 1;}
                // sp.data._TXT.scale.set(1.25,1.25);
                // this.game.add.tween(sp.data._TXT.scale).to({ x: sp.data.TXTscale, y: sp.data.TXTscale }, 300, "Linear", true);
                //  sp.data._TXT2.scale.set(1.25,1.25);
                //  this.game.add.tween(sp.data._TXT2.scale).to({ x: sp.data.TXTscale, y: sp.data.TXTscale }, 300, "Linear", true);
                //add to the selected cards
                AddCard(sp.name);
                SR.PlaySound('sfx_tap');
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
                var TextScale = 1;
                if (st.length > 12 && spl.length > 2) {
                    var s2 = spl[1]; // because spl[0] = ""
                    var s1 = st.replace(spl[1], "");
                    if (spl.length > 3) {
                        s2 = spl[1] + " " + spl[2];
                        s1 = st.replace(s2, "");
                    }
                    item.data._TXT2.text = s2;
                    item.data._TXT.text = s1;
                    item.data._TXT2.visible = true;
                }
                else {
                    item.data._TXT.text = st;
                    item.data._TXT2.visible = false;
                }
                item.data._TXT.scale.set(1, 1);
                item.data._TXT2.scale.set(1, 1);
                ScaleTextWidth(item.data._TXT, this.TextMaxWidth);
                if (s2) {
                    ScaleTextWidth(item.data._TXT2, this.TextMaxWidth);
                }
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
