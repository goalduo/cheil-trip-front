import { AttractionAxios } from "../util/http-commons";
const attraction = AttractionAxios();

function getsearchOptionList() {
    return attraction.get(`/areaCode1`)
        .then((response) => response.data.response.body.items.item)
}

function getKeywordAttractionList(params) {
    return attraction.get('/searchKeyword1', { params })
        .then((response) => response.data.response.body.items.item)
        
}
function getAreaBasedAttractionList(params) {
    return attraction.get('/areaBasedList1', { params })
        .then((response) => response.data.response.body.items.item)
    
}

export {
    getsearchOptionList,
    getKeywordAttractionList,
    getAreaBasedAttractionList
}