function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let listDocRef = fire.collection("3A Students").doc("Student Lists");


function getNextStudent(){
  listDocRef.get().then(function(doc) {//Asynchronous Javascript to Read from Database
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
          listDocRef.update({
            been_asked_pool: firebase.firestore.FieldValue.arrayRemove(beenAsked[i])
          });
          //put same kid in to_ask
          listDocRef.update({
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

        listDocRef.update({
          to_ask_pool: firebase.firestore.FieldValue.arrayRemove(nextStudent)
        });
        //put same kid in to_ask
        listDocRef.update({
          been_asked_pool: firebase.firestore.FieldValue.arrayUnion(nextStudent)
        });

        listDocRef.update({
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

function fileCorrect(){
  listDocRef.get().then(function(doc){
    if(doc.exists){
      let currStu = doc.data().curr_stu_puddle;

      listDocRef.update({
        curr_stu_puddle[0].total: firebase.firestore.FieldValue.increment(1)
    });
    }
    else{
      console.log("Sucks, no file dude.")
    }
  })
}

$('correct').click(fileCorrect);
$('#nextStudent').click(getNextStudent);
