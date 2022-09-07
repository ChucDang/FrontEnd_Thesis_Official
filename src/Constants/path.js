// file JSON về địa chỉ hành chính trong Github và call GET thông qua Raw Github User Content
//     (đây cũng là một trick khá tiện để tận dụng Public Github Repository như một free JSON server,
//         bằng việc nhấn vào button Raw tại file JSON đang view trên Github, bạn sẽ đến 
//      url raw.githubusercontent.com như một public GET Restful API).
export const PATHS = {
    CITIES: "https://raw.githubusercontent.com/nhidh99/codergamo/master/004-location-selects/locations/cities.json",
    DISTRICTS: "https://raw.githubusercontent.com/nhidh99/codergamo/master/004-location-selects/locations/districts",
    WARDS: "https://raw.githubusercontent.com/nhidh99/codergamo/master/004-location-selects/locations/wards",
    LOCATION: "https://raw.githubusercontent.com/nhidh99/codergamo/master/004-location-selects/locations/location.json"
}

// Nguồn tham khảo: https://codergamo.com/2021/07/04/tao-3-select-input-de-chon-dia-chi-giao-hang-cung-react-p1/

