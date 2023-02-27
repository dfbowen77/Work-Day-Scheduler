// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var containerLgEl = $('.container-lg');

  var now = dayjs().format('dddd, MMMM D, YYYY h:mm A')
  $('#currentDay').text(now);

  var hourNow = dayjs().hour()
  console.log(hourNow)

  function createTimeBlocks() {
    var hour = 0

    for (var i = 0; i < 24; i++) {
      if (hour < 10 ) {
        console.log(hour)
        hourMilitary = '0' + hour
      } else {
        console.log(hour)
        hourMilitary = hour
      }

      if (hour < hourNow) {
        timeWhen = 'past'
      } else if (hour == hourNow) {
        timeWhen = 'present'
      } else {
        timeWhen = 'future'
      }
      console.log(timeWhen)

      var timeScheduleEl = $('<section>'); 
      timeScheduleEl.attr('id', 'hour-' + hourMilitary)
      timeScheduleEl.addClass('row time-block ' + timeWhen)

      var taskScheduleEl = $('<time>');
      taskScheduleEl.addClass('col-2 col-md-1 hour text-center py-3')
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

      containerLgEl.append(timeScheduleEl);

      daySchedule = JSON.parse(localStorage.getItem("daySchedule"));
      
      hour = hour + 1

      
      $(saveButtonEl).on("click", saveEvent);
    }

  }

  createTimeBlocks()

  function saveEvent() {

    var textArea = $(this).parent().children()[1];
    var hourArea = $(this).parent().children()[1].id;

    var hourDetails = {
      hour : hourArea,
      details : textArea.value
    }

    var daySchedule = JSON.parse(localStorage.getItem("daySchedule"));   
            
    if(daySchedule){
      daySchedule.push(hourDetails); 
    }
    else{
      daySchedule = [hourDetails];    
    }

    localStorage.setItem("daySchedule",JSON.stringify(daySchedule));

  }

  function loadSchedule () {

    var daySchedule = JSON.parse(localStorage.getItem("daySchedule"));

    if(daySchedule) {
      for (var i = 0; i < daySchedule.length ; i++) { 
        var hourArea = daySchedule[i].hour
        var hourDetails = daySchedule[i].details

        var hourEl = document.querySelector("#" + hourArea);

        console.log(hourArea)
        console.log(hourDetails)
        console.log(hourEl)

      hourEl.textContent = hourDetails

      }

    }
  }
  loadSchedule()
});  