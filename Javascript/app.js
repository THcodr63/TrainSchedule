var config = {
  apiKey: "AIzaSyDnta9ECIvZ5HeSOBESZrH0Mxb43SbeGbY",
  authDomain: "train-sched-8fcf1.firebaseapp.com",
  databaseURL: "https://train-sched-8fcf1.firebaseio.com",
  projectId: "train-sched-8fcf1",
  storageBucket: "train-sched-8fcf1.appspot.com",
  messagingSenderId: "114963904323"
};

firebase.initializeApp(config);
 
var database = firebase.database();

$("#addTrainBtn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#trainNameInput").val();
  var destination = $("#destInput").val();
  var trainTime = moment($("#timeInput").val(), "hh:mm").subtract(10, "years").format("X");
  var frequency = $("#freqInput").val();

  var addedTrain = {
    name: trainName,
    destination: destination,
    time: trainTime,
    frequency: frequency
  }

      trainData.push(addedTrain);

      console.log(addedTrain.name);
      console.log(addedTrain.destination); 
      console.log(addedTrain.first);
      console.log(addedTrain.frequency);

      $("#trainNameInput").val("");
      $("#destInput").val("");
      $("#firstInput").val("");
      $("#freqTnput").val("");

      return false;

    });

  trainData.on("child_added", function(childSnapshot, prevChildKey) {

    var nameTrain = childSnapshot.val().name;
    var desTrain = childSnapshot.val().destination;
    var freqTrain = childSnapshot.val().frequency;
    var trainFirst = childSnapshot.val().First;

    var diffTimes = moment().diff(moment.unix(trainFirst), "minutes");
    var trainRemain = moment().diff(moment.unix(trainFirst), "minutes") % freqTrain;
    var trainMin = freqTrain - trainRemain;

    var nextArrv = moment().add(trainMin, "m").format("hh:mm A");

   $("#trainTable > tbody").append("<tr><td>" + nameTrain + "</td><td>" + desTrain + "</td><td>" +
  freqTrain + "</td><td>" + nextArrv + "</td><td>" + trainMin + "</td></tr>");

  });