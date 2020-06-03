import { Global } from "../util/global";

export class Claim extends Phaser.Group{
    constructor(game){
        super(game);

        this.hide=this.hide.bind(this);
        this.show=this.show.bind(this);
    }
    init(finalCb){
        this.finalCb=finalCb;
        this.claimPopup= this.create(this.game.width*.5,this.game.height*.5,"claimed-popup");
        this.claimPopup.name="game-claim-popup";
        this.claimPopup.resizeFactor=1;
        this.claimPopup.anchor.setTo(0.5);

        this.claimHead = this.game.add.text(this.game.width * .03, this.game.width * .12, "YOU'VE UNLOCKED", {
            font: "55px RetroGaming",
            fill: "#3ddcc0",
            align:"center"
        });
        this.claimValue = this.game.add.text(this.game.width * .03, this.game.width * .12, "0% OFF", {
            font: "100px RetroGaming",
            fill: "#ffffff",
            align:"center"
        });
        
        this.claimHead.name="game-claim-head";
        this.claimHead.resizeFactor=1;
        this.claimHead.anchor.setTo(0.5);
        this.claimHead.follows={
            item:this.claimPopup,
            axis:"xy",
            Xdirection:1,Xfactor:0,
           Ydirection:-1,Yfactor:.3,
            
        }

        this.claimValue.name="game-claim-value";
        this.claimValue.resizeFactor=1;
        this.claimValue.anchor.setTo(0.5);
        this.claimValue.follows={
            item:this.claimHead,
            axis:"xy",
            Xdirection:1,Xfactor:0,
           Ydirection:1,Yfactor:1.5,
            
        }


        this.claimOk = this.game.add.button(0,0, 'buttons', this.finalCb, this, 'okBtn0001', 'okBtn0000', 'okBtn0002','okBtn0000');
        this.claimOk.name="title-play-btn";
        this.claimOk.anchor.setTo(0.5);
        this.claimOk.resizeFactor=1.8;

        this.addChild(this.claimHead);
        this.addChild(this.claimValue);
        this.addChild(this.claimOk);

        this.claimOk.follows={
            item:this.claimPopup,
            axis:"xy",
            Xdirection:1,Xfactor:0,
           Ydirection:1,Yfactor:.27,
            
        }

        Global.responsiveObj.notify("item-fill-and-resize-all", {
            scene: this
        });
    }
    updateClaimInfo(_percent){
        this.claimValue.text=String(_percent)+"% OFF";
    }
    hide(){
        this.kill();
    }
    show(){
        this.revive();
    }
}