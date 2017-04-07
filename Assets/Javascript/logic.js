var config = {
    apiKey: "AIzaSyA7UmLRg2zOgerqg-rPP9YtUpHBTWRxsdo",
    authDomain: "traintime-58bc1.firebaseapp.com",
    databaseURL: "https://traintime-58bc1.firebaseio.com",
    projectId: "traintime-58bc1",
    storageBucket: "traintime-58bc1.appspot.com",
    messagingSenderId: "1048509875705"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

$("#submit").on("click", function(event)  {
	event.preventDefault();

	var trainName = $("#train-name-input").val().trim();
	var destName = $("#destination-input").val().trim();
	var trainTime = $("#train-time-input").val().trim();
	var freq = $("#frequency-input").val().trim();

	var date = $("#train-time-input").val();
	var tFrequency = $("#frequency-input").val();
	var firstTimeConverted = moment(date, "HH:mm").subtract(1, "years");
	var current = moment().format("HH:mm");
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	var tRemainder = diffTime % tFrequency;
	var tMinutesTillTrain = tFrequency - tRemainder;
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	var nnextTrain = moment(nextTrain).format("HH:mm");

	var newTrain = {
		train: trainName,
		destination: destName,
		time: trainTime,
		frequency: freq,
		next_train: nnextTrain,
		min_away: tMinutesTillTrain
	};

	database.ref().push(newTrain);

	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#train-time-input").val("");
	$("#frequency-input").val("");

	return false;
});

database.ref().on("child_added", function(childSnapshot, prevChildKey)  {

	var trainName = childSnapshot.val().train;
	var destName = childSnapshot.val().destination;
	var trainTime = childSnapshot.val().time;
	var freq = childSnapshot.val().frequency;
	var nnextTrain = childSnapshot.val().next_train;
	var tMinutesTillTrain = childSnapshot.val().min_away;

 $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destName + "</td><td>" +
   freq + "</td><td>" + nnextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});