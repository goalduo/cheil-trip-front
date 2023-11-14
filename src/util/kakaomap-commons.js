const ps = new kakao.maps.services.Places()
let searchResult = {}
function initMap(dom) {
  const mapContainer = document.getElementById(dom)
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 5
  }
  let map = new kakao.maps.Map(mapContainer, options)
  return map
}
function displayMarker(location, map) {
  const { y, x, place_name } = location
  var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
  var markerPosition = new kakao.maps.LatLng(y, x)
  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
    map: map,
    position: markerPosition
  })
  // 마커가 지도 위에 표시되도록 설정합니다
  kakao.maps.event.addListener(marker, 'click', function () {
    // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
    infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place_name + '</div>')
    infowindow.open(map, marker)
  })
  marker.setMap(map)
  map.setCenter(markerPosition)
}

function drawLine(map, path) {
  // 지도에 선을 표시한다
  var polyline = new kakao.maps.Polyline({
    map: map, // 선을 표시할 지도 객체
    path: path,
    strokeWeight: 3, // 선의 두께
    strokeColor: '#FF0000', // 선 색
    strokeOpacity: 0.9, // 선 투명도
    strokeStyle: 'solid' // 선 스타일
  })
}

function searchPlacesByKeyword(keyword, callbackFn) {
  // var keyword = document.getElementById('keyword').value;
  if (!keyword.replace(/^\s+|\s+$/g, '')) {
    alert('키워드를 입력해주세요!')
    return false
  }
  // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
  ps.keywordSearch(keyword, (data, status, pagination) => {
    const result = placesSearchCB(data, status)
    callbackFn(result)
  })
}

function searchPlacesByCategory(category, map, callbackFn) {
  ps.categorySearch(
    category,
    (data, status, pagination) => {
      const result = placesSearchCB(data, status)
      callbackFn(result)
    },
    {
      location: new kakao.maps.LatLng(map.getCenter().getLat(), map.getCenter().getLng())
    }
  )
}

function placesSearchCB(data, status) {
  if (status === kakao.maps.services.Status.OK) {
    return {
      searchList: data
    }
  } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    alert('검색 결과가 존재하지 않습니다.')
    return
  } else if (status === kakao.maps.services.Status.ERROR) {
    alert('검색 결과 중 오류가 발생했습니다.')
    return
  }
}
function search(keyword, map, callbackFn) {
  searchPlacesByKeyword(keyword, (response) => {
    // console.log(response)
    var bounds = new kakao.maps.LatLngBounds()
    response.searchList.forEach((data) => {
      displayMarker({ y: data.y, x: data.x }, map)
      bounds.extend(new kakao.maps.LatLng(data.y, data.x))
    })
    map.setBounds(bounds)
    callbackFn(response.searchList)
  })
}

function searchByCategory(category, map, callbackFn) {
  searchPlacesByCategory(category, map, (response) => {
    callbackFn(response.searchList)
  })
}
function getMarker(location) {
  let marker = new kakao.maps.Marker({ 
    position: new kakao.maps.LatLng(location.y, location.x)
  });
  return marker;
}
function setMarkerWithCustomOverlay(data, map) {
  // let marker = new kakao.maps.Marker({
  //   map: map, 
  //   position: new kakao.maps.LatLng(data.y, data.x)
  // });
  let marker = getMarker({ y: data.y, x: data.x })
  let imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png' // 마커이미지의 주소입니다    
  let imageSize = new kakao.maps.Size(64, 69) // 마커이미지의 크기입니다
  let imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
  let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
  marker.setImage(markerImage);
  marker.setMap(map);

  let content = '<div class="customoverlay">' +
    '  <a href="https://map.kakao.com/link/map/11394059" target="_blank">' +
    '    <span class="title">구의야구공원</span>' +
    '  </a>' +
    '</div>';
  let overlay = new kakao.maps.CustomOverlay({
    content: content,
    map: map,
    position: marker.getPosition()
    // yAnchor : 1
  });
  kakao.maps.event.addListener(marker, 'click', function() {
    overlay.setMap(map);
  });

}

export { initMap, displayMarker, drawLine, searchPlacesByKeyword, search, searchByCategory, setMarkerWithCustomOverlay }
