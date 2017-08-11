var config = {
    apiKey: "AIzaSyD3Rvx44wTKruWOdHK9VHknfg4ysXpMBj0",
    authDomain: "fir-demo-a0d6c.firebaseapp.com",
    databaseURL: "https://fir-demo-a0d6c.firebaseio.com",
    projectId: "fir-demo-a0d6c",
    storageBucket: "fir-demo-a0d6c.appspot.com",
    messagingSenderId: "129338447738"
  };

firebase.initializeApp(config);
 
var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val();
  var trainDest = $("#dest-input").val();
  var firstTrain = moment($("#first-input").val(), "hh:mm").subtract(10, "years").format("X");
  var trainFreq = $("#freq-input").val();

  var addedTrain = {
    Name: trainName,
    Destination: trainDest,
    First: firstTrain,
    Frequency: trainFreq
  }

      trainData.push(addedTrain);

      console.log(addedTrain.Name);
      console.log(addedTrain.Destination); 
      console.log(addedTrain.First);
      console.log(addedTrain.Frequency);

      $("#train-name-input").val("");
      $("#dest-input").val("");
      $("#first-input").val("");
      $("#freq-input").val("");

      return false;

    });

  trainData.on("child_added", function(childSnapshot, prevChildKey) {

    var nameTrain = childSnapshot.val().Name;
    var desTrain = childSnapshot.val().Destination;
    var freqTrain = childSnapshot.val().Frequency;
    var trainFirst = childSnapshot.val().First;

    var diffTimes = moment().diff(moment.unix(trainFirst), "minutes");
    var trainRemain = moment().diff(moment.unix(trainFirst), "minutes") % freqTrain;
    var trainMin = freqTrain - trainRemain;

    var nextArrv = moment().add(trainMin, "m").format("hh:mm A");

   $("#train-table > tbody").append("<tr><td>" + nameTrain + "</td><td>" + desTrain + "</td><td>" +
  freqTrain + "</td><td>" + nextArrv + "</td><td>" + trainMin + "</td></tr>");

  });