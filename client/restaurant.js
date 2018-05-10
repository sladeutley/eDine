function findUserLocation() {
  let output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>click on allow to use your location</p>";
    return;
  }

  function success(position) {
    let latitude  = position.coords.latitude;
    let longitude = position.coords.longitude;

    let userInput = document.getElementById("restaurant_search").value;

    location.href = `${location.origin}/restaurants?latitude=${latitude}&longitude=${longitude}&keyword=${userInput}`;

    // output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

    // let img = new Image();
    // img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    // output.appendChild(img);
  }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}
  
document.getElementById("searchRestaurants").addEventListener("click", findUserLocation);