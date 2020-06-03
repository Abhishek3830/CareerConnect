import {
    Global
} from "../util/global";

export class LeaderBoad extends Phaser.Group {
    constructor(game) {
        super(game);

        this.show= this.show.bind(this);
        this.hide=this.hide.bind(this);
        this.populate= this.populate.bind(this);
    }
    init() {

        this.leaderBGShade = new Phaser.Graphics(this.game);
        this.addChild(this.leaderBGShade);
        this.leaderBGShade.beginFill(0x000000, 0.75);
        this.leaderBGShade.drawRect(0, 0, this.game.width, this.game.height);
        this.leaderBGShade.endFill();

        this.leaderBG = this.create(this.game.width * .5, this.game.height * .45, "leaderPopup");
        this.leaderBG.name = "leaderboard-popup";
        this.leaderBG.resizeFactor = .85;
        this.leaderBG.anchor.setTo(0.5);

        this.backBtn = this.game.add.button(this.game.canvas.width * .5, this.game.height * .85, 'buttons', this.onBackClick, this, 'backBtn0001', 'backBtn0000', 'backBtn0002', 'backBtn0000');
        this.backBtn.name = "share-leader-btn";
        this.backBtn.anchor.setTo(0.5);
        this.backBtn.resizeFactor = 1.5;

        this.addChild(this.backBtn);

        for (var i = 0; i < 10; i++) {
            this["rank" + String(i)] = new Phaser.Text(this.game, 0, 0, "", {
                font: "55px Pixellari",
                fill: "#000000"
            });
            this["rank" + String(i)].name = "leader-rank-" + String(i);
            this["name" + String(i)] = new Phaser.Text(this.game, 0, 0, "", {
                font: "55px Pixellari",
                fill: "#000000"
            });
            this["name" + String(i)].anchor.setTo(0.5, 0);
            this["name" + String(i)].name = "leader-name-" + String(i);
            this["score" + String(i)] = new Phaser.Text(this.game, 0, 0, "", {
                font: "55px Pixellari",
                fill: "#000000"
            });
            this["score" + String(i)].anchor.setTo(1, 0)
            this["score" + String(i)].name = "leader-score-" + String(i);

           // if (i == 0) {
                this["rank" + String(i)].follows = {
                    item: this.leaderBG,
                    axis: "x",
                    Xdirection: -1,
                    Xfactor: .45,
                    Ydirection: -1,
                    Yfactor: .36
                }
                this["name" + String(i)].follows = {
                    item: this.leaderBG,
                    axis: "x",
                    Xdirection: 1,
                    Xfactor: 0,
                    Ydirection: -1,
                    Yfactor: .36
                }
                this["score" + String(i)].follows = {
                    item: this.leaderBG,
                    axis: "x",
                    Xdirection: 1,
                    Xfactor: .45,
                    Ydirection: -1,
                    Yfactor: .36
                }
           /*  } else {
                this["rank" + String(i)].follows = {
                    item: this.rank0,
                    axis: "xy",
                    Xdirection: 1,
                    Xfactor: 0,
                    Ydirection: 1,
                    Yfactor: 2.37*(i)
                }
                this["name" + String(i)].follows = {
                    item: this.name0,
                    axis: "xy",
                    Xdirection: 1,
                    Xfactor: 0,
                    Ydirection: 1,
                    Yfactor: 2.37*(i)
                }
                this["score" + String(i)].follows = {
                    item: this.score0,
                    axis: "xy",
                    Xdirection: 1,
                    Xfactor: 0,
                    Ydirection: 1,
                    Yfactor: 2.37*(i)
                }

                this["rank" + String(i)].y=this.rank0.y+this.leaderBG.height*(i-1)*.1
            } */

            this.addChild(this["rank" + String(i)]);
            this.addChild(this["name" + String(i)]);
            this.addChild(this["score" + String(i)])
        }

        this.backBtn.follows={
            item: this.leaderBG,
            axis: "xy",
            Xdirection: 1,
            Xfactor: 0,
            Ydirection: 1,
            Yfactor: .58
        }


        Global.responsiveObj.notify("item-fill-and-resize-all", {
            scene: this
        });

        for (var i = 0; i < 10; i++) {
            this["rank" + String(i)] .y=this.leaderBG.y-this.leaderBG.height*.36+(i)*this.leaderBG.height*.088;
            this["name" + String(i)] .y=this.leaderBG.y-this.leaderBG.height*.36+(i)*this.leaderBG.height*.088;
            this["score" + String(i)] .y=this.leaderBG.y-this.leaderBG.height*.36+(i)*this.leaderBG.height*.088;
            

        }

    }

    onBackClick(){
        Global.serverObj.send(Global.URL_VUPDATE, null, null, {
            saveType: "leaderBackClick",
            uniqID: Global.U_ID
        }, 'POST', null, false);
        this.hide();
    }
    populate(leaderData) {
        leaderData=JSON.parse(leaderData);
        for (var i = 0; i < 10; i++) {
            this["rank" + String(i)].kill();
            this["name" + String(i)].kill();
            this["score" + String(i)].kill();
            if (leaderData[i]) {
                this["rank" + String(i)].revive();
                this["name" + String(i)].revive();
                this["score" + String(i)].revive();
                this["rank" + String(i)].text = (i < 9) ? "0" + String(i + 1) : String(i + 1);
                this["name" + String(i)].text = leaderData[i].playerName;
                this["score" + String(i)].text = leaderData[i].score;
            }
           
        }
    }

    show() {
        this.revive();
    };
    hide() {
        for (var i = 0; i < 10; i++) {
           
                this["rank" + String(i)].text = "";
                this["rank" + String(i)].text = "";
                this["score" + String(i)].text = "";
            
           
        }
        this.kill();
    };
}