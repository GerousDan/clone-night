var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="phaser.d.ts"/>
/// <reference path="Config.ts"/>
/// <reference path="VOL.ts"/>
var Narration = (function (_super) {
    __extends(Narration, _super);
    function Narration(game, TXT) {
        _super.call(this, game, 0, 0, '');
        this.Toggles = [];
        this.AllL = [
            { L: 'language', P: 'en' }, { L: 'language', P: 'fr' }, { L: 'language', P: 'de' },
            { L: 'language', P: 'es' }, { L: 'language', P: 'nl' }, { L: 'language', P: 'pl' },
            { L: 'language', P: 'ca' }];
        this.CurrentL = 0;
        // check where to start 
        for (var c = 0; c < this.AllL.length; c++) {
            if (Language == this.AllL[c].P) {
                this.CurrentL = c;
            }
        }
        //add text1
        this.style1 = { font: "bold 64px kabel", fill: "#FFFF00", boundsAlignH: "center", boundsAlignV: "left" };
        this.Title = this.game.make.text(this.game.world.centerX, 240, TXT, this.style1);
        this.Title.anchor.set(0.5, 0.5);
        this.addChild(this.Title);
        ScaleTextWidth(this.Title, 600);
        //add 3 buttons
        this.style2 = { font: "bold 32px kabel", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "left" };
        //male
        this.male_sp = this.game.make.sprite(this.game.world.centerX - 64, 340, 'item_smallOFF');
        this.male_sp.anchor.set(0.5, 0.5);
        this.male_txt = this.game.make.text(0, 5, Translate('male = '), this.style2);
        this.male_txt.anchor.set(0.5, 0.5);
        this.addChild(this.male_sp);
        this.male_sp.name = 'male';
        this.male_sp.data = { selected: false };
        if (Gender == 'male') {
            this.male_sp.loadTexture('item_smallON');
            this.male_sp.data = { selected: true };
        }
        this.male_sp.addChild(this.male_txt);
        this.male_sp.inputEnabled = true;
        this.male_sp.events.onInputDown.add(this.Switch, this);
        //femle
        this.female_sp = this.game.make.sprite(this.game.world.centerX - 64, 420, 'item_smallOFF');
        this.female_sp.anchor.set(0.5, 0.5);
        this.female_txt = this.game.make.text(0, 5, Translate('female = '), this.style2);
        this.female_txt.anchor.set(0.5, 0.5);
        this.addChild(this.female_sp);
        this.female_sp.name = 'female';
        this.female_sp.data = { selected: false };
        if (Gender == 'female') {
            this.female_sp.loadTexture('item_smallON');
            this.female_sp.data = { selected: true };
        }
        this.female_sp.addChild(this.female_txt);
        this.female_sp.inputEnabled = true;
        this.female_sp.events.onInputDown.add(this.Switch, this);
        //GENDER SPECIFIC
        this.GS_sp = this.game.make.sprite(this.game.world.centerX - 64, 500, 'item_smallOFF');
        this.GS_sp.anchor.set(0.5, 0.5);
        this.GS_txt = this.game.make.text(0, 5, Translate('Gender Specific = '), this.style2);
        this.GS_txt.anchor.set(0.5, 0.5);
        if (this.GS_txt.width + 15 > this.male_sp.width) {
            // console.log("aplly scaling",this.male_sp.width/(this.GS_txt.width+15));
            this.GS_txt.scale.set(this.male_sp.width / (this.GS_txt.width + 15), this.male_sp.width / (this.GS_txt.width + 15));
        }
        else {
            this.GS_txt.scale.set(1, 1);
        }
        this.addChild(this.GS_sp);
        this.GS_sp.name = "Gender Specific";
        this.GS_sp.data = { selected: false };
        if (Gender == 'Gender Specific') {
            this.GS_sp.loadTexture('item_smallON');
            this.GS_sp.data = { selected: true };
        }
        this.GS_sp.addChild(this.GS_txt);
        this.GS_sp.inputEnabled = true;
        this.GS_sp.events.onInputDown.add(this.Switch, this);
        //Language
        this.Language_sp = this.game.make.sprite(this.game.world.centerX - 64, 580, 'item_smallON');
        this.Language_sp.anchor.set(0.5, 0.5);
        var st = Translate(this.AllL[this.CurrentL].L + ' = ') + " " + (this.AllL[this.CurrentL].P).toUpperCase();
        this.L_txt = this.game.make.text(0, 5, st, this.style2);
        this.L_txt.anchor.set(0.5, 0.5);
        this.addChild(this.Language_sp);
        this.Language_sp.addChild(this.L_txt);
        this.Language_sp.inputEnabled = true;
        this.Language_sp.events.onInputDown.add(this.Togglelanguage, this);
        this.Language_sp.data = { selected: true };
        // volumes
        this.Vol = new VOL(this.game, this.game.world.width - 90, this.game.world.centerY - 173, Translate("vol = "));
        this.Vol.scale.set(0.8, 0.8);
        this.addChild(this.Vol);
        this.Vol.VolCounterText.text = VOLUME.toString();
        this.Vol.Vplus.events.onInputDown.add(this.FuncP, this);
        this.Vol.Vmins.events.onInputDown.add(this.FuncM, this);
        this.Toggles = [this.male_sp, this.female_sp, this.GS_sp];
    }
    Narration.prototype.Switch = function (sp) {
        if (sp.data.selected) {
            SR.PlaySound('sfx_tap');
            sp.loadTexture('item_smallOFF');
            sp.data.selected = false;
        }
        else {
            for (var i = 0; i < this.Toggles.length; i++) {
                this.Toggles[i].loadTexture('item_smallOFF');
                this.Toggles[i].data.selected = false;
            }
            sp.loadTexture('item_smallON');
            SR.PlaySound('sfx_tap');
            sp.data.selected = true;
            Gender = sp.name;
        }
    };
    Narration.prototype.Togglelanguage = function () {
        this.CurrentL++;
        if (this.CurrentL >= this.AllL.length) {
            this.CurrentL = 0;
        }
        //this.L_txt.text = this.AllL[this.CurrentL].L;
        // import new language text
        NewLanguage(this.AllL[this.CurrentL].P);
    };
    Narration.prototype.RefreshTexts = function () {
        var st = Translate(this.AllL[this.CurrentL].L + ' = ') + " " + (this.AllL[this.CurrentL].P).toUpperCase();
        this.L_txt.text = st;
        this.Vol.VolTxt.text = Translate("vol = ");
        this.Title.text = Translate('Narration = ');
        this.male_txt.text = Translate('male = ');
        this.female_txt.text = Translate('female = ');
        this.GS_txt.text = Translate('Gender Specific = ');
        //correction  scale GS text
        if (this.GS_txt.width + 15 > this.male_sp.width) {
            // console.log("aplly scaling",this.male_sp.width/(this.GS_txt.width+15));
            this.GS_txt.scale.set(this.male_sp.width / (this.GS_txt.width + 15), this.male_sp.width / (this.GS_txt.width + 15));
        }
        else {
            this.GS_txt.scale.set(1, 1);
        }
    };
    Narration.prototype.FuncP = function () {
        console.log("FuncP");
        SR.PlaySound('sfx_tap');
        VOLUME++;
        this.SaveVolume();
    };
    Narration.prototype.FuncM = function () {
        SR.PlaySound('sfx_tap');
        VOLUME--;
        this.SaveVolume();
    };
    Narration.prototype.SaveVolume = function () {
        if (VOLUME > 10) {
            VOLUME = 10;
        }
        if (VOLUME < 0) {
            VOLUME = 0;
        }
        //show the volume
        this.Vol.VolCounterText.text = VOLUME.toString();
        //apply the volume
    };
    return Narration;
}(Phaser.Sprite));
