import {
    Global
} from "../util/global";
import {
    arrayRemoveFrom
} from "../util/array-util";

export class Sky extends Phaser.Group {
    constructor(game) {
        super(game);

        this.clouds = [];
        this.cloudCnt = 0;
        this.toFollow = null;
        this.removeArr = [];
    }

    init(detail) {

        this.toFollow = detail.toFollow;
        this.skySpace = this.create(this.game.canvas.width * .5, 0, "gameSky");
        this.skySpace.anchor.setTo(0.5, 1);
        this.skySpace.name = "game-sky-space";
        this.skySpace.resizeFactor =1.07;
        this.skySpace.follows = {
            item: detail.toFollow,
            axis: "xy",
            Xdirection: 1,
            Xfactor: 0,
            Ydirection: 1,
            Yfactor: 0
        }

        this.addMoon();


        Global.responsiveObj.notify("item-fill-and-resize-all", {
            scene: this
        });
        this.addCloud(false);
        this.addCloud();
        this.addCloud();

    }
    addMoon() {
        this.sun = this.create(0, 0, "sun");
        this.sun.anchor.setTo(0.5);
        this.sun.name = "game-sky-moon";
        this.sun.resizeFactor = 3;
        this.sun.follows = {
            item: this.toFollow,
            axis: "xy",
            Xdirection: -1,
            Xfactor: .15,
            Ydirection: -1,
            Yfactor: 1
        }
    }

    addCloud(startFromEdge) {
        this.cloudX = ((startFromEdge)?((Phaser.Math.between(0, 2)==1)?-100:100):Phaser.Math.between(-50, 50)) / 100;
        this.cloudY = Phaser.Math.between(100, 200) / 100;
        this.cloud = this.create(0, 0, "cloud");
        this.cloud.name = "game-cloud-" + String(this.cloudCnt++);
        this.cloud.anchor.setTo(0.5);
        this.clouds.push(this.cloud);
        this.cloud.direction = (startFromEdge)?Math.sign(this.cloudX)*-1:(Phaser.Math.between(1, 3) == 2) ? 1 : -1;
        this.cloud.shownOnScreen=!startFromEdge;
        this.cloud.resizeFactor = Phaser.Math.between(2, 5);
        this.cloud.alpha = Phaser.Math.between(1, 10) / 10;
        this.cloud.speed=Phaser.Math.between(10,30)/1000;
  
        this.cloud.follows = {
            item: this.toFollow,
            axis: "xy",
            Xdirection: Math.sign(this.cloudX),
            Xfactor: Math.abs(this.cloudX),
            Ydirection: -1,
            Yfactor: this.cloudY

        }
        Global.responsiveObj.notify("item-fill-and-resize-one", {
            scene: this,
            props: {
                item: this.cloud
            }
        });
        setTimeout(function(){
            this.isReady=true;
        }.bind(this.cloud))
  
    }
    update() {
        this.removeArr = [];
        this.clouds.forEach(function (cloud) {
            if(cloud.isReady){
                Global.responsiveObj.notify("item-follow-unlock", {
                    scene: this,
                    props: {
                        item: cloud
                    }
                });
                Global.responsiveObj.notify("item-move-by", {
                    scene: this,
                    props: {
                        item: cloud,
                        x: String(cloud.speed * cloud.direction) + "%",
                        y: "0%"
                    }
                });
                Global.responsiveObj.notify("item-follow-lock", {
                    scene: this,
                    props: {
                        item: cloud
                    }
                });
                if ((cloud.x <= -cloud.width / 2 || (cloud.x-cloud.width*.5) >= this.game.canvas.width) && cloud.shownOnScreen) {
                    this.removeArr.push(cloud);
                }
                if(!cloud.shownOnScreen&&(cloud.x>=cloud.width&&cloud.x<this.game.width-cloud.width)){
                    //console.log("set")
                    cloud.shownOnScreen=true;
                }
            }
            
        }.bind(this));
        this.removeArr.forEach(function (cloud_to_remove) {
           // this.clouds=arrayRemoveFrom(this.clouds, cloud_to_remove);
            this.clouds.splice(this.clouds.indexOf(cloud_to_remove),1);
            //cloud_to_remove.isReady=false;
            this.addCloud(true);
           // cloud_to_remove.destroy();
        }.bind(this));

    }
}