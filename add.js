const STU_LIST_3 = fire.collection("3A Students").doc("Student Lists");
const STU_LIST_4 = fire.collection("4A Students").doc("Student Lists");
function addStudent3(){
  let newStudent = {
    name: $('#nameInput').val(),
    pic_src: $('#picSrcInput').val(),
    score: [0,0,0,0]
  };
  // let lst = [];
  // lst.push(newStudent);
  STU_LIST_3.update({
    to_ask_pool: firebase.firestore.FieldValue.arrayUnion(newStudent)
  });

  $("#nameInput").val('');
  $("#picSrcInput").val('');
}

function addStudent4(){
  let newStudent = {
    name: $('#nameInput').val(),
    pic_src: $('#picSrcInput').val(),
    score: [0,0,0,0]
  };
  // let lst = [];
  // lst.push(newStudent);
  STU_LIST_4.update({
    to_ask_pool: firebase.firestore.FieldValue.arrayUnion(newStudent)
  });

  $("#nameInput").val('');
  $("#picSrcInput").val('');
}

$('#add3').click(addStudent3);
$('#add4').click(addStudent4);
