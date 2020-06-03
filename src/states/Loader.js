import {
    Global
} from '../util/global';
import {
    loaderObj
}
from '../loader';


export class Loader extends Phaser.State {
    constructor() {
        super();

        this.loaderInt = null;
        this.dostCnt = 0;

        this.setUID = this.setUID.bind(this);

    }
    init() {
 
       /*  Global.serverObj.send(Global.URL_CREATE, this.setUID.bind(this), null, {
            device: (Global.isMobile) ? "mobile" : "web",
            utm_source:utm_source,
            utm_medium:utm_medium,
            utm_campaign:utm_campaign,
            fresh: true
        }, 'POST', null, false);  */
    }


    setUID(v) {
        Global.U_ID = JSON.parse(v)["UID"];
        Global.gameKey = JSON.parse(v)["gamekey"];

        setTimeout((function () {
            this.loadAssets();
        }).bind(this), 0);
    }
    preload() {

     
        this.loaderObj = new loaderObj();
        this.loaderObj.init(this.game,"./assets/icon.png?v=1.0.0.0"); 
        var version_code = "1.0.0.9"
   

        this.game.load.image("LandTop", "./assets/01LandingTypo.png?v=" + version_code);
        this.game.load.image("LandBottom", "./assets/01LandingFooter.png?v=" + version_code);
        this.game.load.image("Q_HEAD", "./assets/02QuestionHeaderGraphic.png?v=" + version_code);
        this.game.load.image("Q_FOOT", "./assets/02QuestionFooter.png?v=" + version_code);
        this.game.load.image("answerA", "./assets/Result-Career360.png?v=" + version_code);
        this.game.load.image("answerB", "./assets/Result-CareerActivator.png?v=" + version_code);
        this.game.load.image("answerC", "./assets/Result-CareerCatalyst.png?v=" + version_code);
        this.game.load.image("answerD", "./assets/Result-CareerEnergiser.png?v=" + version_code);
        this.game.load.image("answerE", "./assets/Result-CareerRecharger.png?v=" + version_code);
        this.game.load.image("RFOOT", "./assets/ResultFooter.png?v=" + version_code);

        this.game.load.atlasJSONHash('BUTTONS',  './assets/buttons.png?v=' +version_code , './assets/buttons.json?v=' + version_code);
        this.game.load.atlasJSONHash('Boxes',  './assets/boxes.png?v=' +version_code , './assets/boxes.json?v=' + version_code);
        this.game.load.atlasJSONHash('Dotss',  './assets/dot.png?v=' +version_code , './assets/dot.json?v=' + version_code);

        
       

        // this.game.load.audio("BG","assets/audio/gameBG.mp3");
        // this.game.load.audio("click","assets/audio/Clicking.mp3");
        // this.game.load.audio("countdown","assets/audio/countdown.mp3");

        
        
        
        
        }
    

    create() {
        Global.responsiveObj.notify("clear", null);
        this.game.state.start("Title");
    }

}