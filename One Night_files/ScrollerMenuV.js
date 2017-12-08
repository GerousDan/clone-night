var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="phaser.d.ts"/>
/// <reference path="Config.ts"/>
var ScrollerMenuV = (function (_super) {
    __extends(ScrollerMenuV, _super);
    function ScrollerMenuV(game, data, ItemSizes, GAPY, MaskSizes) {
        _super.call(this, game, 0, 0, '');
        this.WW = 0;
        this.HH = 0;
        this.Y = 0;
        this.LimitTop = 0;
        this.LimitDown = 0;
        this.MustTweenDown = false;
        this.MustTweenUP = false;
        this.StopDelta = 120;
        this.StartScroll = false;
        this.Yvar = 0;
        this.StartScroll = false;
        this.style2 = { font: "bold 32px kabel", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "left" };
        this.LimitDown = MaskSizes.H;
        this.MustTweenUP = false;
        this.MustTweenDown = false;
        this.Container = this.game.make.sprite(0, 0, '');
        this.Toggles = [];
        this.Hitem = (ItemSizes.H + GAPY);
        this.Witem = ItemSizes.W;
        for (var i = 0; i < data.length; i++) {
            if (data[i].length > 0) {
                var bt = this.game.make.sprite(0, 0 + (i * this.Hitem), 'item_smallOFF');
                bt.anchor.set(0.5, 0.5);
                var s = data[i].toLowerCase();
                // console.log(s);
                // console.log("Translate s : ",Translate(s+' = '));
                if (Translate(s + ' = ')) {
                    s = Translate(s + ' = ');
                }
                ;
                var bt_text = this.game.make.text(0, 5, s, this.style2);
                bt_text.anchor.set(0.5, 0.5);
                bt.name = data[i].toLowerCase();
                bt.data = { selected: false, TXT: bt_text };
                bt.addChild(bt_text);
                if (BCaudio == bt.name) {
                    bt.loadTexture("item_smallON");
                    bt.data = { selected: true, TXT: bt_text };
                }
                this.Container.addChild(bt);
                this.Toggles.push(bt);
                this.WW = Math.max(this.WW, bt.width);
                this.HH += (bt.height + GAPY);
            }
        }
        //hided bg for container
        var _graphics = this.game.make.graphics(0, 0);
        _graphics.beginFill(0xFF0000, 0);
        _graphics.drawRect(-ItemSizes.W / 2, -ItemSizes.H / 2, this.WW, this.HH); //680
        this.Container.addChildAt(_graphics, 0);
        this.addChild(this.Container);
        //create the mask
        var graphics = this.game.make.graphics(0, 0);
        graphics.beginFill(0xFF0000, 1);
        graphics.drawRect(-ItemSizes.W / 2, -5 + (-ItemSizes.H / 2), MaskSizes.W, MaskSizes.H); //680
        this.addChild(graphics);
        this.Container.mask = graphics;
        this.game.input.onDown.add(this.onDown, this);
        this.game.input.onUp.add(this.onUp, this);
    }
    ScrollerMenuV.prototype.BeforeQuit = function () {
        this.game.input.onDown.remove(this.onDown, this);
        this.game.input.onUp.remove(this.onUp, this);
    };
    ScrollerMenuV.prototype.Action = function (sp) {
        // console.log(e1,e2)
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
        }
        //save value
        console.log(sp.name);
        BCaudio = sp.name;
        if (BCaudio != "none") {
            //show stars
            addLoaderStars();
            //name in cache
            //AutoPlaySounds = null;// 
            AutoPlaySounds = [BCaudio];
            //load and play name+rules : we have only the engilsh
            LoadGroup([{ sound: true, key: BCaudio, url: 'AllSounds/sounds/background_' + BCaudio + '.mp3' }]);
        }
    };
    ScrollerMenuV.prototype.update = function () {
        if (!this.StartScroll) {
            return;
        }
        //scroll
        if (this.Y && this.Container.y < (this.LimitTop + this.StopDelta) && this.Container.y + this.HH > this.LimitDown - this.StopDelta) {
            var DeltaY = this.game.input.y - this.Y;
            this.Container.y = this.Container.y + DeltaY;
            this.Y = this.game.input.y;
            this.Yvar = Math.max(this.Yvar, Math.abs(DeltaY));
        }
        //check limit top
        if (this.Container.y > this.LimitTop) {
            this.MustTweenUP = true;
        } //check limit Down
        if (Math.floor(this.Container.y + this.HH) < this.LimitDown) {
            this.MustTweenDown = true;
        }
    };
    ScrollerMenuV.prototype.onDown = function () {
        if (this.game.input.y < this.y - (this.Hitem / 2)) {
            return;
        }
        if (this.game.input.y > this.y + this.LimitDown - (this.Hitem / 2)) {
            return;
        }
        if (this.game.input.x < this.x - (this.Witem / 2)) {
            return;
        }
        if (this.game.input.x > this.x + (this.Witem / 2)) {
            return;
        }
        if (this.Y == null) {
            this.Yvar = 0;
            this.Y = this.game.input.y;
            this.StartScroll = true;
        }
    };
    ScrollerMenuV.prototype.onUp = function () {
        this.Y = null;
        if (!this.StartScroll) {
            return;
        }
        if (this.MustTweenUP) {
            this.game.add.tween(this.Container).to({ x: this.Container.x, y: this.LimitTop }, 100, "Linear", true, 0);
        }
        if (this.MustTweenDown) {
            this.game.add.tween(this.Container).to({ x: this.Container.x, y: Math.floor(this.LimitDown - this.HH) }, 100, "Linear", true, 0);
        }
        this.MustTweenUP = false;
        this.MustTweenDown = false;
        this.StartScroll = false;
        if (this.Yvar > 4) {
            console.log("this is a move");
        }
        else {
            //console.log("this is a click",(this.game.input.y-this.Container.y)-this.y);
            // console.log();
            var index = 1 + Math.floor(((this.Hitem / 2) + (this.game.input.y - this.Container.y) - this.y) / 71); //1+ because graphics is at 0
            var Selected = this.Container.getChildAt(index);
            //console.log(index,Selected.name );
            this.Action(Selected);
        }
    };
    return ScrollerMenuV;
}(Phaser.Sprite));
