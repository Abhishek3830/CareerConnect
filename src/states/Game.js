import { Global } from "../util/global";

export class Game extends Phaser.State {
  constructor(game) {
    super(game);
  }
  init() {
    // this.onReachToDestination = this.onReachToDestination.bind(this);
    // this.activateClaim = this.activateClaim.bind(this)
    // this.onTimeUp = this.onTimeUp.bind(this);
    // this.updateScore = this.updateScore.bind(this);
    // this.onShareReq= this.onShareReq.bind(this);
  }

  create() {
    this.count = 0;
    this.swipe = new Swipe(this.game);
    this.arr = ["", "", "", "", ""];
    
    this.Question = [
      {
        Quest:
          "Which of the following is the most\nsimilar to your current career story?",
        Option1:
          "You are returning to the workforce\nafter a long break and you are\nconcerned about your career gap._A",
        Option2:
          "Your company is downsizing, and you are\nhaving difficulties putting together a resume_C",
        Option3:
          "You want to have better career prospects.\nYou don't know what to do to get there._B",
        Option4:
          "You want to switch careers, but you are\n worried it would be a costly mistake._D",
        Option5:
          "You have been in the same company for\n10years, and you lack mentors or\nconnections to grow your career._E",
      },
      {
        Quest:
          "A headhunter contacted you for a\n possible job opportunity at a big\n company. What's your reaction?",
        Option1: "I'm unsure of what to do next._B",
        Option2:
          "I'm scared to try something new.\nWhat if it doesn't work out?_D",
        Option3:
          "I'll pass. I'm tired of job-hunting,\nand I won't get it anyway._A",
        Option4:
          "I'll give it a shot, but I doubt\nmy resume will stand out._C",
        Option5:
          "I'm not sure if I'll go for it.\nWhat if it is not what I want?_E",
      },
      {
        Quest:
          "You overhead rumours that\nyour company is downsizing.\nWhat do you do?",
        Option1:
          "I scroll through my contacts but couldn't\nfind anyone who can link me up with a job_E",
        Option2: "Discuss with my colleagues since I'm unsure._B",
        Option3:
          "Check my email to see if there's any response\n to my (200 and counting) applications._C",
        Option4:
          "Unsure of what to do. At my age,\nit'd be difficult to find a new job._A",
        Option5:
          "Start to learn more about other potential industries\nI can go into. Maybe this is the right time._D",
      },
      {
        Quest: "You have a job-related nightmare.\nWhat does it look like?",
        Option1: "Messing up the interview for my dream job._C",
        Option2:
          "Pulling my hair out at my desk because this is\nnot what I signed up for._D",
        Option3:
          "Breaking down in tears every time I think of\n applying for jobs._A",
        Option4:
          "Tried to break the awkward silence\nwith my potential hirer and I could\nonly comment on his ugly tie._E",
        Option5: "I was asked to describe my strengths and\nI stood frozen._B",
      },
      {
        Quest:
          "What would you consider your\n biggest 'weakness' as a candidate?",
        Option1: "I get nervous during interviews._C",
        Option2: "I'm unable to sell myself in an 'elevator' pitch._E",
        Option3: "I lack knowledge in the industry I'm applying for._D",
        Option4: "I don't know what my values and interests are._B",
        Option5: "I'm too burnt out by the job search process_A",
      },
    ];
    $("canvas").css("background-color", "white");

    this.Question_head = this.game.add.sprite(
      this.game.width * 0.5,
      this.game.height * 0.18,
      "Q_HEAD"
    );
    this.Question_head.name = "Question_HEad";
    this.Question_head.resizeFactor = 2.7;
    this.Question_head.anchor.setTo(0.5);

    this.Question_head_2 = this.game.add.sprite(
      this.game.width * 0.5,
      this.game.height * 0.18,
      "Q_HEAD"
    );
    this.Question_head_2.name = "Question_HEad2";
    this.Question_head_2.resizeFactor = 2.7;
    this.Question_head_2.anchor.setTo(0.5);

    this.Question_head_3 = this.game.add.sprite(
      this.game.width * 0.5,
      this.game.height * 0.18,
      "Q_HEAD"
    );
    this.Question_head_3.name = "Question_HEad3";
    this.Question_head_3.resizeFactor = 2.7;
    this.Question_head_3.anchor.setTo(0.5);

    this.Question_foot = this.game.add.sprite(
      this.game.width * 0.5,
      0,
      "Q_FOOT"
    );
    this.Question_foot.name = "Question_Foot";
    this.Question_foot.resizeFactor = 2.1;
    this.Question_foot.anchor.setTo(0.5);

    this.Question_foot_2 = this.game.add.sprite(
      this.game.width * 0.5,
      0,
      "Q_FOOT"
    );
    this.Question_foot_2.name = "Question_Foot2";
    this.Question_foot_2.resizeFactor = 2.1;
    this.Question_foot_2.anchor.setTo(0.5);

    this.Question_foot_3 = this.game.add.sprite(
      this.game.width * 0.5,
      0,
      "Q_FOOT"
    );
    this.Question_foot_3.name = "Question_Foot3";
    this.Question_foot_3.resizeFactor = 2.1;
    this.Question_foot_3.anchor.setTo(0.5);

    this.Question_foot.follows = {
      item: this.Question_head,
      axis: "y",
      Ydirection: 1,
      Yfactor: 1.7,
    };

    this.Question_foot_2.follows = {
      item: this.Question_head_2,
      axis: "y",
      Ydirection: 1,
      Yfactor: 1.7,
    };

    this.Question_foot_3.follows = {
      item: this.Question_head_3,
      axis: "y",
      Ydirection: 1,
      Yfactor: 1.7,
    };

    this.Group1 = this.add.group();
    this.Group2 = this.add.group();
    this.Group3 = this.add.group();

    this.Group1.addChild(this.Question_head);
    this.Group1.addChild(this.Question_foot);
    this.Group2.addChild(this.Question_head_2);
    this.Group2.addChild(this.Question_foot_2);
    this.Group3.addChild(this.Question_head_3);
    this.Group3.addChild(this.Question_foot_3);

    for (var f = 1; f < 6; f++) {
      this["box1_" + f] = this.game.add.sprite(
        this.game.width * 0.5,
        0,
        "Boxes",
        "02Answer"
      );
      this["box1_" + f].name = "box1_" + f;
      this["box1_" + f].resizeFactor = 3.5;
      this["box1_" + f].anchor.setTo(0.5);
      this["box1_" + f].inputEnabled = true;
      this["box1_" + f].input.useHandCursor = true;
      this["box1_" + f].events.onInputDown.add(this.tapOnBox.bind(this, f, 1));
      if (f > 1) {
        this["box1_" + f].follows = {
          item: this["box1_" + (f - 1)],
          axis: "y",
          Ydirection: 1,
          Yfactor: 1.1,
        };
      } else {
        this["box1_" + f].follows = {
          item: this.Question_head,
          axis: "y",
          Ydirection: 1,
          Yfactor: 0.85,
        };
      }

      this["opt1_" + f] = this.game.add.text(this.game.width * 0.5, 0, "", {
        font: "40px OpenSans-Semibold",
        fill: "#4e4e50",
        align: "center",
      });
      this["opt1_" + f].anchor.setTo(0.5);
      this["opt1_" + f].name = "opt1_" + f;
      this["opt1_" + f].resizeFactor = 1;
      this["opt1_" + f].text = this.Question[4]["Option" + f].split("_")[0];

      this["opt1_" + f].follows = {
        item: this["box1_" + f],
        axis: "y",
        Ydirection: -1,
        Yfactor: 0,
      };

      this.Group1.addChild(this["box1_" + f]);

      this.Group1.addChild(this["opt1_" + f]);
    }

    this.question_text = this.game.add.text(this.game.width * 0.5, 0, "", {
      font: "50px OpenSans-Semibold",
      fill: "#204293",
      align: "center",
    });
    this.question_text.anchor.setTo(0.5);
    this.question_text.name = "Question_txt";
    this.question_text.resizeFactor = 1;
    // console.log(this.Question[4].Quest, " this.Question[0].Quest")
    this.question_text.text = this.Question[4].Quest;
    this.question_text.follows = {
      item: this.Question_head,
      axis: "y",
      Ydirection: -1,
      Yfactor: 0,
    };

    this.Group1.addChild(this.question_text);

    for (var f = 1; f < 6; f++) {
      this["box2_" + f] = this.game.add.sprite(
        this.game.width * 0.5,
        0,
        "Boxes",
        "02Answer"
      );
      this["box2_" + f].name = "box2_" + f;
      this["box2_" + f].resizeFactor = 3.5;
      this["box2_" + f].anchor.setTo(0.5);
      this["box2_" + f].inputEnabled = true;
      this["box2_" + f].input.useHandCursor = true;
      this["box2_" + f].events.onInputDown.add(this.tapOnBox.bind(this, f, 2));
      if (f > 1) {
        this["box2_" + f].follows = {
          item: this["box2_" + (f - 1)],
          axis: "y",
          Ydirection: 1,
          Yfactor: 1.1,
        };
      } else {
        this["box2_" + f].follows = {
          item: this.Question_head_2,
          axis: "y",
          Ydirection: 1,
          Yfactor: 0.85,
        };
      }
      this["opt2_" + f] = this.game.add.text(this.game.width * 0.5, 0, "", {
        font: "40px OpenSans-Semibold",
        fill: "#4e4e50",
        align: "center",
      });
      this["opt2_" + f].anchor.setTo(0.5);
      this["opt2_" + f].name = "opt2_" + f;
      this["opt2_" + f].resizeFactor = 1;
      this["opt2_" + f].text = this.Question[this.count]["Option" + f].split(
        "_"
      )[0];

      this["opt2_" + f].follows = {
        item: this["box2_" + f],
        axis: "y",
        Ydirection: -1,
        Yfactor: 0,
      };
      this.Group2.addChild(this["box2_" + f]);
      this.Group2.addChild(this["opt2_" + f]);
    }
    this.question_text_2 = this.game.add.text(this.game.width * 0.5, 0, "", {
      font: "50px OpenSans-Semibold",
      fill: "#204293",
      align: "center",
    });
    this.question_text_2.anchor.setTo(0.5);
    this.question_text_2.name = "question_text_2";
    this.question_text_2.resizeFactor = 1;
    this.question_text_2.text = this.Question[0].Quest;
    this.question_text_2.follows = {
      item: this.Question_head_2,
      axis: "y",
      Ydirection: -1,
      Yfactor: 0,
    };
    this.Group2.addChild(this.question_text_2);

    for (var f = 1; f < 6; f++) {
      this["box3_" + f] = this.game.add.sprite(
        this.game.width * 0.5,
        0,
        "Boxes",
        "02Answer"
      );
      this["box3_" + f].name = "box3_" + f;
      this["box3_" + f].resizeFactor = 3.5;
      this["box3_" + f].anchor.setTo(0.5);
      this["box3_" + f].inputEnabled = true;
      this["box3_" + f].input.useHandCursor = true;
      this["box3_" + f].events.onInputDown.add(this.tapOnBox.bind(this, f, 3));
      if (f > 1) {
        this["box3_" + f].follows = {
          item: this["box3_" + (f - 1)],
          axis: "y",
          Ydirection: 1,
          Yfactor: 1.1,
        };
      } else {
        this["box3_" + f].follows = {
          item: this.Question_head_3,
          axis: "y",
          Ydirection: 1,
          Yfactor: 0.85,
        };
      }
      this["opt3_" + f] = this.game.add.text(this.game.width * 0.5, 0, "", {
        font: "40px OpenSans-Semibold",
        fill: "#4e4e50",
        align: "center",
      });
      this["opt3_" + f].anchor.setTo(0.5);
      this["opt3_" + f].name = "opt3_" + f;
      this["opt3_" + f].resizeFactor = 1;
      this["opt3_" + f].text = this.Question[1]["Option" + f].split("_")[0];

      this["opt3_" + f].follows = {
        item: this["box3_" + f],
        axis: "y",
        Ydirection: -1,
        Yfactor: 0,
      };
      this.Group3.addChild(this["box3_" + f]);
      this.Group3.addChild(this["opt3_" + f]);
    }
    this.question_text_3 = this.game.add.text(this.game.width * 0.5, 0, "", {
      font: "50px OpenSans-Semibold",
      fill: "#204293",
      align: "center",
    });
    this.question_text_3.anchor.setTo(0.5);
    this.question_text_3.name = "question_text_3";
    this.question_text_3.resizeFactor = 1;
    this.question_text_3.text = this.Question[1].Quest;
    this.question_text_3.follows = {
      item: this.Question_head_3,
      axis: "y",
      Ydirection: -1,
      Yfactor: 0,
    };
    this.Group3.addChild(this.question_text_3);

    this.Group2.x = 0;
    this.Group1.x = -this.game.canvas.width;
    this.Group3.x = this.game.canvas.width;
    this.currentState = 2;

    this.active0 = this.game.add.sprite(
      this.game.width * 0.4,
      0,
      "Dotss",
      "Active"
    );
    this.active0.name = "active0";
    this.active0.resizeFactor = 80;
    this.active0.anchor.setTo(0.5);
    this.active0.follows = {
      item: this.box3_4,
      axis: "y",
      Ydirection: 1,
      Yfactor: 2,
    };

    this.active1 = this.game.add.sprite(
      this.game.width * 0.45,
      0,
      "Dotss",
      "Inactive"
    );
    this.active1.name = "active1";
    this.active1.resizeFactor = 80;
    this.active1.anchor.setTo(0.5);
    this.active1.follows = {
      item: this.box3_4,
      axis: "y",
      Ydirection: 1,
      Yfactor: 2,
    };

    this.active2 = this.game.add.sprite(
      this.game.width * 0.5,
      0,
      "Dotss",
      "Inactive"
    );
    this.active2.name = "active2";
    this.active2.resizeFactor = 80;
    this.active2.anchor.setTo(0.5);
    this.active2.follows = {
      item: this.box3_4,
      axis: "y",
      Ydirection: 1,
      Yfactor: 2,
    };

    this.active3 = this.game.add.sprite(
      this.game.width * 0.55,
      0,
      "Dotss",
      "Inactive"
    );
    this.active3.name = "active3";
    this.active3.resizeFactor = 80;
    this.active3.anchor.setTo(0.5);
    this.active3.follows = {
      item: this.box3_4,
      axis: "y",
      Ydirection: 1,
      Yfactor: 2,
    };

    this.active4 = this.game.add.sprite(
      this.game.width * 0.6,
      0,
      "Dotss",
      "Inactive"
    );
    this.active4.name = "active4";
    this.active4.resizeFactor = 80;
    this.active4.anchor.setTo(0.5);
    this.active4.follows = {
      item: this.box3_4,
      axis: "y",
      Ydirection: 1,
      Yfactor: 2,
    };

   
    //this.firstQuestion(this.count);

    Global.responsiveObj.notify("item-fill-and-resize-all", {
      scene: this,
    });
  }

  tapOnBox(b, a) {
    for (var e = 1; e < 6; e++) {
      this["box" + a + "_" + e].tint = "0xffffff";
      this["opt" + a + "_" + e].fill = "#204293";
    }

    // this["box"+a+"_"+b].frameName = "02Answer";
    this["box" + a + "_" + b].tint = "0x204293";
    this["opt" + a + "_" + b].fill = "#ffffff";
   
    this.swipeLeft();
  }

  firstQuestion(a) {
    this.question_text = this.game.add.text(this.game.width * 0.5, 0, "", {
      font: "50px OpenSans-Semibold",
      fill: "#204293",
      align: "center",
    });
    this.question_text.anchor.setTo(0.5);
    this.question_text.name = "Question_txt";
    this.question_text.resizeFactor = 1;
    this.question_text.text = this.Question[a].Quest;

    this.question_text_2 = this.game.add.text(this.game.width * 0.5, 0, "", {
      font: "50px OpenSans-Semibold",
      fill: "#204293",
      align: "center",
    });
    this.question_text_2.anchor.setTo(0.5);
    this.question_text_2.name = "Question_txt_2";
    this.question_text_2.resizeFactor = 1;
    this.question_text_2.text = this.Question[this.count].Quest;

    this.question_text_3 = this.game.add.text(this.game.width * 0.5, 0, "", {
      font: "50px OpenSans-Semibold",
      fill: "#204293",
      align: "center",
    });
    this.question_text_3.anchor.setTo(0.5);
    this.question_text_3.name = "Question_txt_3";
    this.question_text_3.resizeFactor = 1;
    this.question_text_3.text = this.Question[a + 2].Quest;

    this.question_text.follows = {
      item: this.Question_head,
      axis: "y",
      Ydirection: -1,
      Yfactor: 0,
    };

    this.question_text_2.follows = {
      item: this.Question_head_2,
      axis: "y",
      Ydirection: -1,
      Yfactor: 0,
    };

    this.question_text_3.follows = {
      item: this.Question_head_3,
      axis: "y",
      Ydirection: -1,
      Yfactor: 0,
    };

    this.opt1 = this.game.add.text(this.game.width * 0.5, 0, "", {
      font: "40px OpenSans-Semibold",
      fill: "#4e4e50",
      align: "center",
    });
    this.opt1.anchor.setTo(0.5);
    this.opt1.name = "opt1";
    this.opt1.resizeFactor = 1;
    this.opt1.text = this.Question[a].Option1;

    this.opt2_1 = this.game.add.text(this.game.width * 0.5, 0, "", {
      font: "40px OpenSans-Semibold",
      fill: "#4e4e50",
      align: "center",
    });
    this.opt2_1.anchor.setTo(0.5);
    this.opt2_1.name = "opt2_1";
    this.opt2_1.resizeFactor = 1;
    this.opt2_1.text = this.Question[a].Option1;

    this.opt3_1 = this.game.add.text(this.game.width * 0.5, 0, "", {
      font: "40px OpenSans-Semibold",
      fill: "#4e4e50",
      align: "center",
    });
    this.opt3_1.anchor.setTo(0.5);
    this.opt3_1.name = "opt3_1";
    this.opt3_1.resizeFactor = 1;
    this.opt3_1.text = this.Question[a + 2].Option1;

    this.opt1.follows = {
      item: this.box1,
      axis: "y",
      Ydirection: -1,
      Yfactor: 0,
    };

    this.opt2_1.follows = {
      item: this.box2_1,
      axis: "y",
      Ydirection: -1,
      Yfactor: 0,
    };

    this.opt3_1.follows = {
      item: this.box3_1,
      axis: "y",
      Ydirection: -1,
      Yfactor: 0,
    };

    this.opt2 = this.game.add.text(this.game.width * 0.5, 0, "", {
      font: "40px OpenSans-Semibold",
      fill: "#4e4e50",
      align: "center",
    });
    this.opt2.anchor.setTo(0.5);
    this.opt2.name = "opt2";
    this.opt2.resizeFactor = 1;
    this.opt2.text = this.Question[a].Option2;

    this.opt2_2 = this.game.add.text(this.game.width * 0.5, 0, "", {
      font: "40px OpenSans-Semibold",
      fill: "#4e4e50",
      align: "center",
    });
    this.opt2_2.anchor.setTo(0.5);
    this.opt2_2.name = "opt2_2";
    this.opt2_2.resizeFactor = 1;
    this.opt2_2.text = this.Question[a].Option2;

    this.opt3_2 = this.game.add.text(this.game.width * 0.5, 0, "", {
      font: "40px OpenSans-Semibold",
      fill: "#4e4e50",
      align: "center",
    });
    this.opt3_2.anchor.setTo(0.5);
    this.opt3_2.name = "opt3_2";
    this.opt3_2.resizeFactor = 1;
    this.opt3_2.text = this.Question[a + 2].Option2;

    this.opt2.follows = {
      item: this.box2,
      axis: "y",
      Ydirection: -1,
      Yfactor: 0,
    };

    this.opt2_2.follows = {
      item: this.box2_2,
      axis: "y",
      Ydirection: -1,
      Yfactor: 0,
    };

    this.opt3_2.follows = {
      item: this.box3_2,
      axis: "y",
      Ydirection: -1,
      Yfactor: 0,
    };

    this.opt3 = this.game.add.text(this.game.width * 0.5, 0, "", {
      font: "40px OpenSans-Semibold",
      fill: "#4e4e50",
      align: "center",
    });
    this.opt3.anchor.setTo(0.5);
    this.opt3.name = "opt3";
    this.opt3.resizeFactor = 1;
    this.opt3.text = this.Question[a].Option3;

    this.opt2_3 = this.game.add.text(this.game.width * 0.5, 0, "", {
      font: "40px OpenSans-Semibold",
      fill: "#4e4e50",
      align: "center",
    });
    this.opt2_3.anchor.setTo(0.5);
    this.opt2_3.name = "opt2_3";
    this.opt2_3.resizeFactor = 1;
    this.opt2_3.text = this.Question[a].Option3;

    this.opt3_3 = this.game.add.text(this.game.width * 0.5, 0, "", {
      font: "40px OpenSans-Semibold",
      fill: "#4e4e50",
      align: "center",
    });
    this.opt3_3.anchor.setTo(0.5);
    this.opt3_3.name = "opt3_3";
    this.opt3_3.resizeFactor = 1;
    this.opt3_3.text = this.Question[a + 2].Option3;

    this.opt3.follows = {
      item: this.box3,
      axis: "y",
      Ydirection: -1,
      Yfactor: 0,
    };

    this.opt2_3.follows = {
      item: this.box2_3,
      axis: "y",
      Ydirection: -1,
      Yfactor: 0,
    };

    this.opt3_3.follows = {
      item: this.box3_3,
      axis: "y",
      Ydirection: -1,
      Yfactor: 0,
    };

    this.opt4 = this.game.add.text(this.game.width * 0.5, 0, "", {
      font: "40px OpenSans-Semibold",
      fill: "#4e4e50",
      align: "center",
    });
    this.opt4.anchor.setTo(0.5);
    this.opt4.name = "opt4";
    this.opt4.resizeFactor = 1;
    this.opt4.text = this.Question[a].Option4;

    this.opt2_4 = this.game.add.text(this.game.width * 0.5, 0, "", {
      font: "40px OpenSans-Semibold",
      fill: "#4e4e50",
      align: "center",
    });
    this.opt2_4.anchor.setTo(0.5);
    this.opt2_4.name = "opt2_4";
    this.opt2_4.resizeFactor = 1;
    this.opt2_4.text = this.Question[a].Option4;

    this.opt3_4 = this.game.add.text(this.game.width * 0.5, 0, "", {
      font: "40px OpenSans-Semibold",
      fill: "#4e4e50",
      align: "center",
    });
    this.opt3_4.anchor.setTo(0.5);
    this.opt3_4.name = "opt3_4";
    this.opt3_4.resizeFactor = 1;
    this.opt3_4.text = this.Question[a + 2].Option4;

    this.opt4.follows = {
      item: this.box4,
      axis: "y",
      Ydirection: -1,
      Yfactor: 0,
    };

    this.opt2_4.follows = {
      item: this.box2_4,
      axis: "y",
      Ydirection: -1,
      Yfactor: 0,
    };

    this.opt3_4.follows = {
      item: this.box3_4,
      axis: "y",
      Ydirection: -1,
      Yfactor: 0,
    };

    this.opt5 = this.game.add.text(this.game.width * 0.5, 0, "", {
      font: "40px OpenSans-Semibold",
      fill: "#4e4e50",
      align: "center",
    });
    this.opt5.anchor.setTo(0.5);
    this.opt5.name = "opt5";
    this.opt5.resizeFactor = 1;
    this.opt5.text = this.Question[a].Option5;

    this.opt2_5 = this.game.add.text(this.game.width * 0.5, 0, "", {
      font: "40px OpenSans-Semibold",
      fill: "#4e4e50",
      align: "center",
    });
    this.opt2_5.anchor.setTo(0.5);
    this.opt2_5.name = "opt2_5";
    this.opt2_5.resizeFactor = 1;
    this.opt2_5.text = this.Question[a].Option5;

    this.opt3_5 = this.game.add.text(this.game.width * 0.5, 0, "", {
      font: "40px OpenSans-Semibold",
      fill: "#4e4e50",
      align: "center",
    });
    this.opt3_5.anchor.setTo(0.5);
    this.opt3_5.name = "opt3_5";
    this.opt3_5.resizeFactor = 1;
    this.opt3_5.text = this.Question[a + 2].Option5;

    this.opt5.follows = {
      item: this.box5,
      axis: "y",
      Ydirection: -1,
      Yfactor: 0,
    };

    this.opt2_5.follows = {
      item: this.box2_5,
      axis: "y",
      Ydirection: -1,
      Yfactor: 0,
    };

    this.opt3_5.follows = {
      item: this.box3_5,
      axis: "y",
      Ydirection: -1,
      Yfactor: 0,
    };

    this.Group1.addChild(this.question_text);
    this.Group1.addChild(this.opt1);
    this.Group1.addChild(this.opt2);
    this.Group1.addChild(this.opt3);
    this.Group1.addChild(this.opt4);
    this.Group1.addChild(this.opt5);

    this.Group2.addChild(this.question_text_2);
    this.Group2.addChild(this.opt2_1);
    this.Group2.addChild(this.opt2_2);
    this.Group2.addChild(this.opt2_3);
    this.Group2.addChild(this.opt2_4);
    this.Group2.addChild(this.opt2_5);

    this.Group3.addChild(this.question_text_3);
    this.Group3.addChild(this.opt3_1);
    this.Group3.addChild(this.opt3_2);
    this.Group3.addChild(this.opt3_3);
    this.Group3.addChild(this.opt3_4);
    this.Group3.addChild(this.opt3_5);

    this.Group2.x = 0;
    this.Group1.x = -this.game.canvas.width;
    this.Group3.x = this.game.canvas.width;
    this.currentState = 2;
  }

  setQuestion() {
    for (var a = 1; a < 6; a++) {
      this["opt1_" + a].fill = "#204293";
      this["opt2_" + a].fill = "#204293";
      this["opt3_" + a].fill = "#204293";
    }

    

    if (this.currentState == 3) {
      console.log("AAAAAAAAAAYYYYAAA");
      this.question_text_3.text = this.Question[this.count].Quest;
      for (var i = 1; i < 6; i++) {
        this["opt3_" + i].fill = "#204293";
        this["opt3_" + i].text = this.Question[this.count]["Option" + i].split(
          "_"
        )[0];
      }
    } else if (this.currentState == 2) {
      this.question_text_2.text = this.Question[this.count].Quest;
      for (var j = 1; j < 6; j++) {
        this["opt2_" + j].fill = "#204293";
        this["opt2_" + j].text = this.Question[this.count]["Option" + j].split(
          "_"
        )[0];
      }
    } else if (this.currentState == 1) {
      console.log("AAAAAAAAAAYYYYAAA111 ", this.Question[this.count].Quest);
      this.question_text.text = this.Question[this.count].Quest;
      for (var k = 1; k < 6; k++) {
        this["opt1_" + k].fill = "#204293";
        this["opt1_" + k].text = this.Question[this.count]["Option" + k].split(
          "_"
        )[0];
      }
    }


    for (var a = 1; a < 6; a++) {
      if (this.arr[this.count] != "") {
        if(this.Question[this.count]["Option" + a].includes("_"+this.arr[this.count])){
          console.log(this.currentState , "HERE111111111111111111111111111111111111" , a)
          this["box" + this.currentState + "_" + a].tint = "0x204293";
          this["opt" + this.currentState + "_" + a].fill = "#ffffff";
        } 
      }
    }

    // console.log(this.count+" this.count")

    // var a = this.count-1;
    // var b = this.count+1
    // console.log("Question "+a)
    // this.question_text.text = "Question"+a;
    // this.question_text_2.text = "Question"+this.count;
    // this.question_text_3.text = "Question"+b;
  }

  maxRepeat() {
    var n = this.arr.length;

    var max_count = 1;
    var res = this.arr[0];
    var curr_count = 1;

    for (var i = 1; i < n; i++) {
      if (this.arr[i] == this.arr[i - 1]) curr_count++;
      else {
        if (curr_count > max_count) {
          max_count = curr_count;
          res = this.arr[i - 1];
        }
        curr_count = 1;
      }
    }
    if (curr_count > max_count) {
      max_count = curr_count;
      res = this.arr[n - 1];
    }
    console.log(res + " result");
    Global.finalAnswer = res;
    this.gameOver();
  }

  fnCheckAndRespond() {
    var char = "";
    for (var e = 1; e < 6; e++) {
      if (this["box" + this.currentState + "_" + e].tint === "0x204293") {
        /*  this["opt"+this.currentState+"_" + e] */
        char = this.Question[this.count]["Option" + e].split("_")[1];
      }
    }

    return char;
  }

  swipeLeft() {
    if (this.count < 4) {
      this.arr[this.count] = this.fnCheckAndRespond();
      console.log(this.arr);
      this.count++;
    } else {
      this.arr[this.count] = this.fnCheckAndRespond();
      this.count = 0;
    }
    var a = this.count-1;
    if(this.count>0){
      this["active"+this.count].frameName = "Active";
      this["active"+a].frameName = "Inactive";
    }else{
      this["active"+this.count].frameName = "Active";
      this.active4.frameName = "Inactive";
    }
  
    // console.log(this.currentState, "thics");

    // console.log(this.currentState, "thics");

    Global.responsiveObj.notify("item-tween-by", {
      scene: this,
      props: {
        item: this.Group1,
        x: "-100%",
        y: "0%",
        time: 400,
        delay: 0,
        Ease: Phaser.Easing.Cubic.InOut,
      },
    });

    Global.responsiveObj.notify("item-tween-by", {
      scene: this,
      props: {
        item: this.Group2,
        x: "-100%",
        y: "0%",
        time: 400,
        delay: 0,
        Ease: Phaser.Easing.Cubic.InOut,
      },
    });

    Global.responsiveObj.notify("item-tween-by", {
      scene: this,
      props: {
        item: this.Group3,
        x: "-100%",
        y: "0%",
        time: 400,
        delay: 0,
        Ease: Phaser.Easing.Cubic.InOut,
        doOnComplete: function () {
          for (var e = 1; e < 6; e++) {
            this["box1_" + e].tint = "0xffffff";
            this["box2_" + e].tint = "0xffffff";
            this["box3_" + e].tint = "0xffffff";
          }

          if (this.currentState == 2) {
            this.Group1.x = this.game.canvas.width;
            this.question_text.text = "";
            for (var k = 1; k < 6; k++) {
              this["opt1_" + k].fill = "#204293";
              this["opt1_" + k].text = "";
            }
            this.currentState = 3;
          } else if (this.currentState == 1) {
            this.Group3.x = this.game.canvas.width;
            this.question_text_3.text = "";
            for (var i = 1; i < 6; i++) {
              this["opt3_" + i].fill = "#204293";
              this["opt3_" + i].text = "";
            }
            this.currentState = 2;
          } else if (this.currentState == 3) {
            this.Group2.x = this.game.canvas.width;
            this.question_text_2.text = "";
            for (var j = 1; j < 6; j++) {
              this["opt2_" + j].fill = "#204293";
              this["opt2_" + j].text = "";
            }
            this.currentState = 1;
          }
          this.setQuestion();
        },
      },
    });
  }

  swipeRight() {
    if (this.count > 0) {
      this.arr[this.count] = this.fnCheckAndRespond();
      this.count--;
    } else {
      this.arr[this.count] = this.fnCheckAndRespond();
      this.count = 4;
    }
     var b = this.count+1;
     if(this.count < 4){
  this["active"+this.count].frameName = "Active";
  this["active"+b].frameName = "Inactive";

     } else{
      this.active4.frameName = "Active";
      this.active0.frameName = "Inactive";
     }


    Global.responsiveObj.notify("item-tween-by", {
      scene: this,
      props: {
        item: this.Group1,
        x: "100%",
        y: "0%",
        time: 400,
        delay: 0,
        Ease: Phaser.Easing.Cubic.InOut,
      },
    });

    Global.responsiveObj.notify("item-tween-by", {
      scene: this,
      props: {
        item: this.Group2,
        x: "100%",
        y: "0%",
        time: 400,
        delay: 0,
        Ease: Phaser.Easing.Cubic.InOut,
      },
    });

    Global.responsiveObj.notify("item-tween-by", {
      scene: this,
      props: {
        item: this.Group3,
        x: "100%",
        y: "0%",
        time: 400,
        delay: 0,
        Ease: Phaser.Easing.Cubic.InOut,
        doOnComplete: function () {
          for (var e = 1; e < 6; e++) {
            this["box1_" + e].tint = "0xffffff";
            this["box2_" + e].tint = "0xffffff";
            this["box3_" + e].tint = "0xffffff";
          }

          if (this.currentState == 2) {
            this.Group3.x = -this.game.canvas.width;
            this.question_text_3.text = "";
            for (var i = 1; i < 6; i++) {
              this["opt3_" + i].fill = "#204293";
              this["opt3_" + i].text = "";
            }
            this.currentState = 1;
          } else if (this.currentState == 1) {
            this.Group2.x = -this.game.canvas.width;
            this.question_text_2.text = "";
            for (var j = 1; j < 6; j++) {
              this["opt2_" + j].fill = "#204293";
              this["opt2_" + j].text = "";
            }
            this.currentState = 3;
          } else if (this.currentState == 3) {
            this.Group1.x = -this.game.canvas.width;
            this.question_text.text = "";
            for (var k = 1; k < 6; k++) {
              this["opt1_" + k].fill = "#204293";
              this["opt1_" + k].text = "";
            }
            this.currentState = 2;
          }
          setTimeout(() => {
            this.setQuestion();
          }, 100);
        },
      },
    });
  }

  gameOver() {
    Global.responsiveObj.notify("clear", null);
    this.game.state.start("Form");
    // console.log(Global.finalAnswer+"answer")
    // console.log("gameover")
  }

  update() {
    var direction = this.swipe.check();
    if (direction !== null) {
      switch (direction.direction) {
        case this.swipe.DIRECTION_LEFT:
        case this.swipe.DIRECTION_RIGHT:
      }
      console.log(direction.direction);
      if (direction.direction == 4) {
        this.swipeLeft();
      }
      if (direction.direction == 8) {
        this.swipeRight();
      }
    }

    for(var a = 0; a<5; a++){
      if(this.arr[a]!="" && this.arr[a+1]!=""&& this.arr[a+2]!=""&& this.arr[a+3]!=""&& this.arr[a+4]!=""){
       this.maxRepeat();
      }
    }
   
  }
}
