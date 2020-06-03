import {
    Global
} from "../util/global";

export class Player extends Phaser.Group {
    constructor(game, x, y, key) {
        super(game);

        this.blinkTargetCnt = 0;
        this.blinkCnt = 0;
        this.blinkDir = 1;
        this.blinking = false;
        this.vibrateDir=1;
        this.carDirection=0;

        this.vibrate = this.vibrate.bind(this);
        this.movePlayer= this.movePlayer.bind(this);
        this.blink = this.blink.bind(this);
    }
    init(onReachToDestination) {
        this.active=false;
        this.onReachToDestination=onReachToDestination;
        this.playerCar = this.create(this.game.width * .3, this.game.height * .8, "player");

        this.playerCar.name = "game-player-car";
        this.playerCar.resizeFactor = 2.3;
        this.playerCar.anchor.setTo(0.5, 0);
        Global.responsiveObj.notify("item-fill-and-resize-all", {
            scene: this
        });

        this.vibrate();
    }
    update() {

    }

    isBlinking() {
        return this.blinking;
    }
    blink(cnt) {
        if (!isNaN(cnt)) {
            this.blinkTwn = new Phaser.Tween(this, this.game, this.game.tweens);
            this.blinkTwn.onComplete.add(this.blink);
            this.blinkTargetCnt = cnt;
            this.blinkCnt = 0;
            this.blinking = true;
        }
        this.blinkCnt++;
        if (this.blinkCnt <= this.blinkTargetCnt) {
            this.blinkDir = (this.blinkDir == 1) ? 0 : 1;
            this.blinkTwn.to({
                alpha: this.blinkDir
            }, 25);
            this.blinkTwn.start();
        } else {
            this.game.tweens.remove(this.blinkTwn);
            this.blinkTwn = null;
            this.blinking = false;
            this.alpha=1;
            this.playerCar.alpha=1;
        }
    }
    start(){
        this.active=true;
    }
    movePlayer(val){
        this.carDirection=val;
    }
    stop(){
        this.carDirection=0;
        clearTimeout(this.vibrateTO)
    }
    vibrate() {

        if(this.active){
            this.vibrateTO=setTimeout(function(){
                this.vibrateDir *= -1;
             
                Global.responsiveObj.notify("item-tween-by-Y", {
                    scene: this,
                    props: {
                        item: this.playerCar,
                        y: (this.vibrateDir==1)?".3%":"-.3%",
                        time: 1,
                        Ease:Phaser.Easing.Cubic.Out,
                        doOnComplete: this.vibrate
                    }
                });
            }.bind(this),100)
        }
        
    }
    moveToDestination(road){
        //console.log( String(-1*road.height/this.game.height*100)+"%")
        Global.responsiveObj.notify("item-tween-by", {
            scene: this,
            props: {
                item: this.playerCar,
                x:String((road.x-this.playerCar.x)/this.game.width*100)+"%",
                y: String(-1*(road.height-(this.game.height-this.playerCar.y-this.playerCar.height/4))/this.game.height*100)+"%",
                time: 750,
                Ease:Phaser.Easing.Linear.Out,
                doOnComplete: this.onReachToDestination
            }
        });
        Global.responsiveObj.notify("item-scale-to-keep-def", {
            scene: this,
            props: {
                item: this.playerCar,
                scaleVal:"25%",
                time: 750,
                Ease:Phaser.Easing.Linear.Out
            }
        });
    }
    update(){
        if(this.active){
            if((this.carDirection==-1&&this.playerCar.x-this.playerCar.width/2>0)||(this.carDirection==1&&this.playerCar.x+this.playerCar.width/2<this.game.width)){
                Global.responsiveObj.notify("item-move-by-X", {
                    scene: this,
                    props: {
                        item: this.playerCar,
                        x: String(2.2*this.carDirection)+"%",
                        y:"0%"
                    }
                });
            }
        }
       
        
        //this.playerCar.x+=this.game.width*.02*this.carDirection
    }

}