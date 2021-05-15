// declaring variable to store and loop through planner
var myPlanner = [
  {
    id: "0",
    hour: "09",
    time: "09",
    meridiem: "am",
    reminder: "",
  },
  {
    id: "1",
    hour: "10",
    time: "10",
    meridiem: "am",
    reminder: "",
  },
  {
    id: "2",
    hour: "11",
    time: "11",
    meridiem: "am",
    reminder: "",
  },
  {
    id: "3",
    hour: "12",
    time: "12",
    meridiem: "pm",
    reminder: "",
  },
  {
    id: "4",
    hour: "01",
    time: "13",
    meridiem: "pm",
    reminder: "",
  },
  {
    id: "5",
    hour: "02",
    time: "14",
    meridiem: "pm",
    reminder: "",
  },
  {
    id: "6",
    hour: "03",
    time: "15",
    meridiem: "pm",
    reminder: "",
  },
  {
    id: "7",
    hour: "04",
    time: "16",
    meridiem: "pm",
    reminder: "",
  },
  {
    id: "8",
    hour: "05",
    time: "17",
    meridiem: "pm",
    reminder: "",
  },
];

// sets data for the header date
function getDate() {
  var currentDate = moment().format("dddd, MMMM Do");
  $("#currentDay").text(currentDate);
}

// saves data to localStorage
function saveReminders() {
  localStorage.setItem("myPlanner", JSON.stringify(myPlanner));
}

// sets any data in localStorage to the view
function displayReminders() {
  myPlanner.forEach(function (_thisHour) {
    $(`#${_thisHour.id}`).val(_thisHour.reminder);
  });
}

// sets any existing localStorage data to the view if it exists
function init() {
  var storedDay = JSON.parse(localStorage.getItem("myPlanner"));

  if (storedDay) {
    myPlanner = storedDay;
  }

  saveReminders();
  displayReminders();
}

// loads header date
getDate();

// creates the visuals for the scheduler body
myPlanner.forEach(function (thisHour) {
  // creates timeblocks row
  var hourRow = $("<form>").attr({
    class: "row",
  });
  $(".container").append(hourRow);

  // creates time field
  var hourField = $("<div>").text(`${thisHour.hour}${thisHour.meridiem}`).attr({
    class: "col-md-2 hour",
  });

  // creates scheduler data
  var hourPlan = $("<div>").attr({
    class: "col-md-9 description p-0",
  });
  var planData = $("<textarea>");
  hourPlan.append(planData);
  planData.attr("id", thisHour.id);
  if (thisHour.time < moment().format("HH")) {
    planData.attr({
      class: "past",
    });
  } else if (thisHour.time === moment().format("HH")) {
    planData.attr({
      class: "present",
    });
  } else if (thisHour.time > moment().format("HH")) {
    planData.attr({
      class: "future",
    });
  }

  // creates save button
  var saveButton = $("<i class='far fa-save fa-lg'></i>");
  var savePlan = $("<button>").attr({
    class: "col-md-1 saveBtn",
  });
  savePlan.append(saveButton);
  hourRow.append(hourField, hourPlan, savePlan);
});

// loads any existing localstorage data after components created
init();

// saves data to be used in localStorage
$(".saveBtn").on("click", function (event) {
  event.preventDefault();
  var saveIndex = $(this)
    .siblings(".description")
    .children("textarea")
    .attr("id");
  console.log(saveIndex);
  myPlanner[saveIndex].reminder = $(this)
    .siblings(".description")
    .children("textarea")
    .val();
  console.log(myPlanner[saveIndex]);
  saveReminders();
  displayReminders();
});
