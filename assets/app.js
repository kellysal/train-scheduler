$(document).ready(function () {
    // Firebase
    var config = {
        apiKey: "AIzaSyDs9DABij3PCeqmyukTOsM30jb5nko76zU",
        authDomain: "train-d0125.firebaseapp.com",
        databaseURL: "https://train-d0125.firebaseio.com",
        projectId: "train-d0125",
        storageBucket: "train-d0125.appspot.com",
        messagingSenderId: "447226417668",
    };
    // Initialize Firebase
    firebase.initializeApp(config);

    var database = firebase.database();

    // Add a train to the list

    //Variables created for on click event
    var name;
    var destination;
    var firstTrain;
    var frequency;

    // onclick event to add new
    $("#submit").on("click", function (event) {
        event.preventDefault();
        //store and get new train data
        name = $("#train-name-input").val().trim();
        destination = $("#destination-input").val().trim();
        firstTrain = $("#first-train-input").val().trim();
        frequency = $("#frequency-rate-input").val().trim();

        //push to database
        database.ref().push({
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        $("form")[0].reset();
    });

    database.ref().on("child_added", function (childSnapshot) {
        var nextArrival;
        var minutesAway;
        // changing year for first train
        var firstTrainNew = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
        //
        var differentTime = moment().diff(moment(firstTrainNew), "minutes");

        var remainder = differentTime % childSnapshot.val().frequency;

        // time until next train in minutes
        var minutesAway = childSnapshot.val().frequency - remainder;

        // next train time
        var nextTrain = moment().add(minutesAway, "minutes");
        nextTrain = moment(nextTrain).format("hh:mm");

        $("#add").append("<tr><td>" + childSnapshot.val().name +
            "</td><td>" + childSnapshot.val().destination +
            "</td><td>" + childSnapshot.val().frequency +
            "</td><td>" + nextTrain +
            "</td><td>" + minutesAway + "</td></tr>");

        //errors

    }, function (errorObject) {
        console.log("Errors handled:" + errorObject.code);
    });
});
