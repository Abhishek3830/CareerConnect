export default class GameControl {
    constructor() {
  
    }

    init() {
        this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.leftKey.onDown.add(this.onKeyPress.bind(this, -1));
        this.rightKey.onDown.add(this.onKeyPress.bind(this, 1));
        this.leftKey.onUp.add(this.onKeyRelease.bind(this, -1));
        this.rightKey.onUp.add(this.onKeyRelease.bind(this, 1));
    }

    dispose(){
        this.leftKey.onDown.removeAll();
        this.rightKey.onDown.removeAll();
        this.leftKey.onUp.removeAll();
        this.rightKey.onUp.removeAll();
    }

    
}