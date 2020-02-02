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
      if(toAsk.length == 0){//there's an error here when everyone's been called
        let beenAsked = doc.data().been_asked_pool;
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
        //put same kid in to_ask
        STU_LIST_3.update({
          been_asked_pool: firebase.firestore.FieldValue.arrayUnion(nextStudent)
        });

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

file and update Correct

file and update Incorrect

file and update question asked

file absent count and return to to_ask_pool
*/

/**
Get student from the curr_stu_puddle and update numbers
*/
function fileCorrect(){
  STU_LIST_3.get().then(function(doc){
    if(doc.exists){
      let currScoreLst = doc.data().score;
      currScoreLst[0]++;
      STU_LIST_3.update({
        curr_stu_puddle.score: currScoreLst
    });
    }
    else{
      console.log("Sucks, no file dude.")
    }
  })
}

/**
What follows here is the binding of above functions to buttons on the page.
*/
$('correct').click(fileCorrect);
$('#nextStudent').click(getNextStudent);
