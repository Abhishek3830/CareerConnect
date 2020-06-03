import { Global } from "../util/global";

export class Instruction extends Phaser.State{
    constructor(game){
        super(game);
    }
    init(){};
    create(){
        var count = 1;
        this.BG = this.game.add.sprite(0, 0, "1instruction");
        this.BG.name = "instructionBG";
        this.BG.resizeFactor = 1;

        var ab = setInterval(function(){
            count++;
            // console.log(count+"ksd")
            this.BG.loadTexture(count+"instruction");
            if(count == 10){
                this.nextPage();
            }
        }.bind(this),1000)
        
        setTimeout(function(){
            clearInterval(ab);
        },9000)



        

        Global.responsiveObj.notify("set-bg", {
            scene: this,
            BG: this.BG

        });
        Global.responsiveObj.notify("item-fill-and-resize-all", {
            scene: this
        });

        // this.howToPlay.y= (this.startBtn.y-this.startBtn.height/2-this.dashLogo.y+this.dashLogo.height)/2-this.howToPlay.height*1.2;
        // this.howToEarn.y= (this.startBtn.y-this.startBtn.height/2-this.dashLogo.y+this.dashLogo.height)/2;//this.howToEarn.height*.2;
    };

    nextPage(){
     /*    Global.serverObj.send(Global.URL_VUPDATE, null, null, {
            saveType: "startGameClick",
            uniqID: Global.U_ID
        }, 'POST', null, false);
        Global.responsiveObj.notify("clear", null); */
        this.game.state.start("Game");
    };
}