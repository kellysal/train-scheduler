$(document).ready(function () {
    // Firebase
    var firebaseConfig = {
        apiKey: "AIzaSyDs9DABij3PCeqmyukTOsM30jb5nko76zU",
        authDomain: "train-d0125.firebaseapp.com",
        databaseURL: "https://train-d0125.firebaseio.com",
        projectId: "train-d0125",
        storageBucket: "train-d0125.appspot.com",
        messagingSenderId: "447226417668",
        appId: "1:447226417668:web:83ff871231cad2db"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

    $("#add-train").on("click", function (event) {
        event.preventDefault();

        var trainName = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = $("#first-train").val().trim();
        var frequency = $("#frequency").val().trim();

        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        $("form")[0].reset();
    });

    database.ref().on("child_added", function (childSnapshot) {

        var newTrain = childSnapshot.val().trainName;
        var newLocation = childSnapshot.val().destination;
        var newFirst = childSnapshot.val().firstTrain;
        var newFrequency = childSnapshot.val().frequency;

        var startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1, "years");

        var currentTime = moment();

        var diffTime = moment().diff(moment(startTimeConverted), "minutes");

        var remainder = diffTime % childSnapshot.val().frequency;

        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var catchTrain = moment(nextTrain).format("hh:mm");

        $("#train-table").append(
            `<tr><td>` + newTrain +
            `<td><td>` + newLocation +
            `<td><td>` + newFrequency +
            `<td><td>` + catchTrain +
            `</td><td>` + tMinutesTillTrain + `</td></tr>`);
    });
});
