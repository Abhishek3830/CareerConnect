import {
    Global
} from '../util/global';

import {
    shuffleArray
} from '../util/array-util';


export class Road extends Phaser.Group {
    constructor(game, x, y, key) {
        super(game);


        this.tempTimeArr = [];
        this.itemArr = [];
        this.itemIndex = 0;
        this.maxTime = 60 * 1000;
        this.addCount = 0;
        this.totalTime = 0;
        this.roadActive = false;
        this.roadSpr = this.create(x, y, key);
        // this.roadMask = this.create(x, y, key);
        this.item_on_road = 0;
        this.totalCoins = 0;
        this.coinCnt = 0;
        this.items_on_road = [
            "obstacle1",
            "obstacle2",
            "obstacle3",
            "car1",
            "car2",
            "car3",
            "car4",
            "coin"
        ]
        this.moveList = [
            "roadLine",
            "roadStrip",
            "building1",
            "building2",
            "building3",
            "building4",
            "building5",
            "building6",
            "tree",
            "lamp",
            "coin",
            "obstacle1",
            "obstacle2",
            "obstacle3",
            "car1",
            "car2",
            "car3",
            "car4"

        ];
        this.obstacleList = [{
            type: "obstacle1",
            count: 1,
            point: -2,
            rf: 1.5

        }, {
            type: "obstacle2",
            count: 1,
            point: -3,
            rf: 1.5
        }, {
            type: "obstacle3",
            count: 1,
            point: -2,
            rf: 1.1
        }, {
            type: "car1",
            count: 1,
            point: -5,
            rf: 1
        }, {
            type: "car2",
            count: 1,
            point: -5,
            rf: 1
        }, {
            type: "car3",
            count: 1,
            point: -5,
            rf: 1
        }, {
            type: "car4",
            count: 1,
            point: -5,
            rf: 1
        }]
        this.coinList = [{
                type: "coin",
                count: 3,
                point: 10,
                rf: 5
            },
            {
                type: "coin",
                count: 5,
                point: 10,
                rf: 5
            },
            {
                type: "coin",
                count: 4,
                point: 10,
                rf: 5
            },
            {
                type: "coin",
                count: 2,
                point: 10,
                rf: 5
            },
            {
                type: "coin",
                count: 3,
                point: 10,
                rf: 5
            },
            {
                type: "coin",
                count: 5,
                point: 10,
                rf: 5
            }, {
                type: "coin",
                count: 4,
                point: 10,
                rf: 5
            },
            {
                type: "coin",
                count: 2,
                point: 10,
                rf: 5
            }, {
                type: "coin",
                count: 4,
                point: 10,
                rf: 5
            },
            {
                type: "coin",
                count: 3,
                point: 10,
                rf: 5
            },
        ]

    }

    init(gameSpeed, onScoreUpdate, car) {

        this.onScoreUpdate = onScoreUpdate;
        this.playerCar = car;
        this.obstacleList = shuffleArray(this.obstacleList);
        this.coinList = shuffleArray(this.coinList);


        this.nextElementDelay = 0;
        this.elementProgressCnt = 0;

        this.gameSpeed = gameSpeed;
        this.lineCnt = 1;
        this.roadSpr.anchor.setTo(0.5, 1);
        this.roadSpr.name = "game-road";
        this.roadSpr.resizeFactor = .8;

        /*   this.roadMask.anchor.setTo(0.5, 1);
          this.roadMask.name = "game-road-mask";
          this.roadMask.resizeFactor = .8; */

        this.disposeArr = [];

        Global.responsiveObj.notify("item-fill-and-resize-all", {
            scene: this
        });

        this.roadMask = new Phaser.Graphics(this.game);
        this.addChild(this.roadMask);
        this.roadMask.beginFill(0xFF0000, 0);
        this.poly = new Phaser.Polygon([new Phaser.Point(this.roadSpr.x, this.roadSpr.y),
            new Phaser.Point(this.roadSpr.x - this.roadSpr.width * .5, this.roadSpr.y),
            new Phaser.Point(this.roadSpr.x - this.roadSpr.width * .185, this.roadSpr.y - this.roadSpr.height),
            new Phaser.Point(this.roadSpr.x + this.roadSpr.width * .185, this.roadSpr.y - this.roadSpr.height),
            new Phaser.Point(this.roadSpr.x + this.roadSpr.width * .5, this.roadSpr.y),
            new Phaser.Point(this.roadSpr.x, this.roadSpr.y)
        ]);


        this.buildingMask = new Phaser.Graphics(this.game);
        this.addChild(this.buildingMask);
        this.buildingMask.beginFill(0xFF0000, 0);

        this.buildingMask.drawRect(0, 0, this.game.width, (this.roadSpr.y - this.roadSpr.height));
        this.buildingMask.endFill();
        // this.roadMask.position.set(this.roadSpr.x,this.roadSpr.y);
        this.roadMask.drawPolygon(this.poly.points);
        this.roadMask.endFill();

        this.prepareItemSet();
        //this.setNextElementDelay();


    }
    prepareItemSet() {
        this.totalTime = 0;
        while (this.totalTime < this.maxTime) {
            this.setNextElementDelay();
            this.totalTime += this.nextElementDelay * 33 / 2;
            if (this.addCount * .03 <= 45) {
                this.addCount++;
            }
            this.tempTimeArr.push(this.totalTime);
        }
        for (var i = 0; i < this.tempTimeArr.length; i++) {
            this.coinCnt = Phaser.Math.between(1, 4);
            if (this.totalCoins < 100) {
                if (this.totalCoins + this.coinCnt > 100) {
                    this.coinCnt = 100 - this.totalCoins;
                }
                this.totalCoins += this.coinCnt;
                this.itemArr.push({
                    index: i,
                    type: "coin",
                    count: this.coinCnt,
                    point: 10,
                    rf: 5
                });
            } else {
                this.itemArr.push(this.obstacleList[Phaser.Math.between(0, this.obstacleList.length - 1)]);
                this.itemArr[this.itemArr.length - 1].index = i;
            }


        }



    }


    stop() {
        this.roadActive = false;
    }
    moveEnabled(key) {
        return this.moveList.indexOf(key) != -1;
    }
    setNextElementDelay() {
        this.elementProgressCnt = 0;
        this.nextElementDelay = Phaser.Math.between(15, (60 - this.addCount * .025));

    }
    addItemInLoop(addOnSession) {
        // this.itemDetail = this.obstacleList[Phaser.Math.between(0, this.obstacleList.length - 1)]
        this.deadItem2 = null;
      
         
            if (this.deadItem2 != null) {
                this.roadItem2 = this.deadItem2;
    
                this.setChildIndex(this.roadItem2, 1);
            }
            if (this.deadItem2 == null) {
                this.item = this.create(0, -this.game.height, this.itemDetail.type, 0, true, 1);
                this.item.name = "item_on_road_" + String(++this.item_on_road);
                /* if (detail.shouldMask)
                    this.roadItem.mask = this.roadMask; */
    
    
            }
            //console.log(this.itemDetail.type)
    
            this.item.addOnSession=addOnSession;
            this.item.processed = false;
            this.item.score = this.itemDetail.point;
            this.item.initScale = this.item.scale.x;
            
            this.item.revive();
            this.item.alpha = 0;
            this.item.resizeFactor = this.itemDetail.rf;
    
            this.item.onRoad = true;
            this.itemXOcc = Phaser.Math.between(1, 4);


            this.item.item_type = this.itemDetail.type;


    
    
    
            this.item.follows = {
                item: this.roadSpr,
                axis: "xy",
                Xdirection: 1,
                Xfactor: this.itemX,
                Ydirection: -1,
                Yfactor: 1
            }
            this.item.dir = -1;
    
            this.item.balanceMove = true;
            this.item.onRoad=true;
            this.item.scaleVal = 1;
            this.item.stepsMoved = 1;
            this.item.speed = 1;
            this.item.xFact = Math.abs(this.itemX) * Math.sign(this.itemX) * 1;
            this.item.anchor.setTo(.5, 1);
            this.item.item_type = this.itemDetail.type;
            Global.responsiveObj.notify("item-fill-and-resize-one", {
                scene: this,
                props: {
                    item: this.item
                }
            });
            setTimeout(function () {
                this.alpha = 1
            }.bind(this.item), 100);
         
        
    }
    addRoadElement() {
        this.addOnSession = 0;
        this.itemDetail = this.itemArr.splice(Phaser.Math.between(0, this.itemArr.length - 1), 1)[0];
       // console.log(this.itemArr.length, " reminig")
        this.itemX = (this.itemXOcc == 1) ? -.13 : (this.itemXOcc == 2) ? .13 : (this.itemXOcc == 3) ? .05 : -.05;
        while (this.itemDetail.count > this.addOnSession) {
            this.addOnSession++;
            setTimeout(this.addItemInLoop.bind(this,this.addOnSession),this.addOnSession*50)
        }
    }
    start(){
        this.roadActive=true
    }
    move() {
     
        this.children.forEach(function (roadItem) {
            if (this.moveEnabled(roadItem.item_type) && roadItem.alive) {

                roadItem.speed += .75 * this.roadSpr.height / this.game.height * .04 * (roadItem.dir == 1 ? 1 : .5) * ((this.items_on_road.indexOf(roadItem.item_type) != -1) ? 20 : 1);
                roadItem.stepsMoved += .75 * this.roadSpr.height / this.game.height * 6 * (roadItem.dir == 1 ? 1 : .5) * ((this.items_on_road.indexOf(roadItem.item_type) != -1) ? 1 : 1);
                roadItem.scaleVal += 2*.75 * roadItem.speed * (roadItem.balanceMove ? 10 : 1) * (roadItem.dir == 1 ? 1 : .5) * ((this.items_on_road.indexOf(roadItem.item_type) != -1) ? .0047 : 1);

                roadItem.xSign = Math.sign(parseFloat(roadItem.xFact));

                Global.responsiveObj.notify("item-follow-unlock", {
                    scene: this,
                    props: {
                        item: roadItem
                    }
                });
                if (roadItem.dir == 1) {
                    Global.responsiveObj.notify("item-move-by", {
                        scene: this,
                        props: {
                            item: roadItem,
                            x: String((roadItem.onRoad ? ((Math.abs(roadItem.xFact) == .05) ? .23 : .53) : 1) * this.roadSpr.width * roadItem.speed * .02 / this.game.width * roadItem.xSign * roadItem.scaleVal * .01) + "%",
                            y: String(this.roadSpr.height * (!roadItem.balanceMove ? 3 : .35) / this.game.height * roadItem.speed * roadItem.scaleVal * .0015) + "%" //String(roadItem.speed)+"%"
                        }
                    });
                } else {
                    Global.responsiveObj.notify("item-move-by", {
                        scene: this,
                        props: {
                            item: roadItem,
                            x: "0%",
                            y: String(-1 * this.roadSpr.height * 1.5 / this.game.height * roadItem.speed * .25) + "%" //String(roadItem.speed)+"%"
                        }
                    });
                    if (roadItem.y <= this.roadSpr.y - this.roadSpr.height) {
                        roadItem.dir = 1;
                        roadItem.mask = null;
                    }
                }


                Global.responsiveObj.notify("item-scale-to-keep-def", {
                    scene: this,
                    props: {
                        item: roadItem,
                        scaleVal: String(roadItem.scaleVal * roadItem.speed * (roadItem.balanceMove ? (this.items_on_road.indexOf(roadItem.item_type) != -1) ? .01 : .4 : .9)) + "%",
                        time: 1
                    }
                });
                // }
                if (this.items_on_road.indexOf(roadItem.item_type) != -1) {
                    Global.responsiveObj.notify("item-scale-to-keep-def", {
                        scene: this,
                        props: {
                            item: roadItem,
                            scaleVal: String(roadItem.scaleVal * (roadItem.balanceMove ? (this.items_on_road.indexOf(roadItem.item_type) != -1) ? 2 : .4 : .9)) + "%",
                            time: 1
                        }
                    });
                } else {
                    Global.responsiveObj.notify("item-scale-to-keep-def", {
                        scene: this,
                        props: {
                            item: roadItem,
                            scaleVal: String(roadItem.scaleVal * roadItem.speed * (roadItem.balanceMove ? .4 : .9)) + "%",
                            time: 1
                        }
                    });
                }

                Global.responsiveObj.notify("item-follow-lock", {
                    scene: this,
                    props: {
                        item: roadItem
                    }
                });
                if ((roadItem.y - roadItem.height) >= this.game.height||(roadItem.x+(.5)*roadItem.width)<=0||(roadItem.x-(.5)*roadItem.width)>=this.game.width) {
                  
                    
                    this.disposeArr.push(roadItem);
                }
            }
        }.bind(this));
    }
    update() {
        this.disposeArr = [];
        if (this.roadActive) {
            this.elementProgressCnt += 33 / 2;

            if ((this.itemIndex <= this.tempTimeArr.length - 1) && this.elementProgressCnt >= this.tempTimeArr[this.itemIndex]) {
                this.itemIndex++;
                setTimeout(this.addRoadElement.bind(this), 100);

            }

            this.move();
            this.checkWithPlayerCar();
            this.disposeArr.forEach(function (_itemToRemove) {
                if(_itemToRemove.onRoad){
                    _itemToRemove.destroy();
                    //_itemToRemove.kill
                }else{
                    Global.responsiveObj.notify("item-scale-to-keep-def", {
                        scene: this,
                        props: {
                            item: _itemToRemove,
                            scaleVal: String(_itemToRemove.initScale / _itemToRemove.scale.x) + "%",
                            time: 1
                        }
                    });
                    _itemToRemove.kill();
                }
                
               // _itemToRemove.item_type="";
            }.bind(this));
            this.disposeArr = [];
            //console.log(this.children.length, ' childs')
        }

    }

    checkWithPlayerCar() {
        this.playerBound = this.playerCar.getBounds();
        this.children.forEach(function (item) {
            if (this.items_on_road.indexOf(item.item_type) != -1) {
                if (!item.processed) {
                    this.itemBound = item.getBounds();
                    if (this.itemBound.intersects(this.playerBound)) {
                        //console.log(item.item_type);
                       // console.log("Hit")
                        item.processed = true;
                        this.onScoreUpdate(item.score,item.addOnSession);
                        if (item.score > 0) {
                            //console.log("Adding to dispose!")
                            this.disposeArr.push(item);
                        }
                    }
                }
            }
        }.bind(this));
    }

    addCoins(x, y) {
        this.coin = this.create(x, y, "coin");

    }
    addObstacles() {

    }


    addRoadLineOrSplit(detail) {
        this.deadItem = null;
        this.forEachDead(function (item) {
            if (item.item_type == detail.type & this.deadItem == null && item.item_side == detail.side) {
                this.deadItem = item;
            }
        }.bind(this))
        if (this.deadItem) {
            this.roadItem = this.deadItem;
            this.roadItem.revive();
            this.setChildIndex(this.roadItem, 1);
        }
        if (this.deadItem == null) {
            this.roadItem = this.create(0, 0, detail.type, 0, true, 1)
            this.roadItem.name = "line" + String(this.lineCnt++);
            if (detail.shouldMask)
                this.roadItem.mask = this.roadMask;


        }
        this.roadItem.initScale = this.roadItem.scale.x;
        this.roadItem.alpha = 0;

        this.roadItem.item_type = detail.type;
        this.roadItem.item_side = detail.side;
        this.roadItem.resizeFactor = detail.rf;
        this.roadItem.anchor.setTo((detail.anchor) ? detail.anchor.x : 0.5, (detail.anchor) ? detail.anchor.y : 1);
        this.roadItem.scaleVal = 100;
        this.roadItem.stepsMoved = 1;
        this.roadItem.speed = 1;
        this.roadItem.toFollow = detail.toFollow
        if (detail.balanceMove) {
            this.roadItem.mask = this.buildingMask;
            this.roadItem.follows = {
                item: detail.toFollow,
                axis: "xy",
                Xdirection: 1,
                Xfactor: detail.sideMoveFact,
                Ydirection: 1,
                Yfactor: 0.3
            };
            this.roadItem.dir = -1
        } else {
            this.roadItem.follows = {
                item: detail.toFollow,
                axis: "xy",
                Xdirection: 1,
                Xfactor: detail.sideMoveFact,
                Ydirection: -1,
                Yfactor: 0.2
            };
            this.roadItem.dir = 1
        }
        this.roadItem.balanceMove = detail.balanceMove;

        this.roadItem.xFact = detail.sideMoveFact;
        Global.responsiveObj.notify("item-fill-and-resize-one", {
            scene: this,
            props: {
                item: this.roadItem
            }
        });

        setTimeout(function (_alpha) {
            this.alpha = _alpha;
        }.bind(this.roadItem, detail.alpha), 0)

    }
}