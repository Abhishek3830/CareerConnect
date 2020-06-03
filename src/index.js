import {
    ResponsiveGame
} from './util/responsive-util';
import {
    Global
} from './util/global';
import {
    Loader
} from './states/Loader';
import {
    Game
} from './states/Game';
import { Title } from './states/Title';
import { Instruction } from './states/Instruction';
import { Form } from './states/Form';
import { Result } from './states/Result';
import { Server } from './util/callServer';

// import {Server} from './util/callServer';


var deviceDetector = function () {
    var b = navigator.userAgent.toLowerCase(),
        a = function (a) {
            void 0 !== a && (b = a.toLowerCase());
            return /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(b) ? "tablet" : /(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire|puffin|blazer|bolt|gobrowser|iris|maemo|semc|teashark|uzard)/.test(b) ? "phone" : "desktop"
        };
    return {
        device: a(),
        detect: a,
        isMobile: "desktop" != a() ? !0 : !1,
        userAgent: b
    }
}();

export default class Boot {
    constructor() {



        this.setUID=this.setUID.bind(this);

    }
    init() {
       
        Global.serverObj= new Server();
        Global.isMobile = !(deviceDetector.device == "desktop");
        Global.responsiveObj = new ResponsiveGame();
        Global.defaultDimension = Global.responsiveObj.init({
            orientation: "portrait",
            defaultDimension: {
                width: 1242,
                height: 2208
            }

        });
        this.g = new Phaser.Game(Global.defaultDimension.width, Global.defaultDimension.height, (navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ? Phaser.AUTO : Phaser.CANVAS), "game-sec", {
            preload: this.preload,
            create: this.create,
            setUID:this.setUID
        }, true, true);
    }
    preload() {

        this.game.state.add("Loader", Loader);
        this.game.state.add("Title", Title);
        this.game.state.add("Instruction", Instruction);
        this.game.state.add('Game',Game);
        this.game.state.add('Form',Form);
        this.game.state.add('Result',Result);
  /*       this.game.state.add("Title", Title);
        this.game.state.add("Game", Game);
        this.game.state.add("Share", ShareScreen);
        this.game.state.add("Form", Form); */
        
        /*  this.game.state.add("Game", Game);
         this.game.load.image('loaderBG', 'assets/loaderBG.jpg');
         this.game.load.image('loaderDots', 'assets/loaderDots.png');
         this.game.load.json('dataJSON', './config.json');
         this.game.load.json('listJson', './json/que.json'); */
    }
    setUID(v) {

        Global.U_ID = JSON.parse(v).U_ID;
        Global.gameKey = JSON.parse(v)["gamekey"];


    }
    create() {
        console.log(this," this")
        

         Global.responsiveObj.notify("subscribe", {
             scene: this
         });
         Global.serverObj.send(Global.URL_CREATE, this.setUID.bind(this), null, {
            device: (Global.isMobile) ? "mobile" : "web",
            fresh: true,
            platform:"",
            version:""
        }, 'POST', null, false);

        this.game.state.start("Loader");
        console.log(Global.U_ID+"Global.U_ID")
        console.log(Global.gameKey+"Global.gamekey")
    }
   



}

window.onload = function () {
    setTimeout(function () {
        var bootObj = new Boot();
        bootObj.init();
    }, ((deviceDetector.device == "desktop")?0:2000))
}