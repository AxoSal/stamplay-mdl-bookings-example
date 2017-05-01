var bookings;

function retrieveData() {

  Stamplay.Object("bookings").get({})
    .then(function(res) {
      console.log(res);
      bookings = res;
      displayData();
    }, function(err) {
      console.log(err);
    });

}

retrieveData();

function displayData() {
  var arr = bookings.data;
  var i;
  var out = "";

  for(i = 0; i < arr.length; i++) {
      out += "<tr id='" + arr[i].id + "'><td>" +
      arr[i].booking.first_name +
      "</td><td>" +
      arr[i].booking.last_name +
      "</td><td>" +
      arr[i].booking.person_nmbr +
      "</td><td> <button class='rmvBtns' name='"+ arr[i].id +"'>remove</button> </td></tr>";
  }

  document.getElementById("tbody").innerHTML = out;
  addOnclickRmv();
}

function addOnclickRmv() {

  if (document.addEventListener) {
    document.addEventListener("click", handleClick, false);
  }
  else if (document.attachEvent) {
      document.attachEvent("onclick", handleClick);
  }

  function handleClick(event) {
      event = event || window.event;
      event.target = event.target || event.srcElement;

      var element = event.target;

      while (element) {
          if (element.nodeName === "BUTTON" && /rmvBtns/.test(element.className)) {
              doSomething(element);
              break;
          }

          element = element.parentNode;
      }
  }

  function doSomething(button) {
      remove(button.name);
  }

}

function remove(id) {
  Stamplay.Object("bookings").remove(id)
   .then(function(res) {
     console.log(res);
     var booking = document.getElementById(id);
     booking.parentNode.removeChild(booking);
     return fasle;

   }, function(err) {
     console.log(err);
   });
}

function getInputValue(elementId) {
  return document.getElementById(elementId).value;
}

var id;

function postReq() {

  var fn = getInputValue('first_name');
  var ln = getInputValue('last_name');
  var pn = getInputValue('person_nmbr');

  var booking = {
    booking : {
      first_name : fn,
      last_name : ln,
      person_nmbr : pn
    }
  };

  Stamplay.Object("bookings").save(booking)
    .then(function(res) {
      console.log(res);
      id = res.id;

      document.getElementById("tbody").innerHTML += "<tr id='" + id + "'><td>" +
      fn + "</td><td>" +
      ln + "</td><td>" +
      pn + "</td><td> <button class='rmvBtns' name='"+ id +"'>remove</button> </td></tr>";

    }, function(err) {
      console.log(err);

    });

}
