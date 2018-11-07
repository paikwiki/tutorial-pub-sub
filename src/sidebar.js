/* sidebar.js */
import { getPlaces, subscribe } from './dataService.js';

function renderCities(placesArray) {
  // 도시 목록을 표현하기 위한 DOM 엘리먼트를 가져온다
  const citiyListElement = document.getElementById('citiesList');

  // 먼저 클리어하고
  citiyListElement.innerHTML = '';

  // forEach 함수를 써서 하나씩 다시 리스트를 그려낸다.
  placesArray.forEach(place => {
    const cityElement = document.createElement('div');
    cityElement.innerText = place.name;
    citiyListElement.appendChild(cityElement);
  });
}

renderCities(getPlaces());

subscribe(renderCities);
