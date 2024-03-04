/*
 * Google Map Javascript API Imports
 */
const { Map, InfoWindow } = await google.maps.importLibrary("maps");
const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
  "marker"
);

/*
 * Globals
 */
let map;
let mapCenter;
let isFormActive = false;
let tempMarker;
const tempMarkerPin = new PinElement({
  background: '#F29718',
  borderColor: '#d4810c',
  glyph: '',
  scale: 0.8
});

try {
  mapCenter = await getUserLocation();
} catch (error) {
  mapCenter = { lat: 40.62966, lng: -75.37247 };  // liberty high school
  console.error(error.message);
}

const messages = [
  {
    position: { lat: mapCenter.lat, lng: mapCenter.lng },
    message: "I love it here.",
  },

  {
    position: { lat: mapCenter.lat + .01, lng: mapCenter.lng - .01 },
    message: "I hate it here.",
  },
];

const messageWindow = new InfoWindow();  // shared between markers

/*
 * Helper Functions
 */
function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser."));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          reject(new Error("Unable to retrieve your location."));
        }
      );
    }
  });
}

function toggleForm() {
  if (isFormActive) {
    if (tempMarker) {
      tempMarker.map = null;
      tempMarker = null;
    }
    document.getElementById('markerForm').classList.remove('active');
    document.getElementById('message').value = '';
    isFormActive = false;
  } else {
    document.getElementById('markerForm').classList.add('active');
    isFormActive = true;
  }
}

function addTitleOverlay(titleText) {
  const titleOverlayDiv = document.createElement('div');
  titleOverlayDiv.classList.add('map-title-overlay');
  titleOverlayDiv.textContent = titleText;

  // Set the overlay position
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(titleOverlayDiv);
}

function addNewMarkerButton() {
  const addMarkerButton = document.createElement('img');
  addMarkerButton.src = './assets/plus-circle-outline.png';
  addMarkerButton.classList.add('map-add-marker-btn');

  addMarkerButton.onclick = () => {
    toggleForm();
  };

  document.getElementById('closeFormBtn').onclick = () => {
    toggleForm();
  };

  document.querySelector('#submitButton').addEventListener('click', handleFormSubmit);

  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(addMarkerButton);
}

function placeTempMarker(position) {
  // If a temporary marker already exists, move it
  if (tempMarker) {
    tempMarker.position = position;
  } else {
    // Create a new temporary marker at the clicked location
    tempMarker = new AdvancedMarkerElement({
      position,
      map,
      content: tempMarkerPin.element
    });
  }
}

function placeMarker(position, message) {
  const pin = new PinElement({
    background: "#122A40",
    borderColor: "#091520",
    glyph: "",
    scale: 0.8
  });

  const marker = new AdvancedMarkerElement({
    map,
    position,
    title: message,
    content: pin.element
  });

  marker.addListener("click", () => {
    messageWindow.close();
    messageWindow.setContent(
      `<div class="info-window-content">${marker.title}</div>`
    );
    messageWindow.open(marker.map, marker);
  });
}

/*
 * Driver Code
 */
function handleFormSubmit() {
  const message = document.getElementById('message').value;
  if (tempMarker && message) {
    placeMarker(tempMarker.position, message);
    toggleForm();
  }
}

function initMap() {
  map = new Map(document.getElementById("map"), {
    mapId: "2dc738ddf4d518a4",
    center: mapCenter,
    zoom: 14,
    disableDefaultUI: true,
    zoomControl: true,
  });

  addTitleOverlay("SafeSpace");
  addNewMarkerButton();

  // listen for map clicks to set the temporary marker location
  map.addListener('click', function (e) {
    // tempMarkerLocation = e.latLng;
    const isFormActive = document.getElementById('markerForm').classList.contains('active');
    if (isFormActive) {
      placeTempMarker(e.latLng);
    }
  });

  for (const msg of messages) {
    placeMarker(msg.position, msg.message);
  }
}

initMap();
