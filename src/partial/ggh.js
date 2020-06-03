import { Global } from "../util/global";

export class GameTimer extends Phaser.Group {
    constructor(game) {
        super(game);

        this.time = 0;
        this.timerActive=false;
        this.elapsedTime=0;
        this.second=0;
        this.prevSecond=0;
        this.maxTime=60;

    }

    init(timeAlloted,finishCb) {
        this.time = timeAlloted;
        this.finishCb=finishCb;
        this.timerHead = this.game.add.text(this.game.width * .03, this.game.width * .12, "TIME", {
            font: "45px RetroGaming",
            fill: "#ffffff"
        });

        this.timerTxt = this.game.add.text(0,0, String(this.time), {
            font: "80px RetroGaming",
            fill: "#ffffff"
        });
        this.timerPF = this.game.add.text(0,0, "s", {
            font: "80px RetroGaming",
            fill: "#ffffff"
        });

        this.addChild(this.timerHead);
        this.addChild(this.timerTxt);
        this.addChild(this.timerPF);
        this.timerHead.name = "game-timer-head";
        this.timerHead.resizeFactor = 1;
        this.timerTxt.name = "game-timer-text";
        this.timerTxt.resizeFactor = 1;
        this.timerPF.name = "game-timer-pf";
        this.timerPF.resizeFactor = 1;

        this.timerHead.anchor.setTo(0,1);
        this.timerTxt.anchor.setTo(0,1);
        this.timerPF.anchor.setTo(0,1);

        this.timerTxt.follows={
            item:this.timerHead,
            axis:"xy",
            Xdirection:1,
            Xfactor:1.1,
            Ydirection:1,
            Yfactor:.2
        }
        this.timerPF.follows={
            item:this.timerTxt,
            axis:"xy",
            Xdirection:1,
            Xfactor:1.05,
            Ydirection:-1,
            Yfactor:0.02
        }

        Global.responsiveObj.notify("item-fill-and-resize-all", {
            scene: this
        });
    }

    setActive(_status){
        this.timerActive=_status;
    }
    resetTimer(){
        this.elapsedTime=0;
    }
    stopTimer(){
        this.setActive(false);
        this.finishCb();
    }
    updateTime(_time){
        this.timerTxt.text = (_time<10)?("0"+String(_time)):String(_time);
        Global.responsiveObj.notify("item-fill-and-resize-all", {
            scene: this
        });
    }
    update(){
        if ( this.timerActive) {
            
            this.elapsedTime += 33 / 2; 
            this.second = this.maxTime-Math.floor((this.elapsedTime / 1000) % 61);
            if(this.second!=this.prevSecond){
                this.updateTime(this.second);
            }
            if(this.second<=0){
                this.stopTimer();
            }
            this.prevSecond= this.second;
        }
    }
}