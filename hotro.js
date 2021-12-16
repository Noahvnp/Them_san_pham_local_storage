// Hàm sinh ID tự động (ID là duy nhất) ==> hàm có thể trùng ID nhưng xác suất cực thấp.
function taoId() {
    var id = '';
    //Lấy milisecond ở thời điểm hiện tại
    id = Math.random().toString().substring(2,10) + "_" + String(new Date().getTime());
    return id;
}