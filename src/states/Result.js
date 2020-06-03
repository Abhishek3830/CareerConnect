import {
    Global
} from "../util/global";


export class Result extends Phaser.State {
    constructor(game) {
        super(game);
    }

    create() {
        $("canvas").css("background-color", "#b1b1b5");
        this.Result = this.game.add.text(this.game.width * .2, this.game.height*.05, "RESULTS:", {
            font: "60px OpenSans-Bold",
            fill: "#204293",
            align: "center",
          });
          this.Result.name = "result";
          this.Result.resizeFactor =2;
          this.Result.anchor.setTo(.5);

          this.RFOOT = this.game.add.sprite(this.game.width*.5, this.game.height*.94, 'RFOOT')
          this.RFOOT.name = "rfoot";
          this.RFOOT.resizeFactor = 2.2;
          this.RFOOT.anchor.setTo(.5);
       if(Global.finalAnswer === "A"){
          this.des1 = this.game.add.text(this.game.width * .48, 0, "", {
            font: "40px OpenSans-Semibold",
            fill: "#001a00",
            align: "left",
          });
          this.des1.name = "des1";
          this.des1.resizeFactor =2;
          this.des1.anchor.setTo(.5);
          this.des1.text = "You know what to achieve in your career\nand are ready to meet the potential employers,\nbut you have no professional network to help you\nin your job search."

          this.des1.follows = {
            item: this.Result,
            axis: "y",
            Ydirection: 1,
            Yfactor: 2,
          };
           
          this.AnswerA = this.game.add.sprite(this.game.width*.5,this.game.height*.5,"answerA")
           this.AnswerA.name =  "answerA";
           this.AnswerA.resizeFactor = 2.2;
           this.AnswerA.anchor.setTo(0.5);

           this.findA = this.game.add.button(this.game.width*.45, this.game.height*.6, "BUTTONS",this.findAfn, this, "ResultFindoutGreen", "ResultFindoutGreenRoll")
           this.findA.name = "findB";
           this.findA.resizeFactor = 17;
           this.findA.anchor.setTo(.5);
       }
       else if(Global.finalAnswer === "B"){
        this.des2 = this.game.add.text(this.game.width * .48, 0, "", {
            font: "40px OpenSans-Semibold",
            fill: "#001a00",
            align: "left",
          });
          this.des2.name = "des2";
          this.des2.resizeFactor =2;
          this.des2.anchor.setTo(.5);
          this.des2.text = "Perhaps you've been considering a career switch\nand you're wondering whether it's too risky to\nstart a new. Or you could be having second\nthoughts about a job offer that would bring you\ninto a new industry."

          this.des2.follows = {
            item: this.Result,
            axis: "y",
            Ydirection: 1,
            Yfactor: 2.1,
          };

           this.AnswerB = this.game.add.sprite(this.game.width*.5,this.game.height*.5,"answerB")
           this.AnswerB.name =  "AnswerB";
           this.AnswerB.resizeFactor = 2.2;
           this.AnswerB.anchor.setTo(0.5);

           this.findB = this.game.add.button(this.game.width*.45, this.game.height*.65, "BUTTONS",this.findBfn, this, "ResultFindoutGreen", "ResultFindoutGreenRoll")
           this.findB.name = "findB";
           this.findB.resizeFactor = 17;
           this.findB.anchor.setTo(.5);
       }

       else if(Global.finalAnswer === "C"){
        this.des3 = this.game.add.text(this.game.width * .48, 0, "", {
            font: "40px OpenSans-Semibold",
            fill: "#001a00",
            align: "left",
          });
          this.des3.name = "des3";
          this.des3.resizeFactor =2;
          this.des3.anchor.setTo(.5);
          this.des3.text = "Navigating your career and job search could be a\nconfusing experience. There are so many choices\nto make, and so many challenges to overcome.\nYou could also be stuck in a job with limited\nopportunities to grow and move up."

          this.des3.follows = {
            item: this.Result,
            axis: "y",
            Ydirection: 1,
            Yfactor: 2.1,
          };

           this.AnswerC = this.game.add.sprite(this.game.width*.5,this.game.height*.5,"answerC")
           this.AnswerC.name =  "AnswerC";
           this.AnswerC.resizeFactor = 2.2;
           this.AnswerC.anchor.setTo(0.5);

           this.findC = this.game.add.button(this.game.width*.45, this.game.height*.65, "BUTTONS",this.findCfn, this, "ResultFindoutGreen", "ResultFindoutGreenRoll")
           this.findC.name = "findC";
           this.findC.resizeFactor = 17;
           this.findC.anchor.setTo(.5);
       }
       
       else if(Global.finalAnswer === "D"){
        this.des4 = this.game.add.text(this.game.width * .48, 0, "", {
            font: "40px OpenSans-Semibold",
            fill: "#001a00",
            align: "left",
          });
          this.des4.name = "des4";
          this.des4.resizeFactor =2;
          this.des4.anchor.setTo(.5);
          this.des4.text = "A lengthy job search could chip at your confidence,\nespecially when you see your peers doing so well.\nYou might even find yourself wondering if you are\nsimply not good enough.Sometimes, it's not about\nyou, but your ability to sell yourself."

          this.des4.follows = {
            item: this.Result,
            axis: "y",
            Ydirection: 1,
            Yfactor: 2.1,
          };

           this.AnswerD = this.game.add.sprite(this.game.width*.5,this.game.height*.5,"answerD")
           this.AnswerD.name =  "AnswerD";
           this.AnswerD.resizeFactor = 2.2;
           this.AnswerD.anchor.setTo(0.5);

           this.findD = this.game.add.button(this.game.width*.45, this.game.height*.65, "BUTTONS",this.findDfn, this, "ResultFindoutGreen", "ResultFindoutGreenRoll")
           this.findD.name = "findD";
           this.findD.resizeFactor = 17;
           this.findD.anchor.setTo(.5);

          
       }

       else if(Global.finalAnswer === "E"){
        this.des5 = this.game.add.text(this.game.width * .48, 0, "", {
            font: "40px OpenSans-Semibold",
            fill: "#001a00",
            align: "left",
          });
          this.des5.name = "des5";
          this.des5.resizeFactor =2;
          this.des5.anchor.setTo(.5);
          this.des5.text = "It's been tough. You're caught up in a job that leaves\nyou burn out, or a job search process with no end in\nsight. Maybe you've had a long career break and\nnow feel like your career gap is working against you."

          this.des5.follows = {
            item: this.Result,
            axis: "y",
            Ydirection: 1,
            Yfactor: 2.1,
          };

           this.AnswerE = this.game.add.sprite(this.game.width*.5,this.game.height*.5,"answerE")
           this.AnswerE.name =  "AnswerE";
           this.AnswerE.resizeFactor = 2.2;
           this.AnswerE.anchor.setTo(0.5);

           this.findE = this.game.add.button(this.game.width*.45, this.game.height*.72, "BUTTONS",this.findEfn, this, "ResultFindoutGreen", "ResultFindoutGreenRoll")
           this.findE.name = "findE";
           this.findE.resizeFactor = 17;
           this.findE.anchor.setTo(.5);

           this.findE.follows = {
            item: this.des5,
            axis: "y",
            Ydirection: 1,
            Yfactor: 5.5
          };

       }
       this.fbShare = this.game.add.button(this.game.width*.5, this.game.height*.83, "BUTTONS",this.FbShareFn, this, "Share", "ShareRoll")
       this.fbShare.name = "fbShare";
       this.fbShare.resizeFactor = 17;
       this.fbShare.anchor.setTo(.5);

      

       Global.responsiveObj.notify("item-fill-and-resize-all", {
        scene: this,
      });
    }

    FbShareFn(){
      Global.serverObj.send(Global.URL_WEBSERVICE, null, null, {
        saveType: "fshare",
        uniqID: Global.U_ID
    }, 'POST', null, false);

    window.open("https://www.facebook.com/sharer.php?u=https://bit.ly/3dr8MBv", "_blank");
        console.log("fb share")
    }
    findAfn(){
      Global.serverObj.send(Global.URL_WEBSERVICE, null, null, {
        saveType: "find_more_A",
        uniqID: Global.U_ID
    }, 'POST', null, false);

    window.open("https://content.mycareersfuture.sg/careercoaching/article/career-360/?utm_source=newsfeed&utm_medium=quiz&utm_campaign=cc2020&utm_term=careers%2Bconnect%2BCARE360&utm_content=quiz360")
        console.log("findA")
    }
    findBfn(){
      Global.serverObj.send(Global.URL_WEBSERVICE, null, null, {
        saveType: "find_more_B",
        uniqID: Global.U_ID
    }, 'POST', null, false);
    window.open("https://content.mycareersfuture.sg/careercoaching/article/career-activator/?utm_source=newsfeed&utm_medium=quiz&utm_campaign=cc2020&utm_term=careers%2Bconnect%2BCARE360&utm_content=quizactivator")
        console.log("findB")
    }
    findCfn(){
      Global.serverObj.send(Global.URL_WEBSERVICE, null, null, {
        saveType: "find_more_C",
        uniqID: Global.U_ID
    }, 'POST', null, false);
    window.open("https://content.mycareersfuture.sg/careercoaching/article/career-catalyst/?utm_source=newsfeed&utm_medium=quiz&utm_campaign=cc2020&utm_term=careers%2Bconnect%2BCARE360&utm_content=quizcatalyst")
        console.log("findC")
    }
    findDfn(){
      Global.serverObj.send(Global.URL_WEBSERVICE, null, null, {
        saveType: "find_more_D",
        uniqID: Global.U_ID
    }, 'POST', null, false);

    window.open("https://content.mycareersfuture.sg/careercoaching/article/career-energiser/?utm_source=newsfeed&utm_medium=quiz&utm_campaign=cc2020&utm_term=careers%2Bconnect%2BCARE360&utm_content=quizrenergiser")
        console.log("findD")

    }
    findEfn(){
      Global.serverObj.send(Global.URL_WEBSERVICE, null, null, {
        saveType: "find_more_E",
        uniqID: Global.U_ID
    }, 'POST', null, false);

    window.open("https://content.mycareersfuture.sg/careercoaching/article/career-recharger/?utm_source=newsfeed&utm_medium=quiz&utm_campaign=cc2020&utm_term=careers%2Bconnect%2BCARE360&utm_content=quizrecharger")
        console.log("findE")
    }
 
 /*    showTerms(){
        Global.serverObj.send(Global.URL_VUPDATE, null, null, {
            saveType: "termsClick",
            uniqID: Global.U_ID
        }, 'POST', null, false);
    } */


}