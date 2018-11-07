/* map.js */
let googleMap;

import { addPlace, getPlaces, subscribe } from './dataService.js';

function init() {
  googleMap = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 0, lng: 0 },
    zoom: 3,
  });

  googleMap.markerList = [];
  googleMap.addListener('click', addMarker);
}

function addMarker(event) {
  addPlace(event.latLng);
  renderMakers();
}

function renderMakers() {
  googleMap.markerList.forEach(m => m.setMap(null)); // 모든 마커 제거
  googleMap.markerList = [];

  // myPlaces 배열의 요소를 기반으로 마커를 추가합니다
  getPlaces().forEach(place => {
    const marker = new google.maps.Marker({
      position: place.position,
      map: googleMap,
    });

    googleMap.markerList.push(marker);
  });
}

init();
renderMakers();

subscribe(renderMakers);
