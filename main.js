// TOGGLE SIGN IN AND SIGN UP --------------------------------------------
function toggleTab(evt, tabName) {
  let i, tabContent, tabLink;

  tabContent = document.getElementsByClassName("tab_content");
  tabLink = document.getElementsByClassName("tab_link");

  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  for (i = 0; i < tabLink.length; i++) {
    tabLink[i].className = tabLink[i].className.replace("active");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// COOKIES ------------------------------------------------
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function login(email, pass) {
  console.log("MADE IT INSIDE LOGIN");
  console.log(email, pass);
  var sourceUserName = getCookie("username");
  var sourcePass = getCookie("password");
  if (email === sourceUserName && pass === sourcePass) {
    window.location.href = "index.html";
  } else {
    console.log("error with if statement");
  }
  console.log("cookie login", getCookie("username"), getCookie("password"));
};

function signup(email, pass, fname, lname) {
  console.log("MADE IT INSIDE Signup");
  // console.log(email, pass);

  setCookie("username", email, 365);
  setCookie("password", pass, 365);
  console.log('working');
  console.log("cookie signup", getCookie("username"), getCookie("password"));
  window.location.href = "index.html";

};

// GOOGLE MAP AND API --------------------------------------------------------
// Initialize and add the map
function initMap() {
  // The location of rexburg
  var rexburg = {
    lat: 43.8260227,
    lng: -111.7896876
  };
  // The map, centered at rexburg
  var map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 4,
      center: rexburg
    });
  // The marker, positioned at rexburg
  var marker = new google.maps.Marker({
    position: rexburg,
    map: map
  });

}

function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 43.8260227,
      lng: -111.7896876
    },
    zoom: 13,
    mapTypeId: 'roadmap'
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function () {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function () {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function (marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function (place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}