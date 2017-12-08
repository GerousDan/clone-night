/// <reference path="phaser.d.ts"/>
/// <reference path="StarLoader.ts"/>
/// <reference path="SoundReader.ts"/>
var anyaliens_names = ["oracle", "alien", "synthetic", "cow", "groob", "zerb", "leader", "psychic", "rascal", "exposer", "blob", "mortician"];
var anywolves_names = ["werewolf", "alphawolf", "mysticwolf"];
var Papa;
var Callback1; //callback to recreate the list of icons
var SetsA = [];
var FramesA = [];
var OrderA = [];
var GameRef;
var Me; // reference to Main
var Me_List; //reference to List
var Me_PlaySate; //reference to List
var MAxCheck = 10;
var Languages = [];
Languages["en"] = { SD: '' };
Languages["fr"] = { SD: 'fr/' };
Languages["de"] = { SD: 'de/' };
Languages["es"] = { SD: 'es/' };
Languages["nl"] = { SD: 'nl/' };
Languages["pl"] = { SD: 'pl/' };
Languages["ca"] = { SD: 'ca/' };
//default value
var Language = 'en';
var Verbose = false;
var Sounds_Dir = Languages['en'].SD;
var Isloading = true;
var SL;
var AutoNextState = null;
var AutoPlaySounds;
var SR;
//Settings firstmenu : about the first 3 buttons
var SFT = [true, true, false, true, true];
//narration menu
var Gender;
var Narrator;
var CURL = "en";
var HelpTxt;
//set default value
SetGender("male");
//
function SetGender(_Gender) {
    Gender = _Gender;
    Narrator = "en_" + 'male' + "_"; //we have only english male ( rules+names)
    if (Language == "en") {
        CURL = Gender;
    }
    else {
        CURL = Language;
    }
    //name in cache
    if (OrderA.length > 0 && Gender != 'Gender Specific') {
        addLoaderStars();
        //load and play name+rules : we have only the engilsh
        LoadGroup([
            { sound: true, key: Language + '_' + Gender + "_" + OrderA[6][0][6], url: 'AllSounds/' + CURL + '/' + Language + '_' + Gender + "_" + OrderA[6][0][6] + '.mp3' },
            { sound: true, key: Language + '_' + Gender + "_" + OrderA[235][0][6], url: 'AllSounds/' + CURL + '/' + Language + '_' + Gender + "_" + OrderA[235][0][6] + '.mp3' }
        ]);
    }
}
var VOLUME = 4;
//game timer Menu
var GT = { bt1Selected: true,
    bt1Text: "1 Minute Warning",
    bt2Selected: true,
    bt2Text: "30 Second Warning"
};
var MINS = 5;
//Role Timer
var RT = {
    bt1Selected: true,
    bt1Text: "2x Complex Roles"
};
var Secs = 6;
//Background
var BCA = [];
var BCaudio = "pop";
var BCVOL = 7;
//Other options
var OP = [
    { S: "Lone Wolf", Selected: false, Visible: true, tx: "Lone", Breaker: false },
    { S: "Labels", Selected: true, Visible: true, tx: "Labels", Breaker: false },
    { S: "Move Your Card", Selected: false, Visible: true, tx: "Move", Breaker: false },
    { S: "Expert Mode", Selected: false, Visible: true, tx: "Expert", Breaker: false },
    { S: "Verbose Doppelganger", Selected: false, Visible: true, tx: "Verbose", Breaker: true },
    { S: "Randomization", Selected: false, Visible: true, tx: "Randomization", Breaker: false },
];
var RunUpdate = false; //update play button
var RunUpdate_Narration = false;
var RunUpdate_Settings = false;
var StartPlay = false;
var Config = {
    DOM_PARENT_ID: 'gameCanvas',
    GW: 640,
    GH: 1136,
    FPS: 12,
    BG_color: '#A9FF80'
};
var Group1 = [
    { sound: true, key: 'BG_Music', url: 'AllSounds/sounds/background_wolves.mp3' },
    { image: true, key: 'background', url: 'images/UI/background.png' },
    { image: true, key: 'bt', url: 'images/UI/bt.png' },
    { image: true, key: 'IconC', url: 'images/UI/IconC.png' },
    { image: true, key: 'button', url: 'images/UI/button.png' },
    { image: true, key: 'button_gear', url: 'images/UI/button_gear.png' },
    { image: true, key: 'logo_ver_en', url: 'images/UI/logo_ver_en.png' },
    { image: true, key: 'm1', url: 'images/UI/m1.png' },
    { image: true, key: 'm2', url: 'images/UI/m2.png' },
    { image: true, key: 'm3', url: 'images/UI/m3.png' },
    { image: true, key: 'm4', url: 'images/UI/m4.png' },
    { image: true, key: 'm5', url: 'images/UI/m5.png' },
    { image: true, key: 'GT', url: 'images/UI/GT.png' },
    { Atlas: true, key: 'card1', url: 'images/card1.png', urlj: 'images/card1.json' },
    { Atlas: true, key: 'card2', url: 'images/card2.png', urlj: 'images/card2.json' },
    { Atlas: true, key: 'card3', url: 'images/card3.png', urlj: 'images/card3.json' },
    { image: true, key: 'item_setting', url: 'images/UI/item_setting.png' },
    { image: true, key: 'edit_bt', url: 'images/UI/edit_bt.png' },
    { image: true, key: 'button_back', url: 'images/UI/button_back.png' },
    { image: true, key: 'scrollmask', url: 'images/UI/mask1.png' },
    { image: true, key: 'item_smallON', url: 'images/UI/item_smallON.png' },
    { image: true, key: 'item_smallOFF', url: 'images/UI/item_smallOFF.png' },
    { image: true, key: 'button_add', url: 'images/UI/button_add.png' },
    { image: true, key: 'button_sub', url: 'images/UI/button_sub.png' },
    { image: true, key: 'bezier', url: 'images/UI/bezier.png' },
    { image: true, key: 'cards_23', url: 'images/UI/cards_23.png' },
    { sound: true, key: 'sfx_tap', url: 'AllSounds/sounds/sfx_tap.mp3' },
    { sound: true, key: 'en_male_everyone_close', url: 'AllSounds/male/en_male_everyone_close.mp3' },
    { sound: true, key: 'en_male_everyone_wake', url: 'AllSounds/male/en_male_everyone_wake.mp3' }
];
var CheckCount = { FM: false, EN: false };
function LoadGroup(G) {
    Isloading = true;
    GameRef.load.onFileComplete.removeAll();
    GameRef.load.onFileComplete.add(LoadingProgress, this);
    GameRef.load.onFileError.add(LoadingError, this);
    for (var i = 0; i < G.length; i++) {
        //load atlas
        if (G[i].Atlas) {
            if (GameRef.cache.checkImageKey(G[i].key)) {
                return;
            }
            else {
                GameRef.load.atlas(G[i].key, G[i].url, G[i].urlj);
            }
        }
        else if (G[i].sound) {
            /// <reference path="AboutSounds.ts"/>
            if (GameRef.cache.checkImageKey(G[i].key)) {
                return;
            }
            var originnalKey = G[i].key;
            var CurrentKey = G[i].key;
            var WeHaveChange = false;
            if (CurrentKey.indexOf("female") != -1 || CurrentKey.indexOf("male") != -1 && G[i].url.indexOf("sounds") == -1) {
                if (EXTS.indexOf(CurrentKey) == -1) {
                    if (CurrentKey.indexOf("female") != -1) {
                        G[i].url = G[i].url.replace("female", "male");
                        CurrentKey = CurrentKey.replace("female", "male");
                        WeHaveChange = true;
                    }
                    else if (CurrentKey.indexOf("male") != -1) {
                        G[i].url = G[i].url.replace("male", "female");
                        CurrentKey = CurrentKey.replace("male", "female");
                        WeHaveChange = true;
                    }
                    //  console.log("chcking for",CurrentKey);
                    if (EXTS.indexOf(CurrentKey) == -1) {
                        // this :   //AllSounds/fr/fr_female_minion_wake.mp3
                        //become :  // AllSounds/female/minion_wake.mp3
                        //  G[i].url = G[i].url.replace()
                        G[i].url = G[i].url.replace("" + Language + "/" + Language + "_", "");
                        if (G[i].url.indexOf("female") != -1) {
                            G[i].url = G[i].url.replace("female", Gender + "/en_" + Gender);
                        }
                        else if (G[i].url.indexOf("male") != -1) {
                            G[i].url = G[i].url.replace("male", Gender + "/en_" + Gender);
                        }
                        //  console.log(" just use English",G[i].url);
                        WeHaveChange = true;
                    }
                }
                if (WeHaveChange) {
                    console.log("Changes >>>>>>>>>>>", originnalKey, "   :   ", G[i].url);
                }
                else {
                    console.log("File exist ", originnalKey);
                }
            }
            GameRef.load.audio(originnalKey, G[i].url, true);
        }
        else if (G[i].image) {
            if (GameRef.cache.checkImageKey(G[i].key)) {
                return;
            }
            else {
                GameRef.load.image(G[i].key, G[i].url);
            }
        }
    }
    GameRef.load.start();
}
function LoadingError(a, b) {
    console.log("Loading Error", b);
}
function LoadingProgress(progress, cacheKey, success, totalLoaded, totalFiles) {
    if (progress == 100) {
        Isloading = false;
    }
}
function addLoaderStars() { SL = new StarLoader(GameRef); }
function removeLoaderStars() {
    if (SL != null) {
        SL.destroy();
        SL = null;
    }
    if (AutoNextState) {
        GameRef.state.start(AutoNextState);
        AutoNextState = null;
    }
    //console.log(AutoPlaySounds);
    if (AutoPlaySounds) {
        // console.log("playing sound for ",AutoPlaySounds);
        SR.PlaySequence(AutoPlaySounds);
        AutoPlaySounds = null;
    }
}
// OneNight list
var list1 = [];
//DayBreak list
var list2 = [];
//vampire list
var list3 = [];
//Alien list
var list4 = [];
//Bonus list
var list5 = [];
var KEY;
var FN;
var FRAME;
function CreateListes() {
    for (var i = 0; i < SetsA.length; i++) {
        //console.log(">>",SetsA[i][0]);
        // OneNight list
        if (SetsA[i][0][1] == "1" || SetsA[i][0][1] == "2" || SetsA[i][0][1] == "3" || SetsA[i][0][1] == "4" || SetsA[i][0][1] == "5") {
            MyImage(SetsA[i][0][0]);
            list1.push({ Order: i, icon: SetsA[i][0][0], N: SetsA[i][0][1], K: "card" + KEY, F: "cards_" + FRAME + ".png" });
        }
        //DayBreak list
        if (SetsA[i][0][2] == "1" || SetsA[i][0][2] == "2" || SetsA[i][0][2] == "3" || SetsA[i][0][2] == "4" || SetsA[i][0][2] == "5") {
            MyImage(SetsA[i][0][0]);
            list2.push({ Order: i, icon: SetsA[i][0][0], N: SetsA[i][0][2], K: "card" + KEY, F: "cards_" + FRAME + ".png" });
        }
        //vampire list
        if (SetsA[i][0][4] == "1" || SetsA[i][0][4] == "2" || SetsA[i][0][4] == "3" || SetsA[i][0][4] == "4" || SetsA[i][0][4] == "5") {
            MyImage(SetsA[i][0][0]);
            list3.push({ Order: i, icon: SetsA[i][0][0], N: SetsA[i][0][4], K: "card" + KEY, F: "cards_" + FRAME + ".png" });
        }
        //Alien list
        if (SetsA[i][0][6] == "1" || SetsA[i][0][6] == "2" || SetsA[i][0][6] == "3" || SetsA[i][0][6] == "4" || SetsA[i][0][6] == "5") {
            MyImage(SetsA[i][0][0]);
            list4.push({ Order: i, icon: SetsA[i][0][0], N: SetsA[i][0][6], K: "card" + KEY, F: "cards_" + FRAME + ".png" });
        }
        //bonus list
        if (SetsA[i][0][3] == "1" || SetsA[i][0][3] == "2" || SetsA[i][0][3] == "3" || SetsA[i][0][3] == "4" || SetsA[i][0][3] == "5") {
            MyImage(SetsA[i][0][0]);
            list5.push({ Order: i, icon: SetsA[i][0][0], N: SetsA[i][0][3], K: "card" + KEY, F: "cards_" + FRAME + ".png" });
        }
        if (SetsA[i][0][5] == "1" || SetsA[i][0][5] == "2" || SetsA[i][0][5] == "3" || SetsA[i][0][5] == "4" || SetsA[i][0][5] == "5") {
            MyImage(SetsA[i][0][0]);
            list5.push({ Order: i, icon: SetsA[i][0][0], N: SetsA[i][0][5], K: "card" + KEY, F: "cards_" + FRAME + ".png" });
        }
        if (SetsA[i][0][7] == "1" || SetsA[i][0][7] == "2" || SetsA[i][0][7] == "3" || SetsA[i][0][7] == "4" || SetsA[i][0][7] == "5") {
            MyImage(SetsA[i][0][0]);
            list5.push({ Order: i, icon: SetsA[i][0][0], N: SetsA[i][0][7], K: "card" + KEY, F: "cards_" + FRAME + ".png" });
        }
    }
    console.log('OneNight list: list1', list1.length, list1);
    //console.log('DayBreak list: list2',list2);
    /*
    console.log('vampire list: list3',list3.length);
    console.log('Alien list: list4',list4.length,list4);
    console.log('Bonus pack list: list4',list5.length,list5);
    */
}
var List1Selected = true;
var List2Selected = false;
var List3Selected = false;
var List4Selected = false;
var List5Selected = false;
var currentList = [];
function GetCurrentList() {
    currentList = [];
    if (List1Selected) {
        currentList = currentList.concat(list1);
    }
    if (List2Selected) {
        currentList = currentList.concat(list2);
    }
    if (List3Selected) {
        currentList = currentList.concat(list3);
    }
    if (List4Selected) {
        currentList = currentList.concat(list4);
    }
    if (List5Selected) {
        currentList = currentList.concat(list5);
    }
    //sort by order
    currentList.sort(function (a, b) {
        return a.Order - b.Order;
    });
    //check if we have to remove some seletcted cards
    CheckSelectedCrads();
}
function MyImage(name) {
    //where is my image
    for (var f = 0; f < FramesA.length; f++) {
        //if this is my name
        if (FramesA[f][0][0] == name) {
            KEY = FramesA[f][0][1];
            FN = parseInt(FramesA[f][0][2]) + 1;
            if (FN < 10) {
                FRAME = "0" + FN.toString();
            }
            else {
                FRAME = FN.toString();
            }
            break;
        }
    }
}
var SelectedCrads = ["minion"];
function AddCard(card_name) {
    SelectedCrads.push(card_name);
    //console.log(SelectedCrads);
    RunUpdate = true;
}
function removeCard(card_name) {
    var index = SelectedCrads.indexOf(card_name);
    if (index > -1) {
        SelectedCrads.splice(index, 1);
    }
    //console.log(SelectedCrads);
    RunUpdate = true;
}
function CheckSelectedCrads() {
    if (SelectedCrads.length == 0) {
        return;
    }
    var A = [];
    for (var s = 0; s < SelectedCrads.length; s++) {
        for (var i = 0; i < currentList.length; i++) {
            if (currentList[i].icon == SelectedCrads[s]) {
                A.push(SelectedCrads[s]);
            }
        }
    }
    //console.log("Still",A);
    SelectedCrads = A;
    RunUpdate = true;
}
var entxt = [];
var frtxt = [];
var detxt = [];
var estxt = [];
var nltxt = [];
var pltxt = [];
var catxt = [];
var TranslationArray;
function NewLanguage(_Language) {
    Language = _Language;
    Sounds_Dir = Languages['en'].SD;
    TranslationArray = [];
    var fileUrl;
    var helpUrl;
    if (Language == "en") {
        fileUrl = 'data/en.txt';
        helpUrl = '';
    }
    if (Language == "fr") {
        fileUrl = 'data/fr.txt';
    }
    if (Language == "de") {
        fileUrl = 'data/de.txt';
    }
    if (Language == "es") {
        fileUrl = 'data/es.txt';
    }
    if (Language == "nl") {
        fileUrl = 'data/nl.txt';
    }
    if (Language == "pl") {
        fileUrl = 'data/pl.txt';
    }
    if (Language == "ca") {
        fileUrl = 'data/ca.txt';
    }
    var exist = false;
    if (Language == "en" && entxt.length > 0) {
        TranslationArray = entxt;
        exist = true;
    }
    if (Language == "fr" && frtxt.length > 0) {
        TranslationArray = frtxt;
        exist = true;
    }
    if (Language == "de" && detxt.length > 0) {
        TranslationArray = detxt;
        exist = true;
    }
    if (Language == "es" && estxt.length > 0) {
        TranslationArray = estxt;
        exist = true;
    }
    if (Language == "nl" && nltxt.length > 0) {
        TranslationArray = nltxt;
        exist = true;
    }
    if (Language == "pl" && pltxt.length > 0) {
        TranslationArray = pltxt;
        exist = true;
    }
    if (Language == "ca" && catxt.length > 0) {
        TranslationArray = catxt;
        exist = true;
    }
    if (!exist) {
        //load the txt file about translation
        Papa.parse(fileUrl, {
            download: true,
            step: function (row) {
                //console.log("Row:", row.data);
                TranslationArray.push(row.data);
            },
            complete: function () {
                console.log("TranslationArray ready", TranslationArray.length, Language);
                if (Language == "en") {
                    entxt = TranslationArray;
                }
                if (Language == "fr") {
                    frtxt = TranslationArray;
                }
                if (Language == "de") {
                    detxt = TranslationArray;
                }
                if (Language == "es") {
                    estxt = TranslationArray;
                }
                if (Language == "nl") {
                    nltxt = TranslationArray;
                }
                if (Language == "pl") {
                    pltxt = TranslationArray;
                }
                if (Language == "ca") {
                    catxt = TranslationArray;
                }
                RunUpdate = true; //update play button
                RunUpdate_Narration = true;
            }
        });
    }
    else {
        RunUpdate = true; //update play button
        RunUpdate_Narration = true;
    }
}
function Translate(Word) {
    //console.log('TranslationArray.length',TranslationArray.length);
    for (var t = 0; t < TranslationArray.length; t++) {
        var str = TranslationArray[t][0].toString();
        var result = null;
        if (str.indexOf(Word) != -1) {
            var st = str.indexOf("=");
            result = str.substring(st + 1, str.length);
            break;
        }
    }
    //if result null use english version
    if (result == null && entxt.length > 0) {
        for (var te = 0; te < entxt.length; te++) {
            var str = entxt[te][0].toString();
            if (str.indexOf(Word) != -1) {
                var st = str.indexOf("=");
                result = str.substring(st + 1, str.length);
                console.log('!!! translation not foundin' + Language + ', use english :', result);
                break;
            }
        }
    }
    return result;
}
function ScaleTextWidth(TXT, MaxWidth) {
    var SC = 1;
    if (TXT.width > MaxWidth) {
        SC = MaxWidth / TXT.width;
        TXT.scale.set(SC, SC);
    }
    return SC;
}
function AddBreakAt(TXT, BreakAt) {
    var spl = [];
    spl = TXT.split(" ");
    //console.log("spl",spl);
    var FirstPart = [];
    for (var F = 0; F < BreakAt; F++) {
        FirstPart.push(spl[F]);
    }
    //correction for "(";
    var P = "";
    if (FirstPart[FirstPart.length - 1] == "(") {
        FirstPart.pop();
        P = "(";
    }
    //add break
    FirstPart.push("\n");
    //create second part
    var SecondPart = [];
    SecondPart.push(P + spl[BreakAt]);
    for (var S = BreakAt + 1; S < spl.length; S++) {
        SecondPart.push(spl[S]);
    }
    spl = FirstPart.concat(SecondPart);
    //console.log("result spl",spl);
    var Result = spl.join(" ");
    // console.log("Result ",Result);
    return Result;
}
//Finding out how many times an array element appears
function countInArray(array, what) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] === what) {
            count++;
        }
    }
    return count;
}
NewLanguage("en");
