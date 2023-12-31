import { notify } from '@/components/toastMessage.js'

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

function displayMarker(location, map, option, idx = 0) {
  const { y, x, place_name, address_name, category_group_name, place_url } = location
  var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
  var markerPosition = new kakao.maps.LatLng(y, x)
  // 마커를 생성합니다
  var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png' // 마커 이미지 url, 스프라이트 이미지를 씁니다
  var imageSize = new kakao.maps.Size(36, 37)  // 마커 이미지의 크기
  var imgOptions =  {
    spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
    spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
    offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
  }
  var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions)
  
  var marker
  if (option === 'ORDERED') { // ORDERED인 경우에만 순서 적용
    marker = new kakao.maps.Marker({
      map: map,
      position: markerPosition,
      image: markerImage 
    });
  }
  if (option === 'UNORDERED') { // UNORDERED인 경우에는 순서 적용하지 않음
    marker = new kakao.maps.Marker({
      map: map,
      position: markerPosition,
    });
  }

  const content = `
      <div class="infowindow-wrap">
          <div class="infowindow-title">
              ${place_name}
          </div>
          <div class="infowindow-body">
              <div class="infowindow-address">${address_name}</div>
              <div class="infowindow-category">${category_group_name}</div>
              <div class="infowindow-placeUrl">마커를 클릭하면 장소 페이지로 이동합니다.</div>
          </div>
      </div>`

  // 마커가 지도 위에 표시되도록 설정합니다
  kakao.maps.event.addListener(marker, 'mouseover', function () {
    infowindow.setContent(content)
    infowindow.open(map, marker)
  })

  kakao.maps.event.addListener(marker, 'mouseout', function () {
    infowindow.close()
  })

  kakao.maps.event.addListener(marker, 'click', function () {
    window.open(place_url)
  })

  marker.setMap(map)
  map.setCenter(markerPosition)
}

function createLine() {
  const polyline = new kakao.maps.Polyline({
    strokeWeight: 5, // 선의 두께
    strokeColor: '#684fff', // 선 색
    strokeOpacity: 0.9, // 선 투명도
    strokeStyle: 'solid' // 선 스타일
  })
  return polyline
}

function drawLine(polyline, map, path) {
  polyline.setPath(path)
  polyline.setMap(map)
}

function removeLine(polyline) {
  polyline.setMap(null)
}

function searchPlacesByKeyword(keyword, callbackFn, option) {
  // var keyword = document.getElementById('keyword').value;
  if (!keyword.replace(/^\s+|\s+$/g, '')) {
    notify('WARNING', '키워드를 입력해주세요.')
    return false
  }
  // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
  ps.keywordSearch(
    keyword,
    (data, status, pagination) => {
      const result = placesSearchCB(data, status)
      callbackFn(result)
    },
    option
  )
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
    notify('WARNING', '검색 결과가 존재하지 않습니다.')
    return
  } else if (status === kakao.maps.services.Status.ERROR) {
    notify('FAIL', '검색 중에 오류가 발생했습니다.')
    return
  }
}
function search(keyword, map, callbackFn, option) {
  searchPlacesByKeyword(
    keyword,
    (response) => {
      // console.log(response)
      var bounds = new kakao.maps.LatLngBounds()
      response.searchList.forEach((data) => {
        displayMarker(
          {
            y: data.y,
            x: data.x,
            place_name: data.place_name,
            address_name: data.address_name,
            category_group_name: data.category_group_name,
            place_url: data.place_url
          },
          map,
          'UNORDERED'
        )
        bounds.extend(new kakao.maps.LatLng(data.y, data.x))
      })
      map.setBounds(bounds)
      callbackFn(response.searchList)
    },
    option
  )
}

function searchByCategory(category, map, callbackFn) {
  searchPlacesByCategory(category, map, (response) => {
    var bounds = new kakao.maps.LatLngBounds()
    response.searchList.forEach((data) => {
      // console.log(data)
      displayMarker(
        {
          y: data.y,
          x: data.x,
          place_name: data.place_name,
          address_name: data.address_name,
          category_group_name: data.category_group_name,
          place_url: data.place_url
        },
        map,
        'UNORDERED'
      )
      bounds.extend(new kakao.maps.LatLng(data.y, data.x))
    })
    map.setBounds(bounds)
    callbackFn(response.searchList)
  })
}

function setMapByArea(map, lat, lng) {
  map.setCenter(new kakao.maps.LatLng(lat, lng))
  map.setLevel(5)
}

function getMarker(location) {
  let marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(location.y, location.x)
  })
  return marker
}

function setMarkerWithCustomOverlay(data, map) {
  // let marker = new kakao.maps.Marker({
  //   map: map,
  //   position: new kakao.maps.LatLng(data.y, data.x)
  // });
  let marker = getMarker({ y: data.y, x: data.x })
  let imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png' // 마커이미지의 주소입니다
  let imageSize = new kakao.maps.Size(64, 69) // 마커이미지의 크기입니다
  let imageOption = { offset: new kakao.maps.Point(27, 69) } // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
  let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
  marker.setImage(markerImage)
  marker.setMap(map)

  let content =
    '<div class="customoverlay">' +
    '  <a href="https://map.kakao.com/link/map/11394059" target="_blank">' +
    '    <span class="title">구의야구공원</span>' +
    '  </a>' +
    '</div>'
  let overlay = new kakao.maps.CustomOverlay({
    content: content,
    map: map,
    position: marker.getPosition()
    // yAnchor : 1
  })
  kakao.maps.event.addListener(marker, 'click', function () {
    overlay.setMap(map)
  })
}

export {
  initMap,
  displayMarker,
  createLine,
  drawLine,
  removeLine,
  searchPlacesByKeyword,
  search,
  searchByCategory,
  setMapByArea,
  setMarkerWithCustomOverlay
}
