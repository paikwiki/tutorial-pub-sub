/* dataService.js */
let myPlaces = [];
let changeListeners = [];

const geocoder = new google.maps.Geocoder();

export function subscribe(callbackFunction) {
  changeListeners.push(callbackFunction);
}

function publish(data) {
  changeListeners.forEach(changeListener => changeListener(data));
}

export function addPlace(latLng) {
  // Google API를 실행하여 도시 이름을 검색하고.
  // 두번째 인자는 요청한 결과에 따른 응답이 왔을 때 처리를 담당하는 콜백 함수
  geocoder.geocode({ location: latLng }, function(results) {
    try {
      // 콜백 안에서 결과에 따른 도시 이름을 추출한다
      const cityName = results
        .find(result => result.types.includes('locality'))
        .address_components[0]
        .long_name;

      // 그리고 우리가 준비해놓은 변수에 집어넣는다.
      myPlaces.push({ position: latLng, name: cityName });

      publish(myPlaces);

      // 그 다음 localStorage와 동기화한다
      localStorage.setItem('myPlaces', JSON.stringify(myPlaces));
    } catch(e) {
      // 도시를 찾을 수 없을 때 콘솔에 메세지를 출력한다
      console.error('No city found in this location! :(');
    }
  });
}

// 현재 가지고 있는 장소의 목록을 출력
export function getPlaces() {
  return myPlaces;
}

// localStorage에 있는 정보를 꺼내 컬렉션에 넣는 함수
function initLocalStorage() {
  const placesFromLocalStorage = JSON.parse(localStorage.getItem('myPlaces'));
  if (Array.isArray(placesFromLocalStorage)) {
    myPlaces = placesFromLocalStorage;
    publish(); // 지금은 만들어지지 않은 함수. 나중에 적용될 예정
  }
}

initLocalStorage();
