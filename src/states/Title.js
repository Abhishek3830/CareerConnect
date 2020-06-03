import {
    Global
} from "../util/global";

export class Title extends Phaser.State {
    constructor(game) {
        super(game);

    }

    init() {
        // Global.BGAudio= this.game.add.audio("BG");
        Global.click= this.game.add.audio("click")
        // Global.countdown= this.game.add.audio("countdown")
    };
    create() {
this.count = 0;
        this.landing_Top = this.game.add.sprite(this.game.width*.5, this.game.height*.25, "LandTop");
        this.landing_Top.anchor.setTo(.5)
        this.landing_Top.name = "landingTOP";
        this.landing_Top.resizeFactor = 4;

        this.FindYourAnswer = this.game.add.button(this.game.width*.5, 0, "BUTTONS",this.onPlayClick, this, "FindAnswer", "FindAnswerRoll");
        this.FindYourAnswer.anchor.setTo(.5);
        this.FindYourAnswer.name = "findyouranswer";
        this.FindYourAnswer.resizeFactor = 7;

        this.landing_Bottom = this.game.add.sprite(this.game.width*.5, this.game.height*.78, "LandBottom");
        this.landing_Bottom.anchor.setTo(.5)
        this.landing_Bottom.name = "landingBOTTOM";
        this.landing_Bottom.resizeFactor = 2.2;
    
 

         this.FindYourAnswer.follows={
            item: this.landing_Top,
            axis: "y",
            Ydirection: 1,
            Yfactor: .65        
        }
        Global.responsiveObj.notify("item-fill-and-resize-all", {
            scene: this
        });
    };



    onPlayClick(){
       Global.serverObj.send(Global.URL_WEBSERVICE, null, null, {
            saveType: "find_y_ans",
            uniqID: Global.U_ID
        }, 'POST', null, false);
        
        Global.responsiveObj.notify("clear", null);
       
        // this.game.state.start("Instruction");
        // this.game.state.start("Game");
        this.game.state.start("Form");
        // this.game.state.start("Result");
    };
}