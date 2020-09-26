const STU_LIST_3A = fire.collection("3A Students").doc("Student Lists");
const STU_LIST_4A = fire.collection("4A Students").doc("Student Lists");
const STU_LIST_3B = fire.collection("3B Students").doc("Student Lists");
const STU_LIST_4B = fire.collection("4B Students").doc("Student Lists");

function addStudent(period) {
  console.log("hey");
  let newStudent = {
    name: $('#nameInput').val(),
    pic_src: $('#picSrcInput').val(),
    score: [0, 0, 0, 0]
  };

  switch (period) {
    case "3A":
      STU_LIST_3A.update({
        to_ask_pool: firebase.firestore.FieldValue.arrayUnion(newStudent)
      });
      break;

    case "4A":
      STU_LIST_4A.update({
        to_ask_pool: firebase.firestore.FieldValue.arrayUnion(newStudent)
      });
      break;

    case "3B":
      STU_LIST_3B.update({
        to_ask_pool: firebase.firestore.FieldValue.arrayUnion(newStudent)
      });
      break;

    case "4B":
      STU_LIST_4B.update({
        to_ask_pool: firebase.firestore.FieldValue.arrayUnion(newStudent)
      });
      break;
  }

  $("#nameInput").val('');
  $("#picSrcInput").val('');
}


$('#add3A').click(function(event) {
  event.preventDefault();
  addStudent("3A")
});
$('#add4A').click(function(event) {
  event.preventDefault();
  addStudent("4A")
});
$('#add3B').click(function(event) {
  event.preventDefault();
  addStudent("3B")
});
$('#add4B').click(function(event) {
  event.preventDefault();
  addStudent("4B")
});