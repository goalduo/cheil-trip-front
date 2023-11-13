const ps = new kakao.maps.services.Places();  
function initMap(dom) {
    const mapContainer = document.getElementById(dom);
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 5,
      };
    let map = new kakao.maps.Map(mapContainer, options);
    return map;
}
function displayMarker(location, map) {
    const { Lat, Lng } = location
    var markerPosition  = new kakao.maps.LatLng(Lat, Lng); 
// 마커를 생성합니다
  var marker = new kakao.maps.Marker({
      position: markerPosition
  });
// 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
    map.setCenter(markerPosition);
}

function drawLine(map, path) {
    // 지도에 선을 표시한다 
    var polyline = new kakao.maps.Polyline({
        map: map, // 선을 표시할 지도 객체 
        path : path,
        strokeWeight: 3, // 선의 두께
        strokeColor: '#FF0000', // 선 색
        strokeOpacity: 0.9, // 선 투명도
        strokeStyle: 'solid' // 선 스타일
    });	
}

async function searchPlacesByKeyword(keyword) {
    // var keyword = document.getElementById('keyword').value;
    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }
    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    const result = await ps.keywordSearch(keyword, placesSearchCB); 
    console.log(result)
    return result;
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        // console.log(data);
        // console.log(status);
        // console.log(pagination);
        console.log({
            data,
            status,
            pagination
        })
        return {
            data,
            status,
            pagination
        }

    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

        alert('검색 결과가 존재하지 않습니다.');
        return;

    } else if (status === kakao.maps.services.Status.ERROR) {

        alert('검색 결과 중 오류가 발생했습니다.');
        return;

    }
}
  
export {
    initMap,
    displayMarker,
    drawLine,
    searchPlacesByKeyword
}