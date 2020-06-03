import {
    Global
} from "../util/global";

export class GameScore extends Phaser.Group {
    constructor(game) {
        super(game);

        this.scoreTotal = 0;
        this.infoCount = 0;

    }

    init() {
        this.scoreHead = this.game.add.text(0, 0, "SCORE", {
            font: "45px Pixellari",
            fill: "#ffffff"
        });

        this.scoreTxt = this.game.add.text(this.game.width * .95, this.game.width * .13, String(this.scoreTotal), {
            font: "80px Pixellari",
            fill: "#ffffff"
        });



        this.addChild(this.scoreHead);
        this.addChild(this.scoreTxt);


        this.scoreHead.name = "game-score-head";
        this.scoreHead.resizeFactor = 1;
        this.scoreTxt.name = "game-score-text";
        this.scoreTxt.resizeFactor = 1;


        this.scoreHead.anchor.setTo(1, 1);
        this.scoreTxt.anchor.setTo(1, 1);

        this.scoreHead.follows = {
            item: this.scoreTxt,
            axis: "xy",
            Xdirection: -1,
            Xfactor: 1.15,
            Ydirection: -1,
            Yfactor: .11
        }

        Global.responsiveObj.notify("item-fill-and-resize-all", {
            scene: this
        });
    }
    
    getScore() {
        return this.scoreTotal;
    }

    updateScore(_score, addOnSession) {
        //console.log(addOnSession, " addOnSession")
        this.scoreInfo = this.game.add.text(this.game.width * .5, this.game.height * .7, "", {
            font: "200px Pixellari",
            fill: "#ffffff"
        });
        this.addChild(this.scoreInfo);
        this.scoreInfo.name = "game-score-info-" + String(this.infoCount++);
        this.scoreInfo.resizeFactor = 1;
        this.scoreInfo.anchor.setTo(0.5);

        //clearTimeout(this.infoTimeout);
        this.scoreInfo.alpha = 0;
        if (_score > 0) {
            this.scoreInfo.tint = 0x34eb40;
        } else {
            this.scoreInfo.tint = 0xeb3d34;
        }
        this.scoreInfo.text = String(_score);
        this.scoreInfo.alpha = 1;





        this.scoreTotal += _score;
        this.scoreTxt.text = String(this.scoreTotal);
        this.scoreInfo.y = this.game.height * .7;
        Global.responsiveObj.notify("item-fill-and-resize-one", {
            scene: this,
            props: {
                item: this.scoreInfo
            }
        });
        Global.responsiveObj.notify("item-fill-and-resize-one", {
            scene: this,
            props: {
                item: this.scoreTxt
            }
        });
        this.infoTimeout = setTimeout(function (scoreInfo) {
            //console.log("Check")
            this.scoreInfo.alpha = 1;
            Global.responsiveObj.notify("item-tween-by", {
                scene: this,
                props: {
                    item: scoreInfo,
                    x: "0%",
                    y: "-5%",
                    alpha: 0,
                    time: 150,
                    delay: 0,
                    Ease: Phaser.Easing.Linear.Out,
                    doOnComplete: function () {
                        setTimeout(function () {
                            this.destroy()
                        }.bind(this), 250)
                    }.bind(scoreInfo)
                }
            });
        }.bind(this, this.scoreInfo), (addOnSession - 1) * 50)
    }

}