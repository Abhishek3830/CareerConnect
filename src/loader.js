var loaderObj = function () {
    function e() {}
    return e.prototype.init = function (e, a,autoStart=false,cb=undefined) {
       
        this.version = "1.0.0", document.body.style.backgroundColor = "#212121", e.load.image("loaderIcon", a), console.log("Loader Icon Added", a), this.loaderGr = new Phaser.Group(e), this.loaderBG = new Phaser.Graphics(e), this.loaderBase = new Phaser.Graphics(e), this.loaderPath = new Phaser.Graphics(e), this.loaderCover = new Phaser.Graphics(e), this.loaderBase.beginFill(8718349, 1), this.loaderCover.beginFill(2171169, 1), this.loaderPath.beginFill(15673133, 1), this.loaderBG.beginFill(2171169, 1), this.loaderGr.addChild(this.loaderBG), this.loaderGr.addChild(this.loaderBase), this.loaderGr.addChild(this.loaderPath), this.loaderGr.addChild(this.loaderCover), this.loaderPath.position.set(e.world.centerX, 1.4 * e.world.centerY + 50), this.loaderBase.position.set(e.world.centerX, 1.4 * e.world.centerY + 50), this.loaderCover.position.set(e.world.centerX, 1.4 * e.world.centerY + 50), this.loaderBase.drawCircle(0, 0, 2 * (e.canvas.width < e.canvas.height ? 40 : 20)), this.loaderCover.drawCircle(0, 0, 2 * (e.canvas.width < e.canvas.height ? 25 : 12.5)), this.loaderBG.drawRect(0, 0, e.canvas.width, e.canvas.height), this.loaderPath.arc(0, 0, e.canvas.width < e.canvas.height ? 40 : 20, e.math.degToRad(90), e.math.degToRad(-100), !0);
        for (var o = 0; o <= 75; o++) this.loaderPath.beginFill(15673133, 1 - 1 * o / 75), this.loaderPath.arc(0, 0, e.canvas.width < e.canvas.height ? 40 : 20, e.math.degToRad(-100 - .9 * o), e.math.degToRad(-100 - .9 * (o + 1)), !0);
        this.loaderBG.endFill(), this.loaderBase.endFill(), this.loaderPath.endFill(), this.loaderCover.endFill(), this.gameObj = e, this.gameObj.load.onFileComplete.add(this.checkLoaderLogoStat.bind(this, "loaderIcon"), this), this.rotateLoader();
      
    }, e.prototype.rotateLoader = function () {
        this.rotateTween = new Phaser.Tween(this.loaderPath, this.gameObj, this.gameObj.tweens).to({
            angle: 360
        }, 1100, Phaser.Easing.Linear.Out, 1, !0).onComplete.addOnce(this.rotateLoader.bind(this))
    }, e.prototype.checkLoaderLogoStat = function (e) {
            1 != this.gameObj.cache.getKeys(Phaser.Cache.IMAGE).indexOf(e) && (this.gameObj.load.onFileComplete.removeAll(this), this.addLoaderLogo(e))
    }, e.prototype.addLoaderLogo = function (e) {
        
        this.loaderLogo = this.gameObj.add.image(0, 0, e), this.gameObj.canvas.width > this.gameObj.canvas.height && this.loaderLogo.scale.setTo(.5), this.loaderLogo.x = (this.gameObj.canvas.width - this.loaderLogo.width) / 2, this.loaderLogo.y = this.gameObj.world.centerY + this.loaderLogo.height / 2 - (this.gameObj.canvas.width < this.gameObj.canvas.height ? 100 : 50), this.loaderGr.addChild(this.loaderLogo), this.logoMask = new Phaser.Graphics(this.gameObj), this.logoMask.beginFill(16777215), this.logoMask.position.set(this.loaderLogo.x, this.gameObj.world.centerY - this.loaderLogo.height / 2 - (this.gameObj.canvas.width < this.gameObj.canvas.height ? 100 : 50)), this.logoMask.drawRect(0, 0, this.loaderLogo.width, this.loaderLogo.height), this.loaderGr.addChild(this.logoMask), this.loaderLogo.mask = this.logoMask, this.loaderLogo.alpha = 0, setTimeout(function () {
            new Phaser.Tween(this.loaderLogo, this.gameObj, this.gameObj.tweens).to({
                y: this.loaderLogo.y - this.loaderLogo.height
            }, 350, Phaser.Easing.Cubic.Out, 1, !0), new Phaser.Tween(this.loaderLogo, this.gameObj, this.gameObj.tweens).to({
                alpha: 1
            }, 350, Phaser.Easing.Linear.Out, 1, !0)
        }.bind(this), 10);
       
    }, e.prototype.dispose = function () {
        this.rotateTween && this.rotateTween._destroy(), this.loaderLogo && (this.loaderLogo.mask = null), this.loaderGr.destroy(), this.gameObj.load.onFileComplete.removeAll(this)
    }, e
}();

export {
    loaderObj
}