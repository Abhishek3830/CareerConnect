export class FrontBuilding extends Phaser.Sprite{
    constructor(game,x,y,key){
        super(game,x,y,key);
    }
    init(initData){
        this.anchor.setTo(0.5, 1);
        this.name = "game-front-building";
        this.resizeFactor = .9;
       
        this.follows = {
            item: initData.toFollow,
            axis: "y",
            Ydirection: -1,
            Yfactor: 1
        }
    };
    create(){};
}