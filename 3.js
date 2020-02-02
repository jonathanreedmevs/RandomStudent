function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const STU_LIST_3 = fire.collection("3A Students").doc("Student Lists");


function getNextStudent(){
  STU_LIST_3.get().then(function(doc) {//Asynchronous Javascript to Read from Database
    if(doc.exists){
      //Get references to the list pools of who to call
      let beenAsked = doc.data().been_asked_pool;
      let toAsk = doc.data().to_ask_pool;
      //get the next student
      if(toAsk.length == 0){
        //Take every kid out of beenAsked and put them in to_ask_pool
        for (let i = 0; i < beenAsked.length; i++){
          //get kid out of beenAsked
          STU_LIST_3.update({
            been_asked_pool: firebase.firestore.FieldValue.arrayRemove(beenAsked[i])
          });
          //put same kid in to_ask
          STU_LIST_3.update({
            to_ask_pool: firebase.firestore.FieldValue.arrayUnion(beenAsked[i])
          });
        }

      }
      else{
        let nextStudent = toAsk[getRandomInt(toAsk.length)];
        console.log(nextStudent);

        let pic = nextStudent.pic_src;
        let name = nextStudent.name;

        $("#stuName").html(name);
        $("#stuPic").attr("src", pic);

        STU_LIST_3.update({
          to_ask_pool: firebase.firestore.FieldValue.arrayRemove(nextStudent)
        });
        //TEMPORARILY REMOVED AS THIS IS DONE IN THE OTHER FUNCTIONS
        // STU_LIST_3.update({
        //   been_asked_pool: firebase.firestore.FieldValue.arrayUnion(nextStudent)
        // });

        STU_LIST_3.update({
          curr_stu_puddle: firebase.firestore.FieldValue.arrayUnion(nextStudent)
        });
}
    }
    else{
      console.log("Doc Doesn't Exist!");
    }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });

}

/**
What begins here are functions for the buttons on the webpage.

[correct, incorrect, questions asked, times absent]

I have to:

file and update Correct DONE

file and update Incorrect

file and update question asked

file absent count and return to to_ask_pool
*/

/**
Get student from the curr_stu_puddle and update numbers
*/
function fileCorrect(){
  STU_LIST_3.get().then(function(doc){
    if(doc.exists && doc.data().curr_stu_puddle.length == 1){
      let currStu = doc.data().curr_stu_puddle[0];//get current student
      let scoreLst = currStu.score;//get their score structure
      scoreLst[0]++;//increment correct
      currStu.score = scoreLst;//reassign updated list
      let lst = []//push student
      console.log(currStu);
      lst.push(currStu);


      STU_LIST_3.update({//update puddle in current list
        "curr_stu_puddle": lst
      });

      //put into been_asked_pool
      STU_LIST_3.update({
        been_asked_pool: firebase.firestore.FieldValue.arrayUnion(currStu)
      });

      STU_LIST_3.update({
        curr_stu_puddle: firebase.firestore.FieldValue.arrayRemove(currStu)
      });

    }
    else{
      console.log("Sucks, no file dude.")
    }
  })
}

function resetScores(){
  STU_LIST_3.get().then(function(doc){
    if(doc.exists){
      let beenAsked = doc.data().been_asked_pool;
      let newBeenAskedLst = [];
      for(let i = 0; i < beenAsked.length; i++){
        let currStu = beenAsked[i];//get current student
        let scoreLst = currStu.score;//get their score structure
        for(let j = 0; j < scoreLst.length; j++){
          scoreLst[j] = 0;
        }
        currStu.score = scoreLst;//reassign updated list
        console.log(currStu);
        newBeenAskedLst.push(currStu);
      }
      STU_LIST_3.update({//update puddle in current list
        "been_asked_pool": newBeenAskedLst
      });
      let toAsk = doc.data().to_ask_pool;
      let newToAsk = [];
      for(let i = 0; i < toAsk.length; i++){
        let currStu = toAsk[i];//get current student
        let scoreLst = currStu.score;//get their score structure
        for(let j = 0; j < scoreLst.length; j++){
          scoreLst[j] = 0;
        }
        currStu.score = scoreLst;//reassign updated list
        console.log(currStu);
        newToAsk.push(currStu);

        STU_LIST_3.update({//update puddle in current list
          "to_ask_pool": newToAsk
        });
      }

      let curr_stu_puddle = doc.data().curr_stu_puddle;
      let newCurr_stu_puddle = [];
      for(let i = 0; i < curr_stu_puddle.length; i++){
        let currStu = curr_stu_puddle[i];//get current student
        let scoreLst = currStu.score;//get their score structure
        for(let j = 0; j < scoreLst.length; j++){
          scoreLst[j] = 0;
        }
        currStu.score = scoreLst;//reassign updated list
        console.log(currStu);
        newCurr_stu_puddle.push(currStu);

        STU_LIST_3.update({//update puddle in current list
          "curr_stu_puddle": newCurr_stu_puddle
        });
      }
    }else{
      console.log("Sucks, no file dude.")
    }
  })
}


/**
What follows here is the binding of above functions to buttons on the page.
*/
$('#correct').click(fileCorrect);
$('#reset').click(resetScores);
$('#nextStudent').click(getNextStudent);
