// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var containerLgEl = $('.container-lg');

  // uses the dayjs api to get today's date and format it to the specifications
  var now = dayjs().format('dddd, MMMM D, YYYY')
  // uses jQuery to apply add today's date as text to the html with id=currentDay
  $('#currentDay').text(now);

  var hourNow = dayjs().hour()

  // This function creates all 24 timeblocks
  // I used miltary time instead of a typical 9-5 business day because my whole day is organized as a work day.
  function createTimeBlocks() {
    var hour = 0

    for (var i = 0; i < 24; i++) {
      if (hour < 10 ) {
        hourMilitary = '0' + hour
      } else {
        hourMilitary = hour
      }

      if (hour < hourNow) {
        timeWhen = 'past'
      } else if (hour == hourNow) {
        timeWhen = 'present'
      } else {
        timeWhen = 'future'
      }

      // accesses jQuery on all <section> tags
      var timeScheduleEl = $('<section>'); 
      // creates an id for the time schedule elements that is unique to what hour it is.  
      timeScheduleEl.attr('id', 'hour-' + hourMilitary)
      // adds the timeWhen label to the class of the time schedule elements. It is then used to change the color of the time cell depending on the value of the label.
      timeScheduleEl.addClass('row time-block ' + timeWhen)

      var taskScheduleEl = $('<time>');
      taskScheduleEl.addClass('col-2 col-md-1 hour text-center py-3')
      // updates the text for the taskSchedule elements with the appropriate time
      taskScheduleEl.text(hourMilitary + ':00')

      var timeAreaEl = $('<textarea>');
      timeAreaEl.addClass('col-8 col-md-10 description')
      timeAreaEl.attr('id', 'text-hour-' + hourMilitary)
      timeAreaEl.attr('rows', 3)

      var saveButtonEl = $('<button>')
      saveButtonEl.addClass('btn saveBtn col-2 col-md-1')
      saveButtonEl.attr('aria-label', 'save')

      var saveIconEl = $('<i>')
      // The fas fa-save is a font-awesome icon for the save button
      saveIconEl.addClass('fas fa-save')
      saveIconEl.attr('aria-hidden', 'true')

      saveButtonEl.append(saveIconEl)

      timeScheduleEl.append(taskScheduleEl)
      timeScheduleEl.append(timeAreaEl)
      timeScheduleEl.append(saveButtonEl)

      // appends the timeSchedule element to the containerLg element
      containerLgEl.append(timeScheduleEl);

      // retreives the daySchedule array that is stored in localStorage
      daySchedule = JSON.parse(localStorage.getItem("daySchedule"));
      
      hour = hour + 1

      // when the saveButton element is clicked... trigger the saveEvent
      $(saveButtonEl).on("click", saveEvent);
    }

  }

  createTimeBlocks()

  function saveEvent() {

    // 'this' used inside of $() makes 'this' a jQuery object
    var textArea = $(this).parent().children()[1];
    var hourArea = $(this).parent().children()[1].id;

    var hourDetails = {
      hour : hourArea,
      details : textArea.value
    }
    // retreives the daySchedule array that is stored in localStorage
    var daySchedule = JSON.parse(localStorage.getItem("daySchedule"));   
            
    if(daySchedule){
      // the push adds a new hourDetails to the end of the daySchedule array
      daySchedule.push(hourDetails); 
    }
    else{
      daySchedule = [hourDetails];    
    }
    // stores the new additions to the daySchedule array in localStorage
    localStorage.setItem("daySchedule",JSON.stringify(daySchedule));

  }
  // This function loads the schedule when the web site is loaded
  function loadSchedule () {
    // retreives the daySchedule array that is stored in localStorage
    var daySchedule = JSON.parse(localStorage.getItem("daySchedule"));

    // if daySchedule exists then the following code is implmented in order to load the daySchedule array into the appropriate time cells.
    if(daySchedule) {
      // the for loop iterates through the length of daySchedule 
      for (var i = 0; i < daySchedule.length ; i++) { 
        var hourArea = daySchedule[i].hour
        var hourDetails = daySchedule[i].details
        // this document.querySelector gathers the element within the webpage that matches the id hourArea(i.e. text-hour-11) 
        var hourEl = document.querySelector("#" + hourArea);

      hourEl.textContent = hourDetails

      }

    }
  }
  loadSchedule()
});  