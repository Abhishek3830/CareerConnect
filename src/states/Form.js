import { Global } from "../util/global";

export class Form extends Phaser.State{
    constructor(game){
        super(game);
    }
    init(){};
    create(){
      $("canvas").hide();
      $(".form-sec").show();
      $("#formDIv").width($('canvas').width());
      $("#footer").width($('canvas').width());

      $(".txxt").on("click", this.tandcClick);

      $(".popup").width($('canvas').width()-50);


     
      
      $(".sbmit").click(function () {

        this.winButton();
        
    }.bind(this));

      var nam = $("#name :input[type='text']")

      $("#name").focus(function () {
        $("nam").attr('src','assets/03FormArrowActive.png');
        console.log("HJJ")
    });
       
        Global.responsiveObj.notify("item-fill-and-resize-all", {
            scene: this
        });

       };

    tandcClick(){
      $(".popupBG").show();
     
        // this.game.state.start("Game");
    };

    winButton(){
      Global.name = document.getElementById("name").value;
      Global.dob = document.getElementById("dob").value;
      Global.email = document.getElementById("email").value;

      var radio1 = $('#singapore').val();
      var radio2 = $('#permanent').val();
      var radio3 = $('#others').val();

      if( $('#singapore').attr('checked') == 'checked' ){
        
        Global.citizen = radio1;
      } else if( $('#permanent').attr('checked') == 'checked'){
        Global.citizen = radio2;
      } else if( $('#others').attr('checked') == 'checked'){
        Global.citizen = radio3;
      }

      var dob = document.getElementById("dob").value;

      if (Global.name == "") {
            $(".err").html("Please enter your name.");
    }

    else if(!Global.name == "" ){
      if(!this.validateDOB(Global.dob)){
        $(".err").html("Please enter valid DOB.")
      }
    }
   


    else if (!Global.name == "") {
        if (!this.validateEmail(Global.email)) {
            $(".err").html("Please enter valid Email Id.");
        }

        else {

            $(".err").html("");

            Global.serverObj.send(Global.URL_WEBSERVICE, null, null, {
              saveType: "see_result",
              uniqID: Global.U_ID
          }, 'POST', null, false);
           

            this.game.state.start('Result');

        }
    }

    }

    validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }
/*   validateDOB(dob){
    // Global.dob = document.getElementById("dob").value;
    console.log(Global.dob+"DOB")
        var regex =  /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
        return regex.test(dob);;

  } */
  validateDOB()
{
    var dob = document.getElementById("dob").value;
    var pattern = /^([0-9]{2})-([0-9]{2})-([0-9]{4})$/;
    if (dob == null || dob == "" || !pattern.test(new Date(dob))) {
        return false;
    }
    else {
        return true
    }
   /*  $('#dob').on('change', function() {
      console.log(new Date(this.value));
   }); */
}


}