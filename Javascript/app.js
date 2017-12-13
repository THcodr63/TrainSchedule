var config = {
  apiKey: "AIzaSyDnta9ECIvZ5HeSOBESZrH0Mxb43SbeGbY",
  authDomain: "train-sched-8fcf1.firebaseapp.com",
  databaseURL: "https://train-sched-8fcf1.firebaseio.com",
  projectId: "train-sched-8fcf1",
  storageBucket: "train-sched-8fcf1.appspot.com",
  messagingSenderId: "114963904323"
};

firebase.initializeApp(config);
 
var trainData = firebase.database();

$("#addTrainBtn").on("click", function() {
    var trainName = $("#trainNameInput").val();
    var destination = $("#destInput").val();
    var trainTime = moment($("#timeInput").val(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("#freqInput").val();

  var addedTrain = {
    name: trainName,
    destination: destination,
    trainTime: trainTime,
    frequency: frequency
  }

    trainData.ref().push(addedTrain);

    alert("Train added!!")

      $("#trainNameInput").val("");
      $("#destInput").val("");
      $("#timetInput").val("");
      $("#freqTnput").val("");

      return false;

  })

  trainData.ref().on("child_added", function(snapshot) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var trainTime = snapshot.val().trainTime;

    var remainder = moment().diff(moment.unix(trainTime), "minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes, "m").format("hh:mm A");

    console.log(remainder);
    console.log(minutes);
    console.log(arrival);

   $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");

  });